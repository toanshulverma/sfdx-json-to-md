const fs = require("fs");

class ApexTestReporter {

    summaryCategories = {};
    //summarySeverity = {};
    totalFailures = 0;
    totalTests = 0;
    totalTime = '';
    logContent = '';

    generateReport(logFile) {
        this.parse(logFile);
        this.generateSummary();
        return this.logContent;
    }

    addToLog(log){
        this.logContent += log + '<br/>';
        console.log(log);
    }

    parse(logFile){
        var resultsData = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    
        const isFailed = (resultsData.result.outcome == 'Failed');
        this.totalFailures = resultsData.result.summary.failing;
        this.totalTests = resultsData.result.summary.testsRan;
        this.totalTime = resultsData.result.summary.testTotalTime;
    
        this.summaryCategories = resultsData.result.tests;
    }

    generateSummary() {
        this.addToLog("### Testing Summary:");
        this.addToLog(" ");
        if(this.totalFailures > 0){
            this.addToLog("> :no_entry_sign: FAIL. " + this.totalFailures + " Failed test(s)");
            this.addToLog(" ");
            this.addToLog("**Total Tests**: " + this.totalTests);
            this.addToLog(" ");
            this.addToLog("**Failures**: " + this.totalFailures);
            this.addToLog(" ");
            this.addToLog("**Total Execution time**: " + this.totalTime);
            this.addToLog("### Faliure Details ###");
            this.addToLog(" ");
    
            this.addToLog("| Test Method | Execution time (ms) | Failure Message |");
            this.addToLog("|--|--|--|");
            this.summaryCategories.forEach( (testResult) => {
                if(testResult.Outcome == 'Fail'){
                    this.addToLog("| " + testResult.FullName + " | " + testResult.RunTime + " | " + testResult.Message + " |");
                }
            });
        }
        else{
            this.addToLog("> :white_check_mark: Apex Test Classes Executions PASS");
        }
    }
}

module.exports = ApexTestReporter;