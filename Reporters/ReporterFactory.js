const ScannerReporter = require('./ScannerReporter');
const ApexTestReporter = require('./ApexTestReporter');
const BuildLogReporter = require('./BuildLogReporter');

class ReporterFactory {

    static getReporter(mode) {
        let reporter = null;
        if(mode == 'scanner'){
            reporter = new ScannerReporter();
        }
        else if(mode == 'apextest'){
            reporter = new ApexTestReporter();
        }
        else if(mode == 'buildlog'){
            reporter = new BuildLogReporter();
        }
        return reporter;
    }
}

module.exports = ReporterFactory;