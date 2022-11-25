const data = require("./data");
const moment = require('moment');

console.log("========= start debug ==========");
const output = [];
let item = {};

console.log("========= input ==========");
for (const i in data) {
    if (i == 0) {
        console.log(i + ' ' + moment(data[i].time).format('YYYY-MM-DD HH:mm') + ' <<< timeCurrent');
    } else {
        console.log(i + ' ' + moment(data[i].time).format('YYYY-MM-DD HH:mm'));
    };
};

let timeCurrent = "";
let timePrevios = "";
let timeDiff = 0;
let movedIndex = 0;
for (const i in data) {
    if ((i == 0)) {
        timeCurrent = moment(data[i].time);
        timePrevios = moment(data[Number(i) + 1].time);
        timeDiff = timeCurrent.diff(timePrevios, 'minute');
        if ((timeDiff <= 30) && (moment(data[movedIndex].time).get('minute') <= 30)) {
            movedIndex = 0;
        } else if ((timeDiff <= 30) && (moment(data[movedIndex].time).get('minute') > 30)) {
            movedIndex = 1;
        };
        item = data[movedIndex];
    };

    if ((i != 0) && (i != (data.length - 1))) {
        timeCurrent = moment(data[movedIndex].time);
        timePrevios = moment(data[movedIndex + 1].time);
        timeDiff = timeCurrent.diff(timePrevios, 'minute');
        if (timeDiff <= 30) {
            movedIndex = movedIndex + 2;
        } else {
            movedIndex = movedIndex + 1;
        };
        item = data[movedIndex];
    };

    output.push(item);
    if (output.length >= 5) {
        break;
    };
};

console.log("========= output ==========");
for (const i in output) {
    console.log(moment(output[i].time).format('YYYY-MM-DD HH:mm'));
};
console.log("========= end debug ==========");