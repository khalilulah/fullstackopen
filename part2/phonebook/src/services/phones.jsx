import axios from "axios";

const baseUrl = "https://fullstackopen-t3ih.onrender.com/api/persons";

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const deleteNumber = (personId) => {
  const request = axios.delete(`${baseUrl}/${personId}`);
  return request.then((response) => {
    console.log(response);
    return response.data;
  });
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => {
    console.log(response);
    return response.data;
  });
};

export default { create, deleteNumber, update };
