import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import UploadIcon from '@mui/icons-material/Upload';
import MonitorIcon from '@mui/icons-material/Monitor';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import travel from '../assets/travel.png';
import NavigationRoute from "./NavigationRoute";
import { Link } from "react-router-dom"
import { useState } from "react";

const SideBar = () => {
    const [menuCollapse, setMenuCollapse] = useState(false)
    const iconColor = {
        color: "#696969"
    }
    const handleMenuCollapse = () => {
        setMenuCollapse(!menuCollapse)
    }

    return (
        <div style={{ display: "flex", height: "100vh"} }>
            <Sidebar collapsed ={menuCollapse} className="app" style={{backgroundColor:"#F3F6FA"}}>
                <Menu style={{marginTop:"20px"}}>
                    <MenuItem className="menu1" icon={<MenuRoundedIcon />} onClick={handleMenuCollapse}/>
                    <img src={travel} id="appIcon"/>
                    {/* <h2>Traffic</h2> */}
                    <MenuItem 
                        icon={<MonitorIcon style={iconColor}/>} 
                        component={<Link to="dashboard"/>}>Dashboard
                    </MenuItem>
                    <MenuItem 
                        icon={<EqualizerIcon style={iconColor}/>}
                        component={<Link to="overview"/>}>Overview
                    </MenuItem>
                    <MenuItem 
                        icon={<UploadIcon style={iconColor}/>}
                        component={<Link to="upload-image"/>}>Upload Image
                    </MenuItem>
                </Menu>
            </Sidebar>
            <NavigationRoute />
        </div>
      );
}
 
export default SideBar;