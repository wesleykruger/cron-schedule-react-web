import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

const CronCalendar = props => (
  <div>
    <Calendar
      localizer={localizer}
      events={props.schedule}
      startAccessor="start"
      endAccessor="end"
      localizer={localizer}
      defaultDate={new Date()}
      defaultView="month"
      style={{ height: "100vh" }}
    />
  </div>
)
export default CronCalendar;