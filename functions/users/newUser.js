"use strict";

const functions = require("firebase-functions");
const database = require("../helper/db");
const funcName = "newUser";

const main = function(event) {
  const data = event.data;
  const db = database.main(funcName);

  console.log("event", JSON.stringify(event));
  const payload = {
    auth_uid: data.uid,
    email: data.email
  };
  const addUserPromise = db
    .collection("users")
    .add(payload)
    .then(docRef => {
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    })
    .catch(err => {
      console.error("Error adding document", err);
    });

  return Promise.all([addUserPromise]);
};

const newUserFunction = functions.auth.user().onCreate(main);
export default newUserFunction;
