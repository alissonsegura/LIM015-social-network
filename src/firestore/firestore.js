const fireStore = firebase.firestore();
// add a collection and obj in Firebase
export const postToFireBase = (postInfo) => {
  fireStore.collection('posts').add(postInfo);
};
//  get all doc from firestore in real-time
export const getPosts = (callback) => {
  const query = fireStore.collection('posts').orderBy('date', 'desc');
  query.onSnapshot((querySnapshot) => {
    // real time post
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
