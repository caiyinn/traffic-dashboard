import error from "../assets/error.png";
import { Button, Typography } from "@mui/material";
import Dashboard from "./Dashboard";
const NotFound = () => {
    return ( 
        <div className="not-found" style={{ display:"flex", justifyContent:"center", flexDirection:"column", alignItems: "center"}}>
            <img src={error} style={{maxWidth:"60%"}} />
            <Typography variant="h6" style={{ fontWeight:"bold", fontSize:"24px", margin:" 0px auto", marginTop:"-50px"}}>
                Oops! Page not Found! 😥
            </Typography>
            <Typography variant="h6" style={{color:"grey", textAlign:"center", fontSize:"18px", margin:" 10px auto"}}>
                We're sorry, but the page you are looking for doesn't exist.
                <br/>
                Please check the URL or click the button below to go back to the dashboard.
            </Typography>
            <Button variant="contained" style={{margin:"10px auto", backgroundColor:"#0f8bf7"}} href="/">Redirect</Button>

        </div>

     );
}
 
export default NotFound;