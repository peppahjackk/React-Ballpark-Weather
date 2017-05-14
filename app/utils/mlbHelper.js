export default class mlbHelper {
  static convertTime(game, weather, day, dateInfo) {
    let hours, minutes;
    const time = game.event_time;
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
    // Creates date object at game time
    const d = new Date(dateInfo['Day' + day + 'Date'].year, dateInfo['Day' + day + 'Date'].monthNum, dateInfo['Day' + day + 'Date'].day, hours, minutes);
    // Obtains game time in ms
    let ms = parseInt(d.getTime());
    const hr = 3600000;
    // Converts EST/EDT game time to GMT time
    /* if (weather) {
      ms -= hr * weather.offset;
    } else {
      // Converts time for DOME stadiums
      ms += (hr * 4);
      switch (game.home_name_abbrev) {
        case 'MIL':
        case 'HOU':
          ms += (hr * 1);
          break;
        case 'ARI':
          ms += (hr * 2);
          break;
        case 'SEA':
          ms += (hr * 3);
          break;
      }
    } */
    return {
      park: game.home_name_abbrev+game.game_nbr,
      time: ms
    };
  }
}