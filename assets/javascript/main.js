var config = {
    apiKey: "AIzaSyAkMSER31zhxBFzA-1L6slaWSCjeGt9rXg",
    authDomain: "trains-5e8eb.firebaseapp.com",
    databaseURL: "https://trains-5e8eb.firebaseio.com",
    projectId: "trains-5e8eb",
    storageBucket: "trains-5e8eb.appspot.com",
    messagingSenderId: "612936372291"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  // gathers user input and stores in variable and pushes to firebase
  $("#add-train-btn").on("click", function() {
  
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
  
    var newTrain = {
  
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  
    database.ref().push(newTrain);
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  
    return false;
  });
  // pull from database
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;
  // moment.js to show times
    var timeArr = tFirstTrain.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;
  
    if (maxMoment === trainTime) {
      tArrival = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    } else {
  
      var differenceTimes = moment().diff(trainTime, "minutes");
      var tRemainder = differenceTimes % tFrequency;
      tMinutes = tFrequency - tRemainder;
      tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }
  
    // add to table
    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
            tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
  });
  
