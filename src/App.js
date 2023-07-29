import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { vehicleURL } from './globalVars';

function App() {

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "POST",
        url: `${vehicleURL}`,
        params: {
            api_key: `${process.env.REACT_APP_ROBOFLOW_API_KEY}`,
            image: "https://images.data.gov.sg/api/traffic-images/2023/07/bafc86e1-821d-4f3b-9366-42e1510f7a2f.jpg"
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

    </div>
  );
}

export default App;
