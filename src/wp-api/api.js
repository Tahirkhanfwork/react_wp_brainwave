import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/wp_brainwave/wp-json/wp/v2'
});

export const getPosts = async (jwt_token) => {
  const response = await api.get('/posts');
  return response.data;
};

export const getAuthor = async (id, jwt_token) => {
  const response = await api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt_token}`
    }
  });
  return response.data;
};

export const getPost = async (id, jwt_token) => {
  const response = await api.get(`/post_by_id/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt_token}`
    }
  });
  return response.data;
};
