import axios from 'axios'

export default class mlbHelper {
  // Calls php script to obtain and organize game data from DB
  static getParks() {
    let allParkData = {};
    return axios.post('./getParks.php')
      .then((info) => {
        let parkData = info;
        // Organizes returned info into an object: date->game->gameInfo
        Object.keys(parkData.data).map((date) => {
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
  
  static extractGameTimes(gameTimes, gameData) {
    // Begins building the nest parksPlus object
    let parksPlus = {};
    for (let game in gameTimes) {
      parksPlus[gameTimes[game].park] = gameTimes[game].time;
    }
    return parksPlus;
  }
  
  static convertTime(game, weather, day, dateInfo) {
    let hours, minutes;
    const time = game.event_time;
    const tempDate = new Date();
    var utcMonth = dateInfo['Day' + day + 'Date'].monthNum;
    var utcDay = dateInfo['Day' + day + 'Date'].day;
    // Parses game time from MLB game data
    if (time.indexOf(':') == 1) {
      hours = parseInt(time.substr(0, 1));
      minutes = parseInt(time.substr(2, 2));
    } else {
      hours = parseInt(time.substr(0, 2));
      minutes = parseInt(time.substr(3, 2));
    }
    // Converts time to 24 hr format
    if (time.indexOf('PM') && time.substr(0, 2) != 12) {
      hours += 12;
    }
    // Converts EST/EDT game time to GMT time
    hours += 4;
    // Converts GMT time to system time
    hours -= (tempDate.getTimezoneOffset() /60)
    if (hours > 23) {
      hours -= 24;
      // Changes day and month data if system time is past est game day
      if ([0,2,4,6,7,9].indexOf(utcMonth) > -1) {
        if (day === 31) {
          utcMonth++;
          utcDay = 1;
        } else {
          utcDay++;
        }
      } else if ([3,5,8,10].indexOf(utcMonth) > -1) {
        if (utcDay === 30) {
          utcMonth++;
          utcDay = 1;
        } else {
          utcDay++;
        }
      }
    }
    // Creates date object at game time
    const d = new Date(dateInfo['Day' + day + 'Date'].year, utcMonth, utcDay, hours, minutes);
    // Obtains game time in ms
    let ms = parseInt(d.getTime());
    return {
      park: game.home_name_abbrev+game.game_nbr,
      time: ms
    };
  }
}