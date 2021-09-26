import loginPage from '../pages/login.js';
import signUpPage from '../pages/signup.js';
import newsPage from '../pages/news.js';

import { onLoadLogin, onLoadSignUp, onLoadNews } from '../functions/pages.js';

const root = document.querySelector('#root');
//  empty div news

// reemplaza el #
const changeRoute = (hash) => {
  const route = hash.replace('#', '');
  window.history.replaceState({ route }, route, `/${route}`);
  //  modifies the current history entry instead of creating a new one.
  // Mainly used when we want to update URL of the current history entry.
};

export const routes = {
  login: () => {
    changeRoute('#login');
    root.innerHTML = loginPage;
    onLoadLogin();
  },
  signup: () => {
    changeRoute('#signup');
    root.innerHTML = signUpPage;
    onLoadSignUp();
  },
  news: () => {
    changeRoute('#news');
    root.innerHTML = newsPage;
    onLoadNews();
  },
};

window.addEventListener('popstate', () => {
  //  only triggered by clicking on the back button/when user navigates between two history entries
  const pathName = window.location.pathname;
  const pathNameNoSlash = pathName.replace('/', '');
  routes[pathNameNoSlash]();
});
