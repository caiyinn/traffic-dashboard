import { Marker, Popup } from "react-leaflet";
import point from '../assets/point.png'
import Leaflet from 'leaflet';
import DrawBbox from './DrawBbox';
import { Typography } from "@mui/material";

const PopUp = (props) => {
    const pos = [props.latitude, props.longitude]
    const pin = new Leaflet.Icon({
        iconUrl: point,
        iconAnchor: [5, 30],
        popupAnchor: [10, -30],
        iconSize: [30, 30],
    });

    return ( 
        <Marker position={pos} icon={pin} >
            <Popup>
                <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
                    <img src={props.image} style={{  width: "100%", margin:"auto"}} />
                    {/* {props.result.length > 0 && <DrawBbox bbox={props.result} imageInfo={props.imageInfo}/>} */}
                    <Typography component="p" style={{fontSize:"15px", textAlign:"justify", lineHeight:"1.25",fontWeight:"800", margin:"15px auto"}}>
                        {props.expresswayName}
                    </Typography>
                    <Typography component="p" style={{fontSize:"15px", textAlign:"left", lineHeight:"1.25"}}>
                        Latitude: {props.latitude} 
                        <br/>
                        Longitude: {props.longitude}
                        <br/>
                        Traffic Flow: {props.crowd < 20 ? "Low" : props.crowd < 40 ? "Medium" : "High"}
                        <br/>
                        DateTime: {props.dt}
                    </Typography>
                </div>
            </Popup>
        </Marker>
     );
}
 
export default PopUp;