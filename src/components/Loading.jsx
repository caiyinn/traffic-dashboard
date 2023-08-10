import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

const Loading = () => {
    return ( 
        <Box sx={{display:'flex', margin:"200px auto", justifyContent:"center", alignItems:"center",flexDirection:"column"}}>
            <CircularProgress />
            <Typography variant="h6" style={{marginTop:"20px"}}>Loading...</Typography>
        </Box>
     );
}
 
export default Loading;