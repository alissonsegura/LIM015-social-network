import { routes } from './lib/router.js';

// const root = document.querySelector('#root');
const pathName = window.location.pathname;
let pathNameNoSlash = pathName.replace('/', '') || 'login';
pathNameNoSlash = pathNameNoSlash.replace('/LIM015-social-network', '');
export const inicialize = () => {
  routes[`${pathNameNoSlash}`]();
};
inicialize();
