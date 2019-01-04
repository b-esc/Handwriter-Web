#!/usr/bin/env node
var R = require("r-script");

// sync
var out = R("r_code/test.R").callSync();


console.log(out);