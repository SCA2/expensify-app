import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// const expenses = [
//   {
//     description: 'description 1',
//     note: 'note 1',
//     amount: 100,
//     createdAt: 0
//   },
//   {
//     description: 'description 2',
//     note: 'note 2',
//     amount: 200,
//     createdAt: 1
//   },
//   {
//     description: 'description 3',
//     note: 'note 3',
//     amount: 300,
//     createdAt: 3
//   }
// ];

// expenses.forEach(expense => {
//   database.ref('expenses').push(expense);
// });

// database.ref('expenses').on('value', snapshot => {
//   const expenses = [];
//   snapshot.forEach(childSnapshot => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     })
//   })
//   console.log(expenses);
// }, e => {
//   console.log('Error fetching data: ', e);
// });

// database.ref().set({
//   name: 'Tim Ryan',
//   age: 52,
//   stressLevel: 6,
//   job: {
//     title: 'Engineer',
//     company: 'Google'
//   },
//   location: {
//     city: 'Oakland',
//     state: 'CA',
//     country: 'United States'
//   }
// }).then(() =>{
//   console.log('Data is saved');
// }).catch((e) => {
//   console.log('Error: ', e);
// });

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle',
//   'location/state': 'WA'
// });

// database.ref('attributes').set({
//   height: 72,
//   weight: 170
// }).then(() => {
//   console.log('Attributes saved');
// }).catch((e) => {
//   console.log('Error: ', e);
// })

// database.ref().on('value', snapshot => {
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// }, e => {
//   console.log('Error fetching data: ', e);
// });

// setTimeout(() => {
//   database.ref().update({
//     'job/title': 'Janitor'
//   });
// }, 3000);