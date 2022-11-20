import { API } from "../../../backend";
export const getposts = (limit) => {
  return fetch(`${API}/posts?limit=${limit}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getpost = (postId) => {
  return fetch(`${API}/post/${postId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
