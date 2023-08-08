import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import search from '../assets/search.png';
import { Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend); // Register ArcElement here

const DoughnutChart = (props) => {
  console.log("data: ",props.vehicle)
  const data = {
    labels: ["car", "bus", "truck", "motorcycle", "bicycle"],

    datasets: [
      {
        label: '# of Vehicles',
        data: [props.vehicle.car, props.vehicle.bus, props.vehicle.truck, props.vehicle.motorcycle, props.vehicle.bicycle],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top', // or 'top', 'bottom', 'left'
        labels: {
          boxWidth: 15,
          padding: 10,
          width: "80%",
        },
      },
    },
  };

  return (
    <>
        {props.congestion === 0 ?
            <div style={{width:"80%", display:"flex", flexDirection:"column", margin:"20px auto"}}>
                <img src={search} style={{maxWidth:"40%", margin:"50px auto"}} />
                <Typography variant="h6" style={{ fontWeight:"normal", fontSize:"25px", margin:" 10px auto"}}>
                    No Vehicle Detected
                </Typography>
            </div>  :
            <Doughnut data={data} options={options} style={{width:"80%", margin: "10px auto"}} />
        }
    </>    
  );
};

export default DoughnutChart;
