import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Home'
import Signup from './components/Signup';
import Login from './components/Login';
import Error from './components/Error';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
         <Route path = "/" element = {<Home/>} />
         <Route path = "/signup" element = {<Signup/>} />
         <Route path = "/login" element = {<Login/>} />
         <Route path = "/addContact" element = {<AddContact/>} />
         <Route path = "/editContact/:id" element = {<EditContact/>} />
         <Route path = "*" element = {<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
