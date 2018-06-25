import { Main } from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'home', name: 'Main', component: Main },
  ],
};
