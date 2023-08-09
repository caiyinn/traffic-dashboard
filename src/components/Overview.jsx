import { Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
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

    const [details, setDetails] = useState({
        "Ayer Rajah Expressway": {
            percent: 0,
            status: "Low",
        },
        "Bukit Timah Expressway": {
            percent: 0,
            status: "Low",
        },
        "Central Expressway": {
            percent: 0,
            status: "Low",
        },
        "East Coast Parkway": {
            percent: 0,
            status: "Low",
        },
        "Kallang-Paya Lebar Expressway": {
            percent: 0,
            status: "Low",
        },
        "Kranji Expressway": {
            percent: 0,
            status: "Low",
        },
        "Marina Coastal Expressway": {
            percent: 0,
            status: "Low",
        },
        "Pan-Island Expressway": {
            percent: 0,
            status: "Low",
        },
        "Seletar Expressway": {
            percent: 0,
            status: "Low",
        },
        "Tampines Expressway": {
            percent: 0,
            status: "Low",
        },
        "Tuas Checkpoint": {
            percent: 0,
            status: "Low",
        },
        "Woodlands Checkpoint": {
            percent: 0,
            status: "Low",
        },
    })

    const [loading, setLoading] = useState(true);

    // key names of object
    const road = Object.keys(lengthOfRoad);
    const rows = road.map((r, idx) => {
        return createData(r, lengthOfRoad[r].toFixed(1), details[r].percent.toFixed(2), details[r].status);
    })

    // get traffic data from gov data
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

    // computer vision api call
    const fetchTrafficCongestion = async () => {
        let tempDetails = {
            "Ayer Rajah Expressway": {
                percent: 0,
                status: "Low",
            },
            "Bukit Timah Expressway": {
                percent: 0,
                status: "Low",
            },
            "Central Expressway": {
                percent: 0,
                status: "Low",
            },
            "East Coast Parkway": {
                percent: 0,
                status: "Low",
            },
            "Kallang-Paya Lebar Expressway": {
                percent: 0,
                status: "Low",
            },
            "Kranji Expressway": {
                percent: 0,
                status: "Low",
            },
            "Marina Coastal Expressway": {
                percent: 0,
                status: "Low",
            },
            "Pan-Island Expressway": {
                percent: 0,
                status: "Low",
            },
            "Seletar Expressway": {
                percent: 0,
                status: "Low",
            },
            "Tampines Expressway": {
                percent: 0,
                status: "Low",
            },
            "Tuas Checkpoint": {
                percent: 0,
                status: "Low",
            },
            "Woodlands Checkpoint": {
                percent: 0,
                status: "Low",
            },
        }

        // create an array to store all promises
        let promises = [];
        setLoading(true);
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
                            tempDetails[key].percent = totalPercent/count;
                            if (tempDetails[key].percent<20){
                                tempDetails[key].status = "Low";
                            }
                            else if (tempDetails[key].percent > 20 && tempDetails[key].percent < 40){
                                tempDetails[key].status = "Medium";
                            }
                            else {
                                tempDetails[key].status = "High";
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
        setDetails(tempDetails);
        setLoading(false);
        console.log(tempDetails);
    }

    useEffect(() => {
        fetchTrafficCongestion();
    }, [trafficData])

    useEffect(() => {
        fetchTrafficData();
    }, [])
    
    const header = {
        fontSize:"20px",
        color:"grey",
        padding:"15px 50px",
    //   backgroundColor:"#F5F5F5"
    }

    const content = {
        fontSize:"15px",
        color:"black",
        padding:"10px 50px"
    }

    const commonStatusStyle = {
        fontSize: "15px",
        borderRadius: "40px",
        height: "50%",
        padding: "8px 20px",
        marginRight: "20px",
    };
    
    const statusStyles = {
        Low: {
            ...commonStatusStyle,
            color: "green",
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        Medium: {
            ...commonStatusStyle,
            color: "orange",
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
        },
        High: {
            ...commonStatusStyle,
            color: "red",
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
        }
    };
    

    return ( 
        <div style={{height:"100%", width: "100%"}}>
            {loading ?
            <Box sx={{display:'flex', margin:"200px auto", justifyContent:"center"}}>
                <CircularProgress />
            </Box>   :
            <TableContainer component={Paper} style={{width:"90%", margin:"30px auto", borderRadius:"10px"}}>
                <Table sx={{width:"100%", margin:"auto"}} aria-label="simple table">
                    <TableHead style={{ backgroundColor: "#edf8ff", width:"100%" }} >
                        <TableRow>
                            <TableCell style={header}>Expressway</TableCell>
                            <TableCell style={header} align="right">Mileage (km)</TableCell>
                            <TableCell style={header} align="right">Traffic Level (%)</TableCell>
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
                                <span style={statusStyles[row.status]}>{row.status}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            }
        </div>
     );
}
 
export default Overview;
