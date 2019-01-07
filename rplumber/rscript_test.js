#!/usr/bin/env node
var R = require("r-script");

// sync
var out = R("rplumber/ex-sync.R")
    .data("hello world", 20)
    .callSync();
console.log(out);