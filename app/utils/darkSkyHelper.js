import axios from 'axios'
import locations from './stadiumLocations'
import dateManip from '../utils/dateManipulation'

let id = '04497081d270b956aac2ccc286d0b245';

export default class getWeatherData {
  static getWeather() {
    let info = axios.get('./proxy.php');
    console.log(info)
    return info;
  }
  
  static formatWeather(info) {
    let weatherData = {
      day1Date: dateManip.prettifyDate(info.data.daily.data[0].time),
      day1PrecipPercent: info.data.daily.data[0].precipProbability,
      day2Date: dateManip.prettifyDate(info.data.daily.data[1].time),
      day2PrecipPercent: info.data.daily.data[1].precipProbability
    };
    return weatherData;
  }
}