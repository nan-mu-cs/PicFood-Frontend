import {store} from "../../App";
const HOST = 'http://172.26.62.62:8080';

export default {

  account: {
    login(body) {
      return fetch(`${HOST}/login`, verb('POST', body))
    },

    register(body) {
      return fetch(`${HOST}/register`, verb('post', body));
    },

    getUserAccount() {
      return fetch(HOST + '/api/users/me', verb('get')).then(handleResponse);
    },

    postUserAccount(body) { // avatar, bio, email, name, password (all optional)
      return fetch(HOST + '/api/users/me', verb('post', body)).then(handleResponse);
    },
  },
  storage:{

    uploadFile(uri){
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        let formData = new FormData();
        formData.append('file', {
            uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });
        let options = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        };
      return fetch(`${HOST}/storage/uploadFile`,options);
    }
  },
  social: {
    getTimeline() { // TODO on backend
      return fetch(HOST + '/api/timeline', verb('get')).then(handleResponse);
    },

    getActivitiesOfAnUser(id) { // TODO on backend
      return fetch(HOST + '/api/activities/${id}', verb('get')).then(handleResponse);
    },

    getPostByPostId(id) {
      return fetch(HOST + `/api/post/${id}`, verb('get')).then(handleResponse);
    },

    deletePost(postId) {
      return fetch(HOST + `/delete/post`, verb('post', {postId})).then(handleResponse);
    },

    addPost(body) { // restaurantId, dishName, rate, category, content, imageId (optional)
      return fetch(HOST + `/post`, verb('post', body)).then(handleResponse);
    },

    upvotePost(postId) {
      return fetch(HOST + `/upvote`, verb('post', {postId})).then(handleResponse);
    },

    deleteUpvoteOfPost(postId) {
      return fetch(HOST + `/delete/upvote`, verb('post', {postId})).then(handleResponse);
    },

    getMyFollowers() {
      return fetch(HOST + `/api/followers`, verb('get')).then(handleResponse);
    },

    getMyFollowings() {
      return fetch(HOST + `/api/followings`, verb('get')).then(handleResponse);
    },

    getFollowersById(id) {
      return fetch(HOST + `/api/followers/${id}`, verb('get')).then(handleResponse);
    },

    getFollowingsById(id) {
      return fetch(HOST + `/api/followings/${id}`, verb('get')).then(handleResponse);
    },

    followUserById(id) {
      return fetch(HOST + `/api/follow/?id=${id}`, verb('post', {})).then(handleResponse);
    },

    unfollowUserById(id) {
      return fetch(HOST + `/api/unfollow/?id=${id}`, verb('post', {})).then(handleResponse);
    },
  },

  restaurant: {
    getRestaurantInfoById(id) {
      return fetch(HOST + `/api/restaurants/${id}/info`, verb('get')).then(handleResponse);
    },

    getRestaurantDishesById(id) {
      return fetch(HOST + `/api/restaurants/${id}/dishes`, verb('get')).then(handleResponse);
    },

    getRestaurantsByLocation(location) {
      return fetch(HOST + `/api/restaurants/${location}`, verb('get')).then(handleResponse);
    },

    searchRestaurants(keyword) {
      return fetch(HOST + `/search/restaurants?keyword=${keyword}`, verb('get')).then(handleResponse);
    }

  },

  dish: {
    getDishInfoById(id) {
      return fetch(HOST + `/api/dishes/${id}/info`, verb('get')).then(handleResponse);
    },

    getDishImages(id) {
      return fetch(HOST + `/api/dishes/${id}/images`, verb('get')).then(handleResponse);
    },

    getPostsOfDish(id) {
      return fetch(HOST + `/api/dishes/${id}/post`, verb('get')).then(handleResponse);
    },

    postPhoto(body) { // {FormData} file
      return fetch(HOST + `/storage/uploadFile`, verb('post', body)).then(handleResponse);
    },

    deletePhoto(fileUrl) {
      return fetch(HOST + `/storage/deleteFile`, verb('delete', {fileUrl})).then(handleResponse);
    },

    searchDishes(keyword) {
      return fetch(HOST + `/search/dishes?keyword=${keyword}`, verb('get')).then(handleResponse);
    }
  },

  comment: {
    getCommentsOfPost(postId) {
      return fetch(HOST + `/api/comments/${postId}`, verb('get')).then(handleResponse);
    },

    postComment(postId, content) {
      return fetch(HOST + '/comment', verb('post', {postId, content})).then(handleResponse);
    },

    deleteComment(commentId) {
      return fetch(HOST + '/delete/comment', verb('post', {commentId})).then(handleResponse);
    }
  }
}


function verb(method, body) {
  return {
    method: method,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'x-access-token': store.getState().token
    },
    body: JSON.stringify(body)
  }
}

function handleResponse(res) {
  return res.json();
}
