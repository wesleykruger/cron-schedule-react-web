import React, { useState, useEffect } from 'react';
import ScheduleItem from './../schedule-item/schedule-item';
import ReadBtn from './../upload-file/upload-file';
import { async } from 'q';
const cronParser = require('cron-parser');
const fs = require('fs');
const readline = require('readline');

function ScheduleContainer() {


    const [cronArr, setCronArr] = useState([]);
    const [descArr, setDescArr] = useState([]);


    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    useEffect(() => {
        console.log('here')
        let myFile;
        let lookForCron = false;
        if (document.getElementById('inputFileToLoad').files.length > 0) {
            myFile = document.getElementById('inputFileToLoad').files[0];
        }
        if (myFile) {
            let reader = new FileReader();
            reader.onload = function (fileLoadedEvent) {
                let lines = fileLoadedEvent.target.result.split('\n');
                let descriptionArray = []
                let cronArray = []
                let tempDesc = []
                for (let line in lines) {
                    if (!lookForCron) {
                        if (lines[line].startsWith('#') && lines[line].indexOf('#Group=') === 0 && (lines[line].indexOf(';Cron job') > -1 || lines[line].indexOf(';Cron Job') > -1)) {
                            lookForCron = true;
                        }
                    } else {
                        if (lines[line].startsWith('#Description')) {
                            let value = lines[line].substring(lines[line].indexOf('=') + 1)
                            tempDesc.push(value);
                        } else if (!lines[line].startsWith('#')) {
                            let keyValue = lines[line].substring(0, lines[line].indexOf('='));
                            let value = lines[line].substring(lines[line].indexOf('=') + 1);
                            lookForCron = false;
                            cronArray.push({ keyValue: value })
                            descriptionArray.push({ keyValue: tempDesc.join('\n') })
                            tempDesc = []
                        }
                    }
                }
                console.log(cronArray);
                setCronArr(cronArray);
                console.log(cronArr);
                console.log(descriptionArray);
                setDescArr(descriptionArray);
                console.log(descArr)
            }
            reader.readAsText(myFile);
        }
    })

    let scheduleArray = []
    let testCron = '0/4 * * * *';
    let options = {
        currentDate: dateTime,
        utc: true,
        endDate: new Date('21 June 2019 18:40:00 UTC'),
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
            <ReadBtn />
            {scheduleArray.map((date) => (
                <li>{date}</li>
            ))}
        </div>
    );

}

export default ScheduleContainer;