$(document).ready(function() {
   // Initialize Firebase
   var config = {
    apiKey: "AIzaSyBQNl8-00TclKarTRQXal3U6v3rFdjYbxg",
    authDomain: "trainschedule-ecdb0.firebaseapp.com",
    databaseURL: "https://trainschedule-ecdb0.firebaseio.com",
    projectId: "trainschedule-ecdb0",
    storageBucket: "trainschedule-ecdb0.appspot.com",
    messagingSenderId: "477269490186"
  };
  firebase.initializeApp(config);

console.log(firebase);
//CREATE VARIABLE//
var database = firebase.database();

//USER CLICK//
$('#sumbit').on('click', function() {
 var name = $('#nameInput').val().trim();
 var dest = $('#destInput').val().trim();
 var nextTrain = $('#timeinput').val().trim();
 var minsAway = $('#freqInput').val().trim();


 database.ref().push({
    name:name,
    dest:dest,
    nextTrain:nextTrain,
    minsAway:minsAway,
    timeAdded: firebase.database.ServerValue.TIMESTAMP
 });

 $('input').val('');
 return false;
});

//CHILD FUNCTION//
 

database.ref().on('child_added', function(response){
    var name = response.val().name;
    var dest = response.val().dest;
    var nextTrain = response.val().nextTrain;
    var minsAway = response.val().minsAway;

    console.log('Name:' + name);
    console.log('destination:' + dest);



//VARIABLES USED TO CALCULATE TIMES USING MOMENT//
var minsAway = parseInt(freq);

var currentTime = moment();

var tConverted = moment(response.val().time, 'HH:mm').substract(1, 'years');

var trainTime = moment(tConverted).format('HH:mm');

var fConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');

var fDifference = moment().diff(moment(fConverted), 'minutes');

var tRemainder = fDifference  % freq;

var minsAway = freq - tRemainder;

var nextTrain = moment().add(minsAway, 'minutes');


//APPEND TO THE TRAIN TABLE//
$('#currentTime').text(currentTime);
$('#trainTable').append (
    "<tr><td id='nameDisplay'>" + response.val().name +
    "<tr><td id='destDisplay'>" + response.val().dest +
    "<tr><td id='freqDisplay'>" + response.val().freq +
    "<tr><td id='nextDisplay'>" + moment(nextTrain).format("HH:mm") +
    "<tr><td id='minsDisplay'>" + minsAway + ' minutes until arrival ' + '</td></tr>')
},
function(errorObject){
    console.log("Read failed: " + errorObject.code)
});


});