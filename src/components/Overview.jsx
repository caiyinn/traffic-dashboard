import { Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useState, useEffect} from 'react';
import { lengthOfRoad, geoLocation, vehicleURL } from "../globalVars";
import { getDTNow } from "../globalFunctions/utils";
import axios from "axios";
import { getAreaCoveragePercentage } from '../globalFunctions/utils';

function createData(name, mileage, trafficLevel, status) {
  return { name, mileage, trafficLevel, status };
}

const Overview = () => {
    const [trafficData, setTrafficData] = useState({
        "Ayer Rajah Expressway": [],
        "Bukit Timah Expressway": [],
        "Central Expressway": [],
        "East Coast Parkway": [],
        "Kallang-Paya Lebar Expressway": [],
        "Kranji Expressway": [],
        "Marina Coastal Expressway": [],
        "Pan-Island Expressway": [],
        "Seletar Expressway": [],
        "Tampines Expressway": [],
        "Tuas Checkpoint": [],
        "Woodlands Checkpoint": [],
    });
    const [areaCoverage, setAreaCoverage] = useState({
        "Ayer Rajah Expressway": 0,
        "Bukit Timah Expressway": 0,
        "Central Expressway": 0,
        "East Coast Parkway": 0,
        "Kallang-Paya Lebar Expressway": 0,
        "Kranji Expressway": 0,
        "Marina Coastal Expressway": 0,
        "Pan-Island Expressway": 0,
        "Seletar Expressway": 0,
        "Tampines Expressway": 0,
        "Tuas Checkpoint": 0,
        "Woodlands Checkpoint": 0,
    });
    const [status, setStatus] = useState({
        "Ayer Rajah Expressway": "Low",
        "Bukit Timah Expressway": "Low",
        "Central Expressway": "Low",
        "East Coast Parkway": "Low",
        "Kallang-Paya Lebar Expressway": "Low",
        "Kranji Expressway": "Low",
        "Marina Coastal Expressway": "Low",
        "Pan-Island Expressway": "Low",
        "Seletar Expressway": "Low",
        "Tampines Expressway": "Low",
        "Tuas Checkpoint": "Low",
        "Woodlands Checkpoint": "Low",
    });
    const road = Object.keys(lengthOfRoad);
    const rows = road.map((r, idx) => {
        return createData(r, lengthOfRoad[r].toFixed(1), areaCoverage[r].toFixed(2), status[r]);
    })

    const fetchTrafficData = async () => {
        let temp = {
            "Ayer Rajah Expressway": [],
            "Bukit Timah Expressway": [],
            "Central Expressway": [],
            "East Coast Parkway": [],
            "Kallang-Paya Lebar Expressway": [],
            "Kranji Expressway": [],
            "Marina Coastal Expressway": [],
            "Pan-Island Expressway": [],
            "Seletar Expressway": [],
            "Tampines Expressway": [],
            "Tuas Checkpoint": [],
            "Woodlands Checkpoint": [],
        }
        const dt = getDTNow();
        if (dt.date && dt.hour && dt.minute && dt.second) {
            await axios({
                method: "GET",
                url: "https://api.data.gov.sg/v1/transport/traffic-images",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                params: {
                    date_time: dt.date + "T" + dt.hour + ":" + dt.minute + ":" + dt.second
                }
            })
            .then(function(response) {
                // get keys of geoLocation object which gives array of keys
                Object.keys(temp).forEach((key, idx) => {
                    // loop through each location in the array
                    geoLocation[key].forEach((loc, idx) => {
                        // loop through response data to find the camera with the same latitude and longitude and store the image url respectively
                        response.data.items[0].cameras.forEach((camera, idx) => {
                            if (camera.location.latitude === loc.location.latitude && camera.location.longitude === loc.location.longitude) {
                                temp[key].push(camera.image);
                            }
                        })
                    })
                })
                setTrafficData(temp);
                console.log(temp);
            })
            .catch(function(error) {
                console.log(error)
            })
        }
    }
    const fetchTrafficCongestion = async () => {
        // let totalPercent = 0;
        let tempPercent = {
            "Ayer Rajah Expressway": 0,
            "Bukit Timah Expressway": 0,
            "Central Expressway": 0,
            "East Coast Parkway": 0,
            "Kallang-Paya Lebar Expressway": 0,
            "Kranji Expressway": 0,
            "Marina Coastal Expressway": 0,
            "Pan-Island Expressway": 0,
            "Seletar Expressway": 0,
            "Tampines Expressway": 0,
            "Tuas Checkpoint": 0,
            "Woodlands Checkpoint": 0,
        }

        let tempStatus = {
            "Ayer Rajah Expressway": "Low",
            "Bukit Timah Expressway": "Low",
            "Central Expressway": "Low",
            "East Coast Parkway": "Low",
            "Kallang-Paya Lebar Expressway": "Low",
            "Kranji Expressway": "Low",
            "Marina Coastal Expressway": "Low",
            "Pan-Island Expressway": "Low",
            "Seletar Expressway": "Low",
            "Tampines Expressway": "Low",
            "Tuas Checkpoint": "Low",
            "Woodlands Checkpoint": "Low",
        }

        // create an array to store all promises
        let promises = [];
        Object.keys(trafficData).forEach((key, idx) => {
            let totalPercent = 0;
            let count = 0;
            trafficData[key].forEach((url, idx) => {
                promises.push(
                    axios({
                        method: "POST",
                        url: vehicleURL,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        params: {
                            api_key: `${process.env.REACT_APP_ROBOFLOW_API_KEY}`,
                            image: `${url}`
                        }
                    })
                    .then(function(response) {
                        if (response.data.predictions.length > 0){
                            let percent = getAreaCoveragePercentage(response.data);
                            totalPercent += percent;
                            count++;
                            tempPercent[key] = totalPercent/count;
                            if (tempPercent[key]<20){
                                tempStatus[key] = "Low";
                            }
                            else if (tempPercent[key] > 20 && tempPercent[key] < 40){
                                tempStatus[key] = "Medium";
                            }
                            else {
                                tempStatus[key] = "High";
                            }
                        }

                    })
                    .catch(function(error) {
                        console.log(error)
                    })
                )
            })
        })
        // Wait for all promises to resolve, forEach by nature does not wait for async functions to finish before moving on
        await Promise.all(promises);
        setAreaCoverage(tempPercent);
        setStatus(tempStatus);
        console.log(tempStatus);
        console.log(tempPercent);
        // count === 0 ? setCongestion(0) : setCongestion(totalPercent/count);
    }

    useEffect(() => {
        fetchTrafficCongestion();
    }, [trafficData])



    useEffect(() => {
        fetchTrafficData();
    }, [])
    
      
      const header = {
          fontSize:"30px",
          color:"grey",
          padding:"30px",
        //   backgroundColor:"#F5F5F5"
      }

      const content = {
            fontSize:"20px",
            color:"black",
            padding:"20px 30px"

      }

      const statusLow ={
            fontSize:"20px",
            color:"green",
            backgroundColor:'rgba(75, 192, 192, 0.2)',
            borderRadius:"40px",
            height:"50%",
            padding:"10px 30px"
      }

        const statusMedium ={
            fontSize:"20px",
            color:"orange",
            backgroundColor:'rgba(255, 159, 64, 0.2)',
            borderRadius:"40px",
            height:"50%",
            padding:"10px 30px"
        }

        const statusHigh ={
            fontSize:"20px",
            color:"red",
            backgroundColor:'rgba(255, 99, 132, 0.2)',
            borderRadius:"40px",
            height:"50%",
            padding:"10px 30px"
        }

    return ( 
        <div style={{height:"100%", width: "100%"}}>
            <TableContainer component={Paper} style={{width:"90%", margin:"40px auto", borderRadius:"10px"}}>
                <Table sx={{width:"100%", margin:"auto"}} aria-label="simple table">
                    <TableHead style={{ backgroundColor: "#edf8ff", width:"100%" }} >
                        <TableRow>
                            <TableCell style={header}>Expressway</TableCell>
                            <TableCell style={header} align="right">Mileage (km)</TableCell>
                            <TableCell style={header} align="right">Traffic Level</TableCell>
                            <TableCell style={header} align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell style={content} component="th" scope="row">{row.name}</TableCell>
                            <TableCell style={content} align="right">{row.mileage}</TableCell>
                            <TableCell style={content} align="right">{row.trafficLevel}</TableCell>
                            <TableCell align="right">
                               {
                                      row.status === "Low" ? <span style={statusLow}>{row.status}</span> : row.status === "Medium" ? <span style={statusMedium}>{row.status}</span> : <span style={statusHigh}>{row.status}</span>
                               }
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
     );
}
 
export default Overview;
