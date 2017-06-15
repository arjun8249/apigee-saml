function addHours(d,h) {
  var d1 = new Date();
  d1.setTime(d.getTime() + h * 60 * 60 * 1000); 
  return d1;
}

var now = new Date();
var later = addHours(now, 1); 

//var dateFormatted = later.getFullYear() + "-" + later.getMonth() + "-" + later.getDay() + "T" + later.getHours() + ":" + later.getMinutes() + ":" + later.getSeconds() + "Z";
context.setVariable("mysaml.now", dateFormat(now, "isoUtcDateTime"));
context.setVariable("mysaml.expiry", dateFormat(later, "isoUtcDateTime"));