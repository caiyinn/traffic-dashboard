import Form from "./Form";
import {useState} from 'react';
import map from '../assets/map.jpg'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import Map from "./Map";
import  {geoLocation}  from "../globalVars";

const Dashboard = () => {

    const [expressway, setExpressway] = useState("Ayer Rajah Expressway")
    const [expresswayPoints, setExpresswayPoints] = useState(geoLocation[expressway])

    const handleSubmit = (e) => {
        console.log(e.target.innerText)
        setExpressway(e.target.innerText)
        setExpresswayPoints(geoLocation[e.target.innerText])
    }

    return ( 
        <div style={{margin:'auto', width: "90%"}}>
            <Form handleSubmit={handleSubmit}/>
            <div className="content" style={{paddingTop:"20px"}}>
                <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap:"15px"}}>
                <Card style={{marginBottom:"20px", borderRadius:'10px', border: "1px solid #dbdbdb", boxShadow:"none"}}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {expressway}
                        </Typography>
                        <Typography variant="body2" component="p">
                            1.5km
                        </Typography>
                    </CardContent>
                </Card>

                <Card style={{marginBottom:"20px", borderRadius:'10px', border: "1px solid #dbdbdb", boxShadow:"none"}}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {expressway}
                        </Typography>
                        <Typography variant="body2" component="p">
                            1.5km
                        </Typography>
                    </CardContent>
                </Card>

                <Card style={{marginBottom:"20px", borderRadius:'10px', border: "1px solid #dbdbdb", boxShadow:"none"}}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {expressway}
                        </Typography>
                        <Typography variant="body2" component="p">
                            1.5km
                        </Typography>
                    </CardContent>
                </Card>
                </div>
                <Map expresswayPoints={expresswayPoints}/>
            </div>
        </div>
     );
}
 
export default Dashboard;
