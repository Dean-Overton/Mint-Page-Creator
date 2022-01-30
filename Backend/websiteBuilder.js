var exec = require('child_process').exec;
var fs = require('fs');

/*THIS FILE NEEDS TO BE NEXT TO THE .git of the default website*/

const cluster = "mainnet-beta";

//TODO: change this to custom RPC
const RPC = "https://api.mainnet-beta.solana.com";

const writeToFileByReplacing = (fileName, lineNumber, replacementString) =>{
    var data = fs.readFileSync(fileName).toString().split("\n");
    data.splice(lineNumber, 1, replacementString);
    var text = data.join("\n");

    fs.writeFile(fileName, text, function (err) {
        if (err) return console.log(err);
    });
}

const addContent = () => {
    //can edit specific lines
    //https://stackoverflow.com/questions/30711184/how-can-i-change-a-specific-line-in-a-file-with-node-js

    //examples:
    //title/info
    writeToFileByReplacing("./src/pages/Mint.tsx", 74, "<h1>hey 1234</h1>");
    writeToFileByReplacing("./src/pages/Mint.tsx", 76, "<h2 style={{fontSize:\"2em\"}}>1,234 available</h2>");
    
    //social medias: 
    writeToFileByReplacing("./src/pages/MintNav.tsx", 16, "<a href=\"https://discord.gg/pXHKsJB9Sq\">");
    writeToFileByReplacing("./src/pages/MintNav.tsx", 21, "<a href=\"https://twitter.com/koolkoalasnft\">");
    
    //colours of button, navbar highlights: navbar.tsx, navbar.css
    writeToFileByReplacing("./src/pages/Navbar.css", 
                            53, 
                            "color: #80b0fd;");
    //for highlight of socials

    //line 23: box-shadow: inset 0 -5px 0 0 #fba5d3;
    writeToFileByReplacing("./src/pages/Navbar.css", 
                            22, 
                            "box-shadow: inset 0 -5px 0 0 #fba5d3;");

    //line: 58 for actual colour color: #292929;
    writeToFileByReplacing("./src/pages/Navbar.css", 
                            57, 
                            "color: #292929;");

    // connect button color: Minter.tsx
    // background: red; line 43
    writeToFileByReplacing("./src/pages/Minting/Minter.tsx", 
                            42, 
                            " background: red;");
    // color: white; line 44
    writeToFileByReplacing("./src/pages/Minting/Minter.tsx", 
                            43, 
                            "color: white;");

    // mint button color: MintButton.tsx
    // background: red; line 17
    writeToFileByReplacing("./src/pages/Minting/MintButton.tsx", 
                            16, 
                            "background: red;");
    // color: white; line 18
    writeToFileByReplacing("./src/pages/Minting/MintButton.tsx", 
                            17, 
                            "color: white;");
    
    //chuck in time for countdown: userSettings.tsx
    //line: 59 countdownTo: date("30 Jan 2022 06:34:00 GMT"),
    writeToFileByReplacing("./src/pages/Minting/userSettings.tsx", 
                            58, 
                            "countdownTo: date(\"30 Jan 2022 06:34:00 GMT\"),");
    //line 140: startDate: date("30 Jan 2022 06:34:00 GMT"),
    writeToFileByReplacing("./src/pages/Minting/userSettings.tsx", 
                            139, 
                            "startDate: date(\"30 Jan 2022 06:34:00 GMT\"),");
}

const styleWebsite = () => {
    //bg images in css: index.css
    //background-image: url(images/hero.png); line-150
    writeToFileByReplacing("./src/index.css", 
                            149, 
                            "background-image: url(images/hero.png);");
    //background-image: url(images/heroMobile.png); line-203
    writeToFileByReplacing("./src/index.css", 
                            202, 
                            "background-image: url(images/heroMobile.png);");

    //color: #292929; line: 159 this is the colour of the title/info
    writeToFileByReplacing("./src/index.css", 
                            158, 
                            "color: #292929;");
}

const updateIndexHTMLandManifest = () => {
    //change index.html
    //line 10: content="The official Kool Koalas minting website."
    writeToFileByReplacing("./public/index.css", 
                            9, 
                            "content=\"The official Kool Koalas minting website.\"");
    //line 38: <title>Kool Koalas</title>
    writeToFileByReplacing("./public/index.css", 
                            37, 
                            "<title>Kool Koalas</title>");

    //change manifest.json
    //"short_name", "name" in json object
    writeToFileByReplacing("./public/manifest.json", 
                            1, 
                            "color: #292929;");
    writeToFileByReplacing("./public/manifest.json", 
                            2, 
                            "color: #292929;");
}

const addFavicon = () => {
    // move favicon and rename
    //favicon.ico

    // move logo192.png
}

const writeWebsiteUsingSuppliedData = () => {
    // addFavicon();
    updateIndexHTMLandManifest();
    styleWebsite();
    addContent();
}

const buildWebsite = (projectName, candyMachineID) => {
    // create new branch

    //git checkout -b projectName
    exec(`git checkout -b ${projectName}`,
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
    writeWebsiteUsingSuppliedData();

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
    exec(`git push --set-upstream origin ${projectName}`,
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

websiteBuilder("test", "1234");

module.exports = { websiteBuilder };