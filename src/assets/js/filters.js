// 转化发布时间
var format = require('date-format');
function formatTime(value) {
  let now = new Date().getTime();
  let nowDay = new Date(new Date().toLocaleDateString()).getTime()
  let nowYear = new Date().getFullYear()
  let nowYearTime = new Date(nowYear+"/01/01 00:00:00").getTime()
  let timestamp = new Date(value).getTime()
  let diffValue = now - timestamp;
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  
  
  if(diffValue < minute){
    return '刚刚'
  }
  else if( diffValue >= minute && diffValue < hour){
    let minutes = Math.floor(diffValue/minute)
    return minutes+'分钟前'
  }
  else if(diffValue >= hour && timestamp >= nowDay ){
    return format.asString('hh:mm', new Date(value));
  }
  else if(timestamp < nowDay && timestamp >= (nowDay-day) ){
    return '昨天'
  }
  else if(timestamp < (nowDay-day) && timestamp >= (nowDay-(day*6)) ){
    let days = Math.ceil((nowDay-timestamp)/day)
    return days+'天前'
  }
  else if(timestamp < (nowDay-(day*6)) && timestamp >= nowYearTime){
    return format.asString('MM-dd', new Date(value));
  }
  else{
    return format.asString('yyyy-MM-dd', new Date(value));
  }
}

// 将秒转化为xx:xx:xx格式的字符串
function durationToString(duration) {
  if (duration) {
    let hour = null;
    let minute = null;
    let seconds = null;
    let dur = parseInt(duration);
    
    if (dur >= 3600) {
      // 超过一小时
      hour = parseInt(dur / 3600);
      minute = parseInt(dur % 3600 / 60);
      seconds = dur % 3600 % 60;
    } else if (dur >= 60) {
      // 超过一分钟
      minute = parseInt(dur / 60);
      seconds = dur % 60;
    } else {
      // 一分钟以内
      minute = 0;
      seconds = dur;
    }
    
    return (hour ? hour + ':' : '') +
        (minute < 10 ? '0' + minute : minute) + ':' +
        (seconds < 10 ? '0' + seconds : seconds);
  }
}

// 时间戳转化为日期
function timeStampToDate(data,format) {
  if (data !== 0 && typeof data === 'number') {
    let length = data.toString().length;
    let date = 0;
    if (length === 10) {
      date = new Date(data * 1000);
    } else {
      date = new Date(data);
    }
    
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() ;
    let m = ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes()  : date.getMinutes()) ;
    let s = ':'+ (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    if(format){
      switch(format){
        case('yyyy-MM-dd hh:mm'):
        console.log(Y + M + D + h + m);
          return Y + M + D + h + m ;
        case('yyyy-MM-dd'):
          return Y + M + D ;
            
      }
      return false;
    }
    return Y + M + D + h + m + s;
  }
}

export{
  formatTime,
  durationToString,
  timeStampToDate
}
