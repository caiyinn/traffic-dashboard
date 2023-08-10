import Form from "./Form";
import {useState} from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import Map from "./Map";
import distance from '../assets/distance.png'
import  {geoLocation, vehicleURL, lengthOfRoad}  from "../globalVars";
import { getDTNow, weatherIconHandler, getAreaCoveragePercentage } from "../globalFunctions/utils";
import axios from 'axios';
import { useEffect } from "react";
import DoughnutChart from "./DoughnutChart";
import CardInfo from "./CardInfo";
import Notification from "./Notification";
import Tooltip from "@mui/material/Tooltip";
import Loading from "./Loading";

const Dashboard = () => {
    const [expressway, setExpressway] = useState("Ayer Rajah Expressway")
    const [expresswayPoints, setExpresswayPoints] = useState(geoLocation[expressway])
    const [trafficData, setTrafficData] = useState([])
    const [congestion, setCongestion] = useState(0)
    const [loading, setLoading] = useState(false)
    const [time, setTime] = useState("")
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('');
    const [weather, setWeather] = useState({
        icon: "",
        description: "",
    })
    const [vehicle, setVehicle] = useState({
        car: 0,
        bus: 0,
        truck: 0,
        motorcycle: 0,
        bicycle: 0,
    })

    // handle form submit
    const handleSubmit = (event, value) => {
        if (value && value.label){
            let tempInnerText = value.label.split(" ").map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(" ");
            setExpressway(tempInnerText)
            setExpresswayPoints(geoLocation[tempInnerText])
        }
    }
    // handle close snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    
    // fetch traffic data from data gov
    const fetchTrafficData = async () => {
        const dt = getDTNow();
        setTime(`${dt.date}, ${dt.hour}:${dt.minute}:${dt.second}`);
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
                let temp = [];
                // go through each point in the expressway and find the corresponding camera that matches the point from the response
                expresswayPoints.forEach(point => {
                    const data = response.data.items[0].cameras.filter(camera => {
                        if (camera.location.latitude === point.location.latitude && camera.location.longitude === point.location.longitude){
                            return camera;
                        }
                    });
                    temp.push(data);
                });
                setTrafficData(temp);
            })
            .catch(function(error) {
                console.log(error)
                // set snackbar message
                setOpenSnackbar(true);
                setSnackbarMessage('Error fetching traffic data: ' + error.message);
                setSnackbarSeverity('error');
            })
        }
    }

    // fetch computer vision data from roboflow after traffic data is fetched
    const fetchTrafficCongestion = async () => {
        let totalPercent = 0;
        let count = 0;
        let tempVehicle = {
            car: 0,
            bus: 0,
            truck: 0,
            motorcycle: 0,
            bicycle: 0,
        }
        // create an array to store all promises
        let promises = [];
        setLoading(true);
        trafficData.forEach(data => {
            data.forEach(camera => {
                promises.push(
                    axios({
                        method: "POST",
                        url: `${vehicleURL}`,
                        params: {
                            api_key: `${process.env.REACT_APP_ROBOFLOW_API_KEY}`,
                            image: `${camera.image}`
                        }
                    }).then(response => {
                        // if there is a prediction, add the percentage to total percent and increment count
                        if (response.data.predictions.length > 0){
                            totalPercent+=getAreaCoveragePercentage(response.data)
                            count++;
                        }
                        // if there is a prediction, add the vehicle count to the tempVehicle object
                        response.data.predictions.length>0? 
                            response.data.predictions.forEach(prediction => {
                                console.log("class: ", prediction.class);
                                if (prediction.class.includes("car")){
                                    tempVehicle.car++;
                                }
                                else if (prediction.class.includes("bus")){
                                    tempVehicle.bus++;
                                }
                                else if (prediction.class.includes("truck")){
                                    tempVehicle.truck++;
                                }
                                else if (prediction.class.includes("motorcycle")){
                                    tempVehicle.motorcycle++;
                                }
                                else if (prediction.class.includes("bicycle")){
                                    tempVehicle.bicycle++;
                                }
                            }) : console.log("No vehicles detected");

                    }).catch(function(error) {
                        console.log(error.message);
                        // set snackbar message
                        setOpenSnackbar(true);
                        setSnackbarMessage('Error fetching traffic congestion: ' + error.message);
                        setSnackbarSeverity('error');
                    }) 
                );
            });
        });
    
        // Wait for all promises to resolve, forEach by nature does not wait for async functions to finish before moving on
        await Promise.all(promises);
        setVehicle(tempVehicle);
        count === 0 ? setCongestion(0) : setCongestion(totalPercent/count);
        setLoading(false);
        setSnackbarMessage('Traffic data fetched successfully');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    }


    // fetch weather data from openweather
    const fetchWeatherData = async () => {
        await axios({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=Singapore`,
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                appid: `${process.env.REACT_APP_OPENWEATHER_API_KEY}`
            }
        })
        .then(function(response) {
            // console.log("Weather Data:", response.data.weather[0].description);
            setWeather(response.data.weather[0].description);
            let tempIcon = weatherIconHandler(response.data.weather[0].description);
            let tempDescription = response.data.weather[0].description.split(" ").map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(" ");
            import (`../assets/weather/${tempIcon}`).then(image => {
                setWeather({
                    icon: image.default,
                    description: tempDescription,
                });
            });
        })
        .catch(function(error) {
            console.log(error);
            setOpenSnackbar(true);
            setSnackbarMessage('Error fetching weather data: ' + error.message);
            setSnackbarSeverity('error');
        })
    }

    // everytime the expressway changes, fetch traffic data and weather data, when traffic data is fetched, fetch traffic congestion
    useEffect(() => {
        fetchTrafficCongestion();
    }, [trafficData])

    useEffect(() => {
        fetchTrafficData();
        fetchWeatherData();
    }, [expressway]);

    return ( 
        <div style={{margin:'auto', width: "90%"}}>
            <Form handleSubmit={handleSubmit}/>
            {loading?
            <Loading/>:
            <div className="content" style={{paddingTop:"20px"}}>
                <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap:"15px"}}>
                <CardInfo
                    title="Traffic Congestion"
                    type="congestion"
                    content={
                    <div className="congestion-bar" 
                    style={{ 
                        width: "90%",
                        height: "20px",
                        marginTop: "20px",
                        borderRadius: "10px",
                        backgroundColor: "#e0e0e0",
                        overflow: "hidden",
                    }}>
                        <Tooltip title={`${congestion.toFixed(2)}%`} placement="bottom" arrow>
                            <div className="congestion-progress" style={{
                                width: `${congestion}%`,
                                height: "100%",
                                backgroundColor: "#ff6f00",
                                borderRadius: "10px",
                                transition: "width 1s ease-in-out",
                            }}></div>
                        </Tooltip>
                    </div>
                    }
                />
                <CardInfo
                    title="Distance"
                    type="imageAndText"
                    image={distance}
                    content={`${lengthOfRoad[expressway]}km`}
                />
                <CardInfo
                    title="Current Weather"
                    type="imageAndText"
                    image={weather.icon}
                    content={weather.description}
                />
                </div>
                <div style={{display:"flex"}}>
                    <Map expresswayPoints={expresswayPoints} trafficData={trafficData} dt={time} /> 
                    <Card style={{width:"40%", marginLeft:"20px", borderRadius:'10px', border: "1px solid #dbdbdb", boxShadow:"none",  height:"60vh"}}>
                        <CardContent>
                            <Typography variant="h5" style={{fontSize:"24px", color:"#9a9a9a", marginLeft:"20px", marginTop:"10px",  marginBottom:"30px"}}>
                                Vehicles
                            </Typography>
                            <DoughnutChart style={{margin:"auto"}} vehicle={vehicle} congestion={congestion}/>
                        </CardContent>
                    </Card>
                </div>
                <Notification openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbarMessage={snackbarMessage} snackbarSeverity={snackbarSeverity} vertical="bottom" horizontal="right"/>

            </div>
            }
        </div>
     );
}
 
export default Dashboard;