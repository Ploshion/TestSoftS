/* El código anterior es un componente de React que permite al usuario editar la información de un
cliente. Utiliza componentes Material-UI para las entradas y el estilo del formulario, y axios para
realizar solicitudes HTTP para actualizar la información del cliente en el backend. El componente
obtiene la información del cliente por ID usando el gancho `useParams` y la acción `fetchClientById`
de la tienda Redux. El usuario puede editar el nombre del cliente, número de identificación, correo
electrónico, fecha de nacimiento y fecha de creación. El formulario valida que todos los campos
obligatorios se completen antes de enviar la solicitud de actualización. Si la actualización es
exitosa */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Grid, Typography, useTheme, Container } from '@mui/material';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import {makeStyles,} from "@material-ui/core"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientById, updateClientById } from '../../store/slices/client';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useStyles = makeStyles((theme) => ({
    root: {
      background: `linear-gradient(to bottom, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 30%, ${theme.palette.background.default} 30%)`,
      minHeight: '100vh',
      padding: theme.spacing(2),
    },
    card: {
      width: '100%',
      margin: '0 auto',
      background: theme.palette.background.paper,
    },
    avatar: {
      marginRight: theme.spacing(2),
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
    },
    listItemText: {
      flexGrow: 1,
    },
    datesContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 'auto',
      alignItems: 'flex-start',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: theme.spacing(2),
      gap: '0.5em'
    },
    cancelButton: {
      marginRight: theme.spacing(2),
      color: 'white',
      backgroundColor: 'red',
      '&:hover': {
        backgroundColor: 'darkred',
      },
    },
  }));


export const EditClient = () => {

const MySwal = withReactContent(Swal)

const navigate = useNavigate();
const theme = useTheme();
const classes = useStyles();
const { id } = useParams();
const [client, setClient] = useState([])

  const [requiredFields, setRequiredFields] = useState({
    fullName: true,
    numeroId: true,
    email: true,
    fechaNacimiento: true,
    fechaCreacion: true,
  });
  const [formError, setFormError] = useState(false);

  const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchClientById(id));
      setClient(listById)
    }, [dispatch])

    const { listById } = useSelector(state => state.client);
      
    useEffect(() => {
      setClient(listById)
    }, [listById])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const errorAlert = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se creo el cliente, vuelva a intentar',
    })
  }
  

  const clientEditAlertok = () => {
    MySwal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'El Cliente ' + client.fullName +' ha sido Editado',
    showConfirmButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      navigate('/client/list')
    }
  })
}

  const clientEditAlert = () => {
    MySwal.fire({
      title: 'Estas seguro?',
      text: "Esta accion no se podra revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Editar!'
    }).then((result) => {
      if (result.isConfirmed) {
        
      dispatch(updateClientById(id, client))
      .then((result) => {
        console.log(result); // { result: 'ok' }
        // Manejar el resultado exitoso aquí
        clientEditAlertok()
      })
      .catch((error) => {
        console.error(error); // { error: ... }
        // Manejar el error aquí
        errorAlert();
      });
      }
    })
  }

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const filledFields = Object.entries(client).filter(([key, value]) => {
      console.log(value);
      if (requiredFields[key]) {
        return typeof value === 'string' && value.trim() === '';
      }
      return false;
    });
    if (filledFields.length > 0) {
      setFormError(true);
    } else {
      setFormError(false);

      clientEditAlert();
  
    }
  };

  const calculateCompletionPercentage = () => {
    const filledFields = Object.values(client).filter((value) => value !== '');
    const percentage = (filledFields.length / Object.keys(client).length) * 100;
    return percentage || 0;
  };

  const animProps = useSpring({
    width: `${calculateCompletionPercentage()}%`,
    config: { duration: 500 },
  });

  const handleBack = () => {
    navigate('/client/list')
  }     


  return (
    <div className={classes.root}>
      <Container>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', color: 'white' }}>
          <Typography variant="h5" align="center" gutterBottom>
            Editando al cliente: {client.fullName}
          </Typography>
        </div>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {client.fullName ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      label="Nombre completo"
                      name="fullName"
                      value={client.fullName}
                      onChange={handleChange}
                      required={requiredFields.fullName}
                      error={requiredFields.fullName && !client.fullName}
                      helperText={requiredFields.fullName && !client.fullName ? 'Campo obligatorio' : ''}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      label="Número de documento"
                      name="numeroId"
                      value={client.numeroId}
                      onChange={handleChange}
                      required={requiredFields.numeroId}
                      error={requiredFields.numeroId && !client.numeroId}
                      helperText={requiredFields.numeroId && !client.numeroId ? 'Campo obligatorio' : ''}
                      fullWidth
                      size="small"
                      inputProps={{
                        type: 'number',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      label="Email"
                      name="email"
                      value={client.email || ''}
                      onChange={handleChange}
                      required={requiredFields.email}
                      error={requiredFields.email && !client.email}
                      helperText={requiredFields.email && !client.email ? 'Campo obligatorio' : ''}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      label="Fecha de nacimiento"
                      type="date"
                      name="fechaNacimiento"
                      value={client.fechaNacimiento.split('T')[0]}
                      onChange={handleChange}
                      required={requiredFields.birthDate}
                      error={requiredFields.birthDate && !client.fechaNacimiento}
                      helperText={requiredFields.birthDate && !client.fechaNacimiento ? 'Campo obligatorio' : ''}
                      fullWidth
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      label="Fecha de creación"
                      type="date"
                      name="fechaCreacion"
                      value={client.fechaCreacion.split('T')[0]}
                      onChange={handleChange}
                      required={requiredFields.creationDate}
                      error={requiredFields.creationDate && !client.fechaCreacion}
                      helperText={requiredFields.creationDate && !client.fechaCreacion ? 'Campo obligatorio' : ''}
                      fullWidth
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  {formError && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="error">
                        Por favor, complete todos los campos obligatorios.
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <div className={classes.buttonContainer}>
                      <Button
                        variant="contained"
                        className={classes.cancelButton}
                        size="small"
                        color="error"
                        onClick={handleBack}
                      >
                        Cancelar
                      </Button>
                      <Button variant="contained" type="submit" size="small">
                        Guardar
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              ) : null}
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};