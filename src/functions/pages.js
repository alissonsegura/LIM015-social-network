import {
  login, googleAuth, facebookAuth, signUp, logOutPage, sendEmailVerification,
} from '../auth.js';

import { postToFireBase, getPosts } from '../firestore/firestore.js';

export const onLoadLogin = () => {
  // const loginForm = document.querySelector('#login');
  const email = document.querySelector('#loginemail');
  const password = document.querySelector('#loginpassword');
  const googleIcon = document.querySelector('#googlesvg');
  const facebookIcon = document.querySelector('#fbsvg');
  const buttonLogin = document.querySelector('#button-login');
  const signup = document.querySelector('#signup');
  const errorMessage = document.querySelector('#error');

  // function for Login Authentication
  buttonLogin.addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const emailValue = email.value;
      const passwordValue = password.value;
      await login(emailValue, passwordValue);
      window.history.replaceState({ route: 'news' }, 'news', '/news');//
      window.dispatchEvent(new Event('popstate'));
    } catch (error) {
      errorMessage.innerHTML = error.message;
    }
  });

  // function for Google Authentication
  googleIcon.addEventListener('click', async () => {
    try {
      await googleAuth();
      window.history.replaceState({ route: 'news' }, 'news', '/news');
      window.dispatchEvent(new Event('popstate'));
    } catch (error) {
      errorMessage.innerHTML = error.message;
    }
  });
  // function for FB Authentication
  facebookIcon.addEventListener('click', async () => {
    try {
      await facebookAuth();
      window.history.replaceState({ route: 'news' }, 'news', '/news');
      window.dispatchEvent(new Event('popstate'));
    } catch (error) {
      errorMessage.innerHTML = error.message;
    }
  });

  signup.addEventListener('click', () => {
    window.history.replaceState({ route: 'signup' }, 'signup', '/signup');//
    window.dispatchEvent(new Event('popstate'));
  });
};

export const onLoadSignUp = () => {
  // const signupform = document.querySelector('#signupform');
  const email = document.querySelector('#signupemail');
  const password = document.querySelector('#signuppassword');
  const signUpButton = document.querySelector('#signupbutton');
  const emailMessage = document.querySelector('#emailmessage');
  const errorMsj = document.querySelector('#errormsj');

  // function for SignUp
  signUpButton.addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      const emailValue = email.value;
      const passwordValue = password.value;
      await signUp(emailValue, passwordValue);
      emailMessage.innerHTML = 'We have send you an email, please verify it';
      await sendEmailVerification();
      window.history.replaceState({ route: 'news' }, 'news', '/news');
      window.dispatchEvent(new Event('popstate'));

      // signupform.reset();
    } catch (error) {
      errorMsj.innerHTML = error.message;
    }
  });
};

export const onLoadNews = () => {
  const profile = document.querySelector('#profile');
  const logOut = document.querySelector('#logout');
  const userImage = document.querySelector('#userImage');
  const userName = document.querySelector('#user-name');
  const textPost = document.querySelector('.status');
  const publishButton = document.querySelector('.post');
  const newsContainer = document.querySelector('.newscontainer');
  const userInformation = JSON.parse(localStorage.getItem('user'));
  userImage.setAttribute('src', userInformation.photoURL || './images/default-profile.svg');

  userName.innerHTML = userInformation.name;
  // if (userInformation.photoURL) {
  //   userInformation.setAttribute('src' ,userInformation.photoURL )
  // } else {
  //   userInformation.setAttribute('src' , './images/default-profile.svg')
  // }
  logOut.addEventListener('click', async () => {
    await logOutPage();
    window.history.replaceState({ route: 'login' }, 'login', '/login');//
    window.dispatchEvent(new Event('popstate'));
  });

  profile.addEventListener('click', () => {
    console.log('I am Your Profile');
  });

    const publishPost = () => {
    const getValue = textPost.value;
    const postInfo = {
      name: userInformation.name,
      photo: userInformation.photoURL,
      post: getValue,
      date: new Date().toLocaleString(),
      likes: [],
    };
  
    postToFireBase(postInfo);
    textPost.value = "";
 
  };
  //const posts = await getPosts();

  publishButton.addEventListener('click', publishPost);



  // posts = await getPosts()

  getPosts((arrayPosts) => {

  
     renderPosts(arrayPosts)
  })
};


// getPosts((arrayPosts) => {
//   const wallContainer = document.createElement('div');
//   const contentPostInWall = `<div id="post-list"></div>`;

//   wallContainer.innerHTML = contentPostInWall;
//   const postList = wallContainer.querySelector('#post-list');

//    renderPosts(arrayPosts)
// })


export const renderPosts = (posts) => {
  const newsContainer = document.querySelector('#news')
  posts.forEach((info) => {
   return newsContainer.innerHTML += `
    <div data-id = "${info.id}" class="status-main">
      <div class="main">
        <div class="imgandtext">
          <img id="userImagePost" class="userImagePost" src="${info.photo}" alt="user photo" srcset="" />
          <p class="user-name" id="username">${info.name}</p>
        </div>
      <div class="dropdownbox">
      <select>
        <option class="btn-edit"  value = "Edit"> Edit</option>
        <option class="btn-delete" value = "Delete">Delete</option>
      </select>
      </div>
    </div>

    <div class="container-main">
      <textarea class="statusbox" type="text" placeholder="${info.post}"></textarea>

      <div class="svgbuttons">
        <img class="svgimg" src="./images/likebutton.svg" alt="image-post" srcset="" />
        <img class="svgimgs" src="./images/commentbutton.svg" alt="image-post" srcset="" />
      </div>
    </div>`
  })
}
