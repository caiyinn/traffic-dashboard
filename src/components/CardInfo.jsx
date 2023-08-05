import {Card, CardContent, Typography} from '@mui/material'

const CardInfo = (props) => {
    return ( 
        <Card style={{marginBottom:"20px", borderRadius:'10px', border: "1px solid #dbdbdb", boxShadow:"none"}}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.expressway}
                </Typography>
                <Typography variant="body2" component="p">
                    1.5km
                </Typography>
            </CardContent>
        </Card>
     );
}
 
export default CardInfo;