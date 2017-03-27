import axios from 'axios'
import locations from './stadiumLocations'
import dateManip from '../utils/dateManipulation'

let parksRequested = [], lastPark = 0;

export default class getWeatherData {
  static getWeather() {
    parksRequested = ['col'];
    parksRequested = JSON.stringify(parksRequested);
    
    let info = axios.post('./proxy.php', {parkRequest: parksRequested}, {responseType:'json'})
    .then(function(msg) {
      let weatherData = JSON.stringify(msg.data);
     // weatherData = weatherData.substring(1);
      parksRequested = JSON.parse(parksRequested);
      
      // Breaks up each location's data into seperate objects
      for (var i = 0; i < parksRequested.length; i++) {
        let endParkData;
        
          endParkData = weatherData.indexOf('}}', lastPark) + 2;
        
       
        if (endParkData > 0) {
          var data = weatherData.substring(lastPark,endParkData);
          console.log(JSON.parse(data));
          lastPark = endParkData;
        } 
      }
    })
    .catch(function(error) {
      console.log(error);
    });
    return info;
  }
  
  // Returns an object containing the weather information for the requested amount of days
  static formatWeather(info, days) {
    let weatherData = {}, precipType = '', numDays;
    const weekdays = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let latest = info.data.daily;
    console.log(latest);
    //Set and format weather data for one or more days
    if (!days) {
        let day = new Date(parseInt(latest.data[0].time + '000'));
        weatherData = {
          day1: weekdays[day.getDay()],
          day1Date: dateManip.prettifyDate(latest.data[0].time),
          day1Summary: latest.data[0].summary
        }
        if (latest.data[0].precipType) {
          weatherData.day1.precipType = latest.data[0].precipType;
          weatherData.day1.precipPercent = latest.data[0].precipProbability;
        }         
        console.log(weatherData.day1PrecipPercent);
      } else {
        if (days > 8) {
          numDays = 8;
        } else if (days < 1) {
          numDays = 1;
        } else {
          numDays = days;
        }
        for (let i = 1; i <= numDays; i++) {
          let dayData = latest.data[i-1];
          let day = new Date(parseInt(dayData.time + '000'));
          weatherData['day'+i] = {
            day: weekdays[day.getDay()],
            date: dateManip.prettifyDate(dayData.time),
            summary: dayData.summary
          };
          if (dayData.precipType) {
            weatherData['day'+i].precipPercent = (dayData.precipProbability * 100);
            weatherData['day'+i].precipType = dayData.precipType;
            //weatherData['day'+i+'PrecipTime'] = dateManip.prettifyTime(dayData.precipIntensityMaxTime);
          }
        }
      }
    console.log(weatherData);
    return weatherData;
  }
}