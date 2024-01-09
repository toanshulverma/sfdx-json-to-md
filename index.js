const core = require('@actions/core')
const exec = require('child_process').exec
const fs = require('fs')
const helper = require("./bin/sfdx-json-to-md")

try {
    install();
} catch (error) {
    core.setFailed(error.message)
}

function install(){
    var download = 'npm install -g .'
    exec( download, function(error, stdout, stderr){
        if(error) throw(stderr)
        core.info(stdout);
    });
}
