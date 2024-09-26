
function isWeekDay(dateString) {
    var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var myDate = new Date(Date.parse(dateString.replace(/\-/g, "/")));
    return weekDay[myDate.getDay()];
}

function isWeekDay1(dateString) {
    var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    var myDate = new Date(Date.parse(dateString.replace(/\-/g, "/")));
    return weekDay[myDate.getDay()];
}
//获取指定时间的前几小时或者后几小时
function getTimeByHour(dateString,hour) {
    //var date1 = new Date(dateString);
    var date1 = new Date(Date.parse(dateString.replace(/\-/g, "/")));
    var frontOneHour = new Date(date1.getTime() - (hour * 60 * 60 * 1000));
    return frontOneHour.format("yyyy-MM-dd hh:mm:ss")
}

//获取指定时间的前几天或者后几天
function fun_date(dateString,num) {
   // var date1 = new Date(dateString);
    var date1 = new Date(Date.parse(dateString.replace(/\-/g, "/")));
    //今天时间
    var time1=""
    if((date1.getMonth() + 1)<10){
        if (date1.getDate()<10) {
            time1 = date1.getFullYear() + "-" +"0"+ (date1.getMonth() + 1) + "-" +"0"+ date1.getDate()
        }else {
            time1 = date1.getFullYear() + "-" +"0"+ (date1.getMonth() + 1) + "-" + date1.getDate()
        }
    }else {
        if (date1.getDate()<10) {
            time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-"+"0" + date1.getDate()
        }else {
            time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
        }

    }

    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + num);
    //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
    var time2="";
    if ((date2.getMonth() + 1)<10){
        if (date2.getDate()<10) {
            time2 = date2.getFullYear() + "-" +"0"+ (date2.getMonth() + 1) + "-"+"0" + date2.getDate();
        }else {
            time2 = date2.getFullYear() + "-" +"0"+ (date2.getMonth() + 1) + "-" + date2.getDate();
        }

    } else {
        if (date2.getDate()<10) {
            time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" +"0"+ date2.getDate();
        }else {
            time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
        }

    }
    return time2;
}

Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1,
        //month
        "d+": this.getDate(),
        //day
        "h+": this.getHours(),
        //hour
        "m+": this.getMinutes(),
        //minute
        "s+": this.getSeconds(),
        //second
        "q+": Math.floor((this.getMonth() + 3) / 3),
        //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

//获取两个时间范围天数 .replace(/\-/g,"/") 兼容苹果
function  getDaysBetween(dateString1,dateString2){
    var  startDate = Date.parse(dateString1.replace(/\-/g,"/"));
    var  endDate = Date.parse(dateString2.replace(/\-/g,"/"));
    var days=(endDate - startDate)/(1*24*60*60*1000);
    // alert(days);
    return  days;
}
//获取当前时间的前几天或后几天
function fun_date1(num) {
    var date1 = new Date();
    //今天时间
    var time1=""
    if((date1.getMonth() + 1)<10){
        if (date1.getDate()<10) {
            time1 = date1.getFullYear() + "-" +"0"+ (date1.getMonth() + 1) + "-" +"0"+ date1.getDate()
        }else {
            time1 = date1.getFullYear() + "-" +"0"+ (date1.getMonth() + 1) + "-" + date1.getDate()
        }
    }else {
        if (date1.getDate()<10) {
            time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-"+"0" + date1.getDate()
        }else {
            time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
        }

    }

    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + num);
    //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
    var time2="";
    if ((date2.getMonth() + 1)<10){
        if (date2.getDate()<10) {
            time2 = date2.getFullYear() + "-" +"0"+ (date2.getMonth() + 1) + "-"+"0" + date2.getDate();
        }else {
            time2 = date2.getFullYear() + "-" +"0"+ (date2.getMonth() + 1) + "-" + date2.getDate();
        }

    } else {
        if (date2.getDate()<10) {
            time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" +"0"+ date2.getDate();
        }else {
            time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
        }

    }
    return time2;
}

function getFormatDate() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentDate = date.getFullYear() + "-" + month + "-" + strDate
        + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return currentDate;
}