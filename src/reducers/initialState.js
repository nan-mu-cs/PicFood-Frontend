/**
 * Created by kai on 28/02/2018.
 */
export default {
  currentTab: "timeline",
  tabs: [
    {id: "timeline", icon: "home", url: "/timeline"},
    {id: "search", icon: "search", url: "/search"},
    {id: "users", icon: "person", url: "/users"}
  ],
  timelines: [],
  user: {},
  userTimeline: [],
  restaurant: {},
  searchedRestaurants: [],
  searchedDishes: [],
  login: {
    username: "",
    password: "",
    isLogin: false,
    token: ""
  },
  followers: [],
  followings: [],
  users: [],
  dish: {
    id: 1,
    name: 'Spicy Chicken',
    restaurantId: 2,
    restaurant: 'Great Wall',
    rate: 4.5,
    photos: [
      {
        imgId: 1,
        imgUrl: "http://via.placeholder.com/100x100",
      },
      {
        imgId: 2,
        imgUrl: "http://via.placeholder.com/100x100",
      },
      {
        imgId: 3,
        imgUrl: "http://via.placeholder.com/100x100",
      },
      {
        imgId: 4,
        imgUrl: "http://via.placeholder.com/100x100",
      },
      {
        imgId: 5,
        imgUrl: "http://via.placeholder.com/100x100",
      },
    ]
  },
  token: "",
  location: {lat: 1, lon: 1},
  postsOfDish: [
    // {
    //     postId: "11",
    //     creatorId: "111",
    //     creator: "Xiaoxin",
    //     creatorAvatar: "222",
    //     content: "",
    //     imageUrl: "http://via.placeholder.com/100x100",
    //     dishId: 5,
    //     restaurantName: "KFC",
    //     dishName: "Burger",
    //     upvoteCount: 120,
    //     time: "2018-03-21 22:58:43",
    // },
    // {
    //     postId: "22",
    //     creatorId: "222",
    //     creator: "Xiaoxin123",
    //     creatorAvatar: "333",
    //     content: "",
    //     imageUrl: "http://via.placeholder.com/100x100",
    //     dishId: 6,
    //     restaurantName: "KFC",
    //     dishName: "Burger",
    //     upvoteCount: 560,
    //     time: "2018-02-24 05:15:26",
    // },
  ],
  dishID: 5,
  post: {},
  sort_criteria: {distance: "key3", sort_by: "key1"},
  cachedRestaurants: {},
  //upvoteCount: 0,
};