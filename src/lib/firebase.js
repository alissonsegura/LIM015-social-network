export const loginInFirebase = async (email, password) => {
  try {
    const data = await firebase.auth().signInWithEmailAndPassword(email, password);
    return data;
  } catch (error) {
    throw Error(error.message);
    //  lets you create custom errors.
    //  exposes an error event with two params name & message. It also terminate further execution
  }
};

export const signUpFirebase = async (email, password) => {
  try {
    const data = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return data;
  } catch (error) {
    throw Error(error.message);
  }
};

export const logOutFirebase = async () => {
  const data = await firebase.auth().signOut();
  return data;
};
