export const loginInFirebase = async (email, password) => {
  try {
    const data = await firebase.auth().signInWithEmailAndPassword(email, password);
    return data;
  } catch (error) {
    throw Error(error.message);
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
