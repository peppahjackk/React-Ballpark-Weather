export default class mlbHelper {
  static convertTime(game, weather, day, dateInfo) {
    let hours, minutes;
    const time = game.event_time;
    // Parses game time from MLB game data
    if (time.indexOf(':') == 1) {
      hours = parseInt(time.substr(0,1));
      minutes = parseInt(time.substr(2,2));
    } else {
      hours = parseInt(time.substr(0,2));
      minutes = parseInt(time.substr(3,2));
    }
    // Converts time to 24 hr format
    if (time.indexOf('PM') && time.substr(0,2) != 12) {
      hours += 12;
    }
    // Creates date object at game time
    const d = new Date(2017,3,28,hours,minutes);
    // Obtains game time in ms
    let ms = parseInt(d.getTime());
    const hr = 3600000;
    // Converts EDT game time to stadium local time
    switch (game.home_name_abbrev) {
      case 'CHC':
      case 'CWS':
      case 'MIL':
      case 'TEX':
      case 'HOU':
      case 'STL':
      case 'KC':
      case 'MIN':
        ms -= (hr * 1);
        break;
      case 'COL':
      case 'ARI':
        ms -= (hr * 2);
        break;
      case 'LAD':
      case 'LAA':
      case 'SD':
      case 'OAK':
      case 'SF':
      case 'SEA':
        ms -= (hr * 3);
        break;
    }
    return {
      park: game.home_name_abbrev,
      time: ms};
  }
  
  
}