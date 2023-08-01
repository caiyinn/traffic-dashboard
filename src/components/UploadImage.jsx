import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import upload from '../assets/upload.png';

const UploadImage = () => {
    const [image, setImage] = useState(null);

    const handleUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            // create a local url to display image
            setImage(URL.createObjectURL(e.target.files[0])); 
        }
    };

    return ( 
        <div style={{height:"100%", width: "100%"}}>
            <Typography variant="h4" style={{textAlign:"Left", width:"80%", margin:"20px auto", color:"grey"}}> 
                Model Prediction
            </Typography>

            <div className="upload-image-container">
                {image!=null ?
                    <img src={image} style={{marginTop:"40px", width:"85%", height:"75%",  margin:"auto"}} /> : 
                    <img src={upload} style={{width:"20%", display: "flex", margin:"auto"}} />}
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
                <Typography variant="h4" style={{textAlign:"Left", color:"grey"}}>
                    Results
                </Typography>
                <div className="prediction-content">
                </div>
            </div>
        </div>
    );
}
 
export default UploadImage;
