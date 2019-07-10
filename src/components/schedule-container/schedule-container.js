import React, { useState, useEffect } from "react";
import ReadBtn from "./../upload-file/upload-file";
import { Button } from "reactstrap";
import CronCalendar from './../calendar/calendar'
import DatePicker from "react-datepicker";

const cronParser = require("cron-parser");

function ScheduleContainer() {
  const [cronDict, setCronDict] = useState([]);
  const [endDate, setEndDate] = useState(new Date())

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  function parseCronObj(cronObjArr) {
    let scheduleArray = [];
    for (let i in cronObjArr) {
      let currentCronName = cronObjArr[i].name;
      let currentCronExp = cronObjArr[i].cronExp;
      let options = {
        currentDate: dateTime,
        utc: true,
        endDate: endDate,
        iterator: true
      };

      try {
        let interval = cronParser.parseExpression(currentCronExp, options);
        while (true) {
          try {
            let obj = interval.next();
            scheduleArray.push({
                title: currentCronName,
                start: obj.value._date._d,
                end: obj.value._date._d
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
              lookForCron = false;
              cronObj.name = lines[line].substring(0, lines[line].indexOf("="));
              cronObj.description = tempDesc.join("\n");
              cronObj.cronExp = lines[line].substring(
                lines[line].indexOf("=") + 1
              );
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

  function handleDateChange(date) {
      console.log(date);
    setEndDate(date);
  }

  return (
    <div>
      <ReadBtn />
      <DatePicker
        selected={endDate}
        onChange={handleDateChange}
        />
      <Button onClick={() => ReadFile()}>Execute</Button>
      <h1>Cron Schedule</h1>
      <CronCalendar schedule={cronDict} />
    </div>
  );
}

export default ScheduleContainer;
