# Traffic Dashboard
This is a simple traffic dashboard web application that provides real-time information about the traffic conditions and weather. Based on the user input, the traffic congestion, vehicle counts, mileage information, weather conditions and traffic images with an interactive map will be displayed. The application was deployed with Vercel, check out the live site [here](https://traffic-dashboard-snowy.vercel.app/dashboard)!

### Features

#### Dashboard
1. Expressway Selection: Choose from a predefined list of expressways to monitor.
2. Traffic Congestion: View the current traffic congestion on the selected expressway.
3. Mileage: Display the length of the selected expressway in kilometers.
4. Current Weather: Retrieve and display the current weather description and corresponding icon.
5. Vehicle Statistics: Analyze and show the number of different vehicle types on the road (car, bus, truck, motorcycle, bicycle).
6. Map Visualization: Display the selected expressway points and traffic data on a map.
7. Notification snackbar: Show notifications for successful data fetch or any errors encountered.
8. Bounding Box Drawing: Uses the DrawBbox component to draw bounding boxes around detected vehicles.
#### Overview
1. Render a table which displays the expressway name, mileage, traffic level, and status. The status is styled differently based on whether the traffic is Low, Medium, or High.
2. Notfication snackbar was also included for this segment


### CSS Framework
* Material UI

### Libraries used
* leaflet
* react-chart-js2
* chart

### API used
* [OpenWeatherMap](https://openweathermap.org/api): Fetches traffic images based on specified time and date
* [RoboFlow Computer Vision](https://universe.roboflow.com/roboflow-100/vehicles-q0x2v): Object Recognition to recognise vehicles
* [Traffic Images](https://data.gov.sg/dataset/traffic-images): Retrieves current weather data

### Getting Started
Clone the repository and run the following commands in the terminal
```
npm install
```
#### For mac or linux users
```
HTTPS=true npm start
```

#### For Windows users
```
set HTTPS=true && npm start
```

Run on localhost https://localhost:3000 to start development