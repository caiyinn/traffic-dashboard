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

export const getDTNow = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();
    month = month < 10 ? '0' + month : month;
    dt = dt < 10 ? '0' + dt : dt;
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;
    return {
        date: year + "-" + month + "-" + dt,
        hour: hour,
        minute: minute,
        second: second
    }
}