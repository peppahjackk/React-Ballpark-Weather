import axios from 'axios'
import locations from './stadiumLocations'
import dateManip from '../utils/dateManipulation'

let id = '04497081d270b956aac2ccc286d0b245';

export default class getWeatherData {
  static getWeather() {
    let info = axios.get('./proxy.php');
    return info;
  }
  
  // Returns an object containing the weather information for the requested amount of days
  static formatWeather(info, days) {
    let weatherData = {}, precipType = '';
    const weekdays = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let latest = info.data.daily;
    console.log(latest);
    if (!days) {
        let day = new Date(parseInt(latest.data[0].time + '000'));
        if (latest.data[0].precipType) {
          weatherData.day1PrecipType = latest.data[0].precipType;
          weatherData.day1PrecipPercent = latest.data[0].precipProbability;
        } else {
          precipType = 'rain';
        }
        weatherData = {
          day1: weekdays[day.getDay()],
          day1Date: dateManip.prettifyDate(latest.data[0].time),
          day1Summary: latest.data[0].summary
        }
        
        console.log(weatherData.day1PrecipPercent);
      } else {
        for (let i = 1; i <= days; i++) {
          let dayData = latest.data[i-1];
          let day = new Date(parseInt(dayData.time + '000'));
          weatherData['day'+i] = weekdays[day.getDay()];                   
          weatherData['day'+i+'Date'] = dateManip.prettifyDate(dayData.time);
          weatherData['day'+i+'Summary'] = dayData.summary;
          if (dayData.precipType) {
            weatherData['day'+i+'PrecipPercent'] = (dayData.precipProbability * 100);
            weatherData['day'+i+'PrecipType'] = dayData.precipType;
            //weatherData['day'+i+'PrecipTime'] = dateManip.prettifyTime(dayData.precipIntensityMaxTime);
          } 
        }
      }
    return weatherData;
  }
}