import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PopUp from './PopUp';

const Map = (props) => {
  // map the expressway points to get the name, latitude and longitude of the points
  const pos = props.expresswayPoints.map((point, idx) => {
    if (props.trafficData[idx] && props.trafficData[idx][0]) {
        return (
          <PopUp 
            image={props.trafficData[idx][0].image}
            latitude={point.location.latitude} 
            longitude={point.location.longitude} 
            expresswayName = {point.expresswayName}
            key={idx}
            dt = {props.dt}
          />
        );
    }
  });

  const singaporeCenter = [1.3521, 103.8198];
  return (
    <MapContainer center={singaporeCenter} zoom={12} style={{ height: "60vh", width:"60%", borderRadius:"20px", border:"2px solid #dbdbdb"}}>
      {/* set the center adn display the map of singapore */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* display all pops up available in the expressway selected */}
      {pos}
    </MapContainer>
  );
};

export default Map;
