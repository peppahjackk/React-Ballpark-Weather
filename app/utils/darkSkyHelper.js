import axios from 'axios'
import dateManip from '../utils/dateManipulation'

export default class getWeatherData {
  // Returns an object containing the weather information for the requested amount of days
  static formatDateInfo(info, park, days = 1) {
    let dateInfo = {},
        outdoorPark = {},
      numDays,
      latest;
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // Sets number of days: minimum 1, maximum 8
    if (days < 1) {
      days = 1;
    } else if (days > 8) {
      days = 8;
    }
    // Finds weather data for an outdoor park
    let dailyParks = Object.keys(park);
    for (let i = 0; i < dailyParks.length; i++) {
      let currParkName = park[dailyParks[i]].data.home_name_abbrev;
      if (typeof info[currParkName] === 'object') {
        outdoorPark = info[currParkName].data.daily;
        break;
      }
    }
    // Obtains and sets weekday(s) and date(s) for the coming days
    for (let i = 0; i < days; i++) {
      let dayData = outdoorPark.data[i];
      let day = new Date(parseInt(dayData.time + '000'));
      dateInfo['Day' + i] = weekdays[day.getDay()];
      dateInfo['Day' + i + 'Date'] = dateManip.prettifyDate(outdoorPark.data[i].time);
    }
    console.log(dateInfo);
    return dateInfo;
  }
  
  static extractGameTimes(gameTimes, gameData) {
    let parksPlus = {};
    for (let game in gameTimes) {
      parksPlus[gameTimes[game].park] = gameTimes[game].time;
    }
    return parksPlus;
  }
  
  static checkHourlyPrecip(info, day, gameTimes, gameData) {
    let precipitationPercentage = {};
    Object.keys(gameTimes).map(function(game) {
      let park = game.slice(0, -1);
      if (['ARI','HOU','MIA','MIL','SEA','TB','TOR'].indexOf(park) > -1) {
        precipitationPercentage[game] = [false,0,gameData[Object.keys(gameTimes).indexOf(game)]];
        return;
      }
      // Sets initial precipitation percentage to the overall chance for the day
      precipitationPercentage[game] = [false,info[park].daily.data[day],gameData[Object.keys(gameTimes).indexOf(game)]];
      // If the game is less than 48 hours away pull weather data from the hour nearest game time
      if (gameTimes[game] - (info[park].currently.time * 1000) < 172800000 && gameTimes[game] - (info[park].currently.time * 1000) > 0) {
        Object.keys(info[park].hourly.data).filter(function(hour) {
          if ((-3600000 <= (info[park].hourly.data[hour].time * 1000) - gameTimes[game] && (info[park].hourly.data[hour].time * 1000) - gameTimes[game] <= 360000)) {
            precipitationPercentage[game] = [true,info[park].hourly.data[hour],gameData[Object.keys(gameTimes).indexOf(game)]];
            return;
          }
          return false;
        })
      } else if (gameTimes[game] - (info[park].currently.time * 1000) < 0) {
        precipitationPercentage[game] = [false,info[park].currently,gameData[Object.keys(gameTimes).indexOf(game)]];
      }
      return;
    });
    return precipitationPercentage;
  }
  
  // Sorts an array of weather objects by precipitation chance for the requested day
  static sortParks(parks, day, parksPlus) {
    let sortedParks = parks.sort(function(a,b) {
      // Pushes any DOME park to the bottom of the list
      if (['ARI','HOU','MIA','MIL','SEA','TB','TOR'].indexOf(b.home_name_abbrev) > -1) {
        return -1;
      } else if ((['ARI','HOU','MIA','MIL','SEA','TB','TOR'].indexOf(a.home_name_abbrev) > -1)) {
        return 1;
      }
      return parksPlus[b.home_name_abbrev+b.game_nbr][1].precipProbability - parksPlus[a.home_name_abbrev+a.game_nbr][1].precipProbability;
    }.bind(this))
    return sortedParks.slice(0);
  }
  
  // Calls php script to obtain and organize game data from DB
  static getParks() {
    let allParkData = {};
    return axios.post('./getParks.php')
    .then((info)=> {
      let parkData = info;
      Object.keys(parkData.data).map((day)=> {
        let games = parkData.data[day];
        allParkData[day] = {};
        Object.keys(games).map((game) => {
          allParkData[day][game] = games[game];
        })
      })
      return allParkData;
    })
    .catch(e => {
      console.log(e);
    })
  }
  
  // Calls script to obtain and orgainze weather data from DB
  static getWeather() {
    let allWeatherData = {};
    return axios.post('./getWeather.php')
    .then((info)=> {
      let weatherData = info;
      Object.keys(weatherData.data).map((park)=>{
        allWeatherData[park] = weatherData.data[park];
      })
      return allWeatherData
    })
    .catch(e=>{
      console.log(e);
    })
  }
  
  static condenseParks(allParks) {
    let condensedParks = [];
    // Reduces each park being played in the next X amount of days to one instance each
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