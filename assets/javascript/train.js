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

$('#add-train').on('click', function () {
  event.preventDefault();

  let trainName = $('#train-name-input').val().trim();
  let trainDestination = $('#train-destination-input').val().trim();
  let trainTime = $('#train-time-input').val().trim();
  let Trainfrequency = $('#train-frequency-input').val().trim();

  database.ref().push({
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: Trainfrequency
  });
});
