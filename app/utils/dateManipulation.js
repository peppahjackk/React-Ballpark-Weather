export default class dateManip {
  static prettifyDate(time) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let chosenDate = new Date(parseInt(time + '000'));
    return months[chosenDate.getUTCMonth()] + ' ' + chosenDate.getUTCDate() + ', ' + chosenDate.getUTCFullYear();
  }
  
  static prettifyTime(time) {
    let chosenTime = new Date(parseInt(time + '000'));
    return chosenTime.getHours() + ':' + chosenTime.getMinutes() + ':' + chosenTime.getSeconds();
  }
}