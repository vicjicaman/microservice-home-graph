import axios from "axios";

const getContentURL = id =>
  `https://s3-us-west-1.amazonaws.com/repoflow.com/static/blog/home/${id}.html`;

export const get = async (id, cxt) => {
  const url = getContentURL(id);
  const { data } = await axios.get(url);
  return data;
};
