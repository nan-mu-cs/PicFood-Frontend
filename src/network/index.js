import {store} from "../../App";
const HOST = 'http://api.pic-food.com';

export default {

  account: {
    login(body) {
      return fetch(`${HOST}/login`, verb('POST', body))
    },

    register(body) {
      return fetch(`${HOST}/register`, verb('post', body));
    },

    getMyProfile() {
      return fetch(HOST + '/api/users/me', verb('get'));
    },

    postUserProfile(body) { // avatar, bio, email, name, password (all optional)
      return fetch(HOST + '/api/users/me', verb('post', body)).then(handleResponse);
    },
    getUserTimeline(userId){
      return fetch(`${HOST}/api/timeline/${userId}`,verb('get'));
    }
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
                'Authorization': store.getState().token
            },
        };
      return fetch(`${HOST}/api/storage/uploadFile`,options);
    }
  },
  post:{
    getPostInfo(id){
      return fetch(`${HOST}/api/post/${id}`,verb('get'));
    }
  },
  social: {
    getTimeline() {
      //console.log(verb('get'));
      return fetch(HOST + '/api/timeline', verb('get'));
    },

    getUserProfile(userId) {
      return fetch(HOST + `/api/users/${userId}`, verb('get'));
    },

    searchUsers(name) {
      let url = HOST + `/api/users/search?name=${name}`;
      console.log('url', url);
      return fetch(url, verb('get')).then(handleResponse);
    },

    getActivitiesOfAnUser(id) { // TODO on backend
      return fetch(HOST + `/api/activities/${id}`, verb('get')).then(handleResponse);
    },

    getPostByPostId(id) {
      return fetch(HOST + `/api/post/${id}`, verb('get')).then(handleResponse);
    },

    deletePost(postId) {
      return fetch(HOST + `/api/delete/post`, verb('post', {postId})).then(handleResponse);
    },

    addPost(body) { // restaurantId, dishName, rate, category, content, imageId (optional)
      return fetch(HOST + `/api/post`, verb('post', body));
    },

    hasUpvoted(postId, userId) {
      return fetch(HOST + `/api/hasUpvoted?UserId=${userId}&PostId=${postId}`, verb('get'));
    },

    upvotePost(postId) {
      return fetch(HOST + `/api/upvote`, verb('post', {postId}));
    },

    deleteUpvoteOfPost(postId) {
      return fetch(HOST + `/api/delete/upvote`, verb('post', {postId}));
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

    getRestaurantsByLocation(lat, lon) {
      return fetch(HOST + `/api/restaurants?lat=${lat}&lon=${lon}`, verb('get')).then(handleResponse);
    },

    searchRestaurants(keyword, sorting, lat, lon) {
      return fetch(HOST + `/api/search/restaurants?keyword=${keyword}&sorting=${sorting}&lat=${lat}&lon=${lon}`, verb('get')).then(handleResponse);
    }
  },

  dish: {
    getDishInfoById(id) {
      return fetch(HOST + `/api/dishes/${id}/info`, verb('get')).then(handleResponse);
    },

    getDishImages(id) {
      return fetch(HOST + `/api/dishes/${id}/images`, verb('get'));
    },

    getPostsOfDish(id) {
      return fetch(HOST + `/api/dishes/${id}/post`, verb('get'));
    },

    postPhoto(body) { // {FormData} file
      return fetch(HOST + `/api/storage/uploadFile`, verb('post', body)).then(handleResponse);
    },

    deletePhoto(fileUrl) {
      return fetch(HOST + `/api/storage/deleteFile`, verb('delete', {fileUrl})).then(handleResponse);
    },

    searchDishes(keyword, sorting, lat, lon) {
      let url = `${HOST}/api/search/dishes?keyword=${keyword}&sorting=${sorting}&lat=${lat}&lon=${lon}`;
      return fetch(url, verb('get')).then(handleResponse);
    }
  },

  comment: {
    getCommentsOfPost(postId) {
      return fetch(HOST + `/api/comments/${postId}`, verb('get')).then(handleResponse);
    },

    postComment(body) {
      return fetch(HOST + '/api/comment', verb('post', body));
    },

    deleteComment(commentId) {
      return fetch(HOST + '/api/delete/comment', verb('post', {commentId})).then(handleResponse);
    }
  }
}


function verb(method, body) {
  // console.log("token"+store.getState().token);
  //   console.log(method);
  let data ={
    method: method,
    headers: {
      'Content-Type':'application/json; charset=UTF-8',
      'Authorization': `${store.getState().token}`
    },
  };
  if(method === "post" || method === "POST"){
      data.body = JSON.stringify(body);
  }
  // console.log(data);
  return data;
}

function handleResponse(res) {
  return res.json();
}
