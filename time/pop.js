const data = require("./data");
const moment = require('moment');

console.log("========= input ==========");
for (const i in data) {
    if (i == 0) {
        console.log(i + ' ' + moment(data[i].time).format('YYYY-MM-DD HH:mm') + ' <<< timeCurrent');
    }
    else {
        console.log(i + ' ' + moment(data[i].time).format('YYYY-MM-DD HH:mm'));
    };
};

console.log("========= output ==========");
let next_time = null;
for (const i in data) {
    let hour = moment(data[i].time).startOf('hour');
    let time_diff;
    if (next_time === null) {
        console.log(i, moment(data[i].time).format('YYYY-MM-DD HH:mm'));
        next_time = moment(data[i].time);
    }
    else {
        time_diff = Math.abs(moment(data[i].time).diff(next_time, 'minute'));
        if ((120 > time_diff && time_diff > 30) || (time_diff > 120)) {
            console.log(i, moment(data[i].time).format('YYYY-MM-DD HH:mm'));
            next_time = moment(data[i].time);
        };
    };

    console.log('===========================');
};