const functions = require('firebase-functions');

// const admin = require('firebase-admin');
// admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.deleteCuisine = functions.firestore
  .document('cuisine/{cuisineId}')
  .onDelete((snap, context) => {

    const ref = snap.ref;
    // const dish = ref.parent.doc('dish/{dishId}')
    // console.log(dish);
    // console.log("Parent :" + ref.parent.doc("dish/{dishId}").set({name:"working"}));

    const cuisineName = snap.get('name');
    console.log("Name :" + cuisineName);
    return ref.parent.parent.doc("dish").set({
      name: "working"
    });
  })
