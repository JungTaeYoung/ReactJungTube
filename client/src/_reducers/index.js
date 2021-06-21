import { combineReducers } from 'redux';
import user from './user_reducer';
import preferences  from './preferences_reducer';

const rootReducer = combineReducers({
    user,
    preferences
});

export default rootReducer;