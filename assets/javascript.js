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
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  $("#add-train-btn").on("click", function(event){
    event.preventDefault();

    var trnInput = $("#train-name-input").val().trim();
    var destInput = $("#destination-input").val().trim();
    var timeInput = $("#time-input").val().trim();
    var frequencyInput = $("#frequency-input").val().trim();
  });