#!/usr/bin/env node
const fs = require("fs");
const scannerReporter = require("./bin/ScannerReporter");
const apexTestReporter = require("./bin/ApexTestReporter");
const buildLogReporter = require("./bin/BuildLogReporter");


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
    let mdReport = ''
    if(mode == 'scanner'){
        mdReport = scannerReporter.generateReport(input);
    }
    else if(mode == 'apextest'){
        mdReport = apexTestReporter.generateReport(input);
    }
    else if(mode == 'buildlog'){
        mdReport = buildLogReporter.generateReport(input);
    }

    core.setOutput("REPORT", mdReport);
}
else{
    console.log('Error: Input file needed');
}