import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import upload from '../assets/upload.png';
import problem from '../assets/problem.png';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const UploadImage = () => {
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [percent, setPercent] = useState(0);
    const [loading, setLoading] = useState(false);
    const [initial, setInitial] = useState(true);
    const [error, setError] = useState(false);
    const [prediction, setPrediction] = useState(null);

    const handleUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
    
            reader.onloadend = () => {
                // reader.result contains the base64 string
                setImage({
                    dataUrl: reader.result
                });
                setImageLoading(true);
                fetchData(reader.result.split(',')[1]); // Removing the base64 header
            };
    
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const fetchData = async (base64Image) => {
        const storeLength = {
            minX: 0,
            minY: 0,
            maxX: 0,
            maxY: 0,
        }
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
            setInitial(false);
            console.log(response.data.predictions[0]);
            storeLength.minX = Math.min(...response.data.predictions.map(prediction => prediction.x));
            storeLength.minY = Math.min(...response.data.predictions.map(prediction => prediction.y));
            storeLength.maxX = Math.max(...response.data.predictions.map(prediction => prediction.x));
            storeLength.maxY = Math.max(...response.data.predictions.map(prediction => prediction.y));
            console.log(storeLength);
            const displayInfo = response.data.predictions.map (prediction => {
                return {
                    label: prediction.class,
                    confidence: prediction.confidence,
                }
            })
            const vehicleArea = (storeLength.maxX - storeLength.minX) * (storeLength.maxY - storeLength.minY);
            const imageArea = response.data.image.width * response.data.image.height;
            const vehiclePercentage = (vehicleArea / imageArea) * 100;
            setPercent(vehiclePercentage);
            setLoading(false);
            setImageLoading(false);
        })
        .catch(function(error) {
            console.log(error.message);
            setError(true);
        });
    };


    const HandleImageDisplay = () => {
        if (image && !imageLoading) {
            return <img src={image.dataUrl} style={{marginTop:"40px", width:"85%", height:"75%",  margin:"auto"}} />
        } 
        else if (image && imageLoading && loading && !error) {
            return (
                <Box sx={{display:'flex', margin:"auto"}}>
                    <CircularProgress />
                </Box>
            )
        } 
        else if (image && imageLoading && !loading && !error) {
            return <div style={{marginTop:"40px", width:"85%", height:"75%",  margin:"auto", backgroundColor:"grey"}} />
        }
        else if (error) {
            return (
                <>
                    <img src={problem} style={{width:"20%", margin:"auto"}} />
                    <Typography variant="h6" style={{color:"red", fontWeight:"normal", fontSize:"25px", margin:" 10px auto"}}>
                        Error in uploading image. Please try again.
                    </Typography>
                </>                
            )
        }
        else {
            return <img src={upload} style={{width:"20%", display: "flex", margin:"auto"}} />
        }
    }

    return ( 
        <div style={{height:"100%", width: "100%"}}>
            <Typography variant="h4" style={{textAlign:"Left", width:"80%", margin:"20px auto", color:"grey"}}> 
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

            <div className="prediction-container">
                {initial ?
                null : 
                <div className="prediction-content">
                    <Typography variant="h4" style={{textAlign:"Left", color:"grey"}}>
                        Results
                    </Typography>
                    {loading ? 
                    <Typography variant="h6" style={{textAlign:"Left", color:"grey", fontWeight:"normal"}}>Loading...</Typography> : 
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
