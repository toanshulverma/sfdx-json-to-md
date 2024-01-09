const fs = require("fs");

class BuildLogReporter {

    logContent = '';
    totalFailures = 0;
    generateReport(logFile) {
        this.parse(logFile);
        return this.logContent;
    }

    addToLog(log){
        this.logContent += log + '<br/>';
        console.log(log);
    }

    parse(logFile){
        var resultsData = JSON.parse(fs.readFileSync(logFile, 'utf8'));

        const isSuccess = resultsData.result.success;
        this.totalFailures = resultsData.result.details.componentFailures.length;

        if(isSuccess){
            this.addToLog("> :white_check_mark: Build Validation PASS");
        }
        else{
            this.addToLog("### :no_entry_sign: Build Validation Failed");
            this.addToLog(" ");
            if(this.totalFailures > 0){
                this.addToLog("> " + this.totalFailures + " Component failures");
                this.addToLog(" ");
                this.addToLog("| Type | Name | Failure Message |");
                this.addToLog("|--|--|--|");
                resultsData.result.details.componentFailures.forEach( (failure) => {
                    this.addToLog("| " + failure.componentType + " | " + failure.fileName + " | " + failure.problem + " |");
                });
            }
            else{
                this.totalFailures = resultsData.result.details.runTestResult.failures.length;
                this.addToLog("> " + this.totalFailures + " Test class failures");
                this.addToLog(" ");
                this.addToLog("| Class | Method | Message |");
                this.addToLog("|--|--|--|");
                resultsData.result.details.runTestResult.failures.forEach( (failure) => {
                    let stackTrace = failure.stackTrace + '';
                    stackTrace = stackTrace.replace(/\n/g,'<br/>');
                    this.addToLog("| " + failure.name + " | " + failure.methodName + " | " + failure.message + ' <br/> ' + stackTrace + " |");
                });
            }
        }
    }
}

module.exports = BuildLogReporter;