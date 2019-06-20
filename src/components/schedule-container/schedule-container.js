import React from 'react';
import ScheduleItem from './../schedule-item/schedule-item';
import { async } from 'q';
const cronParser = require('cron-parser');
const fs = require('fs');
const readline = require('readline');

// const [cronArr, setCronArr] = useState[0];
// const [descArr, setDescArr] = useState[1];

function ScheduleContainer() {

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    // useEffect(() => {
    //     if (cronArr.length > 0) {
    //         console.log(cronArr);
    //     }
    // })

    let scheduleArray = []
    let testCron = '0 * * * *';
    let options = {
        currentDate: dateTime,
        utc: true,
        endDate: new Date('Fri, 21 June 2019 18:40:00 UTC'),
        iterator: true
    }

    try {
        let interval = cronParser.parseExpression(testCron, options);

        while (true) {
            try {
                let obj = interval.next();
                scheduleArray.push(obj.value.toString());
            } catch (e) {
                break;
            }
        }

    } catch (err) {
        console.log('Error: ' + err.message);
    }

    return (
        <div>
            {scheduleArray.map((date) => (
                <li>{date}</li>
            ))}
        </div>
    );

}

export default ScheduleContainer;