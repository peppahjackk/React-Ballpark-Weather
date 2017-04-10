import axios from 'axios'
import locations from './stadiumLocations'
import dateManip from '../utils/dateManipulation'

export default class getWeatherData {
  // Requests weather data for given ballparks using proxy server
  static getWeather(cities) {
    let parksRequested = [],
      initialParks = [],
      lastPark = 0,
      allData = {};
    initialParks = cities;
    for (let i = 0; i < initialParks.length; i++) {
      if (['ARI','HOU','MIA','MIL','SEA','TB','TOR'].indexOf(initialParks[i]) === -1) {
        parksRequested.push(initialParks[i]);
      }
    }
    let numParks = parksRequested.length;
    parksRequested = JSON.stringify(parksRequested);
    return axios.post('./proxy.php', {
        parkRequest: parksRequested
      })
      .then(function(msg) {
        let weatherData = msg.data;
        parksRequested = JSON.parse(parksRequested);
        if (parksRequested.length > 1) {
          // Breaks up each parks' data into seperate objects
          for (var i = 0; i < parksRequested.length; i++) {
            let endParkData;
            endParkData = weatherData.indexOf('}}', lastPark) + 2;
            if (endParkData > 0) {
              var data = weatherData.substring(lastPark, endParkData);
              allData[parksRequested[i]] = JSON.parse(data);
              lastPark = endParkData;
            }
          }
        } else {
          allData[parksRequested[0]] = weatherData;
        }
        return allData;
      })
      .catch(function(error) {
        console.log(error);
      });

  }

  // Returns an object containing the weather information for the requested amount of days
  static formatWeather(info, days, cities) {
    let weatherData = {},
      totalWeather = {},
      precipType = '',
      numDays,
      latest;
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
    // Obtain and set weekday(s) and date(s)
    for (let i = 0; i < numDays; i++) {
      latest = info[cities[0]].daily;
      let dayData = latest.data[i];
      let day = new Date(parseInt(dayData.time + '000'));
      weatherData['Day' + i] = weekdays[day.getDay()];
      weatherData['Day' + i + 'Date'] = dateManip.prettifyDate(latest.data[i].time);
    }
    // Formats weather for each park into a single object
    for (let n = 0; n < numPark; n++) {
      latest = info[cities[n]].daily;
      // Formats weather data for each requested day
      for (let i = 0; i < numDays; i++) {
        let dayData = latest.data[i];
        weatherData[cities[n] + 'Day' + i + 'Summary'] = latest.data[i].summary;
        // Formats precipitation data if applicable
        if (latest.data[i].precipType) {
          weatherData[cities[n] + 'Day' + i + 'PrecipPercent'] = Math.round(dayData.precipProbability * 100) + '% chance of ' + dayData.precipType;
          weatherData[cities[n] + 'Day' + i + 'PrecipType'] = dayData.precipType;
        }
      }
    }
    return weatherData;
  }
  
  static sortCities(info, cities, day) {
    let sortedCities = cities.sort(function(a,b) {
      if (['ARI','HOU','MIA','MIL','SEA','TB','TOR'].indexOf(b.home_name_abbrev) > -1) {
        return -1;
      } else if ((['ARI','HOU','MIA','MIL','SEA','TB','TOR'].indexOf(a.home_name_abbrev) > -1)) {
        return 1;
      }
      return info[b.home_name_abbrev].daily.data[day].precipProbability - info[a.home_name_abbrev].daily.data[day].precipProbability;
    })
    return sortedCities.slice(0);
  }
  
  static getParks(days) {
    let finalCities = {},
        urlMonth='/month_',
        urlDay='/day_',
        daysUrl = [];
    let today = new Date();
    for (let i = 0; i < days; i++) {
      urlMonth='/month_',
      urlDay='/day_';
      let currentDay = new Date(today.getTime() + (86400000 * i));
      let year = currentDay.getFullYear();
      let month = (currentDay.getMonth()+1);
      let day = currentDay.getDate();
      if (month < 10) {
        urlMonth='/month_0';
      }
      if (day < 10) {
        urlDay='/day_0';
      }
      daysUrl.push(year+urlMonth+month+urlDay+day);
    }
    return axios.all(daysUrl.map(function(url) {
      return axios.get('http://gd2.mlb.com/components/game/mlb/year_'+url+'/grid.json')
    }))    
      .then(function(info) {
        //console.log(info[0].data.data.games.game);
        for (let i = 0; i < Object.keys(info).length; i++) {
          /*let data = day.data.data.games.game;
          for (let game in data) {
           daysGames.push(data[game].home_name_abbrev);
          }*/
          finalCities[i] = info[i].data.data.games.game;
        }
      return finalCities;
      })
  }
  
  static condenseParks(allParks) {
    let condensedParks = [];
    for (let i = 0; i < Object.keys(allParks).length; i++) {
      for (let n = 0; n < Object.keys(allParks[i]).length; n++) {
        if (condensedParks.indexOf(allParks[i][n].home_name_abbrev) < 0) {
          condensedParks.push(allParks[i][n].home_name_abbrev)
        }
      }
    }
    return condensedParks;
  }
}