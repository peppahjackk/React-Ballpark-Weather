export default class dateManip {
  // Pulls data info for future MLB games
  static formatDateInfo(park) {
    let dateInfo = {};
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Date string is pulled apart and formatted into weekday and date info
    let dailyParks = Object.keys(park).sort((a,b)=>a-b);
    for (let i = 0; i < dailyParks.length; i++) {
      let currDate = dailyParks[i];
      let yr = currDate.substr(0, 4);
      let mnth = (currDate.substr(4, 2)) - 1;
      let day = currDate.substr(6, 2);
      let date = new Date(yr, mnth, day);
      dateInfo['Day' + i] = weekdays[date.getDay()];
      dateInfo['Day' + i + 'Date'] = {
        month: months[date.getUTCMonth()],
        monthNum: date.getUTCMonth(),
        day: date.getUTCDate(),
        year: date.getUTCFullYear()
      }
    }
    return dateInfo;
  }
  
  static prettifyTime(time) {
    let chosenTime = new Date(parseInt(time + '000'));
    return chosenTime.getHours() + ':0' + chosenTime.getMinutes() + ':0' + chosenTime.getSeconds();
  }
  
  static convertTo(time, zone = 5) {
    // Converts ms time to requested zone (default EST0)
    let d = new Date(time);
    time += (d.getTimezoneOffset() * 60);
    time -= zone * 60 * 60;
    return time;
  }
  
  static stripMinutes(time) {
    // Strips hour and AM/PM from given time string
    let strippedTime = time.slice(0,-6);
    let strippedPM = time.substr(-3,3);
    return strippedTime + strippedPM;
  }
}