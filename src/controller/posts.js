import {postToFireBase} from '../firestore/firestore.js'

export const publishPost = () => {
    const userInformation = JSON.parse(localStorage.getItem('user'));
    const txtArea = document.querySelector('#txtarea');
    const postInfo = {
      name: userInformation.name,
      photo: userInformation.photoURL,
      post: txtArea.value,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      likes: [],
    };
    postToFireBase(postInfo);
    txtArea.value = "" ;
  };

  