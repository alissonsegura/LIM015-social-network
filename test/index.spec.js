/* eslint-disable import/order */
// eslint-disable-next-line import/first
import { login, signUp, logOutPage } from '../src/auth.js';
import * as firebase from '../src/lib/firebase.js';

// localStorage Mock
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

const loginSuccess = {
  user: {
    displayName: 'Alisson',
    email: 'alissonicoleseguratarazona@gmail.com',
    photoURL: null,
  },
};
// ----------------- LOG IN  -----------------------
describe('login', () => {
  it('Should be a function', () => {
    expect(typeof login).toBe('function');
  });
});

describe('login in with credentials', () => {
  const loginInFirebase = jest.spyOn(firebase, 'loginInFirebase');
  loginInFirebase.mockResolvedValue(loginSuccess);
  it('Should be able to login', () => login('alissonicoleseguratarazona@gmail.com', 'Dasdas123456')
    .then((response) => {
      expect(response.user.email).toBe('alissonicoleseguratarazona@gmail.com');
    }));
});
// ----------------- SIGN UP  -----------------------
describe('signUp', () => {
  it('Should be a function', () => {
    expect(typeof signUp).toBe('function');
  });
});

describe('signUp with credentials', () => {
  const signUpFirebase = jest.spyOn(firebase, 'signUpFirebase');
  signUpFirebase.mockResolvedValue(loginSuccess);
  it('Should be able to register with email and password', () => signUp('alissonicoleseguratarazona@gmail.com', 'Dasdas123456')
    .then((response) => {
      expect(response.user.email).toBe('alissonicoleseguratarazona@gmail.com');
    }));
});
// ----------------- LOG OUT  -----------------------
describe('logOutPage', () => {
  it('Should be a function', () => {
    expect(typeof logOutPage).toBe('function');
  });
});

describe('loging out', () => {
  const logOut = jest.spyOn(firebase, 'logOutFirebase');
  logOut.mockResolvedValue('undefined');
  it('Should be able to log out', () => logOutPage());
});
