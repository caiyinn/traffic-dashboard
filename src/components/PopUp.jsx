import { Marker, Popup } from "react-leaflet";
import point from '../assets/point.png'
import Leaflet from 'leaflet';
import {Card, CardContent, CardMedia, Typography} from '@mui/material'

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
                {/* A pretty CSS3 popup.<br />Easily customizable. */}
                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", width:"200px"}}>
                    <img src={"https://sm.mashable.com/t/mashable_sea/image/p/philippine/philippines-tries-to-solve-its-crippling-traffic-jams-with-l_a26x.2496.jpg"} style={{  width: "100%", margin:"auto"}} />
                </div>
            </Popup>
        </Marker>
     );
}
 
export default PopUp;