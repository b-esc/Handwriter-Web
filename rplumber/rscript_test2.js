#!/usr/bin/env node
var R = require("r-script");

// sync
var out = R("rplumber/test.R").callSync();


console.log(out);
//https://www.rplumber.io/docs/routing-and-input.html#endpoints