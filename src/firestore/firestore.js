const fireStore = firebase.firestore();

export const postToFireBase = (postInfo) => {
  fireStore.collection('posts').add(postInfo);
};

//get all doc from firestore in real-time
export const getPosts = (callback) => {
  const query = fireStore.collection('posts');
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


// window.addEventListener('DOMContentLoaded' , async (e) => {
//   try{
//     const posts =  await getPosts()
//   } catch(error){
//     console.log(error)
//   }
// });

// const query = fireStore.collection('posts');
//   query.onSnapshot(querySnapshot => {//posts
//     const arrayPosts = [];
//     querySnapshot.forEach(doc => {
//       arrayPosts.push({
//         id: doc.id,
//         ...doc.data()
//       })
//     })
//     callback(arrayPosts)
//   })

//delete data
// const buttonDelete = document.querySelector(`[data-id='${info.id}'] .btn-delete`);
// buttonDelete.addEventListener('change', () => {
//   fireStore.collection('posts').doc(`${info.id}`).delete().then(() => {
//     console.log('document deleted');
//   }).catch(error =>{
//     console.log('error' , error);
//   })
// })

//edit data
// const buttonEdit = document.querySelector('.btn-edit');
// buttonEdit.addEventListener('change' , () => {
  

// })


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


