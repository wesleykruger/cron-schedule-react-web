import React from 'react';
import logo from './logo.svg';
import './App.css';
import ScheduleContainer from './components/schedule-container/schedule-container'
import ReadBtn from './components/upload-file/upload-file'
import MyCalendar from './components/calendar/calendar'

function App() {
  return (
    <div className="App">
      <ScheduleContainer />
      <MyCalendar />
    </div>
  );
}

export default App;
