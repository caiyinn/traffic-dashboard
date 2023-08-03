const DrawBbox = (props) => {
    const plot = props.bbox.map((box, index) => {
        // find the top and left position of the box, points given are center of the box and then get the ratio of the bounding box in terms of the image size
        const top = (((box.y - (box.height / 2)) / props.imageInfo.height) * 100);
        const left = ((box.x - (box.width / 2)) / props.imageInfo.width) * 100;

        const width = (box.width / props.imageInfo.width) * 100;
        const height = (box.height / props.imageInfo.height) * 100;

        return (
            <div className="bounding-box" key={index} style={{ 
                position: 'absolute', 
                top: `${top}%`, 
                left: `${left}%`, 
                width: `${width}%`, 
                height: `${height}%`, 
                border: "2px solid red" }}>
                    <p style={{color:"white", marginTop:"-20px", backgroundColor:"red", width:"101%"}}>{box.label}</p>
            </div>
        )
    })
    return(
        <>
            {plot}
        </>
    )
}
 
export default DrawBbox;