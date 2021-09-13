import {
  login, googleAuth, facebookAuth, signUp, logOutPage, sendEmailVerification,
} from '../auth.js';
import { getPosts, deletePost, updateEditPost } from '../firestore/firestore.js';
import { publishPost } from '../controller/posts.js';

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
      window.history.replaceState({ route: 'news' }, 'news', '/news');
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
    window.history.replaceState({ route: 'signup' }, 'signup', '/signup');
    window.dispatchEvent(new Event('popstate'));
  });
};
export const onLoadSignUp = () => {
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
  const renderPosts = (info) => `
    <div id="getId-${info.postid}" class="status-main">
      <div class="main">
        <div class="imgandtext">
          <img id="userImagePost" class="userImagePost" src="${info.photo}" alt="user photo" srcset="" />
          <p class="user-name" id="username">${info.name}</p>
        </div>
        <div class="dropdownbox">
          <select  id="dropdown-${info.postid}" class="dropdown" >
            <option value=""></option>
            <option class="btn-edit" value ="Edit">Edit</option>
            <option class="btn-delete" value ="Delete" >Delete</option>
          </select>
        </div>
      </div>
      <div class="container-main">
        <textarea id="textarea-${info.postid}" class="statusbox" type="text" readonly placeholder="">${info.post}</textarea>
        <div class="svgbuttons">
          <img id="likes-${info.postid}" class="svgimg" src="./images/likebutton.svg" alt="image-post" srcset="" />
          <span>${info.likes.length}</span>
          <img class="svgimgs" src="./images/commentbutton.svg" alt="image-post" srcset="" />
          <button id="btnsave-${info.postid}" style="display:none" class="post">Save</button>
        </div>
      </div>
    </div>`;
  const handlePosts = (posts) => {
    const newsContainer = document.querySelector('#news');// empty div for posts
    let contentPost = '';
    posts.forEach((info) => {
      contentPost += renderPosts(info);
    });
    newsContainer.innerHTML = contentPost;
    posts.forEach((info) => {
      const dropDown = newsContainer.querySelector(`#dropdown-${info.postid}`);
      dropDown.addEventListener('change', (e) => {
        if (e.target.value === 'Delete') {
          newsContainer.querySelector(`#getId-${info.postid}`).addEventListener('change', () => deletePost(info.postid));
        }
        if (e.target.value === 'Edit') {
          const textarea = newsContainer.querySelector(`#textarea-${info.postid}`);
          const bttnSave = newsContainer.querySelector(`#btnsave-${info.postid}`);
          textarea.removeAttribute('readonly');
          bttnSave.addEventListener('click', () => updateEditPost(info.postid, textarea.value));
          bttnSave.style.display = 'block';
        }
      });
    });
  };
  getPosts((arrayPosts) => {
    handlePosts(arrayPosts);
  });
};
