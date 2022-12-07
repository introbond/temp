const moment = require('moment');
const rawData = require('./rawData');
const output = [];

console.log(`data length = ${rawData.length}`);
for (const i in rawData) {
    console.log(rawData[i].time);
}