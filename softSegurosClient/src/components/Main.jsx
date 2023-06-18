/**
 * La función principal representa una barra lateral y configura rutas para diferentes páginas
 * relacionadas con el cliente.
 */
import React from 'react'
import { Sidebar } from './layout/sidebar/Sidebar'
import { Routes, Route } from "react-router-dom"
import { ListClient } from './client/ListClient'
import {EditClient} from "./client/EditClient";
import { CreateClient } from './client/CreateClient';


export const Main = () => {
  return (
    <>
    <Sidebar/>
    <Routes>
      <Route path="/" element={ <ListClient/> } />
      <Route path='/client/list' element={ <ListClient/> } />
      <Route path='/client/create' element={ <CreateClient/> } />
      <Route path='/client/edit/:id' element={<EditClient />} />
    </Routes>
    </>
    
  )
}
