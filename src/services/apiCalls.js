import axios from "axios";

// const API_URL = "https://rickandmortyapi.com/api"
const API_URL = "http://localhost:3000/api/";
// const API_URL = "https://fsdonline2312tes.vercel.app/"

export const registerNewUserCall = async (credentials) => {
  return await axios.post(`${API_URL}users/create`, credentials);
};

export const loginCall = async (credentials) => {
  console.log(credentials)
  const res = await axios.post(`${API_URL}auth/login`, credentials);
  console.log(res)
  return res
};

export const bringProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const res = await axios.get(`${API_URL}users/profile/`, config)

  return res.data
}

export const updateProfile = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const res = await axios.put(`${API_URL}users/profile/update`, data, config)
  console.log(res, "yo soy updateProfile")
  return res
}

export const bringAllCharacters = async () => {
  const res = await axios.get(`${API_URL}artists` /*headers*/);
  return res.data.results;
};

export const bringCharacterById = async (id) => {
  // puedo preparar la información para enviar al servidor
  const res = await axios.get(`${API_URL}artists/${id}`);

  return res.data;
};

// .get("url", {headers})
// .post("url", {body}, {headers})
// .put("url", {body}, {headers})
// .delete("url", {headers})