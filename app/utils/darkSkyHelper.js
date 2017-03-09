import axios from 'axios'
import locations from './stadiumLocations'

let id = '04497081d270b956aac2ccc286d0b245';

export default class getWeatherData {
  static getFiveDay(city) {
    console.log(locations);
    let info = axios.get('https://api.darksky.net/forecast/' + id + '/' + 39.097935 + ',-' + 84.508158)
  }
}