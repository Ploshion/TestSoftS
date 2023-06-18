/* El código anterior es un componente de React que muestra una lista de clientes. Obtiene la lista de
clientes de la tienda Redux usando el gancho `useSelector` y filtra la lista en función de una
consulta de búsqueda ingresada por el usuario. El componente también permite al usuario agregar un
nuevo cliente, editar un cliente existente y eliminar un cliente. La operación de eliminación se
confirma con una alerta emergente utilizando la biblioteca `sweetalert2`. El componente utiliza
Material-UI para el estilo y el diseño receptivo. */
import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllClient, deleteClientById } from '../../store/slices/client';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
    Button,
    Avatar,
    Container,
    ListItemSecondaryAction,
    Grid,
    useMediaQuery,
    useTheme
  } from '@mui/material';
  import { AddCircleOutline, Edit, Delete } from '@mui/icons-material';
  import {makeStyles,} from "@material-ui/core"

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
  }));
  
  const generateRandomAvatarUrl = () => {
    const randomNum = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/seed/${randomNum}/40/40`;
  };
  
  export const ListClient = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const MySwal = withReactContent(Swal)
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchAllClient());
     
    }, [dispatch])

    const { list } = useSelector(state => state.client);

    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const filteredClients = list.filter((client) => {
     // console.log(client)
      const clientName = client.fullName.toLowerCase();
      const clientCreationDate = client.fechaCreacion.toLowerCase();
      const query = searchQuery.toLowerCase();
  
      return clientName.includes(query) || clientCreationDate.includes(query);
    });


    const clientDeleteAlertok = (client) => {
      MySwal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'El Cliente ' + client.fullName +' ha sido Eliminado',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/client/list')
      }
    })
  }

  
    const clientDeleteAlert = (client) => {
      MySwal.fire({
        title: 'Estas seguro?',
        text: "Esta accion no se podra revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          
          dispatch(deleteClientById(client.id))
          .then((result) => {
            console.log(result); // { result: 'ok' }
            // Manejar el resultado exitoso aquí
            clientDeleteAlertok(client)
          })
          .catch((error) => {
            console.error(error); // { error: ... }
            // Manejar el error aquí
          });
        }
      })
    }


      const handleAddClient = () => {
        navigate('/client/create');
      };

    
      const handleDeleteClient = (client) => {
      
        clientDeleteAlert(client)
        // Lógica para manejar el evento de agregar cliente
      };

      

      return (
        <div className={classes.root}>
          <Container>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={12} md={10}>
                <Card className={classes.card}>
                  <CardHeader
                    title="Lista de Clientes"
                    action={
                      <Button
                        variant="contained"
                        endIcon={<AddCircleOutline />}
                        onClick={handleAddClient}
                      >
                        Nuevo
                      </Button>
                    }
                  />
                  <CardContent>
                    <TextField
                      label="Buscar por nombre o fecha de creación"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      fullWidth
                      margin="normal"
                    />
                    {filteredClients.length > 0 ? (
                      <List>
                        {filteredClients.map((client) => (
                          <ListItem key={client.id}>
                            {!isMobile && (
                              <Avatar
                                className={classes.avatar}
                                alt={client.fullName}
                                src={generateRandomAvatarUrl()}
                              />
                            )}
                            <div className={classes.listItemText}>
                              <ListItemText
                                primary={client.fullName}
                                secondary={client.email}
                              />
                              <div className={classes.datesContainer}>
                                <Typography variant="caption">
                                  Fecha de nacimiento: {client.fechaNacimiento}
                                </Typography>
                                <Typography variant="caption">
                                  Fecha de creación: {client.fechaCreacion}
                                </Typography>
                              </div>
                            </div>
                            <ListItemSecondaryAction>
                              <Link to={`/client/edit/${client.id}`}>
                                <IconButton
                                  color="primary"
                                >
                                  <Edit />
                                </IconButton>
                              </Link>
                              <IconButton
                                color="error"
                                onClick={() => handleDeleteClient(client)}
                              >
                                <Delete />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No se encontraron clientes.
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      );
    };