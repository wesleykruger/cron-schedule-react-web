import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

const MyCalendar = props => (
  <div>
    <Calendar
      localizer={localizer}
      events={[{
        title: 'test',
        start: new Date("2019-07-09T10:00:00Z"),
        end: new Date("2019-07-09T12:00:00Z")
      }
      ]}
      startAccessor="start"
      endAccessor="end"
      localizer={localizer}
      defaultDate={new Date()}
      defaultView="month"
      style={{ height: "100vh" }}
    />
  </div>
)
export default MyCalendar;