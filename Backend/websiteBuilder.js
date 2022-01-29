var exec = require('child_process').exec;
var fs = require('fs');

const cluster = "mainnet-beta";
const RPC = "https://api.mainnet-beta.solana.com";

const addContent = () => {}

const styleWebsite = () => {}

const updateIndexHTMLandManifest = () => {}

const addFavicon = () => {}

const writeWebsiteUsingSuppliedData = () => {
    addFavicon();
    updateIndexHTMLandManifest();
    styleWebsite();
    addContent();
}

const websiteBuilder = (projectName, candyMachineID) => {
    // create new branch

    //git checkout -b projectName
    exec(`echo ${projectName}`,
        function (error, stdout, stderr) {
            //should handle this
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

    // sets update ENV file
    const envContents = `CLUSTER=${cluster}\nRPC=${RPC}\nCMID=${candyMachineID}`;

    try {
        fs.writeFileSync('.env', envContents);
        //file written successfully
    } catch (err) {
        console.error(err);
    }

    // add all files and values in code
    writeWebsiteUsingSuppliedData();

    // git add ., commit and push to our repo
    exec(`echo ${projectName}`,
        function (error, stdout, stderr) {
            //should handle this
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

    // deploy somewhere
}

websiteBuilder("penis", "1235");

module.exports = { websiteBuilder };