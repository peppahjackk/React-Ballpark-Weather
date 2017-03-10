import axios from 'axios'
import locations from './stadiumLocations'

let id = '04497081d270b956aac2ccc286d0b245';

export default class getWeatherData {
  static getFiveDay(city) {
    let info = axios.get('./proxy.php')
    return info;
  }
}