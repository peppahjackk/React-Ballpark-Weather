import axios from 'axios'

export default class weatherHelper {
  static checkHourlyPrecip(info, day, gameTimes, gameData) {
    let precipitationPercentage = {};
    Object.keys(gameTimes).map((game) => {
      let park = game.slice(0, -1);
      if (['ARI', 'HOU', 'MIA', 'MIL', 'SEA', 'TB', 'TOR'].indexOf(park) > -1) {
        precipitationPercentage[game] = ['dome', 0, gameData[game]];
        return;
      }
      // Sets initial precipitation percentage to the overall chance for the day 
      precipitationPercentage[game] = ['daily', [info[park].data.daily.data[day]], gameData[game]];
      let hourlyData = info[park].data.hourly.data;
      // If the game is less than 48 hours away pull weather data from the hour nearest game time
      if (gameTimes[game] - (info[park].data.currently.time * 1000) < 172800000 && gameTimes[game] - (info[park].data.currently.time * 1000) > 0) {
        Object.keys(hourlyData).map((hour) => {
          hour = parseInt(hour);
          if ((-3600000 <= (hourlyData[hour].time * 1000) - gameTimes[game] && (hourlyData[hour].time * 1000) - gameTimes[game] <= 360000) && hourlyData[hour + 2]) {
            precipitationPercentage[game] = ['hourly', [hourlyData[hour], hourlyData[hour + 1], hourlyData[hour + 2]], gameData[game]];
            return;
          }
          return false;
        })
      } else if (gameTimes[game] - (info[park].data.currently.time * 1000) < 0) {
        precipitationPercentage[game] = ['current', [info[park].data.currently, hourlyData[0], hourlyData[1]], gameData[game]];
      }
      return;
    });
    return precipitationPercentage;
  }

  // Sorts an array of weather objects by precipitation chance for the requested day
  static sortParks(parks, day, parksPlus) {
    let finalParksPlus = {
      high: [],
      low: [],
      dome: []
    };
    let pickHighest = (arr)=> Math.round(Math.max(...arr) * 100);
    let sortedParks = Object.keys(parks).sort((a, b) => {
      // Pushes any DOME park to the bottom of the list
      if (['ARI', 'HOU', 'MIA', 'MIL', 'SEA', 'TB', 'TOR'].indexOf(parks[b].data.home_name_abbrev) > -1) {
        return -1;
      } else if ((['ARI', 'HOU', 'MIA', 'MIL', 'SEA', 'TB', 'TOR'].indexOf(parks[a].data.home_name_abbrev) > -1)) {
        return 1;
      }
      let aMax = parksPlus[parks[a].data.home_name_abbrev + parks[a].data.game_nbr][1].map((a)=>a.precipProbability);
      let bMax = parksPlus[parks[b].data.home_name_abbrev + parks[b].data.game_nbr][1].map((b)=>b.precipProbability);
      return Math.round(Math.max(...bMax) * 100) - Math.round(Math.max(...aMax) * 100);
    })
    sortedParks = sortedParks.slice(0);
    for (let park in sortedParks) {
      let parkData = parksPlus[parks[sortedParks[park]].data.home_name_abbrev + parks[sortedParks[park]].data.game_nbr];
      let parkObj = {};
      parkObj[sortedParks[park]] = parkData;
      console.log(parkData[1]);
      let parksHigh;
      if(typeof parkData[1][0] === 'object') {
        parksHigh = Math.max(...parkData[1].map((a)=>a.precipProbability));
      }
      console.log(parksHigh);
      console.log(typeof parkData[1][0]);
      if (typeof parkData[1][0] != 'object') {
        finalParksPlus.dome.push(parkObj);
      } else if (parksHigh >= 0.4) {
        let parkName = sortedParks[park];
        finalParksPlus.high.push(parkObj);
      } else {
        let parkName = sortedParks[park];
        finalParksPlus.low.push(parkObj);
      }
    }
    return finalParksPlus;
  }

  // Calls script to obtain and orgainze weather data from DB
  static getWeather() {
    let allWeatherData = {};
    return axios.post('./getWeather.php')
      .then((info) => {
        let weatherData = info;
        Object.keys(weatherData.data).map((park) => {
          allWeatherData[park] = weatherData.data[park];
        })
        return allWeatherData
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