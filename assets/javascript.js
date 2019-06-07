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
    // var childName = trnInput;
    database.ref().push(newTrn);
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trnInput = childSnapshot.val().trnInput;
    var destInput = childSnapshot.val().destInput;
    var timeInput = childSnapshot.val().timeInput;
    var frequencyInput = childSnapshot.val().frequencyInput;
    var removeBtn = $("<button>")
    removeBtn.addClass('btn btn-secondary btn-small delete');
    removeBtn.html("<i class=\"fa fa-trash\"></i>")
    var keyName = childSnapshot.key;
    console.log(keyName);
    removeBtn.attr("data-key", keyName)
    
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
    if (diffTime >= 0) {

    
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var nextTrainPretty = moment(nextTrain).format("hh:mm A");
    } else {

    var nextTrain = firstTimeConverted
    var nextTrainPretty = moment(nextTrain).format("hh:mm A");

};

    var newRow = $("<tr>").append(
        $("<td>").addClass("trainName").text(trnInput),
        $("<td>").text(destInput),
        $("<td>").addClass("center").text(frequencyInput),
        $("<td>").addClass("center").text(nextTrainPretty),
        $("<td>").addClass("center").text(tMinutesTillTrain),
        $("<td>").addClass("center").html(removeBtn),
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
    
});
// copied from https://www.tutorialrepublic.com/codelab.php?topic=bootstrap&file=table-with-add-and-delete-row-feature
$(document).on("click", ".delete", function(){
    var userId = $(this).attr("data-key")
    console.log(userId)
    $(this).parents("tr").remove();
    // var del=database.ref().child("-L7p60IRXp29D54Pk3dw").remove();
    let userRef = database.ref().child(userId);
    userRef.remove()

});