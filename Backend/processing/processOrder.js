//processOrder
import buildCandyMachine from "./candyMachineBuilder";
import buildWebsite from "./websiteBuilder"

const processOrder = (walletAddress) => {
    let candyMachineID = buildCandyMachine(walletAddress);

    let url = buildWebsite(walletAddress, candyMachineID);

    //email orderer the URL and candymachine id for verifying on marketplaces

    return true;
}

// const withDraw = (walletAddress) => {
//     // send 90% to their wallet

//     // send remainder to main wallet

//     // withdraw and send this to main wallet
// }

// const updateCandyMachine = (walletAddress) => {
//     // get correct .cache, config and keypair

//     // update config

//     // run update

//     //move the files to the right places
// }