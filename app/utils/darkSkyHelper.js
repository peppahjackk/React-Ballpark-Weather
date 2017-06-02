import axios from 'axios'

export default class getWeatherData {
  // Returns an object containing the weather information for the requested amount of days
  static formatDateInfo(park) {
    let dateInfo = {};
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    // Finds weather data for an outdoor park
    let dailyParks = Object.keys(park);
    for (let i = 0; i < dailyParks.length; i++) {
      let currDate = dailyParks[i];
      let yr = currDate.substr(0,4);
      let mnth = (currDate.substr(4,2)) - 1;
      let day = currDate.substr(6,2);
      let date = new Date(yr,mnth,day);
      dateInfo['Day'+i] = weekdays[date.getDay()];
      dateInfo['Day'+i+'Date'] = {
        month: months[date.getUTCMonth()],
        monthNum: date.getUTCMonth(),
        day: date.getUTCDate(),
        year: date.getUTCFullYear()
      }
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
    Object.keys(gameTimes).map((game)=> {
      let park = game.slice(0, -1);
      if (['ARI','HOU','MIA','MIL','SEA','TB','TOR'].indexOf(park) > -1) {
        precipitationPercentage[game] = [false,0,gameData[game]];
        return;
      }
      // Sets initial precipitation percentage to the overall chance for the day 
      precipitationPercentage[game] = [false,info[park].data.daily.data[day],gameData[game]];
      // If the game is less than 48 hours away pull weather data from the hour nearest game time
      if (gameTimes[game] - (info[park].data.currently.time * 1000) < 172800000 && gameTimes[game] - (info[park].data.currently.time * 1000) > 0) {
        Object.keys(info[park].data.hourly.data).filter((hour)=> {
          if ((-3600000 <= (info[park].data.hourly.data[hour].time * 1000) - gameTimes[game] && (info[park].data.hourly.data[hour].time * 1000) - gameTimes[game] <= 360000)) {
            precipitationPercentage[game] = [true,info[park].data.hourly.data[hour],gameData[game]];
            return;
          }
          return false;
        })
      } else if (gameTimes[game] - (info[park].data.currently.time * 1000) < 0) {
        precipitationPercentage[game] = [false,info[park].data.currently,gameData[game]];
      }
      return;
    });
    return precipitationPercentage;
  }
  
  // Sorts an array of weather objects by precipitation chance for the requested day
  static sortParks(parks, day, parksPlus) {
    let finalParksPlus = {high:[], low:[], dome:[]};
    let sortedParks = Object.keys(parks).sort((a,b)=> {
      // Pushes any DOME park to the bottom of the list
      if (['ARI','HOU','MIA','MIL','SEA','TB','TOR'].indexOf(parks[b].data.home_name_abbrev) > -1) {
        return -1;
      } else if ((['ARI','HOU','MIA','MIL','SEA','TB','TOR'].indexOf(parks[a].data.home_name_abbrev) > -1)) {
        return 1;
      }
      return parksPlus[parks[b].data.home_name_abbrev+parks[b].data.game_nbr][1].precipProbability - parksPlus[parks[a].data.home_name_abbrev+parks[a].data.game_nbr][1].precipProbability;
    })
    sortedParks = sortedParks.slice(0);
    for (let park in sortedParks) {
      let parkData = parksPlus[parks[sortedParks[park]].data.home_name_abbrev+parks[sortedParks[park]].data.game_nbr];
      let parkObj = {};
       parkObj[sortedParks[park]] = parkData;
      if (typeof parkData[1] != 'object') {
        finalParksPlus.dome.push(parkObj);
      } else if (parkData[1].precipProbability >= 0.4) {
        let parkName = sortedParks[park];
        finalParksPlus.high.push(parkObj);
      } else {
        let parkName = sortedParks[park];
        finalParksPlus.low.push(parkObj);
      }
    }
    return finalParksPlus;
  }
  
  // Calls php script to obtain and organize game data from DB
  static getParks() {
    let allParkData = {};
    return axios.post('./getParks.php')
    .then((info)=> {
      let parkData = info;
      Object.keys(parkData.data).map((date)=> {
        let games = parkData.data[date];
        allParkData[date] = {};
        Object.keys(games).map((game) => {
          allParkData[date][game] = games[game];
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