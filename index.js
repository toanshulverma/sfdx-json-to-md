const core = require('@actions/core')
const exec = require('child_process').exec

try {
    let inputFile = core.getInput("InputFile");
    let mode = core.getInput("Mode");
    var command = 'node ./sfdx-json-to-md -i ' + inputFile + ' -m ' + mode;
    exec( command, function(error, stdout, stderr){
        if(error) throw(stderr)
        core.info(stdout);
    });
} catch (error) {
    core.setFailed(error.message)
}