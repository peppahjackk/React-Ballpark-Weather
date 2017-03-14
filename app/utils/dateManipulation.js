export default class dateManip {
  static prettifyDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let chosenDate = new Date(parseInt(date + '000'));
    return months[chosenDate.getUTCMonth()] + ' ' + chosenDate.getUTCDate() + ', ' + chosenDate.getUTCFullYear();
  }
}