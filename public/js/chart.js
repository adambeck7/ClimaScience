
/* eslint-disable */

//hardcoded for now, need to migrate to geolocation.
let lng= -122.4233
let lat = 37.8267;

//darksky API ping
let url = 'https://api.darksky.net/forecast/f69b34e59a6ce824a619446dcdeb0996/' + lat + ',' + lng;

//Running a get function. Here's where things get a little complicated...
$.get(url, function(data){
    //Declaring a spate of arrays to hold our 48 hours worth of weather data. We're essentially going to just pass a load of data to the client right up front and then allow them to choose what data they want to see--that way, we can only hit the API once instead of hitting it every time a user wants different information--we'll have to see the degree to which this interferes with page load. 
    let apparentTemperature = [];
    let cloudCover = [];
    let dewPoint = [];
    let humidity = [];
    let ozone = [];
    let precipIntensity = [];
    let precipProbability = [];
    let pressure = [];
    let temperature = [];
    let uvIndex = [];
    let visibility = [];
    let windGust = [];
    let windSpeed = [];

    //I set this one aside because unlike the arrays above, the time data will serve to define our chart's x axis.
    let time = [];

    //Now I'm running an iterater through the hourly data to retrive out points.
    for (let i = 0; i < data.hourly.data.length; i++){

        //Now, for our complicated and surely more easily done push data. 

        //1. apparent temperature--calculation: based on a high of 120, normalize the data.
        apparentTemperature.push(data.hourly.data[i].apparentTemperature  / 120 * 100);

        //2. Cloud cover, from 0 - 100%;
        cloudCover.push(data.hourly.data[i].cloudCover * 100);

        //3. Ozone levels--based on a high of 500.
        ozone.push(data.hourly.data[i].ozone / 500 * 100);

        //4. Dew Point
        dewPoint.push(data.hourly.data[i].dewPoint);

        //5. Humidity from 0 - 100%;
        humidity.push(data.hourly.data[i].humidity * 100);

        //6. Precipitation Intensity
        precipIntensity.push(data.hourly.data[i].precipIntensity);

        //7. Precipitation Probability 0 - 100%
        precipProbability.push(data.hourly.data[i].precipProbability * 100);

        //8. Barometric Pressure
        pressure.push(data.hourly.data[i].pressure);

        //9. Temperature, with 120 as a max
        temperature.push(data.hourly.data[i].temperature / 120 * 100);

        //10. uv Index
        uvIndex.push(data.hourly.data[i].uvIndex);

        //11. Visibility
        visibility.push(data.hourly.data[i].visibility);

        //12. Wind Gust
        windGust.push(data.hourly.data[i].windGust);

        //13. Wind Speed
        windSpeed.push(data.hourly.data[i].windSpeed);

        //pushing to the time array.
        let timeStamp = data.hourly.data[i].time;
        let converted = new Date(timeStamp * 1000);
        let hours = converted.getHours();
        let minutes = converted.getMinutes();
        let formatted = hours + ':' + minutes + '0';
        time.push(formatted);
    }
    const ctx = document.getElementById('myChart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: time,
            datasets: [{
                label: 'Apparent Temperature',
                borderColor: 'rgb(255, 99, 132)',
                data: apparentTemperature,
            },
            {
                label: 'Cloud Cover',
                borderColor: 'green',
                data: cloudCover,
            },
            {
                label: 'Dew Point',
                borderColor: 'blue',
                data: dewPoint,
            },
            {
                label: 'Humidity',
                borderColor: 'pink',
                data: humidity,
            },
            {
                label: 'Ozone',
                borderColor: 'orange',
                data: ozone,
            },
            {
                label: 'Precipitation Intensity',
                borderColor: 'red',
                data: precipIntensity,
            },
            {
                label: 'Precipitation Probability',
                borderColor: 'purple',
                data: precipProbability,
            },
            {
                label: 'Pressure',
                borderColor: 'yellow',
                data: pressure,
            },
            {
                label: 'Temperature',
                borderColor: 'black',
                data: temperature,
            },
            {
                label: 'Wind Gust',
                borderColor: 'lightblue',
                data: windGust,
            },
            {
                label: 'Wind Speed',
                borderColor: 'grey',
                data: windSpeed
            }
            ]},
        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100
                    }
                }]
            }
        },
        methods: {
            newDataset(){
                //Run anohter request / choose another preloaded dataset and disply it 
            }
        }
    });
});

