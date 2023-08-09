import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import upload from '../assets/upload.png';
import problem from '../assets/problem.png';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {useEffect} from 'react';
import DrawBbox from './DrawBbox';
import { getAreaCoveragePercentage } from '../globalFunctions/utils';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Notification from './Notification';

const UploadImage = () => {
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [percent, setPercent] = useState(0);
    const [loading, setLoading] = useState(false);
    const [initial, setInitial] = useState(true);
    const [error, setError] = useState(false);
    const [bbox, setBbox] = useState({});
    const [imageInfo, setImageInfo] = useState({});
    const [errorCode, setErrorCode] = useState(0);
    const [open, setOpen] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('');

    const handleUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
    
            reader.onloadend = () => {
                // reader.result contains the base64 string
                setImage({
                    dataUrl: reader.result
                });
                setImageLoading(true);
                setInitial(false);

                // fetchData(reader.result.split(',')[1]); // Removing the base64 header
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    
    useEffect(() => {
        if (image!==null) {
            fetchData(image.dataUrl.split(',')[1]);
        }
    }, [image])

    const fetchData = async (base64Image) => {
        setLoading(true);
        await axios({
            method: "POST",
            url: "https://detect.roboflow.com/vehicles-q0x2v/1",
            params: {
                api_key: process.env.REACT_APP_ROBOFLOW_API_KEY,
            },
            data: base64Image,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(function(response) {
            setError(false);
            setImageInfo(response.data.image);
            const boxInfo = response.data.predictions.map (prediction => {
                return {
                    label: prediction.class,
                    confidence: prediction.confidence,
                    x: prediction.x,
                    y: prediction.y,
                    width: prediction.width,
                    height: prediction.height,
                }
            })
            setBbox(boxInfo);
            console.log(response.data)
            boxInfo.length === 0 ? setPercent(0) : setPercent(getAreaCoveragePercentage(response.data));
            setSnackbarMessage("Image uploaded successfully!");
            setOpenSnackbar(true);
            setSnackbarSeverity('success');
            setLoading(false);
            setImageLoading(false);
        })
        .catch(function(error) {
            setErrorCode(error.message);
            setSnackbarMessage(error.message);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            // console.log(error.message);
            setOpen(true);
            setError(true);
            setLoading(false);
        });
    };


    const HandleImageDisplay = () => {
        // if image is uploaded and loading is false
        if (image && !imageLoading) {
            return (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ position: "relative", display: "inline-block", marginTop: "30px", width: "85%" }}>
                        <img src={image.dataUrl} style={{width:"100%", height:"auto"}}/>
                        {/* draw bounding box */}
                        <DrawBbox bbox={bbox} imageInfo={imageInfo} />
                    </div>
                </div>
            )
        }
        // if image is uploaded and loading is true
        else if (image && imageLoading && loading && !error) {
            return (
                <Box sx={{display:'flex', margin:"80px auto"}}>
                    <CircularProgress />
                </Box>
            )
        } 
        // if error in uploading image
        else if (error) {
            return (
                <>
                    <img src={problem} style={{maxWidth:"20%", margin:"80px auto"}} />
                    <Typography variant="h6" style={{color:"red", fontWeight:"normal", fontSize:"25px", margin:" 10px auto"}}>
                        Error in uploading image. Please try again.
                    </Typography>
                </>                
            )
        }
        // if no image is uploaded // initial state
        else {
            return <img src={upload} style={{maxWidth:"20%", display: "flex", margin:"80px auto"}} />
        }
    }

    return ( 
        <div style={{height:"100%", width: "100%"}}>
            <Typography variant="h4" style={{textAlign:"Left", width:"80%", margin:"20px auto", color:"grey", fontSize:"30px"}}> 
                Model Prediction
            </Typography>

            <div className="upload-image-container">
                <HandleImageDisplay />
                <Typography variant="h6" style={{textAlign:"center", marginTop:"20px", color:"grey", fontWeight:"normal"}}>
                    Click on the button below to upload an image!
                    <br/>
                    Supported formats: .jpg, .jpeg, .png
                </Typography>
                <Button
                    style={{width:"20%", margin:"20px auto", borderRadius:"20px"}}
                    variant="outlined"
                    component="label">
                    Upload File
                    <input
                        type="file"
                        hidden
                        onChange={handleUpload}/>
                </Button>
            </div>

            <Notification openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbarMessage={snackbarMessage} snackbarSeverity={snackbarSeverity} vertical="top" horizontal="right" />
            <div className="prediction-container">
                {initial ?
                null : 
                <div className="prediction-content">
                    <Typography variant="h4" style={{textAlign:"Left", color:"grey"}}>
                        Results
                    </Typography>
                    {loading ? 
                    <Typography variant="h6" style={{textAlign:"Left", color:"grey", fontWeight:"normal"}}>Loading...</Typography> : 
                    error ? 
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Collapse in={open}>
                        <Alert severity="error"
                        action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => {
                                setOpen(false);
                              }}
                            >
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                          }
                          sx={{ mb: 2, marginTop:"10px" }}
                            
                        >{errorCode}: Check the file uploaded!</Alert>
                        </Collapse>
                    </Stack> :
                    <Typography variant="h6" style={{textAlign:"Left", color:"grey", fontWeight:"normal"}}>
                        The vehicle takes up {percent.toFixed(2)}% of the image.
                    </Typography>
                    }
                </div>
                }
            </div>
        </div>
    );
}
 
export default UploadImage;
