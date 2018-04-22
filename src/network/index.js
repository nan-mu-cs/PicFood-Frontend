import {store} from "../../App";

const HOST = 'https://api.pic-food.com';


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

    postUserProfile(body) { // avatar, bio, email, name, password
      return fetch(HOST + '/api/users/me', verb('post', body));
    },
    getUserTimeline(userId) {
      return fetch(`${HOST}/api/timeline/${userId}`, verb('get'));
    }
  },
  storage: {

    uploadFile(uri) {
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
          'Authorization': TOKEN
        },
      };
      return fetch(`${HOST}/api/storage/uploadFile`, options);
    }
  },
  post: {
    getPostInfo(id) {
      return fetch(`${HOST}/api/post/${id}`, verb('get'));
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
      return fetch(url, verb('get')).then(handleStatusError);
    },

    getActivitiesOfAnUser(id) { // TODO on backend
      return fetch(HOST + `/api/activities/${id}`, verb('get')).then(handleStatusError);
    },

    getPostByPostId(id) {
      return fetch(HOST + `/api/post/${id}`, verb('get')).then(handleStatusError);
    },

    deletePost(postId) {
      return fetch(HOST + `/api/delete/post`, verb('post', {postId}));
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

    deleteUpvoteOfPost(postId, upvoteId) {
      return fetch(HOST + `/api/delete/upvote`, verb('post', {postId, upvoteId}));
    },

    getMyFollowers() {
      return fetch(HOST + `/api/followers`, verb('get')).then(handleStatusError);
    },

    getMyFollowings() {
      return fetch(HOST + `/api/followings`, verb('get')).then(handleStatusError);
    },

    getFollowersById(id) {
      return fetch(HOST + `/api/followers/${id}`, verb('get')).then(handleStatusError);
    },

    getFollowingsById(id) {
      return fetch(HOST + `/api/followings/${id}`, verb('get')).then(handleStatusError);
    },

    followUserById(id) {
      return fetch(HOST + `/api/follow/?id=${id}`, verb('post', {})).then(handleStatusError);
    },

    unfollowUserById(id) {
      return fetch(HOST + `/api/unfollow/?id=${id}`, verb('post', {})).then(handleStatusError);
    },
  },

  restaurant: {
    getRestaurantInfoById(id) {
      return fetch(HOST + `/api/restaurants/${id}/info`, verb('get')).then(handleStatusError);
    },

    getRestaurantDishesById(id) {
      return fetch(HOST + `/api/restaurants/${id}/dishes`, verb('get')).then(handleStatusError);
    },

    getRestaurantsByLocation(lat, lon) {
      return fetch(HOST + `/api/restaurants?lat=${lat}&lon=${lon}`, verb('get')).then(handleStatusError);
    },

    searchRestaurants(keyword, sorting, lat, lon, range) {
      return fetch(HOST + `/api/search/restaurants?keyword=${keyword}&sorting=${sorting}&lat=${lat}&lon=${lon}&range=${range}`, verb('get')).then(handleStatusError);
    }
  },

  dish: {
    getDishInfoById(id) {
      return fetch(HOST + `/api/dishes/${id}/info`, verb('get'));
    },

    getDishImages(id) {
      return fetch(HOST + `/api/dishes/${id}/images`, verb('get'));
    },

    getPostsOfDish(id) {
      return fetch(HOST + `/api/dishes/${id}/post`, verb('get'));
    },

    postPhoto(body) { // {FormData} file
      return fetch(HOST + `/api/storage/uploadFile`, verb('post', body)).then(handleStatusError);
    },

    deletePhoto(fileUrl) {
      return fetch(HOST + `/api/storage/deleteFile`, verb('delete', {fileUrl})).then(handleStatusError);
    },

    searchDishes(keyword, sorting, lat, lon, range) {
      let url = `${HOST}/api/search/dishes?keyword=${keyword}&sorting=${sorting}&lat=${lat}&lon=${lon}&range=${range}`;
      return fetch(url, verb('get')).then(handleStatusError);
    }
  },

  comment: {
    getCommentsOfPost(postId) {
      return fetch(HOST + `/api/comments/${postId}`, verb('get')).then(handleStatusError);
    },

    postComment(body) {
      return fetch(HOST + '/api/comment', verb('post', body));
    },

    deleteComment(commentId) {
      return fetch(HOST + '/api/delete/comment', verb('post', {commentId})).then(handleStatusError);
    }
  }
}

const TOKEN = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MjYzMzc0NjMsInVzZXJJZCI6IjJjOWY5NDVjNjI4OWZlYzQwMTYyOGExMzQ1YzIwMDAyIn0.XzHl57hLJFPwPrdqZeRlYrluAWLolSHzJf8D--i7KTA_WIDXIXzbWZfKMpNg1xd7PSsOiOa_00VViOzJvJ1BiQ`;

function verb(method, body) {
  // console.log("token"+store.getState().token);
  //   console.log(method);
  let data = {
    method: method,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `${store.getState().token}`
    },
  };
  if (method === "post" || method === "POST") {
    data.body = JSON.stringify(body);
  }
  // console.log(data);
  return data;
}

function handleStatusError(res) {
  if(!res.ok)
    throw res;
  return res.json();
}
