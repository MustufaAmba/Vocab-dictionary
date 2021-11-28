import axios from "axios";

export const getWords = async () => {
  const data = await axios.get("/home");
  console.log(data.data);
  return data.data;
};

export const addWord = async (value) => {
  const data = await axios.get("/addWord", {
    params: {
      newWord: value,
    },
  });
  return data.data;
};

export const searchWord = async (value) => {
  const data = await axios.get("/searchWord", {
    params: {
      searchValue: value,
    },
  });
  return data.data;
};
