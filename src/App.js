import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './components/SideBar';
import { vehicleURL } from './globalVars';

function App() {

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "POST",
        url: `${vehicleURL}`,
        params: {
            api_key: `${process.env.REACT_APP_ROBOFLOW_API_KEY}`,
            image: "https://sm.mashable.com/t/mashable_sea/image/p/philippine/philippines-tries-to-solve-its-crippling-traffic-jams-with-l_a26x.2496.jpg"
        }
      })
      .then(function(response) {
          console.log(response.data);
          
      })
      .catch(function(error) {
          console.log(error.message);
      });
        
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <SideBar />
      {/* <NavigationRoute /> */}
    </div>
  );
}

export default App;
