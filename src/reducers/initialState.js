/**
 * Created by kai on 28/02/2018.
 */
export default {
  currentTab: "timeline",
  tabs: [
    {id: "timeline", icon: "home", name: "Timeline", url: "/timeline"},
    {id: "search", icon: "search", name: "Search", url: "/search"},
    {id: "users", icon: "person", name: "Profile", url: "/users"}
  ],
  timelines: [],
  user: {},
  userTimeline: [],
  otherUserTimeline: [],
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
  post: {},
  sort_criteria: {distance: "10000", sort_by: "rate"},
  cachedRestaurants: {},
};