export const getAreaCoveragePercentage = (data) => {
    const storeLength = {
        minX: 0,
        minY: 0,
        maxX: 0,
        maxY: 0,
        width: 0,
        height: 0
    }
    storeLength.minX = Math.min(...data.predictions.map(box => box.x));
    storeLength.minY = Math.min(...data.predictions.map(box => box.y));
    storeLength.maxX = Math.max(...data.predictions.map(box => box.x));
    storeLength.maxY = Math.max(...data.predictions.map(box => box.y));
    // only one vehicle detected
    if (storeLength.minX === storeLength.maxX){
        storeLength.width = data.predictions[0].width 
        storeLength.height = data.predictions[0].height 
    }
    else {
        storeLength.width = storeLength.maxX - storeLength.minX;
        storeLength.height = storeLength.maxY - storeLength.minY;
    }
    const vehicleArea = storeLength.width * storeLength.height;
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

export const weatherIconHandler = (currentWeather) => {
    currentWeather = currentWeather.toLowerCase();
    if (currentWeather === "clear sky"){
        return "sun.png";
    }
    else if (currentWeather.includes("few clouds") || currentWeather.includes("scattered clouds")){
      return "few clouds.png";
    }
    else if (currentWeather.includes("broken clouds") || currentWeather.includes("overcast clouds")){
      return "clouds.png";
    }
    else if (currentWeather.includes("rain") && !currentWeather.includes("thunderstorm")){
      return "raining.png";
    }
    else if (currentWeather.includes("thunderstorm")){
      return "thunderstorm.png";
    }
    else if (currentWeather.includes("snow")){
      return "snow.png";
    }
    else if (currentWeather.includes("mist") || currentWeather.includes("haze")){
      return "mist.png";
    }
}