// Code was editted from Activity 17, 20, and 21
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA7aVT1U8M8nwHgfJjjTfysTgscmcnRjWs",
    authDomain: "users-f1b4d.firebaseapp.com",
    databaseURL: "https://users-f1b4d.firebaseio.com",
    projectId: "users-f1b4d",
    storageBucket: "",
    messagingSenderId: "854441096356",
    appId: "1:854441096356:web:6942447cb20ec7c8"
};
// Initializing Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trnInput = $("#train-name-input").val().trim();
    var destInput = $("#destination-input").val().trim();
    var timeInput = $("#time-input").val().trim();
    var frequencyInput = $("#frequency-input").val().trim();

    var newTrn = {
        trnInput: trnInput,
        destInput: destInput,
        timeInput: timeInput,
        frequencyInput: frequencyInput,
    };

    database.ref().push(newTrn);
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    var trnInput = childSnapshot.val().trnInput;
    var destInput = childSnapshot.val().destInput;
    var timeInput = childSnapshot.val().timeInput;
    var frequencyInput = childSnapshot.val().frequencyInput;

// Variable Reassignment
var tFrequency = frequencyInput;
var firstTime = timeInput;

// First Time
var firstTimeConverted = moment(firstTime, "HH:mm")
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
var nextTrainPretty = moment(nextTrain).format("hh:mm");

    var newRow = $("<tr>").append(
        $("<td>").text(trnInput),
        $("<td>").text(destInput),
        $("<td>").text(frequencyInput),
        $("<td>").text(nextTrainPretty),
        $("<td>").text(tMinutesTillTrain),
      );
    
      // Append the new row to the table
      $("#train-table > tbody").append(newRow);

});
