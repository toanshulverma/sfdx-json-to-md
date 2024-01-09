#!/usr/bin/env node
const fs = require("fs");
const core = require('@actions/core');

const ScannerReporter = require('../Reporters/ScannerReporter');
const ApexTestReporter = require('../Reporters/ApexTestReporter');
const BuildLogReporter = require('../Reporters/BuildLogReporter');


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
const mode = getArgValue('-m');

if(mode == null || mode == ''){
    console.log('Error: Mode is missing');
}

if(input != null){
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
    //core.setCommandEcho(false);
    //core.setOutput("REPORT", mdReport);
    //core.setCommandEcho(true);
}
else{
    console.log('Error: Input file needed');
}