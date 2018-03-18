"use strict";

const db = funcName => {
  const functions = require("firebase-functions");
  const admin = require("firebase-admin");

  const params = functions.config().firebase;
  params.databaseAuthVariableOverride = {};
  params.databaseAuthVariableOverride.uid = funcName;
  const firebaseApp = admin.initializeApp(params, funcName);
  return firebaseApp.firestore();
};

exports.main = db;
