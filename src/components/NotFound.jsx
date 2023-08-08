import error from "../assets/error.png";
import { Button } from "@mui/material";
import Dashboard from "./Dashboard";
const NotFound = () => {
    return ( 
        <div className="not-found" style={{ display:"flex", justifyContent:"center", flexDirection:"column", alignItems: "center"}}>
            <img src={error} style={{maxWidth:"60%"}} />
            <h2>Oops! Page not Found! 😥</h2>
            <p style={{fontSize:"20px", textAlign:"center", lineHeight:"1.75"}}>We're sorry, but the page you are looking for doesn't exist.
                <br/>
                Please check the URL or click the button below to go back to the dashboard.
            </p>
            <Button variant="contained" style={{margin:"20px auto"}} href="/dashboard">Redirect</Button>

        </div>

     );
}
 
export default NotFound;