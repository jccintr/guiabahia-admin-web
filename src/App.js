import './App.css';
import MainLayout from './mainLayout/MainLayout';
import PrivateRoutes from './PrivateRoutes';
import { DataProvider } from './context/DataContext';
import {BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Categorias from './pages/categorias/Categorias';
import Cidades from './pages/cidades/Cidades';
import Distritos from './pages/distritos/Distritos';
import Cadastros from './pages/cadastros/Cadastros';
import Parametros from './pages/parametros/Parametros';



function App() {
  return (
    <div className="app">
      <DataProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route element={<PrivateRoutes />} >
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home/>}/>    
                        <Route path="/categorias" element={<Categorias/>}/>    
                        <Route path="/cidades" element={<Cidades/>}/>    
                        <Route path="/distritos" element={<Distritos/>}/>    
                        <Route path="/cadastros" element={<Cadastros/>}/>    
                        <Route path="/parametros" element={<Parametros/>}/>    
                    </Route>
                  </Route>
              </Routes>
          </BrowserRouter>
       </DataProvider>
    </div>
  );
}

export default App;
