import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import path from '../assets/path.png';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React from 'react';
import InputAdornment from "@mui/material/InputAdornment";

const road = [
    { label: 'Ayer Rajah Expressway'},
    { label: 'Bukit Timah Expressway'},
    { label: 'Central Expressway'},
    { label: 'East Coast Parkway'},
    { label: 'Kallang-Paya Lebar Expressway'},
    { label: 'Kranji Expressway'},
    { label: 'Marina Coastal Expressway'},
    { label: 'Pan Island Expressway'},
    { label: 'Seletar Expressway'},
    { label: 'Tampines Expressway'},
    { label: 'Tuas Checkpoint'},
    { label: 'Woodlands Checkpoint'},
];

const Dashboard = () => {
    return ( 
        <div style={{margin:'auto', width: "90%"}}>
        <Autocomplete
            style={{paddingTop:'20px'}}
            disablePortal
            id="combo-box-demo"
            options={road}
            onChange = {() => console.log("clicked")}
            renderInput={(params) => 
            <TextField 
                {...params} 
                label="Enter Expressway"
            />}
            renderOption={(props, option) => (
                <li {...props}>
                    <LocationOnIcon style={{color:"grey", paddingRight: '10px'}}/>
                    {option.label}
                </li>
            )}
            />
        </div>
     );
}
 
export default Dashboard;
