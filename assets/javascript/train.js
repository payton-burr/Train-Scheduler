var firebaseConfig = {
  apiKey: 'AIzaSyBrDIAPh6yg1DfgAbtN88r0U6geN4pqoYA',
  authDomain: 'my-project-bcdb4.firebaseapp.com',
  databaseURL: 'https://my-project-bcdb4.firebaseio.com',
  projectId: 'my-project-bcdb4',
  storageBucket: 'my-project-bcdb4.appspot.com',
  messagingSenderId: '249173720197',
  appId: '1:249173720197:web:30a5557f9a0cfad2'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();

$('#add-train').on('click', function() {
  event.preventDefault();

  let trainName = $('#train-name-input')
    .val()
    .trim();
  let trainDestination = $('#train-destination-input')
    .val()
    .trim();
  let firstTrainTime = $('#first-train-input')
    .val()
    .trim();
  let Trainfrequency = $('#train-frequency-input')
    .val()
    .trim();

  database.ref().push({
    name: trainName,
    destination: trainDestination,
    frequency: Trainfrequency,
    firstTrain: firstTrainTime
  });
});

database.ref().on('child_added', function(childSnapshot) {
  let tFrequency = childSnapshot.val().frequency;
  let tFirstTrain = childSnapshot.val().firstTrain;
  let firstTimeConverted = moment(tFirstTrain, 'hh:mm').subtract(1, 'years');

  let differenceTime = moment().diff(moment(firstTimeConverted), 'minutes');

  let tRemaining = differenceTime % tFrequency;
  let tMinutesAway = tFrequency - tRemaining;

  let tArrival = moment()
    .add(tMinutesAway, 'minutes')
    .format('hh:mm a');

  let newRow = $('<tr>').append(
    $('<td>').text(childSnapshot.val().name),
    $('<td>').text(childSnapshot.val().destination),
    $('<td>').text(childSnapshot.val().frequency),
    $('<td>').text(tArrival),
    $('<td>').text(tMinutesAway)
  );

  $('table > tbody').append(newRow);
});
