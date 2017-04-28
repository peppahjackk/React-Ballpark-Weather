export default class mlbHelper {
  static convertTime(game) {
    let hours, minutes;
    const time = game.event_time;
    if (time.indexOf(':') == 1) {
      hours = parseInt(time.substr(0,1));
      minutes = parseInt(time.substr(2,2));
    } else {
      hours = parseInt(time.substr(0,2));
      minutes = parseInt(time.substr(3,2));
    }
    
    if (time.indexOf('PM') && time.substr(0,2) != 12) {
      hours += 12;
    }
    const d = new Date(2017,3,28,hours,minutes);
    let ms = parseInt(d.getTime());
    let hr = 3600000;
    console.log(ms + '' + game.home_name_abbrev);
    switch (game.home_name_abbrev) {
      case ('CHC' || 'CWS' || 'MIL' || 'TEX' || 'HOU' || 'STL' || 'KC' || 'MIN'):
        ms -= (hr * 1)
        break;
      case ('COL' || 'ARI'):
        ms -= (hr * 2);
        break;
      case ('LAD' || 'LAA' || 'SD' || 'OAK' || 'SF' || 'SEA'):
        ms -= (hr * 3);
        break;
    }
    console.log(ms + '' + game.home_name_abbrev);
    return;
  }
  
  
}