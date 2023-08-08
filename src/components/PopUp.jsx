import { Marker, Popup } from "react-leaflet";
import point from '../assets/point.png'
import Leaflet from 'leaflet';
import DrawBbox from './DrawBbox';
import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAreaCoveragePercentage } from '../globalFunctions/utils';
import { PieChart } from '@mui/x-charts/PieChart';

const PopUp = (props) => {
    const [bbox, setBbox] = useState({});
    const [imageInfo, setImageInfo] = useState({});
    const [percent, setPercent] = useState(0);
    const pos = [props.latitude, props.longitude]
    const pin = new Leaflet.Icon({
        iconUrl: point,
        iconAnchor: [5, 30],
        popupAnchor: [10, -30],
        iconSize: [30, 30],
    });

    const fetchPrediction = async () => {
        await axios({
            method: "POST",
            url: "https://detect.roboflow.com/vehicles-q0x2v/1",
            params: {
                api_key: process.env.REACT_APP_ROBOFLOW_API_KEY,
                image: props.image
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(function(response) {
            console.log(response.data)
            const boxInfo = response.data.predictions.map (prediction => {
                return {
                    label: prediction.class,
                    confidence: prediction.confidence,
                    x: prediction.x,
                    y: prediction.y,
                    width: prediction.width,
                    height: prediction.height,
                }
            })
            setBbox(boxInfo);
            setImageInfo(response.data.image);
            // setError(false);
            // setInitial(false);
            // setImageInfo(response.data.image);
            // setBbox(response.data.prediction.bbox);
            response.data.predictions.length>0 ? setPercent(getAreaCoveragePercentage(response.data)) : setPercent(0);
            // setLoading(false);
        })
        .catch(function(error) {
        });
    }

    useEffect(() => {
        fetchPrediction();
    }, [])


    return ( 
        <Marker position={pos} icon={pin} >
            <Popup>
                <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
                    <div style={{ position: "relative", display: "inline-block", marginTop: "20px", width: "100%" }}>
                        <DrawBbox bbox={bbox} imageInfo={imageInfo} />
                        <img src={props.image} style={{  width: "100%", height:"auto"}} />
                    </div>
                    <Typography component="p" style={{fontSize:"15px", textAlign:"justify", lineHeight:"1.25",fontWeight:"800", margin:"15px auto"}}>
                        {props.expresswayName}
                    </Typography>
                    <Typography component="p" style={{fontSize:"15px", textAlign:"left", lineHeight:"1.25"}}>
                        Latitude: {props.latitude} 
                        <br/>
                        Longitude: {props.longitude}
                        <br/>
                        Traffic Flow: {percent < 20 ? "Low" : percent < 40 ? "Medium" : "High"}
                        {` (${percent.toFixed(2)}%)`}
                        <br/>
                        DateTime: {props.dt}
                    </Typography>
                </div>
            </Popup>
        </Marker>
     );
}
 
export default PopUp;