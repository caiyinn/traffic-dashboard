import Form from "./Form";
import {useState} from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import Map from "./Map";
import distance from '../assets/distance.png'
import  {geoLocation, vehicleURL, lengthOfRoad}  from "../globalVars";
import { getDTNow, weatherIconHandler } from "../globalFunctions/utils";
import axios from 'axios';
import { useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { getAreaCoveragePercentage } from '../globalFunctions/utils';
import DoughnutChart from "./DoughnutChart";
import Box from '@mui/material/Box';
import CardInfo from "./CardInfo";

const Dashboard = () => {
    const [expressway, setExpressway] = useState("Ayer Rajah Expressway")
    const [expresswayPoints, setExpresswayPoints] = useState(geoLocation[expressway])
    const [trafficData, setTrafficData] = useState([])
    const [congestion, setCongestion] = useState(0)
    const [loading, setLoading] = useState(false)
    const [time, setTime] = useState("")
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

    const handleSubmit = (e) => {
        console.log(e.target.innerText)
        setExpressway(e.target.innerText)
        setExpresswayPoints(geoLocation[e.target.innerText])
    }

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
                console.log(response.data.items[0].cameras);
                console.log('Expressway Points:', expresswayPoints[0]);
                let temp = [];
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
            })
        }
    }

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
                        if (response.data.predictions.length > 0){
                            totalPercent+=getAreaCoveragePercentage(response.data)
                            count++;
                        }
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
                    }) 
                );
            });
        });
    
        // Wait for all promises to resolve, forEach by nature does not wait for async functions to finish before moving on
        await Promise.all(promises);
        setVehicle(tempVehicle);
        setLoading(false);
        count === 0 ? setCongestion(0) : setCongestion(totalPercent/count);
    }

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
            console.log("Weather Data:", response.data.weather[0].description);
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
        })
    }

    useEffect(() => {
        console.log(trafficData);
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
            <Box sx={{display:'flex', margin:"200px auto", justifyContent:"center"}}>
                <CircularProgress />
            </Box>:
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
                        <div className="congestion-progress" style={{
                            width: `${congestion}%`,
                            height: "100%",
                            backgroundColor: "#ff6f00",
                            borderRadius: "10px",
                            transition: "width 1s ease-in-out",
                        }}></div>
                    </div>
                    }
                />
                <CardInfo
                    title="Mileage"
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
                    <Card style={{width:"40%", marginLeft:"20px", borderRadius:'10px', border: "1px solid #dbdbdb", boxShadow:"none",  height:"50vh"}}>
                        <CardContent>
                            <Typography variant="h5" style={{fontSize:"18px", color:"#9a9a9a", marginLeft:"20px", marginTop:"10px",  marginBottom:"15px"}}>
                                Vehicles
                            </Typography>
                            <DoughnutChart style={{margin:"auto"}} vehicle={vehicle} congestion={congestion}/>
                        </CardContent>
                    </Card>
                </div>
            </div>
            }
        </div>
     );
}
 
export default Dashboard;