import axios from 'axios'
import locations from './stadiumLocations'
import dateManip from '../utils/dateManipulation'

let parksRequested = [],
  lastPark = 0,
  allData = {};

export default class getWeatherData {
  static getWeather(cities) {
    parksRequested = cities;
    let numParks = parksRequested.length;
    parksRequested = JSON.stringify(parksRequested);

    let info = axios.post('./proxy.php', {
        parkRequest: parksRequested
      })
      .then(function(msg) {
        let weatherData = JSON.stringify(msg);
        weatherData = JSON.parse(weatherData).data;
        parksRequested = JSON.parse(parksRequested);
        if (parksRequested.length > 1) {
          // Breaks up each parks's data into seperate objects
          for (var i = 0; i < parksRequested.length; i++) {
            let endParkData;
            endParkData = weatherData.indexOf('}}', lastPark) + 2;
            if (endParkData > 0) {
              var data = weatherData.substring(lastPark, endParkData);
              allData[i] = JSON.parse(data);
              lastPark = endParkData;
            }
          }
        } else {
          allData[0] = weatherData;
        }
        return allData;
      })
      .catch(function(error) {
        console.log(error);
      });
    return info;
  }

  // Returns an object containing the weather information for the requested amount of days
  static formatWeather(info, days, cities) {
    let weatherData = {},
      totalWeather = {},
      precipType = '',
      numDays, latest;
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (!days) {
      numdays = 1;
    } else if (days < 1) {
      numDays = 1;
    } else if (days > 8) {
      days = 8;
    } else {
      numDays = days;
    }
    let numPark = Object.keys(info).length;
    for (let n = 0; n < numPark; n++) {
      latest = info[n].daily;
      for (let i = 0; i < numDays; i++) {
        let dayData = latest.data[i];
        let day = new Date(parseInt(dayData.time + '000'));
        weatherData[cities[n] + 'Day' + i] = weekdays[day.getDay()];
        weatherData[cities[n] + 'Day' + i + 'Date'] = dateManip.prettifyDate(latest.data[i].time);
        weatherData[cities[n] + 'Day' + i + 'Summary'] = latest.data[i].summary;

        if (latest.data[i].precipType) {
          weatherData[cities[n] + 'Day' + i + 'PrecipPercent'] = (dayData.precipProbability * 100);
          weatherData[cities[n] + 'Day' + i + 'PrecipType'] = dayData.precipType;
        }
      }
    }
    /*
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

    if (numPark > 1) {
      for (let n = 0; n < numPark; n++) {
        for (let i = 1; i <= days; i++) {
          let today = 'day' + i;
          totalWeather[n][today] = weatherData[n][today].day;
          totalWeather[n][today + 'Date'] = weatherData[n][today].date;
          totalWeather[n][today + 'Summary'] = weatherData[n][today].summary;
          if (weatherData[n][today].precipPercent) {
            totalWeather[n][today + 'Precip'] = weatherData[n][today].precipPercent + '% chance of ' + weatherData[n][today].precipType;  
          }
        }
      }
    } else {
      for (let i = 1; i <= days; i++) {
        let today = 'day' + i;
        totalWeather[today] = weatherData[today].day;
        totalWeather[today + 'Date'] = weatherData[today].date;
        totalWeather[today + 'Summary'] = weatherData[today].summary;
        if (weatherData[today].precipPercent) {
          totalWeather[today + 'Precip'] = weatherData[today].precipPercent + '% chance of ' + weatherData[today].precipType;  
        }
      }
    }
      */
    return weatherData;
  }
}