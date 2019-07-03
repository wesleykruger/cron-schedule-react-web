import React, { useState, useEffect } from "react";
import ScheduleItem from "./../schedule-item/schedule-item";
import ReadBtn from "./../upload-file/upload-file";
import { Button } from "reactstrap";
const cronParser = require("cron-parser");
const fs = require("fs");
const readline = require("readline");

function ScheduleContainer() {
  const [cronArr, setCronArr] = useState([]);
  const [descArr, setDescArr] = useState([]);
  const [test, setTest] = useState('unchanged');
  var dictArray = []

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  // useEffect(() => {
  // })

  function ReadFile() {
    let myFile;
    let overrideFile;
    let lookForCron = false;
    if (document.getElementById("inputFileToLoad").files.length > 0) {
      myFile = document.getElementById("inputFileToLoad").files[0];
    }
    if (document.getElementById("overrideFileToLoad").files.length > 0) {
      overrideFile = document.getElementById("overrideFileToLoad").files[0];
    }
    if (myFile) {
      let reader = new FileReader();
      reader.onload = function(fileLoadedEvent) {
        let lines = fileLoadedEvent.target.result.split("\n");
        var descriptionDict = {}
        var cronDict = {}
        let tempDesc = [];
        for (let line in lines) {
          if (!lookForCron) {
            if (
              lines[line].startsWith("#") &&
              lines[line].indexOf("#Group=") === 0 &&
              (lines[line].indexOf(";Cron job") > -1 ||
                lines[line].indexOf(";Cron Job") > -1)
            ) {
              lookForCron = true;
            }
          } else {
            if (lines[line].startsWith("#Description")) {
              let value = lines[line].substring(lines[line].indexOf("=") + 1);
              tempDesc.push(value);
            } else if (!lines[line].startsWith("#")) {
              let cronTitle = lines[line].substring(0, lines[line].indexOf("="));
              console.log(cronTitle);
              let value = lines[line].substring(lines[line].indexOf("=") + 1);
              lookForCron = false;
              cronDict[cronTitle] = value;
              descriptionDict[cronTitle] = tempDesc.join('\n');
              tempDesc = [];
            }
          }
        }
        dictArray.push(cronDict);
        dictArray.push(descriptionDict);
        setCronArr(dictArray);
    };
      reader.readAsText(myFile);
    //   if (overrideFile) {
    //     checkOverrides();
    //   }
    }
  }

  function checkOverrides(overrideArray) {
    for (let array in overrideArray) {
      console.log(overrideArray[array]);
    }
  }


  let scheduleArray = [];
  let testCron = "0,30 * * * *";
  let options = {
    currentDate: dateTime,
    utc: true,
    endDate: new Date("15 July 2019 18:40:00 UTC"),
    iterator: true
  };

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
    console.log("Error: " + err.message);
  }

  return (
    <div>
      <input id="inputFileToLoad" type="file" />
      <input id="overrideFileToLoad" type="file" />{" "}
      {cronArr.map(date => (
        <li> {date} </li>
      ))}{" "}
      <Button onClick={() => ReadFile()}>Execute</Button>
      <h1>BREAK</h1>
      {Object.keys(cronArr).map(name => (
            <Services categories={this.state.dict[name]}></Services>
          ))}
    </div>
  );
}

export default ScheduleContainer;
