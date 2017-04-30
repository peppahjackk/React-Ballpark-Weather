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
      latest = info[park[0].home_name_abbrev].daily;
      let dayData = latest.data[i];
      let day = new Date(parseInt(dayData.time + '000'));
      dateInfo['Day' + i] = weekdays[day.getDay()];
      dateInfo['Day' + i + 'Date'] = dateManip.prettifyDate(latest.data[i].time);
    }
    return dateInfo;
  }
  
  static extractGameTimes(gameTimes) {
    let parksPlus = {};
    for (let game in gameTimes) {
      parksPlus[gameTimes[game].park] = gameTimes[game].time;
    }
    //console.log(parksPlus);
    return parksPlus;
  }
  
  static checkHourlyPrecip(info, parksPlus, day, game) {
    // Sets initial precipitation percentage to the overall chance for the day
    let precipitationPercentage = [false,info[game.home_name_abbrev].daily.data[day].precipProbability];
    // If the game is less than 48 hours away pull weather data from the hour nearest game time
      if (parksPlus[game.home_name_abbrev] - (info[game.home_name_abbrev].currently.time * 1000) < 172800000) {
        Object.keys(info[game.home_name_abbrev].hourly.data).map(function(hour) {
          if (info[game.home_name_abbrev].hourly.data[hour].time - parksPlus[game.home_name_abbrev] <= 3600000 || info[game.home_name_abbrev].hourly.data[hour].time - parksPlus[game.home_name_abbrev] >= -360000) {
            precipitationPercentage = [true,hour.precipProbability];
          }
        })
      }
    return precipitationPercentage;
  }
  
  // Sorts an array of weather objects by precipitation chance for the requested day
  static sortParks(info, parks, day, parksPlus) {
    let sortedParks = parks.sort(function(a,b) {
      // Pushes any DOME park to the bottom of the list
      if (['ARI','HOU','MIA','MIL','SEA','TB','TOR'].indexOf(b.home_name_abbrev) > -1) {
        return -1;
      } else if ((['ARI','HOU','MIA','MIL','SEA','TB','TOR'].indexOf(a.home_name_abbrev) > -1)) {
        return 1;
      }

      let precipitationPercentageA = this.checkHourlyPrecip(info, parksPlus, day, a);
      let precipitationPercentageB = this.checkHourlyPrecip(info, parksPlus, day, b);
      //let precipitationPercentageB = info[b.home_name_abbrev].daily.data[day].precipProbability;
      // If the game is less than 48 hours away pull game time data from the nearest hour
      /* if (parksPlus[a.home_name_abbrev] - (info[a.home_name_abbrev].currently.time * 1000) < 172800000) {
        Object.keys(info[a.home_name_abbrev].hourly.data).map(function(hour) {
          if (info[a.home_name_abbrev].hourly.data[hour].time - parksPlus[a.home_name_abbrev] <= 3600000 || info[a.home_name_abbrev].hourly.data[hour].time - parksPlus[a.home_name_abbrev] >= -360000) {
            precipitationPercentageA = hour.precipProbability;
          }
          
          if (info[b.home_name_abbrev].hourly.data[hour].time - parksPlus[b.home_name_abbrev] <= 3600000 || info[b.home_name_abbrev].hourly.data[hour].time - parksPlus[b.home_name_abbrev] >= -360000) {
            precipitationPercentageB = hour.precipProbability;
          }
        })
      } */
      /* let aGameTime = gameTimes.filter(function(game) {
          if (game.park == a.home_name_abbrev) {
            return game.time
          }
        });
      let bGameTime = gameTimes.filter(function(game) {
          if (game.park == b.home_name_abbrev) {
            return game.time
          }
        });
      console.log(aGameTime[0].park + ' ' + bGameTime[0].park); */
      
      return precipitationPercentageB[1] - precipitationPercentageA[1];
    }.bind(this))
    return sortedParks.slice(0);
  }
  // Calls MLB data to retrieve game info for the requested amount of days
  static getParks(days) {
    let finalParks = {},
        urlMonth='/month_',
        urlDay='/day_',
        daysUrl = [];
    let today = new Date();
    for (let i = 0; i < days; i++) {
      urlMonth='/month_',
      urlDay='/day_';
      // Creates date object for the next X amount of days
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
      // Adds requested day's URL to array
      daysUrl.push(year+urlMonth+month+urlDay+day);
    }
    // Maps through URL array to get obtain game data for next X amount of days
    return axios.all(daysUrl.map(function(url) {
      return axios.get('http://gd2.mlb.com/components/game/mlb/year_'+url+'/grid.json')
    }))    
      .then(function(info) {
        // Iterates through each day and adds game data to final object
        for (let i = 0; i < Object.keys(info).length; i++) {
          finalParks[i] = info[i].data.data.games.game;
        }
      return finalParks;
      })
      .catch(function(error) {
        console.log(error);
      });
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