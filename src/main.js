import { routes } from './lib/router.js';

// const root = document.querySelector('#root');
const pathName = window.location.pathname;
let pathNameNoSlash = pathName.replace('LIM015-social-network/src/', '');
pathNameNoSlash = pathNameNoSlash.replace('/', '') || 'login';
export const inicialize = () => {
  routes[`${pathNameNoSlash}`]();
};
inicialize();
