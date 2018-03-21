/**
 * Created by kai on 28/02/2018.
 */

import initialState from "./initialState";

export default (state = initialState, action) => {
    switch (action.type){
        case "CHANGE_TAB":
            return {...state,currentTab:action.data};
        case "CHANGE_SEARCH_TYPE":
            return {...state, currentSearchType: action.data};
        case "NAVIGATE_TO_RESTAURANT_PAGE":
            return {...state, restaurantId: action.data};
        case "NAVIGATE_TO_DISH_PAGE":
            return {...state, dishId: action.data};
        case "NAVIGATE_TO_FOLLOWER_LIST_PAGE":
            return {...state, userId: action.data};

        default:
            return state;
    }
}