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

const input = getArgValue('-i');
const output = getArgValue('-i', './results.md');
let summaryCategories = {};
let summarySeverity = {};
let totalFailures = 0;
if(input != null){
    var resultsData = JSON.parse(fs.readFileSync(input, 'utf8'));

    resultsData.forEach( (file) => {
        file.violations.forEach( (violation) => {
            let oldVal = summaryCategories[violation.category] | 0;
            summaryCategories[violation.category] = oldVal + 1;

            oldValsev = summarySeverity[violation.severity] | 0;
            summarySeverity[violation.severity] = oldValsev + 1;
        });

        totalFailures += file.violations.length;
    });

    //console.log('------ summarizedData = ' + JSON.stringify(summaryCategories));
    //console.log('------ summarySeverity = ' + JSON.stringify(summarySeverity));

    outputSummary();
}
else{
    console.log('Error: Input file needed');
}

function outputSummary() {
    console.log("### Testing Summary:");
    console.log(" ");
    console.log("> :no_entry_sign: " + totalFailures + " Failed test(s)");
    Object.keys(summaryCategories).forEach( (category) => {
        console.log("- " + category + " : " + summaryCategories[category]);
    });
}