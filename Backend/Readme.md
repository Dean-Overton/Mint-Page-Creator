Resource for handling post requests to server
https://masteringjs.io/tutorials/express/post
https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088
Suggestion to use MongoDB or other db for storing images even?

https://www.sitepoint.com/forms-file-uploads-security-node-express/
Also quoting the above site:
"Because of the additional complexities of working with multipart and file uploads, they’re often kept in separate forms."

or maybe thos would help:
https://www.npmjs.com/package/formidable

From the frontend and server the website builder/Candy machine builder
expects a number of files. 

These should all be uploaded to ./submitted/${WALLET_ADDRESS_THAT_PAID} folder via the server upon post request.

1) A data.json file that contains at a minimum values:

{"discordLink":  "https://discord...",
"twitterLink": "https://twitter...", 
"projectName": "Kool Koalas", 
"projectDescription": "2,222 Available", 
"mintTime": "30 Jan 2022 06:34:00 GMT", 
"highlightColour": "white", 
"socialsColour": "black", 
"mintColour": "black", 
"mintTextColour": "white"
}

2) A favicon.ico 

3) A bg image .png|.jpg|.jpeg (specific dimensions coming soon)

4) A mobile bg image  .png|.jpg|.jpeg (specific dimensions coming soon)

5) .ttf file

6) logo192.png (192 X 192 px)

COMING SOON:
7) ./assets which needs metadata json files and .png images