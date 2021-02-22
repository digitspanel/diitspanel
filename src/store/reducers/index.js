import surveys from './surveys';
import home from './home';
import users from './users'
import inbox from './inbox';
import questions from './questions';
import { combineReducers } from 'redux';
import auth from './auth';
import app from './appReducers';

export default combineReducers({
    app: app,
    auth: auth,
    home: home,
    surveys: surveys,
    users: users,
    inbox: inbox,
    questions: questions, 
});