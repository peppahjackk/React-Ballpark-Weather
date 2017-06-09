export default class dateManip {
  // Returns an object containing the weather information for the requested amount of days
  static formatDateInfo(park) {
    let dateInfo = {};
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Finds weather data for an outdoor park
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
  
  static prettifyDate(time) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let chosenDate = new Date(parseInt(time + '000'));
    let dateObj = {
      month: months[chosenDate.getUTCMonth()],
      monthNum: chosenDate.getUTCMonth(),
      day: chosenDate.getUTCDate(),
      year: chosenDate.getUTCFullYear()
    }
    return dateObj;
  }
  
  static prettifyTime(time) {
    let chosenTime = new Date(parseInt(time + '000'));
    return chosenTime.getHours() + ':0' + chosenTime.getMinutes() + ':0' + chosenTime.getSeconds();
  }
  
  static convertTo(time, zone = 5) {
    let d = new Date(time);
    
    time += (d.getTimezoneOffset() * 60);
    time -= zone * 60 * 60;
    return time;
  }
  
  static stripMinutes(time) {
    let strippedTime = time.slice(0,-6);
    let strippedPM = time.substr(-3,3);
    return strippedTime + strippedPM;
  }
}