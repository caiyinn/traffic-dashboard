import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './components/SideBar';
import { vehicleURL } from './globalVars';

function App() {
  return (
    <div className="App">
      <SideBar />
    </div>
  );
}

export default App;
