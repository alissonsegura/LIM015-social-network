import {
  login, googleAuth, facebookAuth, signUp, logOutPage, sendEmailVerification,
} from '../auth.js';

import { getPosts, deletePosts } from '../firestore/firestore.js';
import {publishPost} from '../controller/posts.js'
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

  // text area mobile / desktop
  const txtAreaMobile = document.querySelector('#txtareamobile');
  const btnPostMob = document.querySelector('#btnpostmob');
  const userInformation = JSON.parse(localStorage.getItem('user'));
  userImage.setAttribute('src', userInformation.photoURL || './images/default-profile.svg');

  userName.innerHTML = userInformation.name;

  logOut.addEventListener('click', async () => {
    await logOutPage();
    window.history.replaceState({ route: 'login' }, 'login', '/login');
    window.dispatchEvent(new Event('popstate'));
  });

  profile.addEventListener('click', () => {
    console.log('I am Your Profile');
  });

  
  btnPostMob.addEventListener('click', publishPost);

  const renderPosts = (info) => {
    return `
    <div id="getId-${info.id}" class="status-main">
      <div class="main">
        <div class="imgandtext">
          <img id="userImagePost" class="userImagePost" src="${info.photo}" alt="user photo" srcset="" />
          <p class="user-name" id="username">${info.name}</p>
        </div>
        <div class="dropdownbox">
          <select class="dropdown" >
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
      </div>
    </div>`   
  }

   const handlePosts = (posts) => {
    const newsContainer = document.querySelector('#news')
    let contentPost = '';
    posts.forEach((info) => {
      contentPost += renderPosts(info)
    })
    newsContainer.innerHTML = contentPost;

    posts.forEach((info) => {
      newsContainer.querySelector(`#getId-${info.id}`).addEventListener('click', () => deletePosts(info.id))
      
    })

  }

  getPosts((arrayPosts) => {
    handlePosts(arrayPosts)
  })


};




//diferenciar que post va a editar segun el Id

