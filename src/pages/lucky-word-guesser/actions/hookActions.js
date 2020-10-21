import axios from "axios";

export const getSecretWord = async (setSecretWord) => {
  const response = await axios.get("http://localhost:5000/random-word");
  setSecretWord(response.data);
};

export default {
  getSecretWord,
};
