/* Este código define un segmento de Redux para manejar la funcionalidad de inicio de sesión en una
aplicación web. Importa `createSlice` de la biblioteca `@reduxjs/toolkit` y `axios` para realizar
solicitudes HTTP. El objeto `loginSlice` define el estado inicial y un reductor `getToken` para
actualizar el estado con el token de autenticación. La función `fetchToken` es un creador de
acciones asincrónicas que envía la acción `getToken` después de realizar una solicitud POST al
servidor con el nombre de usuario y la contraseña proporcionados. */
import { createSlice } from "@reduxjs/toolkit";
// axios
import axios from "axios";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    aut: [],
  },
  reducers: {
    getToken: (state, action) => {
      state.aut = action.payload;
    }
  },
});


export const { getToken } = loginSlice.actions;

export default loginSlice.reducer;

const url = 'https://apidnter.azurewebsites.net/'

export const fetchToken = (username, password) => (dispatch) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    console.log(formData)
  
    axios.post(url+"api/token/", formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        console.log(response.data);
        dispatch(getToken(response.data));
      })
      .catch((error) => console.log(error));
  };
