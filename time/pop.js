const data = require("./data");
const moment = require('moment');

console.log("========= start debug ==========");
const output = [];
let item = {};

console.log("========= input ==========");
for (const i in data) {
    if (i == 0) {
        console.log(i + ' ' + moment(data[i].time).format('YYYY-MM-DD HH:mm') + ' <<< timeCurrent');
    }
    // if ((i >= 1) && (i <= 10)) {
    else {
        console.log(i + ' ' + moment(data[i].time).format('YYYY-MM-DD HH:mm'));
    };
};

let timeCurrent = "";
let timePrevios1 = "";
let timePrevios2 = "";
let timeDiff1 = 0;
let timeDiff2 = 0;
let movedIndex = 0;
for (const i in data) {
    if ((i == 0)) {
        timeCurrent = moment(data[i].time);
        timePrevios1 = moment(data[Number(i) + 1].time);
        timePrevios2 = moment(data[Number(i) + 2].time);
        timeDiff1 = timeCurrent.diff(timePrevios1, 'minute');
        timeDiff2 = timeCurrent.diff(timePrevios2, 'minute');
        if ((timeDiff1 <= 30) && (timeDiff2 > 30)) {
            movedIndex = 0;
        } else if ((timeDiff1 <= 30) && (timeDiff2 <= 30)) {
            movedIndex = 1;
        };

        item = data[movedIndex];
    }

    if ((i != 0) && (i != (data.length - 1))) {
        timeCurrent = moment(data[movedIndex].time);
        timePrevios1 = moment(data[movedIndex + 1].time);
        timePrevios2 = moment(data[movedIndex + 2].time);
        timeDiff1 = timeCurrent.diff(timePrevios1, 'minute');
        timeDiff2 = timeCurrent.diff(timePrevios2, 'minute');
        if (timeDiff1 <= 30) {
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


console.log("========= POP ==========");
let next_time = null
let is_prev = false
for (const i in data) {
    let hour = moment(data[i].time).startOf('hour')
    let time_diff
    if (next_time === null) {
        if (moment(data[i].time).diff(hour, 'minute') < 30) {
            // console.log("Con1")
            console.log(i, moment(data[i].time).format('YYYY-MM-DD HH:mm'))
            next_time = moment(data[i].time)
        } 
        // else if (moment(data[i].time).diff(hour, 'minute') < 60) {
        //     console.log("Con2")
        //     console.log(data[i].time)
        // };
    }
    else {
        // console.log(Math.abs(moment(data[i].time).diff(next_time, 'minute')))
        // if ((120 > time_diff && time_diff > 30) || (time_diff > 120)) {
            //     console.log(data[i].time)
            //     next_time = moment(data[i].time)
            // } toISOString
        if (!is_prev) {
            console.log("Start")
            time_diff = Math.abs(moment(data[i].time).diff(next_time, 'minute'))
            console.log(time_diff)
            if (60 >= time_diff && time_diff > 30) {
                console.log("Full Hours")
                console.log(i, moment(data[i].time).format('YYYY-MM-DD HH:mm'))
                next_time = moment(data[i].time)
            }
            else if (time_diff > 60) {
                console.log("Over Hours")
                console.log(i, moment(data[i].time).format('YYYY-MM-DD HH:mm'))
                next_time = moment(data[i].time)
                if (Math.abs(moment(data[i].time).diff(hour, 'minute')) > 30) {
                    console.log("Select Half")
                    is_prev = true
                }
            }
            else {
                console.log("Not Select")
            }
        }
        else {
            console.log("Mid")
            time_diff = Math.abs(moment(data[i].time).diff(hour, 'minute'))
            console.log(time_diff)
            if (time_diff < 30) {
                console.log(i, moment(data[i].time).format('YYYY-MM-DD HH:mm'))
                next_time = moment(data[i].time)
                is_prev = true
            }
            // else {
            //     time_diff = Math.abs(moment(data[i].time).diff(next_time, 'minute'))
            //     if (60 >= time_diff && time_diff > 30) {
            //         console.log("Full Hours")
            //         console.log(i, moment(data[i].time).format('YYYY-MM-DD HH:mm'))
            //         next_time = moment(data[i].time)
            //     }
            //     else if (time_diff > 60) {
            //         console.log("Over Hours")
            //         console.log(i, moment(data[i].time).format('YYYY-MM-DD HH:mm'))
            //         next_time = moment(data[i].time)
            //         if (Math.abs(moment(data[i].time).diff(hour, 'minute')) > 30) {
            //             console.log("Select Half")
            //             is_prev = true
            //         }
            //     }
            // }
            // if (time_diff < 30) {
            // }

            // if (Math.abs(moment(data[i].time).diff(hour, 'minute')) > 30) {
            //     console.log("Select Half")
            // }
            // else {
            //     is_prev = false
            // }
        }
        
    }
    console.log("+++++++++++++++++++++++++++++++++")
    // console.log("+++++++++++++++++++++++++++")
    // console.log(moment(i.time).diff(hour, 'minute'))
}
console.log(next_time)

console.log("========= output ==========");
for (const i in output) {
    console.log(moment(output[i].time).format('YYYY-MM-DD HH:mm'));
};
console.log("========= end debug ==========");