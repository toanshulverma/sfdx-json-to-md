const fs = require("fs");

class ScannerReporter {
    
    summaryCategories = {};
    summarySeverity = {};
    totalFailures = 0;
    logContent = '';

    addToLog(log){
        this.logContent += log + '<br/>';
        console.log(log);
    }

    generateReport(logFile) {
        this.parse(logFile);
        this.generateSummary();
        return this.logContent;
    }

    parse(logFile){
        var resultsData;
        
        try{
            resultsData = JSON.parse(fs.readFileSync(logFile, 'utf8'));
        }catch(e){
            console.error('Error : Unable to read input file: ' + logFile);
            process.exit(1);
        }
        
        var _self = this;

        resultsData.forEach( (file) => {
            file.violations.forEach( (violation) => {
                let oldVal = _self.summaryCategories[violation.category] | 0;
                _self.summaryCategories[violation.category] = oldVal + 1;

                let oldValsev = summarySeverity[violation.severity] | 0;
                _self.summarySeverity[violation.severity] = oldValsev + 1;
            });

            _self.totalFailures += file.violations.length;
        });
    }

    generateSummary() {
        this.addToLog("### Testing Summary:");
        this.addToLog(" ");
        this.addToLog("> :no_entry_sign: " + this.totalFailures + " code scanning issues/wanrings");
        Object.keys(this.summaryCategories).forEach( (category) => {
            this.addToLog("- " + category + " : " + summaryCategories[category]);
        });
    }
}

module.exports = ScannerReporter;