import {Card, CardContent, Typography} from '@mui/material'

const CardInfo = (props) => {
    return ( 
        <Card style={{ marginBottom: "20px", borderRadius: '10px', border: "1px solid #dbdbdb", boxShadow: "none" }}>
            <CardContent style={{ marginLeft: '20px' }}>
            <Typography variant="h6" style={{ color: "#9a9a9a" }}>
                {props.title}
            </Typography>
            <Typography variant="h5" component="h2" style={{ fontSize: "30px" }}>
                {props.image && <img src={props.image} style={{ width: "40px", height: "40px", marginRight: "30px", marginTop: "20px" }} />}
                {props.content}
            </Typography>
            </CardContent>
        </Card>
    );
}
 
export default CardInfo;