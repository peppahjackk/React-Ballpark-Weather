import axios from 'axios'
import dateManip from '../utils/dateManipulation'

export default class getWeatherData {
  // Requests weather data for given ballparks using proxy server
  static getWeather(parks) {
    let parksRequested = [],
      initialParks = [],
      lastPark = 0,
      allData = {};
    initialParks = parks;
    // Adds only outdoor parks to weather request array
    for (let i = 0; i < initialParks.length; i++) {
      if (['ARI','HOU','MIA','MIL','SEA','TB','TOR'].indexOf(initialParks[i]) === -1) {
        parksRequested.push(initialParks[i]);
      }
    }
    let numParks = parksRequested.length;
    parksRequested = JSON.stringify(parksRequested);
    // Calls php script to fetch weather data via API call(s)
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
  static formatDateInfo(info, days, park) {
    let dateInfo = {},
      numDays,
      latest;
    let realParks = park.filter(function(currPark){
      return info[currPark.home_name_abbrev] 
    });
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // Sets number of days: minimum 1, maximum 8
    if (!days) {
      numdays = 1;
    } else if (days < 1) {
      numDays = 1;
    } else if (days > 8) {
      days = 8;
    } else {
      numDays = days;
    }
    // Obtain and set weekday(s) and date(s)
    for (let i = 0; i < numDays; i++) {
      latest = info[realParks[0].home_name_abbrev].daily;
      let dayData = latest.data[i];
      let day = new Date(parseInt(dayData.time + '000'));
      dateInfo['Day' + i] = weekdays[day.getDay()];
      dateInfo['Day' + i + 'Date'] = dateManip.prettifyDate(latest.data[i].time);
    }
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
    let finalParks = {};
    return axios.post('./getParks.php')
    .then((daysGames)=> {
      let dailyData = daysGames;
      Object.keys(dailyData.data).map((day)=> {
        let games = dailyData.data[day];
        finalParks[day] = {};
        Object.keys(games).map((game) => {
          finalParks[day][game] = games[game];
        })
      })
      return finalParks;
    })
    .catch(e => {
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