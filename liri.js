var Twitter = require('twitter');
var twitterKeys = require('./keys.js');
var spotify = require('spotify');
var request = require("request");
var fs = require("fs");

console.log('test');

// var to hold user input
var req = process.argv[2];
var name = process.argv[3];