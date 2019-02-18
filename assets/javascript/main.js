   var config = {
    apiKey: "AIzaSyBQNl8-00TclKarTRQXal3U6v3rFdjYbxg",
    authDomain: "trainschedule-ecdb0.firebaseapp.com",
    databaseURL: "https://trainschedule-ecdb0.firebaseio.com",
    projectId: "trainschedule-ecdb0",
    storageBucket: "trainschedule-ecdb0.appspot.com",
    messagingSenderId: "477269490186"
  };

  firebase.initializeApp(config);


//CREATE VARIABLE//
var trainData = firebase.database();

//USER CLICK//
$('#addTrainBtn').on('click',function(){
 var trainName = $('#TrainNameInput').val().trim();
 var destination = $('#destinationInput').val().trim();
 var firstTrain = moment($('#firstTrainInput').val().trim(), "HH:mm".substract(10, "years").format("X"));
 var frequency = $('#frequencyInput').val().trim();

 console.log(firstTrain);
 return false;

})

trainData.ref().on("child_added", function(snapshot){
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  var remainder = moment().diff(moment.unix(fristTrain),"minutes")%frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes,"m").format("hh:mm A");

  console.log(remainder);
  console.log(minutes);
  console.log(arrival);

})