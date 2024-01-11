#!/usr/bin/env node
//const fs = require("fs");
const ReporterFactory = require('../Reporters/ReporterFactory');

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
    console.error('Error: Mode is missing');
}

if(input != null){
    let reporter = ReporterFactory.getReporter(mode);
    
    let mdReport = reporter.generateReport(input);
    
    if (require.main === module) {
        // put info in console log when in command line mode
        mdReport = mdReport.replace(/<br\/>/g,'\n');
        console.log(mdReport);
    }
    else{
        //core.setOutput("REPORT", mdReport);
    }
}
else{
    console.error('Error: Input file needed');
}