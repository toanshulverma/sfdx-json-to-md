# sfdx-json-to-md
Report generator for SFDX logs

## What is this utility?
Folks using Github actions for Salesforce CD/CI activities may either not be using the actions workflow execution summary, or may be using some alternate solution. But, this utility can help you get a prettier view of your workflow summary. Example attached here:

![Sample Job summary of Github actions](./images/Final%20Summary.PNG "Sample Job summary of Github actions")

## How to install it (Locally)?
1. Clone this git repo
2. Open command prompt / terminal and switch to repo path
3. Run following command to install this utility

```
$> npm install -g ./sfdx-json-to-md-main
```

## How to install it (Runner Container)?
Add following step to your workflow YAML file
```
- name: Install reporting utility
    run: |
        wget https://codeload.github.com/toanshulverma/sfdx-json-to-md/zip/refs/heads/main -O sfdx-json-to-md-main.zip
        unzip ./sfdx-json-to-md-main.zip -d .
        npm install -g ./sfdx-json-to-md-main
```

## How to use it 
Simply run the utility by passing two parameters
- Input file: Report/Log file to be parsed
- Mode: Type of execution (run apex tests, run static code analysis etc.)

Following Mode types are available
| Mode Name | Purpose |
|--|--|
|apextest|Log generated for apex test execution using ***sf apex run test***|
|buildlog|Report generated for a validation deployment using ***sf package deploy validate*** command  |
|scanner| Report generated for static code analysis using [sfdx-scanner](https://forcedotcom.github.io/sfdx-scanner/)|


### Generate markdown summary for Apex Test execution

#### Pre-Requisite
- Generate log file using ***sf apex run test*** (feel free to use any name for log file)
```
sf apex run test --test-level RunLocalTests -w 30 -o [TARGET ORG] -r json > apextestrunresults.json
```
#### Usage
- Generate markdown summary
```
node ./bin/sfdx-json-to-md -i ./apextestrunresults.txt -m apextest
```

### Generate markdown summary for Deployment Validation

#### Pre-Requisite
- Generate log file using ***sf package deploy validate*** (feel free to use any name for log file)
```
sf project deploy validate --source-dir ./force-app --test-level RunLocalTests --target-org [TARGET ORG] --json > validationjobdetails.json
```
#### Usage
- Generate markdown summary
```
node ./bin/sfdx-json-to-md -i ./validationjobdetails.json -m buildlog
```

### Generate markdown summary for SFDX Scanner report

#### Pre-Requisite
- Generate log file using ***sf package deploy validate*** (feel free to use any name for log file)
```
sf scanner run --format json -t ./force-app -o ./apexscannerresults.json
```
#### Usage
- Generate markdown summary
```
node ./bin/sfdx-json-to-md -i ./apexscannerresults.json -m scanner
```