export const getAreaCoveragePercentage = (data) => {
    console.log("check", data)
    const storeLength = {
        minX: 0,
        minY: 0,
        maxX: 0,
        maxY: 0,
    }
    storeLength.minX = Math.min(...data.predictions.map(box => box.x));
    storeLength.minY = Math.min(...data.predictions.map(box => box.y));
    storeLength.maxX = Math.max(...data.predictions.map(box => box.x));
    storeLength.maxY = Math.max(...data.predictions.map(box => box.y));
    const vehicleArea = (storeLength.maxX - storeLength.minX) * (storeLength.maxY - storeLength.minY);
    const imageArea = data.image.width * data.image.height;
    const vehiclePercentage = (vehicleArea / imageArea) * 100;
    return vehiclePercentage;
}