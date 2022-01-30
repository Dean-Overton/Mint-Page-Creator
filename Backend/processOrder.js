//processOrder
import buildCandyMachine from "./candyMachineBuilder";
import buildWebsite from "./websiteBuilder"

const processOrder = () => {
    let projectName = "";

    let candyMachineID = buildCandyMachine();

    let url = buildWebsite(projectName, candyMachineID);

    //email orderer the URL and candymachine id for verifying on marketplaces

    return true;
}

// const withDraw = (address) => {
//     // send 90% to their wallet

//     // send remainder to main wallet

//     // withdraw and send this to main wallet
// }

// const updateCandyMachine = () => {
//     // get correct .cache, config and keypair

//     // update config

//     // run update

//     //move the files to the right places
// }