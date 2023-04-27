#!/usr/bin/env node

import minimist from 'minimist';
import fetch from 'node-fetch';
import moment from 'moment-timezone';
 
//the help text

var args = minimist(process.argv.slice(2));

if (args.h) {
	console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit`);
	process.exit(0);
}

//time zone
const timezone = moment.tz.guess();

//set longitude and latitude
let longitude=0 
let latitude=0 
if (args.n) { 
	latitude = args.n;
}
else if (args.s) {
	latitude = -args.s;
}
else {
	console.log('Latitude must be in range');
}

if (args.e) {
	longitude = args.e;
}
else if (args.w) {
	longitude = -args.w;
}
//else {
//	console.log('Longitude out of range');
//}
//request URL
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=weathercode,temperature_2m_max,precipitation_hours,windspeed_10m_max,winddirection_10m_dominant&current_weather=true&timezone=' + timezone);
//get data
const data = await response.json();
//set days 
const days = args.d;
if (days == 0) {
	console.log('today.');
}
else if (days > 1) {
	console.log('in ' + days + ' days.');
}
else {
	console.log('tomorrow');
}

// log out 
if (args.j) {
	console.log(data);
	process.exit(0);
}
