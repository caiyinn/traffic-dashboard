import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import UploadIcon from '@mui/icons-material/Upload';
import MonitorIcon from '@mui/icons-material/Monitor';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import travel from '../assets/travel.png';

const SideBar = () => {

    const iconColor = {
        color: "#696969"
    }

    return (
        <div style={{ display: "flex", height: "100vh"} }>
          <Sidebar className="app" style={{backgroundColor:"#F3F6FA"}}>
            <Menu style={{marginTop:"20px"}}>
                <MenuItem className="menu1" icon={<MenuRoundedIcon />}/>
                <img src={travel} id="appIcon"/>
                <h2>Traffic</h2>
                <MenuItem icon={<MonitorIcon style={iconColor}/>}>Dashboard</MenuItem>
                <MenuItem icon={<EqualizerIcon style={iconColor}/>}>Overview</MenuItem>
                <MenuItem icon={<UploadIcon style={iconColor}/>}>Upload Image</MenuItem>
            </Menu>
          </Sidebar>
        </div>
      );
}
 
export default SideBar;