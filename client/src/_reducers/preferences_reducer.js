import {
    THEME_DATA,

} from '../_actions/types';


export default function (state = { darkThemeEnabled: false }, action) {
    switch (action.type) {
        case THEME_DATA:
            return { ...state, darkThemeEnabled: !state.darkThemeEnabled }

        default:
            return state;
    }
}