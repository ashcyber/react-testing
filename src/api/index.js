import axios from "./axios";

export const createUser = ({ firstName, lastName }) =>
  axios.post("/users", {
    firstName,
    lastName,
  });

export const deleteUser = (userId) => axios.delete(`/users/${userId}`);
export const getUsers = () => axios.get("/users");
