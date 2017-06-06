export default class dateManip {
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
    let stripped = time.slice(0,-5);
    return stripped + '00';
  }
}