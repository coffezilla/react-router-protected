import { createStore } from 'redux';
import User from './ducks/User';

const store = createStore(User);
export default store;
