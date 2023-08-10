import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InputAdornment from "@mui/material/InputAdornment";
import { road } from '../globalVars';

const Form = (props) => {
    return ( 
        <Autocomplete
                style={{paddingTop:'20px'}}
                disablePortal // disable portal to prevent the dropdown list from being cut off
                id="combo-box-demo"
                options={road} // options is the array of the expressways
                defaultValue={road[0]}
                onChange = {props.handleSubmit}
                renderInput={(params) => 
                <TextField 
                    {...params} 
                    label="Enter Expressway"
                    InputProps={{
                        ...params.InputProps,
                        style: { paddingLeft: "40px", backgroundColor:"white", borderRadius:"10px" },
                        // for the icon in the input field
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon style={{ position: "absolute", left:"15px", top:"15px"}} />
                        </InputAdornment>
                        ),
                    }}
                />}
                renderOption={(props, option) => (
                    <li {...props}>
                        <LocationOnIcon style={{color:"grey", paddingRight: '10px'}}/>
                        {option.label}
                    </li>
                )}
            />
     );
}
 
export default Form;