import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import ListaProdutos from './pages/ListaProdutos'
import NavBar from './components/navBar';
import InserirProduto from './pages/InserirProduto';
import EditarProduto from './pages/EditarProduto';

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/produtos' element={<ListaProdutos />} />
        <Route path='/inserir-produto' element={<InserirProduto />} />
        <Route path='/editar-produto/:id' element={<EditarProduto />} />
      </Routes>
    </>
  )
}
 
export default App
