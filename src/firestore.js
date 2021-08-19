const fireStore = firebase.firestore();
// Crea un id aleatorio
const randomId = () => Math.random().toString(36).substring(7);

export const postToFireBase = (postInfo) => {
  fireStore.collection('posts').doc(randomId()).set(postInfo);
};
