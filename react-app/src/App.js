import './App.css';
import EventCalendar from './component/EventCalendar';
import React from 'react';
import SideBar from './component/SideBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConsultasCalendar from './component/Consultas/Consultas';
import DropdownMenu from './component/Consultas/Dropdown';
import DropdownMenuRecurso from './component/Consultas/DropdownRecurso';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing/>}/>
        <Route path="/administrar" element={<Home/>} />
        <Route path="/horarios" element={<Consultas/>} />
      </Routes>
    </Router>
  );
}

const Landing = () => {

  return (
    <>
    <div><p> Bienvenido </p></div>
    </>
  )
}

const Home = () => {
  return (
    <>
      <SideBar />
      <EventCalendar />
    </>
  )
}

const Consultas = () => {

  return (
    <>
    <div style={{ float: "left", width: "20%" }}>
        <DropdownMenuRecurso />
      </div>
      <div style={{ float: "right", width: "80%" }}>
        <ConsultasCalendar />
      </div>
    </>
  )
}

export default App;
