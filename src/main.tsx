// main.tsx o index.tsx
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import PrivateRoute from './components/PrivateRoute'
import './index.css'
import Contenido from './components/Contenido'
import Documentos from './components/Documentos'
import TransmisionesEnVivo from './components/TransmisionesEnVivo'
import CarousselAnuncios from './components/CarousselAnuncios'
import Convocatorias from './components/Convocatorias'
import DIF from './components/DIF'
import AddGacetasMunicipales from './components/Documentos/AddGacetasMunicipales'

// Carga diferida de componentes
const Login = lazy(() => import('./pages/login'))
const Dashboard = lazy(() => import('./pages/dashboard'))

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route   index element={ <Contenido/>}/>

         <Route path='documentos' element={<Documentos/>} >
         <Route path='addgacetasmunicipal' element={ <AddGacetasMunicipales/>}/>
         
         </Route>
         
        <Route path='transmisionesenvivo' element={<TransmisionesEnVivo/>}/>
        <Route path='carousselanuncios' element={<CarousselAnuncios/>}/>
        <Route path='convocatorias' element={<Convocatorias/>} />
        <Route path='dif' element={<DIF/>} />

           </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
)
