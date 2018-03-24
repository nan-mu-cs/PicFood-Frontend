import {store} from "../../App";
const HOST = 'http://172.26.62.62:8080';

export default {

  account: {
    login(body) {
      return fetch(`${HOST}/login`, verb('POST', body))
    },

    register(body) {
      return fetch(`${HOST}/register`, verb('post', body)).then(handleResponse);
    },

    getUserAccount() {
      return fetch(HOST + '/api/users/me', verb('get')).then(handleResponse);
    },

    postUserAccount(body) {
      return fetch(HOST + '/api/users/me', verb('post', body)).then(handleResponse);
    },
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

    deletePost(id) {
      return fetch(HOST + `/delete/post`, verb('post', {id})).then(handleResponse);
    },

    postPost(body) {
      return fetch(HOST + `/post`, verb('post', body)).then(handleResponse);
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

    postFollow(id) {
      return fetch(HOST + `/api/follow`, verb('post', {id})).then(handleResponse);
    },

    postUnfollow(id) {
      return fetch(HOST + `/api/unfollow`, verb('post', {id})).then(handleResponse);
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

    postPhoto(body) {
      return fetch(HOST + `/storage/uploadFile`, verb('post', body)).then(handleResponse);
    },

    deletePhoto(fileUrl) {
      return fetch(HOST + `/storage/deleteFile`, verb('delete', {fileUrl})).then(handleResponse);
    },
  },

  comment: {
    getCommentById(id) {
      return fetch(HOST + `/api/comments/${id}`, verb('get')).then(handleResponse);
    },

    postComment(body) {
      return fetch(HOST + '/comment', verb('post', body)).then(handleResponse);
    },

    deleteComment(id) {
      return fetch(HOST + '/delete/comment', verb('post', {id})).then(handleResponse);
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
  //console.log(typeof res);
  return res.json();
  // let json = res.json();
  // return res.status < 400 ?
  //   json
  //     :
  //   json.then(json => {
  //     throw json;
  //   });
}
