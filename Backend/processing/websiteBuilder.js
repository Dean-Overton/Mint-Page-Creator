var exec = require('child_process').exec;
var fs = require('fs');

/*THIS FILE NEEDS TO BE NEXT TO THE .git of the default website*/

const cluster = "mainnet-beta";

//TODO: change this to custom RPC
const RPC = "https://api.mainnet-beta.solana.com";

//what needs to come from web form for this script
/*
projectname
favicon
logo192.png
bgimg
mobilebgimg
color for title on bg
*/

const writeToFileByReplacing = (fileName, lineNumber, replacementString) =>{
    var data = fs.readFileSync(fileName).toString().split("\n");
    data.splice(lineNumber, 1, replacementString);
    var text = data.join("\n");

    fs.writeFile(fileName, text, function (err) {
        if (err) return console.log(err);
    });
}

const addContent = (discordLink, twitterLink, projectName, projectDescription, mintTime) => {
    //mintTime has to be format: '30 Jan 2022 06:34:00 GMT'

    //examples:
    //title/info
    writeToFileByReplacing("./src/pages/Mint.tsx", 74, `<h1>${projectName}</h1>`);
    writeToFileByReplacing("./src/pages/Mint.tsx", 76, `<h2 style={{fontSize:\"2em\"}}>${projectDescription}</h2>`);
    
    //social medias: 
    writeToFileByReplacing("./src/pages/MintNav.tsx", 16, `<a href=\"${discordLink}\">`);
    writeToFileByReplacing("./src/pages/MintNav.tsx", 21, `<a href=\"${twitterLink}\">`);
    
    //chuck in time for countdown: userSettings.tsx
    //line: 59 countdownTo: date("30 Jan 2022 06:34:00 GMT"),
    writeToFileByReplacing("./src/pages/Minting/userSettings.tsx", 
                            58, 
                            `countdownTo: date(\"${mintTime}\"),`);
    //line 140: startDate: date("30 Jan 2022 06:34:00 GMT"),
    writeToFileByReplacing("./src/pages/Minting/userSettings.tsx", 
                            139, 
                            `startDate: date(\"${mintTime}\"),`);
}

const styleWebsite = (highlightColour, socialsColour, mintColour, mintTextColour) => {
    //TODO:
    //move font file into file
    
    //bg images in css: index.css
    //background-image: url(images/hero.png); line-150
    // writeToFileByReplacing("./src/index.css", 
    //                         149, 
    //                         "background-image: url(images/hero.png);");
    // //background-image: url(images/heroMobile.png); line-203
    // writeToFileByReplacing("./src/index.css", 
    //                         202, 
    //                         "background-image: url(images/heroMobile.png);");

    //colours of button, navbar highlights: navbar.tsx, navbar.css
    writeToFileByReplacing("./src/pages/Navbar.css", 
            53, 
            `color: ${highlightColour};`);
    //for highlight of socials

    //line 23: box-shadow: inset 0 -5px 0 0 #fba5d3;
    //TODO: add this back after
    // writeToFileByReplacing("./src/pages/Navbar.css", 
    //         22, 
    //         "box-shadow: inset 0 -5px 0 0 #fba5d3;");

    //line: 58 for actual colour of socials color: #292929;
    writeToFileByReplacing("./src/pages/Navbar.css", 
            57, 
            `color: ${socialsColour};`);

    // connect button color: Minter.tsx
    // background: red; line 43
    writeToFileByReplacing("./src/pages/Minting/Minter.tsx", 
            42, 
            `background: ${mintColour};`);
    // color: white; line 44
    writeToFileByReplacing("./src/pages/Minting/Minter.tsx", 
            43, 
            `color: ${mintTextColour};`);

    // mint button color: MintButton.tsx
    // background: red; line 17
    writeToFileByReplacing("./src/pages/Minting/MintButton.tsx", 
            16, 
            `background: ${mintColour};`);
    // color: white; line 18
    writeToFileByReplacing("./src/pages/Minting/MintButton.tsx", 
            17, 
            "color: white;");

    //color: #292929; line: 159 this is the colour of the title/info
    writeToFileByReplacing("./src/index.css", 
            158, 
            `color: ${mintTextColour};`);
}

const updateIndexHTMLandManifest = (projectName) => {
    //change index.html
    //line 10: content="The official Kool Koalas minting website."
    writeToFileByReplacing("./public/index.html", 
                            9, 
                            `content=\"The official ${projectName} minting website.\"`);
    //line 38: <title>Kool Koalas</title>
    writeToFileByReplacing("./public/index.html", 
                            37, 
                            `<title>${projectName}</title>`);

    //change manifest.json
    //"short_name", "name" in json object
    writeToFileByReplacing("./public/manifest.json", 
                            1, 
                            `"short_name": "${projectName}"`);
    writeToFileByReplacing("./public/manifest.json", 
                            2, 
                            `"short_name": "${projectName} NFT"`);
}

const addImages = (walletAddress) => {
    //from ./submitted/walletAddress to new places and delete folder then

    //move bg images to correct place: ./src/images/hero(Mobile).png

    // move favicon and rename
    //favicon.ico

    // move logo192.png
}

const readInAllData = (walletAddress) => {
    fs.readFile(`./submitted/${walletAddress}/data.json`, "utf8", (err, jsonString) => {
        if (err) {
          console.log("Error reading data.json from disk:", err);
          return;
        }
        try {
          const data = JSON.parse(jsonString);
          console.log("Data read in for address :", walletAddress, data); // => "Customer address is: Infinity Loop Drive"
          return data;
        } catch (err) {
          console.log("Error parsing JSON string:", err);
          process.exit(1);
        }
      });    
}

const writeWebsiteUsingSuppliedData = (walletAddress) => {
    let data = readInAllData(walletAddress); 
    addImages(walletAddress);
    updateIndexHTMLandManifest(data["projectName"]);
    styleWebsite(data["highlightColour"], 
                 data["socialsColour"], 
                 data["mintColour"], 
                 data["mintTextColour"]);
    addContent(data["discordLink"], 
                data["twitterLink"], 
                data["projectName"], 
                data["projectDescription"], 
                data["mintTime"]
                );
            }

const buildWebsite = (walletAddress, candyMachineID) => {
    // create new branch

    //git checkout -b projectName
    exec(`git checkout -b ${walletAddress}`,
        function (error, stdout, stderr) {
            //should handle this
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
                process.exit(1);
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
    writeWebsiteUsingSuppliedData(walletAddress);

    // git add ., commit and push to our repo
    // git add .
    exec(`git add .`,
        function (error, stdout, stderr) {
            //should handle this
            // console.log('stdout: ' + stdout);
            // console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
                process.exit(1);
            }
        });

    // git commit -m "First commit"
    exec(`git commit -m "First commit`,
        function (error, stdout, stderr) {
            //should handle this
            // console.log('stdout: ' + stdout);
            // console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
                process.exit(1);
            }
        });

    // git push --set-upstream origin ${projectName}
    exec(`git push --set-upstream origin ${walletAddress}`,
        function (error, stdout, stderr) {
            //should handle this
            // console.log('stdout: ' + stdout);
            // console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
                process.exit(1);
            }
        });

    // deploy somewhere

    // clean up
    // git checkout master
    exec(`git checkout TemplateForAutomation`,
        function (error, stdout, stderr) {
            //should handle this
            // console.log('stdout: ' + stdout);
            // console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
                process.exit(1);
            }
        });
}

buildWebsite("test", "1234");

module.exports = { websiteBuilder };