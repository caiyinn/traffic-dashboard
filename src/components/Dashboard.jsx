import Form from "./Form";
import {useState} from 'react';
import map from '../assets/map.jpg'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import Map from "./Map";
import  {geoLocation, vehicleURL}  from "../globalVars";
import { getDTNow } from "../globalFunctions/utils";
import axios from 'axios';
import { useEffect } from "react";
import CardInfo from "./CardInfo";
import { getAreaCoveragePercentage } from '../globalFunctions/utils';

const Dashboard = () => {
    const [expressway, setExpressway] = useState("Ayer Rajah Expressway")
    const [expresswayPoints, setExpresswayPoints] = useState(geoLocation[expressway])
    const [trafficData, setTrafficData] = useState([])
    const [result, setResult] = useState([])
    const [congestion, setCongestion] = useState(0)
    const [cardDetails, setCardDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const [imageInfo, setImageInfo] = useState({})
    const [time, setTime] = useState("")
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
    useEffect(() => {
        console.log(result);
        console.log(congestion);
    }, [result])

    useEffect(() => {
        fetchTrafficCongestion();
    }, [trafficData])

    useEffect(() => {
        fetchTrafficData();
    }, [expressway]);

    return ( 
        <div style={{margin:'auto', width: "90%"}}>
            <Form handleSubmit={handleSubmit}/>
            <div className="content" style={{paddingTop:"20px"}}>
                <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap:"15px"}}>

                    <CardInfo expressway={expressway}/>
                    <CardInfo/>
                    <CardInfo/>
                </div>
                {loading ? <h1>Loading...</h1> : <Map expresswayPoints={expresswayPoints} trafficData={trafficData} result={result} imageInfo={imageInfo} dt={time} crowd={crowd}/> }
            </div>
        </div>
     );
}
 
export default Dashboard;
