import axios from "axios";

// const API_URL = "https://rickandmortyapi.com/api"
const API_URL = "http://localhost:3000/api/";
// const API_URL = "https://fsdonline2312tes.vercel.app/"

export const registerNewUserCall = async (credentials) => {
  return await axios.post(`${API_URL}users/create`, credentials);
};

export const loginCall = async (credentials) => {
  console.log(credentials, "soy credentials en loginCall")
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
  const res = await axios.get(`${API_URL}users/profile`, config)
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

export const createAppointment = async (data, token) => {
  const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    console.log(token, "token")
    const res = await axios.post(`${API_URL}appointments/create`, data, config)
    console.log(res, "yo soy createAppointment")
    return res
  }

export const bringAllCharacters = async () => {
  const res = await axios.get(`${API_URL}/artists` /*headers*/);
  const [artists,count] = res.data
  return artists;
};

export const bringAllAppointments = async () => {
  const res = await axios.get(`${API_URL}/appointments` /*headers*/);
  const [appointments,count] = res.data
  return appointments;
};

export const bringCharacterById = async (id) => {
  // puedo preparar la información para enviar al servidor
  const res = await axios.get(`${API_URL}artists/${id}`);

  return res.data;
};

export const bringAppointmentsById = async (token) => {
  // puedo preparar la información para enviar al servidor
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const res = await axios.get(`${API_URL}appointments/client/appointments/`, config);

  return res.data;
};

export const bringArtistsAppointmentsById = async (token) => {
  // puedo preparar la información para enviar al servidor
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const res = await axios.get(`${API_URL}appointments/artist/appointments/`, config);

  return res.data;
};

export const bringAllUsersCall = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  }

  return axios.get(`${API_URL}users`, config)

}

export const bringAllAppointmentsCall = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  }

  return axios.get(`${API_URL}appointments`, config)

}

export const deleteUserById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.delete(`${API_URL}users/delete/${id}`, config)
}

export const deleteAppointmentById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.delete(`${API_URL}appointments/${id}`, config)
}

// .get("url", {headers})
// .post("url", {body}, {headers})
// .put("url", {body}, {headers})
// .delete("url", {headers})