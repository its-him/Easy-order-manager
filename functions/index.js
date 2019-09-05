const functions = require('firebase-functions');

//  For access other documents
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// to delete dish corresponds to the deleted cuisine
exports.deleteCuisine = functions.firestore
  .document('cuisine/{cuisineId}')
  .onDelete((snap, context) => {
    const cuisineName = snap.get('name');

    const dishRef = db.collection('dish');
    const query = dishRef.where('cuisine', '==', cuisineName)
      .get()
      .then(snapshot => {
        snapshot.forEach(async (dishes) => {
          await dishes.ref.delete();
        });
        return null;
      });
    return null;
  });



// to update cuisine name in dishes as original cuisine name changed
exports.updateCuisine = functions.firestore
  .document('cuisine/{cuisineId}')
  .onUpdate((snap, context) => {
    const newName = snap.after.get('name');
    const oldName = snap.before.get('name');
    
    const dishRef = db.collection('dish');
    const query = dishRef.where('cuisine', '==', oldName)
      .get()
      .then(snapshot => {
        snapshot.forEach(async (dishes) => {
          await dishes.ref.update({
            cuisine: newName
          });
        });
        return null;
      });
    return null;
  })
