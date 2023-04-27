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
if (args.n) { 
	lat = args.n;
}
else if (args.s) {
	lat = -args.s;
}
else {
	console.log('Latitude out of range');
}

if (args.e) {
	lon = args.e;
}
else if (args.w) {
	lon = -args.w;
}
else {
	console.log('Longitude out of range');
}
