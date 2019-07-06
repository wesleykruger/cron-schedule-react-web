import React, { useState, useEffect } from "react";
import ScheduleItem from "./../schedule-item/schedule-item";
import ReadBtn from "./../upload-file/upload-file";
import { Button } from "reactstrap";
const cronParser = require("cron-parser");
const fs = require("fs");
const readline = require("readline");

function ScheduleContainer() {
  const [cronDict, setCronDict] = useState([]);

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  // useEffect(() => {
  // })

  function parseCronObj(cronObjArr) {
    let scheduleArray = [];
    console.log(cronObjArr);
    for (let i in cronObjArr) {
      let currentCronName = cronObjArr[i].name;
      console.log('my cron name: ' + currentCronName);

      let currentCronExp = cronObjArr[i].cronExp;
      let options = {
        currentDate: dateTime,
        utc: true,
        endDate: new Date("15 July 2019 18:40:00 UTC"),
        iterator: true
      };

      try {
        let interval = cronParser.parseExpression(currentCronExp, options);
        while (true) {
          try {
            let obj = interval.next();
            scheduleArray.push({
                name: currentCronName,
                runTime: obj.value.toString()
            });
          } catch (e) {
            console.log(e);
            break;
          }
        }
      } catch (err) {
        console.log("Error: " + err.message);
      }
    }
    console.log(scheduleArray);
    return scheduleArray;
  }

  function ReadFile() {
    let myFile;
    let lookForCron = false;
    if (document.getElementById("inputFileToLoad").files.length > 0) {
      myFile = document.getElementById("inputFileToLoad").files[0];
    }
    if (myFile) {
      let reader = new FileReader();
      reader.onload = function(fileLoadedEvent) {
        let lines = fileLoadedEvent.target.result.split("\n");
        let cronObj = {};
        var cronObjArr = [];
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
              let cronTitle = lines[line].substring(
                0,
                lines[line].indexOf("=")
              );
              console.log(cronTitle);
              //let value = lines[line].substring(lines[line].indexOf("=") + 1);
              lookForCron = false;
              //cronDict[cronTitle] = value;
              cronObj.name = lines[line].substring(0, lines[line].indexOf("="));
              cronObj.description = tempDesc.join("\n");
              cronObj.cronExp = lines[line].substring(
                lines[line].indexOf("=") + 1
              );
              //descriptionDict[cronTitle] = tempDesc.join('\n');
              tempDesc = [];
              cronObjArr.push(cronObj);
              cronObj = {};
            }
          }
        }
        let parsedCronSchedule = parseCronObj(cronObjArr);
        setCronDict(parsedCronSchedule);
      };
      reader.readAsText(myFile);
    }
  }

  return (
    <div>
      <input id="inputFileToLoad" type="file" />
      {cronDict.map(cronObj => (
        <li> {cronObj.name}: {cronObj.runTime} </li>
      ))}{" "}
      <Button onClick={() => ReadFile()}>Execute</Button>
      <h1>BREAK</h1>
      {/* {cronDict.map(vals => {
          Object.keys(cronDict).map((key, index) => ( 
            <p key={index}> this is my key {key} and this is my value {cronDict[key]}</p> 
        ))})} */}
    </div>
  );
}

export default ScheduleContainer;
