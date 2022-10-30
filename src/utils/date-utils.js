var dateFormat = require("dateformat");
var datetime = require("node-datetime");
var moment = require("moment");

class DateUtils {
  static getDateTimeStr(month) {
    var x = new Date();
    var y = (x.getFullYear() + 543).toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    let mStr = this.getMonthTH(m);
    var ddmmyyyy = d + ' ' + mStr + ' ' + y ;
    return ddmmyyyy;
  }
  static getMonthTH(month) {
    if (['1','01'].includes(month)) return 'มกราคม'
    if (['2','02'].includes(month)) return 'กุมภาพันธ์'
    if (['3','03'].includes(month)) return 'มีนาคม'
    if (['4','04'].includes(month)) return 'เมษายน'
    if (['5','05'].includes(month)) return 'พฤษภาคม'
    if (['6','06'].includes(month)) return 'มิถุนายน'
    if (['7','07'].includes(month)) return 'กรกฎาคม'
    if (['8','08'].includes(month)) return 'สิงหาคม'
    if (['9','09'].includes(month)) return 'กันยายน'
    if (['10'].includes(month)) return 'ตุลาคม'
    if (['11'].includes(month)) return 'พฤศจิกายน'
    if (['12'].includes(month)) return 'ธันวาคม'
  }
  static setDateFormatNow(date = new Date(), format = "yyyy-mm-dd") {
    try {
      if (date == null) {
        return "";
      }
      return dateFormat(date, format);
    } catch (err) {
      console.log(err.message)
      return err;
    }
  }
  static getDateNow(addTime = 0) {
    return moment().add(addTime, "hours").valueOf();
    // return Date.now();
  }

  static setDateFormat(date = new Date(), format = "yyyy/mm/dd") {
    try {
      if (date == null) {
        return "";
      }
      date.setFullYear(date.getFullYear() + 543);
      return dateFormat(date, format);
    } catch (err) {
      return err;
    }
  }
  static getDateNowYYMMDD() {
    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    d.length == 1 && (d = "0" + d);
    m.length == 1 && (m = "0" + m);
    var yyyymmdd = y + m + d;
    return yyyymmdd;
  }
  static getDateNowYYMMDD(Y, M, D) {
    var x = new Date();
    x.setDate(x.getDate() + D);
    x.setMonth(x.getMonth() + M);
    x.setFullYear(x.getFullYear() + Y);
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    d.length == 1 && (d = "0" + d);
    m.length == 1 && (m = "0" + m);
    var yyyymmdd = y + m + d;
    return yyyymmdd;
  }

  static getDateNowDDMMYYYY() {
    var x = new Date();
    var y = (x.getFullYear() + 543).toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    d.length == 1 && (d = "0" + d);
    m.length == 1 && (m = "0" + m);
    var ddmmyyy = d + "/" + m + "/" + y;
    return ddmmyyy;
  }

  static getDataToISOString(date, format) {
    try {
      return dateFormat(date, format);
    } catch (err) {
      return err;
    }
  }

  static calculateAge(birthDate) {
    //var ageDifMs = new Date(Date.now() - birthDate.getTime());
    //let age = Math.abs(ageDifMs.getUTCFullYear() - 1545)
    //if (age > 200) {
    //    age = Math.abs(ageDifMs.getUTCFullYear() - 1970)
    //}

    let ageDifMs = Date.now() - birthDate.getTime();
    let ageDate = new Date(ageDifMs);
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);

    return age;
  }

  static getDateYearTH(birth_date) {
    if (birth_date == null || birth_date == undefined) {
      return "";
    }

    let str = birth_date;
    let date = str.split("-");

    let yyyy = Number(date[0]);
    let mm = date[1];
    let dd = date[2];
    let yearTH = Number(543);

    const ddmmyyy = dd + "/" + mm + "/" + (yyyy + yearTH);

    return ddmmyyy;
  }

    static getBackwardDate(months) {
        var currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - months);
        return currentDate
    }

    static diffDateToSecond(date1 = new Date(), date2 = new Date()) {
        const firstDate = moment(date1)
        const secondDate = moment(date2).subtract(7, 'hours')
        const duration = moment.duration(secondDate.diff(firstDate));
        return duration.asSeconds()
    }
}

export default DateUtils;
