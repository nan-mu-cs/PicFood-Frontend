/**
 * Created by kai on 28/02/2018.
 */

import initialState from "./initialState";

export default (state = initialState, action) => {
    switch (action.type){
        case "CHANGE_TAB":
            return {...state,currentTab:action.data};
        case "CHANGE_SORTING_OPTIONS":
            return {...state, searchOptions: action.data};
        case "UPDATE_TOKEN":
            //console.log(action.data);
            return {...state,token:action.data};
        case "GET_LOCATION":
            return {...state,location:action.data};
      case "GET_USER_PROFILE":
            return {...state, user: action.data};
        case "GET_SEARCHED_RESTAURANTS":
            return {...state, searchedRestaurants:action.data};
        case "GET_SEARCHED_DISHES":
            return {...state, searchedDishes:action.data};
        case "GET_POSTS_OF_DISH":
            return {...state, postsOfDish:action.data};
        case "GET_RESTAURANT_INFO":
            state.cachedRestaurants[action.restaurantId] = action.data;
            return state;
        case "GET_POST_INFO":
            return {...state, post:action.data};
        case "GET_FOLLOWERS":
            return {...state, followers: action.data};
        case "GET_FOLLOWINGS":
            return {...state, followings: action.data};
        case "UPDATE_TIMELINE":
            return {...state, timelines: action.data};
        case "SORT_CRITERIA":
            return {...state, sort_criteria: action.data};
        case "UPDATE_USER_PROFILE":
            return {...state,user:action.data};
        case "UPDATE_USER_TIMELINE":
            return {...state,userTimeline:action.data};
        default:
            return state;
    }
}