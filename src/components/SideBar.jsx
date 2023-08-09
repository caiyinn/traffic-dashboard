import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import UploadIcon from '@mui/icons-material/Upload';
import MonitorIcon from '@mui/icons-material/Monitor';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import travel from '../assets/travel.png';
import NavigationRoute from "./NavigationRoute";
import { Link } from "react-router-dom"
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getDTNow } from "../globalFunctions/utils";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const SideBar = () => {
    const location = useLocation();
    const [menuCollapse, setMenuCollapse] = useState(false)
    const iconColor = {
        color: "#696969"
    }
    const handleMenuCollapse = () => {
        setMenuCollapse(!menuCollapse)
    }
    const isActive = (path) => {
        if (path === location.pathname) {
            return true;
        }
        return false;
    }
    const dt = getDTNow();

    return (
        <div style={{display: 'grid', gridTemplateColumns: 'auto 1fr'}}>
            <Sidebar collapsed={menuCollapse} style={{backgroundColor:"white", height:'100vh', boxShadow:"none"}}>
                <Menu style={{marginTop:"20px", fontSize:"14px"}}>
                    <MenuRoundedIcon 
                    className="toggle-menu"
                    onClick={handleMenuCollapse} 
                    style={{marginLeft:"25px", marginBottom:"10px", color:"#696969"}}/>
                    <img src={travel} id="appIcon"/>
                    <MenuItem className="dashboard"
                        icon={<MonitorIcon style={iconColor}/>} 
                        component={<Link to="/"/>}
                        style = {{backgroundColor: isActive("/") ? "#f0f0f0" : "transparent"}}
                        >Dashboard
                    </MenuItem>
                    <MenuItem 
                        icon={<EqualizerIcon style={iconColor}/>}
                        component={<Link to="overview"/>}
                        style = {{backgroundColor: isActive("/overview") ? "#f0f0f0" : "transparent"}}
                        >Overview
                    </MenuItem>
                    <MenuItem 
                        icon={<UploadIcon style={iconColor}/>}
                        component={<Link to="upload-image"/>}
                        style = {{backgroundColor: isActive("/upload-image") ? "#f0f0f0" : "transparent"}}
                        >Upload Image
                    </MenuItem>
                </Menu>
                {menuCollapse ? null :
                <div className="footer" style={{position:"absolute",display:"flex", bottom:"0", width:"100%", fontSize:"14px", color:"#696969"}}>
                    <div style={{display: "flex"}}>
                        <CalendarMonthIcon style={{fontSize:"16px", marginLeft:"10px", marginTop:"15px"}}/>
                        <p style={{marginLeft:"10px", marginBottom:"10px"}}>
                                {dt.date}
                        </p>
                    </div>
                    <div style={{display: "flex"}}>
                        <AccessTimeIcon style={{fontSize:"16px", marginLeft:"50px", marginTop:"15px"}}/>
                        <p style={{marginLeft:"10px", marginBottom:"10px"}}>
                            {dt.hour + ":" + dt.minute}
                        </p>
                    </div>
                </div>
                }

            </Sidebar>
            <NavigationRoute />
        </div>
    );
}
 
export default SideBar;
