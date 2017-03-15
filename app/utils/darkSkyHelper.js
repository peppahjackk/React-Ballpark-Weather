import axios from 'axios'
import locations from './stadiumLocations'
import dateManip from '../utils/dateManipulation'

let id = '04497081d270b956aac2ccc286d0b245';

export default class getWeatherData {
  static getWeather() {
    let info = axios.get('./proxy.php');
    return info;
  }
  
  static formatWeather(info, days) {
    let weatherData = {};
    let latest = info.data.daily;
    if (!days) {
        weatherData = {
          day1Date: dateManip.prettifyDate(latest.data[0].time),
          day1PrecipPercent: latest.data[0].precipProbability
        }
      } else {
        for (let i = 1; i <= days; i++) {
          let dayData = latest.data[i-1];
          weatherData['day'+i+'Date'] = dateManip.prettifyDate(dayData.time);
          weatherData['day'+i+'PrecipPercent'] = dayData.precipProbability;
        }
          /*weatherData = {
            day1Date: dateManip.prettifyDate(info.data.daily.data[0].time),
            day1PrecipPercent: info.data.daily.data[0].precipProbability,
            day2Date: dateManip.prettifyDate(info.data.daily.data[1].time),
            day2PrecipPercent: info.data.daily.data[1].precipProbability
          }; */
      }
    return weatherData;
  }
}