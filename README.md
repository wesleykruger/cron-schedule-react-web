# React Cron Calendar

## Description
This was built to satisfy a business need to visualize when cron jobs will run on our active project sites. Our cron schedules are stored in properties files, mixed among large amounts of other data. Sample files have been uploaded into the resources directory. This program will allow you to upload one of those files, extract and parse the schedules of your various cron jobs, and will then display upcoming jobs in an easy-to-understand calendar view.

On a more personal level, I wanted to use this as a chance to practice React hooks and to build an application using entirely functional components.

## To Use
First, ensure that you have Node.js installed. Download this package, then navigate to its directory in your console. Run "npm i", then "npm start". The program will initialize on your localhost and can be viewed in your browser.

## TODO
This program still does not fully support nonstandard cron expressions. I would like to add support for these when I find a cron parser that can properly read them, but I have been seeing errors on all of them that I have tried in both Python and JavaScript. If you come across a package that can properly parse them, please let me know!

### Packages Used
* React-Datepicker (https://www.npmjs.com/package/react-datepicker)
* Cron-Parser (https://www.npmjs.com/package/cron-parser)
* React-Big-Calendar (https://github.com/intljusticemission/react-big-calendar)
* Moment.js (https://momentjs.com/)
