import axios from 'axios'

let id = '&APPID=60b10b2c487ce5e612ce006f0d9a1d4d';

export default class getWeatherData {
  static getFiveDay(city) {
    let info = axios.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',us' + id);
    return info;
  }
}