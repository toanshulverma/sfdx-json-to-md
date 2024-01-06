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
    `curl -s https://api.github.com/repos/toanshulverma/sfdx-json-to-md/releases/latest | grep \"name\" | cut -d '"' -f 4 | awk '{print "https://github.com/toanshulverma/sfdx-json-to-md/archive/refs/tags/"$1".zip"}' | xargs wget -qO- -O latestutility.zip`
    var download = 'wget https://developer.salesforce.com/media/salesforce-cli/sfdx/channels/stable/sfdx-linux-x64.tar.xz -q -P /tmp'
    var createDir = 'mkdir /tmp/sfdx'
    var unzip = 'tar xJf /tmp/sfdx-linux-x64.tar.xz -C /tmp/sfdx --strip-components 1'
    var install = 'echo "/tmp/sfdx/bin" >> $GITHUB_PATH'
    var version = '/tmp/sfdx/bin/sfdx --version && /tmp/sfdx/bin/sfdx plugins --core'
    exec(download+' && '+createDir+' && '+unzip+' && '+install+' && '+version, function(error, stdout, stderr){
    if(error) throw(stderr)
        core.info(stdout)
        if(core.getInput('sfdx-auth-url')) createAuthFile()
    })
}
