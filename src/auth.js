import { loginInFirebase, signUpFirebase, logOutFirebase } from './lib/firebase.js';
// Login
export const login = async (email, password) => {
  try {
    const userCredential = await loginInFirebase(email, password);
    const userInformation = {
      name: userCredential.user.displayName,
      email: userCredential.user.email,
      photoURL: userCredential.user.photoURL,
      id: userCredential.user.uid,
    };
    localStorage.setItem('user', JSON.stringify(userInformation));
    // whenever we want to add something in localstorage we use .setitem
    //  localstorage only stores strings so we convert it using the JSON. stringify() method
    return userCredential;
  } catch (error) {
    throw Error(error.message);
  }
};
//  async functions always returns promises
//  await pause your code on that line until the promise fulfills

// Email Verification
export const sendEmailVerification = async () => {
  try {
    const sendingEmail = await firebase.auth().currentUser.sendEmailVerification();
    return sendingEmail;
  } catch (error) {
    throw Error(error.message);
  }
};
// Tracking User conexion
// export const trackingUser = firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     alert(' User signed in ');
//   } else {
//     alert('User signed out ');
//   }
// });
// signup
export const signUp = async (email, password) => {
  try {
    const userCredentialforSignUp = await signUpFirebase(email, password);
    const userSignUpInfo = {
      name: userCredentialforSignUp.user.displayName,
      email: userCredentialforSignUp.user.email,
      photoURL: userCredentialforSignUp.user.photoURL,
      id: userCredentialforSignUp.user.uid,
    };
    localStorage.setItem('user', JSON.stringify(userSignUpInfo));
    return userCredentialforSignUp;
  } catch (error) {
    throw Error(error.message);
  }
};

// Google Authentication
export const googleAuth = async () => {
  try {
    const provider = await new firebase.auth.GoogleAuthProvider();
    const popUpGoogleAuth = await firebase.auth().signInWithPopup(provider);
    const googleUserInfo = {
      name: popUpGoogleAuth.user.displayName,
      email: popUpGoogleAuth.user.email,
      photoURL: popUpGoogleAuth.user.photoURL,
      id: popUpGoogleAuth.user.uid,
    };
    localStorage.setItem('user', JSON.stringify(googleUserInfo));
    return popUpGoogleAuth;
  } catch (error) {
    throw Error(error.message);
  }
};
// Facebook Authentication
export const facebookAuth = async () => {
  try {
    const provider = new firebase.auth.FacebookAuthProvider();
    const popUpFbAuth = firebase.auth().signInWithPopup(provider);
    return popUpFbAuth;
  } catch (error) {
    throw Error(error.message);
  }
};
// Log out
export const logOutPage = async () => {
  await logOutFirebase();
};
