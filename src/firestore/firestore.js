const fireStore = firebase.firestore();
// add a collection and obj in Firebase
export const postToFireBase = (postInfo) => {
  fireStore.collection('posts').add(postInfo);
};
//  get all doc from firestore in real-time
export const getPosts = (callback) => {
  const query = fireStore.collection('posts').orderBy('date', 'desc');
  query.onSnapshot((querySnapshot) => {
    const arrayPosts = [];
    querySnapshot.forEach((doc) => {
      arrayPosts.push({
        postid: doc.id,
        // id: doc.id,
        ...doc.data(),
      });
    });
    // console.log(arrayPosts);
    callback(arrayPosts);
  });
};
// Function Delete Post
export const deletePost = (id) => fireStore.collection('posts').doc(id).delete();
// Function Update Post
export const updateEditPost = (id, post) => firebase.firestore().collection('posts').doc(id).update({
  post,
});

// const getLikes = (id) => {
// const userId = JSON.parse(localStorage.getItem
// ('user'))?.id // if exists user, get id
// add event listener
// const bttonHeart = document.querySelector(`#id="likes-${info.id}`)
// bttonHeart.addEventListener('click' , () => {
// })
// }
// Paso 1 - obtener el id del usuario (localstorage)
// Paso 2 -  detectar si el id esta en el array,
// (buscar saber si un valor esta en un array) si esta = like , si no esta = no le dio like
// Paso 3 - Si el id esta al darle click debo eliminar el id del
//  array y si el id no esta debe agregar el id
