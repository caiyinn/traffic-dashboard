import './App.css';
import { useEffect } from 'react';
import axios from 'axios';


function App() {

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/vehicles-q0x2v/1",
        params: {
            api_key: "qTSxQBkJ4NGImrAEXLTT",
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
