import Form from "./Form";
import {useState} from 'react';
import map from '../assets/map.jpg'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import Map from "./Map";
import  {geoLocation}  from "../globalVars";
import { getDTNow } from "../globalFunctions/utils";
import axios from 'axios';
import { useEffect } from "react";

const Dashboard = () => {
    const [expressway, setExpressway] = useState("Ayer Rajah Expressway")
    const [expresswayPoints, setExpresswayPoints] = useState(geoLocation[expressway])
    const [trafficData, setTrafficData] = useState([])

    const handleSubmit = (e) => {
        console.log(e.target.innerText)
        setExpressway(e.target.innerText)
        setExpresswayPoints(geoLocation[e.target.innerText])
    }

    const fetchTrafficData = async () => {
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
                console.log(response.data.items[0].cameras);
                console.log('Expressway Points:', expresswayPoints[0]);
                let temp = [];
                expresswayPoints.forEach(point => {
                    const data = response.data.items[0].cameras.filter(camera => {
                        if (camera.location.latitude === point.location.latitude && camera.location.longitude === point.location.longitude){
                            return camera;
                        }
                    });
                    console.log(data);
                    temp.push(data);
                });
                setTrafficData(temp);
            })
            .catch(function(error) {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        fetchTrafficData();
    }, [expressway]);

    return ( 
        <div style={{margin:'auto', width: "90%"}}>
            <Form handleSubmit={handleSubmit}/>
            <div className="content" style={{paddingTop:"20px"}}>
                <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap:"15px"}}>
                <Card style={{marginBottom:"20px", borderRadius:'10px', border: "1px solid #dbdbdb", boxShadow:"none"}}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {expressway}
                        </Typography>
                        <Typography variant="body2" component="p">
                            1.5km
                        </Typography>
                    </CardContent>
                </Card>

                <Card style={{marginBottom:"20px", borderRadius:'10px', border: "1px solid #dbdbdb", boxShadow:"none"}}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {expressway}
                        </Typography>
                        <Typography variant="body2" component="p">
                            1.5km
                        </Typography>
                    </CardContent>
                </Card>

                <Card style={{marginBottom:"20px", borderRadius:'10px', border: "1px solid #dbdbdb", boxShadow:"none"}}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {expressway}
                        </Typography>
                        <Typography variant="body2" component="p">
                            1.5km
                        </Typography>
                    </CardContent>
                </Card>
                </div>
                <Map expresswayPoints={expresswayPoints} trafficData={trafficData}/>
            </div>
        </div>
     );
}
 
export default Dashboard;
