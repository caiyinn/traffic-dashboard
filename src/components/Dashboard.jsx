import Form from "./Form";
import {useState} from 'react';
import map from '../assets/map.jpg'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import Map from "./Map";
import distance from '../assets/distance.png'
import  {geoLocation, vehicleURL, lengthOfRoad}  from "../globalVars";
import { getDTNow, weatherIconHandler } from "../globalFunctions/utils";
import axios from 'axios';
import { useEffect } from "react";
import CardInfo from "./CardInfo";
import { getAreaCoveragePercentage } from '../globalFunctions/utils';
import {LinearProgress} from '@mui/material'
import sun from '../assets/weather/sun.png'

const Dashboard = () => {
    const [expressway, setExpressway] = useState("Ayer Rajah Expressway")
    const [expresswayPoints, setExpresswayPoints] = useState(geoLocation[expressway])
    const [trafficData, setTrafficData] = useState([])
    const [result, setResult] = useState([])
    const [congestion, setCongestion] = useState(0)
    const [loading, setLoading] = useState(false)
    const [imageInfo, setImageInfo] = useState({})
    const [time, setTime] = useState("")
    const [weather, setWeather] = useState({
        icon: "",
        description: "",
    })

    const handleSubmit = (e) => {
        console.log(e.target.innerText)
        setExpressway(e.target.innerText)
        setExpresswayPoints(geoLocation[e.target.innerText])
    }
    const [crowd, setCrowd] = useState([])

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
        let temp = [];
        let imageInfoTemp = [];
        let totalPercent = 0;
        let count = 0;
        let crowdTemp = [];
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
                        const boxInfo = response.data.predictions.map (prediction => {
                            return {
                                label: prediction.class,
                                confidence: prediction.confidence,
                                x: prediction.x,
                                y: prediction.y,
                                width: prediction.width,
                                height: prediction.height,
                            }
                        });
                        temp.push(boxInfo);
                        imageInfoTemp.push({
                            height: response.data.height,
                            width: response.data.width
                        })
                        response.data.predictions.length>0? crowdTemp.push(response.data.predictions.length): crowdTemp.push(0);
                        if (response.data.predictions.length > 0){
                            totalPercent+=getAreaCoveragePercentage(response.data)
                            count++;
                        }
                    }).catch(function(error) {
                        console.log(error.message);
                    }) 
                );
            });
        });
    
        // Wait for all promises to resolve, forEach by nature does not wait for async functions to finish before moving on
        await Promise.all(promises);
        setLoading(false);
        setResult(temp);
        setCrowd(crowdTemp);
        setImageInfo(imageInfoTemp);
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
            import (`../assets/weather/${tempIcon}`).then(image => {
                setWeather({
                    icon: image.default,
                    description: response.data.weather[0].description,
                });
            });
        })
        .catch(function(error) {
            console.log(error);
        })
    }
    

    useEffect(() => {
        console.log("Traffic Data: ",trafficData)
        console.log(result);
        console.log(congestion);
        console.log(weather)
    }, [result])

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
            <div className="content" style={{paddingTop:"20px"}}>
                <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap:"15px"}}>
                <Card style={{marginBottom:"20px", borderRadius:'10px', border: "1px solid #dbdbdb", boxShadow:"none"}}>
                    <CardContent style={{ marginLeft: '20px' }}>
                        <Typography variant="h6" style={{color:"#9a9a9a"}}>
                            Traffic Congestion
                        </Typography>
                        <Typography variant="h5" component="h2" style={{fontSize:"30px"}}>
                            {/* <img src={distance} style={{width:"40px", height:"40px", marginRight:"30px", marginTop:"20px", }}/> */}
                            <div className="congestion-bar" 
                            style={{ 
                                width: "90%",
                                height: "20px",
                                marginTop: "40px",
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
                        </Typography>
                    </CardContent>
                </Card>
                <Card style={{marginBottom:"20px", borderRadius:'10px', border: "1px solid #dbdbdb", boxShadow:"none"}}>
                    <CardContent style={{ marginLeft: '20px' }}>
                        <Typography variant="h6" style={{color:"#9a9a9a"}}>
                            Mileage
                        </Typography>
                        
                        <Typography variant="h5" component="h2" style={{fontSize:"30px"}}>
                            <img src={distance} style={{width:"40px", height:"40px", marginRight:"30px", marginTop:"20px", }}/>
                            {lengthOfRoad[expressway]}km
                        </Typography>
                    </CardContent>
                </Card>
                <Card style={{marginBottom:"20px", borderRadius:'10px', border: "1px solid #dbdbdb", boxShadow:"none"}}>
                    <CardContent style={{ marginLeft: '20px' }}>
                        <Typography variant="h6" style={{color:"#9a9a9a"}}>
                            Current Weather
                        </Typography>
                        <Typography variant="h5" component="h2" style={{fontSize:"30px"}}>
                            <img src={weather.icon} style={{width:"40px", height:"40px", marginRight:"30px", marginTop:"20px", }}/>
                            {weather.description}
                        </Typography>
                    </CardContent>
                </Card>
                    {/* <CardInfo expressway={expressway}/>
                    <CardInfo/>
                    <CardInfo/> */}
                </div>
                {loading ? <h1>Loading...</h1> : <Map expresswayPoints={expresswayPoints} trafficData={trafficData} dt={time} /> }
            </div>
        </div>
     );
}
 
export default Dashboard;
