/**
 * Created by kai on 28/02/2018.
 */

import initialState from "./initialState";

export default (state = initialState, action) => {
    switch (action.type){
        case "CHANGE_TAB":
            return {...state,currentTab:action.data};
        default:
            return state
    }
}