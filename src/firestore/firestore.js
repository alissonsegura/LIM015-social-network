const fireStore = firebase.firestore();

export const postToFireBase = (postInfo) => {
  fireStore.collection('posts').add(postInfo);
};

//get all doc from firestore in real-time
export const getPosts = (callback) => {
  const query = fireStore.collection('posts').orderBy('date' , 'desc');
  query.onSnapshot(querySnapshot => {//posts
    const arrayPosts = [];
    querySnapshot.forEach(doc => {
      arrayPosts.push({
        id: doc.id, 
        ...doc.data()
      })
    })
    callback(arrayPosts)
  })
};



// Function Delete Post
export const deletePosts = (id) => fireStore.collection('posts').doc(id).delete();

 // Function Edit Post

//  export const editPosts = (id, input) => {
//   const fireStoreCollection = firebase.firestore().collection('posts');
//   return fireStoreCollection.doc(id).update({
//     id: doc.id,
//   });
// };


  export const editPostFirebase = (id, note) => firebase.firestore().collection('post').doc(id).update({
  notes: note,

  date: new Date().toLocaleString(),
});
 






  // window.addEventListener('DOMContentLoaded' , async (e) => {
//   try{
//     const posts =  await getPosts()
//   } catch(error){
//     console.log(error)
//   }
// });



//edit data



// likes
// export const setLikes = (id) => {
//   fireStore.collection('posts').doc(id).get() // get user id 
//     .then(() => {
//       const increaseLikes = fireStore.FieldValue.increment(1);
//       fireStore.collection('posts').doc(id).update({ 
//         likes: increaseLikes,
//       });
//     }).catch(error){
//       throw Error(error.message)
//     };
// }
//decrease likes 
//const decreaseLikes = fireStore.FieldValue.increment(-1)

//[].lenght

//Paso 1 - obtener el id del usuario (localstorage) 
//Paso 2 -  detectar si el id esta en el array,(buscar saber si un valor esta en un array) si esta = like , si no esta = no le dio like
//Paso 3 - Si el id esta al darle click debo eliminar el id del array y si el id no esta debe agregar el id


