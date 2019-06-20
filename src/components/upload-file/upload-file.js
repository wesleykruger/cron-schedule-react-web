import React, { useState } from 'react';
import { emptyStatement } from '@babel/types';
const fs = require('fs');
const readline = require('readline');

function ReadBtn() {
    const [cronArr, setCronArr] = useState([]);
    const [descArr, setDescArr] = useState([]);
    // read file line by line after button press in this component
    // hook into global state and push array of cron jobs
    // read cron jobs in schedule async, display if not empty
    return (
        <div>
            <input id="inputFileToLoad" type="file" onChange={() => ReadFile()} />
        </div>
    )
}

function ReadFile() {
    let myFile;
    let lookForCron = false;
    if (document.getElementById('inputFileToLoad').files.length > 0) {
        myFile = document.getElementById('inputFileToLoad').files[0];
    }

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
        // setCronArr(cronArray);
        console.log(descriptionArray)
        setDescArr(descriptionArray);
    }
    reader.readAsText(myFile);
}

export default ReadBtn;