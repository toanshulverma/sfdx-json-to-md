#!/usr/bin/env node
const fs = require("fs");
const core = require('@actions/core');

//const scannerReporter = require("./bin/ScannerReporter");
//const apexTestReporter = require("./bin/ApexTestReporter");
//const buildLogReporter = require("./bin/BuildLogReporter");

const ScannerReporter = require('./ScannerReporter');
const ApexTestReporter = require('./ApexTestReporter');
const BuildLogReporter = require('./BuildLogReporter');


function getArgValue(argName, defaultValue){
    // Checks for given argument and if it has a value
    const argIndex = process.argv.indexOf(argName);
    let argVal = defaultValue;

    if (argIndex > -1) {
        // Retrieve the value after given argument
        argVal = process.argv[argIndex + 1];
    }

    return argVal;
}

// READ ARGUMENTS
const input = getArgValue('-i');
//const output = getArgValue('-i', './results.md');
const mode = getArgValue('-m');

// let summaryCategories = {};
// let summarySeverity = {};
// let totalFailures = 0;
// let totalTests = 0;
// let totalTime = '';


if(input != null){
    //let mdReport = ''
    let reporter = {};
    if(mode == 'scanner'){
        reporter = new ScannerReporter();
    }
    else if(mode == 'apextest'){
        reporter = new ApexTestReporter();
    }
    else if(mode == 'buildlog'){
        reporter = new BuildLogReporter();
    }
    let mdReport = reporter.generateReport(input);
    core.setOutput("REPORT", mdReport);
}
else{
    console.log('Error: Input file needed');
}