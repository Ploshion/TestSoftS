/* Este es un módulo que define un segmento de Redux para administrar los datos del cliente. Utiliza la
función `createSlice` de la biblioteca `@reduxjs/toolkit` para crear un segmento con estado inicial
y reductores para obtener, actualizar, eliminar y crear clientes. También define varios creadores de
acciones asíncronas que utilizan Axios para realizar solicitudes HTTP a una API de back-end para
obtener, actualizar, eliminar y crear clientes. Los creadores de acciones envían los reductores
correspondientes con los datos de respuesta de la API. */
import { createSlice } from "@reduxjs/toolkit";
// axios
import axios from "axios";

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    list: [],
    listById: [],
    updateClient: [],
    deleteClient: [],
    createClient: []
  },
  reducers: {
    getClient: (state, action) => {
      state.list = action.payload;
    },
    getClientById: (state, action) => {
        state.listById = action.payload;
    },
    UpdateClient: (state, action) => {
        state.updateClient = action.payload;
    },
    deleteClient: (state, action) => {
        state.deleteClient = action.payload;
    }
    ,
    createClient: (state, action) => {
        state.createClient = action.payload;
    }
  },
});

const url = 'https://apidnter.azurewebsites.net/'

export const { getClient, getClientById, UpdateClient, deleteClient, createClient } = clientSlice.actions;

export default clientSlice.reducer;

export const fetchAllClient = () => (dispatch) => {
    const token = window.localStorage.getItem('token')

  axios
    .get(url+"client/api/v1/client/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then((response) => {
      console.log(response.data)
      dispatch(getClient(response.data));
    })
    .catch((error) => console.log(error));
};

export const fetchClientById = (id) => (dispatch) => {
    const token = window.localStorage.getItem('token')

  axios
    .get(url+"client/api/v1/client/"+id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then((response) => {
      console.log(response.data)
      dispatch(getClientById(response.data));
    })
    .catch((error) => console.log(error));
};

export const updateClientById = (id, dataClient) => (dispatch) => {
    const token = window.localStorage.getItem('token');
  
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
  
    return new Promise((resolve, reject) => {
      axios
        .put(`${url}client/api/v1/client/${id}/`, {
          fullName: dataClient.fullName,
          email: dataClient.email,
          numeroId: dataClient.numeroId,
          fechaNacimiento: dataClient.fechaNacimiento,
          fechaCreacion: dataClient.fechaCreacion
        }, config)
        .then((response) => {
          console.log(response.data);
          dispatch(UpdateClient(response.data));
          resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
        })
        .catch((error) => {
          console.error(error);
          reject({ error }); // Rechaza la promesa con el error
        });
    });
  };

  export const deleteClientById = (id) => (dispatch) => {
    const token = window.localStorage.getItem('token');
  
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
  
    return new Promise((resolve, reject) => {
      axios
        .delete(`${url}client/api/v1/client/${id}/`, config)
        .then((response) => {
          console.log(response.data);
          dispatch(deleteClient(response.data));
          resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
        })
        .catch((error) => {
          console.error(error);
          reject({ error }); // Rechaza la promesa con el error
        });
    });
  };

  export const createClients = (dataClient) => (dispatch) => {
    const token = window.localStorage.getItem('token');
  
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    console.log(dataClient)
  
    return new Promise((resolve, reject) => {
      axios
        .post(url+"client/api/v1/client/", {
            fullName: dataClient.fullName,
            email: dataClient.email,
            numeroId: dataClient.documentNumber,
            fechaNacimiento: dataClient.birthDate,
            fechaCreacion: dataClient.creationDate
          }, config)
        .then((response) => {
          console.log(response.data);
          dispatch(deleteClient(response.data));
          resolve({ result: 'ok' }); // Resuelve la promesa con el resultado "ok"
        })
        .catch((error) => {
          console.error(error);
          reject({ error }); // Rechaza la promesa con el error
        });
    });
  };



