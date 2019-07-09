import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

const MyCalendar = props => (
  <div>
    <Calendar
      localizer={localizer}
      events={[
        {
          start: new Date(),
          end: new Date(moment().add(1, "days")),
          title: "Some title"
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