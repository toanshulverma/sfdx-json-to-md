#!/usr/bin/env node
const fs = require("fs");

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
const output = getArgValue('-i', './results.md');
const mode = getArgValue('-m');

let summaryCategories = {};
let summarySeverity = {};
let totalFailures = 0;
let totalTests = 0;
let totalTime = '';


if(input != null){
    if(mode == 'scanner'){
        parseScannerLogs(input);
        outputScannerSummary();
    }
    else if(mode == 'apextest'){
        parseApexTestLogs(input);
        outputApexTestSummary();
    }
}
else{
    console.log('Error: Input file needed');
}

function parseScannerLogs(logFile){
    var resultsData = JSON.parse(fs.readFileSync(logFile, 'utf8'));

    resultsData.forEach( (file) => {
        file.violations.forEach( (violation) => {
            let oldVal = summaryCategories[violation.category] | 0;
            summaryCategories[violation.category] = oldVal + 1;

            oldValsev = summarySeverity[violation.severity] | 0;
            summarySeverity[violation.severity] = oldValsev + 1;
        });

        totalFailures += file.violations.length;
    });
}

function parseApexTestLogs(logFile){
    var resultsData = JSON.parse(fs.readFileSync(logFile, 'utf8'));

    const isFailed = (resultsData.result.outcome == 'Failed');
    totalFailures = resultsData.result.summary.failing;
    totalTests = resultsData.result.summary.testsRan;
    totalTime = resultsData.result.summary.testTotalTime;

    summaryCategories = resultsData.result.tests;
}

function outputScannerSummary() {
    console.log("### Testing Summary:");
    console.log(" ");
    console.log("> :no_entry_sign: " + totalFailures + " code scanning issues/wanrings");
    Object.keys(summaryCategories).forEach( (category) => {
        console.log("- " + category + " : " + summaryCategories[category]);
    });
}

function outputApexTestSummary() {
    console.log("### Testing Summary:");
    console.log(" ");
    if(totalFailures > 0){
        console.log("> :no_entry_sign: FAIL. " + totalFailures + " Failed test(s)");
        console.log(" ");
        console.log("**Total Tests**: " + totalTests);
        console.log(" ");
        console.log("**Failures**: " + totalFailures);
        console.log(" ");
        console.log("**Total Execution time**: " + totalTime);
        console.log("### Faliure Details ###");
        console.log(" ");

        console.log("| Test Method | Execution time (ms) | Failure Message |");
        console.log("|--|--|--|");
        summaryCategories.forEach( (testResult) => {
            if(testResult.Outcome == 'Fail'){
                console.log("| " + testResult.FullName + " | " + testResult.RunTime + " | " + testResult.Message + " |");
            }
        });
    }
    else{
        console.log("> :white_check_mark: PASS");
    }
}