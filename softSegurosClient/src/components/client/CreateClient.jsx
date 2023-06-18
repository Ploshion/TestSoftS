/* El código anterior es un componente de React que genera un formulario para crear un nuevo cliente.
Utiliza componentes Material-UI para los elementos del formulario y SweetAlert2 para alertas de
confirmación y error. También usa Redux para enviar una acción para crear un nuevo cliente y React
Router para navegar a diferentes páginas. El componente maneja la validación y el envío de
formularios, y muestra mensajes de error si no se completan los campos obligatorios. */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content'
import { createClients } from '../../store/slices/client';

import {
    Card, 
    CardContent,
    TextField,
    Button,
    Grid,
    CardHeader,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
    Avatar,
    Container,
    ListItemSecondaryAction,
    useMediaQuery,
    useTheme
  } from '@mui/material';
  import { AddCircleOutline, Edit, Delete } from '@mui/icons-material';
  import {makeStyles,} from "@material-ui/core"

  const useStyles = makeStyles((theme) => ({
    root: {
      background: `linear-gradient(to bottom, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 20%, ${theme.palette.background.default} 20%)`,
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

export const CreateClient = () => {
    const MySwal = withReactContent(Swal)
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;


    const [client, setClient] = useState({
        fullName: '',
        documentNumber: '',
        email: '',
        birthDate: '',
        creationDate: formattedDate,
      });

      
      const [requiredFields, setRequiredFields] = useState({
        fullName: true,
        documentNumber: true,
        email: true,
        birthDate: true       
      });
      const [formError, setFormError] = useState(false);

    const classes = useStyles();
    const theme = useTheme();

    const errorAlert = () => {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se creo el cliente, vuelva a intentar',
      })
    }

    const clientAlertok = (client) => {
      MySwal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'El Cliente ' + client.fullName +' ha sido Creado',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/client/list')
      }
    })
  }
  
    const clientAlert = (client) => {
      MySwal.fire({
        title: 'Estas seguro?',
        text: "Crearas un cliente nuevo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Crear!'
      }).then((result) => {
        if (result.isConfirmed) {
          
        dispatch(createClients(client))
        .then((result) => {
          console.log(result); // { result: 'ok' }
          // Manejar el resultado exitoso aquí
          clientAlertok(client)
        })
        .catch((error) => {
          console.error(error); // { error: ... }
          // Manejar el error aquí
          errorAlert()
        });
        }
      })
    }

    const handleSubmit = (e) => {
     
      
        e.preventDefault();
        const filledFields = Object.entries(client).filter(([key, value]) => {
          if (requiredFields[key]) {
            return value.trim() === '';
          }
          return false;
        });
        if (filledFields.length > 0) {
          setFormError(true);
        } else {
          console.log(formattedDate)
          setFormError(false);
          console.log(client)
          clientAlert(client);
          // Perform submit logic, e.g., update client data
        }
      };  

      const handleChange = (e) => {
        const { name, value } = e.target;
        setClient((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      const handleBack = () => {
        navigate('/client/list')
      }     

      return (
        <div className={classes.root}>
          <Container>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={12} md={10}>
                <Card className={classes.card}>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={8}>
                          <TextField
                            label="Nombre completo"
                            name="fullName"
                            value={client.fullName}
                            onChange={handleChange}
                            required={requiredFields.fullName}
                            error={requiredFields.fullName && client.fullName === ''}
                            helperText={
                              requiredFields.fullName && client.fullName === ''
                                ? 'Campo obligatorio'
                                : ''
                            }
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <TextField
                            label="Número de documento"
                            name="documentNumber"
                            value={client.documentNumber}
                            onChange={handleChange}
                            required={requiredFields.documentNumber}
                            error={requiredFields.documentNumber && client.documentNumber === ''}
                            helperText={
                              requiredFields.documentNumber && client.documentNumber === ''
                                ? 'Campo obligatorio'
                                : ''
                            }
                            fullWidth
                            size="small"
                            inputProps={{
                              type: 'number',
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <TextField
                            label="Fecha de nacimiento"
                            name="birthDate"
                            type="date"
                            value={client.birthDate}
                            onChange={handleChange}
                            required={requiredFields.birthDate}
                            error={requiredFields.birthDate && client.birthDate === ''}
                            helperText={
                              requiredFields.birthDate && client.birthDate === ''
                                ? 'Campo obligatorio'
                                : ''
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={8}>
                          <TextField
                            label="Email"
                            name="email"
                            value={client.email}
                            onChange={handleChange}
                            required={requiredFields.email}
                            error={requiredFields.email && client.email === ''}
                            helperText={
                              requiredFields.email && client.email === '' ? 'Campo obligatorio' : ''
                            }
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        {formError && (
                          <Grid item xs={12}>
                            <Typography variant="body2" color="error">
                              Por favor, complete todos los campos obligatorios.
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
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
                        <Button 
                        variant="contained" 
                        type="submit" 
                        size="small" 
                        >
                          Guardar
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      );
    };