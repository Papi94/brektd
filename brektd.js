const {anchorLiquidationApi} = require ('./lib/anchorliquidations.js') 
require('dotenv').config()
const crypto = require('crypto');
const KEY_SIZE = 256
const ITERATIONS = 100
const fs = require('fs');


//https://github.com/terra-money/oracle-feeder/blob/main/feeder/src/keystore.ts
function decrypt(transitmessage, pass) {
    const salt = Buffer.from(transitmessage.substr(0, 32), 'hex')
    const iv = Buffer.from(transitmessage.substr(32, 32), 'hex')
    const key = crypto.pbkdf2Sync(pass, salt, ITERATIONS, KEY_SIZE / 8, 'sha1')
    
    const encryptedText = transitmessage.substring(64)
    const cipher = crypto.createDecipheriv('AES-256-CBC', key, iv)
    const decryptedText = Buffer.concat([
        cipher.update(encryptedText, 'base64'),
        cipher.final(),
    ]).toString()
    
    return decryptedText
}
function encrypt(plainText, pass) {
    const salt = crypto.randomBytes(16)
    const iv = crypto.randomBytes(16)
    const key = crypto.pbkdf2Sync(pass, salt, ITERATIONS, KEY_SIZE / 8, 'sha1')
    
    const cipher = crypto.createCipheriv('AES-256-CBC', key, iv)
    const encryptedText = Buffer.concat([cipher.update(plainText), cipher.final()]).toString('base64')
    
    // salt, iv will be hex 32 in length
    // append them to the ciphertext for use  in decryption
    return salt.toString('hex') + iv.toString('hex') + encryptedText
}

async function anchorCli(){
    var argv = require('minimist')(process.argv.slice(2));

if (argv["setup-key"] == true){
    password = argv["password"] + "" //make sure paasword is a string
    private_key = argv["private-key"]
    encrypted_key = encrypt(private_key, password)
    fs.writeFile("keystore", encrypted_key, function(err) {
        if(err) {
            console.log(err);
        }
        console.log("The keystore was saved!");
        }); 
    return
    }

try{
    var encrypted_key = fs.readFileSync('keystore', 'utf-8');
}catch{
    console.log("Please setup a keystore first")
    return
}

var encryption_key = process.env.PASSWORD

var mkstr = decrypt(encrypted_key, encryption_key)

var anchorLiquidationWrapper = new anchorLiquidationApi(mkstr)
//places bid order 
//node brektd.js --bid --asset bluna --amount 10
if (argv["place-bid"] == true){

    if ((argv["asset"] == "bluna") || (argv["asset"] == "beth")){
        if (Number.isInteger(argv["amount"])){ 
            if (Number.isInteger(argv["premium"])){ 
                console.log ("Placing bid order")

                //TODO return txhash
                await anchorLiquidationWrapper.placeBid(argv["amount"],argv["asset"],argv["premium"])
                return
            }else{ 
                console.log ("Error: premium must be a integer")
            }
        }else{ 
            console.log ("Error: amount must be a integer")
        }
    }

}

if (argv["place-bid"] == "help"){
    console.log("--place-bid - requires --asset --amount --premium ")
    console.log("Example: ")
    console.log("brektd.js --place-bid --asset bluna --amount 10 --premium 2")
    return
}

if (argv["activate-all-bids"] == true){
    if ((argv["asset"] == "bluna") || (argv["asset"] == "beth")){
        console.log ("Activating bids")
        await anchorLiquidationWrapper.activatePendingBids(argv["asset"])
        return
    }else{
        console.log("Error: --asset must be bluna or beth")
        return
    }

}
if (argv["activate-all-bids"] == "help"){
    console.log("--activate-all-bids - requires --asset ")
    console.log("Example: ")
    console.log("brektd.js --activate-all-bids --asset bluna")
    return
}

if (argv["activate-single-bid"] == true){
    if (Number.isInteger(argv["bid-id"])){ 
        console.log ("Activating bids")
     await anchorLiquidationWrapper.activateBid([argv["bid-id"]])
    return
    }else{
        console.log("Error: --bid-id must be an integer")
        return
    }

}

if (argv["activate-single-bid"] == "help"){
    console.log("--activate-single-bid - requires --bid-id ")
    console.log("Example: ")
    console.log("brektd.js --activate-single-bid --bid-id 69420")
    return
}

if (argv["withdraw-all-bids"] == true){
    if ((argv["asset"] == "bluna") || (argv["asset"] == "beth")){
        console.log ("Cancelling bids")
        await anchorLiquidationWrapper.cancelOpenBids(argv["asset"])
        return
    }else{
        console.log("Error: --asset must be bluna or beth")
        return
}

}


if (argv["withdraw-all-bids"] == "help"){
    console.log("--withdraw-all-bids - requires --asset ")
    console.log("Example: ")
    console.log("brektd.js --withdraw-all-bids --asset bluna")
    return
}

if (argv["withdraw-single-bid"] == true){
    if (Number.isInteger(argv["bid-id"])){ 
        console.log ("Cancelling bid")
     await anchorLiquidationWrapper.withdrawBid(argv["bid-id"])
     return
    }

}
if (argv["withdraw-single-bid"] == "help"){
    console.log("--withdraw-single-bid - requires --bid-id ")
    console.log("Example: ")
    console.log("brektd.js --withdraw-single-bid --bid-id 69420")
    return
}


if (argv["list-bids"] == true){
    if ((argv["asset"] == "bluna") || (argv["asset"] == "beth")){
  
     console.table (await anchorLiquidationWrapper.getBidsDetailed(argv["asset"]) )
     return
    }else{
        console.log("Error: --asset must be bluna or beth")
        return
    }

}
if (argv["list-bids"] == "help"){
    console.log("--list-bids ")
    console.log("Example: ")
    console.log("brektd.js --list-bids --asset bluna")
    return
}
if (argv["list-queues"] == true){
    if ((argv["asset"] == "bluna") || (argv["asset"] == "beth")){
  
     console.table (await anchorLiquidationWrapper.getQueueDetailed(argv["asset"]) )
     return
    }else{
        console.log("Error: --asset must be bluna or beth")
        return
    }

}
if (argv["list-queues"] == "help"){
    console.log("--list-queues ")
    console.log("Example: ")
    console.log("brektd.js --list-queues --asset bluna ")
    return
}


if (argv["claim-proceeds"] == true){
    if ((argv["asset"] == "bluna") || (argv["asset"] == "beth")){
        console.log ("Claiming liquidation proceeds")
     await anchorLiquidationWrapper.claimProceeds(argv["asset"]) 
     return
    }else{
        console.log("Error: --asset must be bluna or beth")
        return
    }

}
if (argv["claim-proceeds"] == "help"){
    console.log("--claim-proceeds ")
    console.log("Example: ")
    console.log("brektd.js --claim-proceeds --asset bluna")
    return
}




displayHelp()
return
}


async function displayHelp(){ //
console.log("bRektd - A CLI for Anchor liquidations\n")
console.log("Current supported assets: bluna, beth\n")
console.log("Place a bid:")
console.log("--place-bid --asset bluna|beth --amount amount_to_bid --premium liquidation_premium\n")
console.log("Example: ")
console.log("brektd.js --place-bid --asset bluna --amount 10 --premium 2\n")
console.log("Activate pending bids after 10 minute wait:\n")
console.log("--activate-all-bids --asset bluna|beth\n")
console.log("Example: ")
console.log("brektd.js --activate-all-bids --asset bluna\n")
console.log("Cancel all liquidation bids:\n")
console.log("--withdraw-all-bids --asset bluna|beth\n")
console.log("Example: ")
console.log("brektd.js --withdraw-all-bids --asset bluna\n")
console.log("Withdraw a single bid:\n")
console.log("--withdraw-single-bid --bid-id\n")
console.log("Example: ")
console.log("brektd.js --withdraw-single-bid --bid-id 69420\n")
console.log("List all active bids for your wallet:\n")
console.log("--list-bids\n")
console.log("Example: ")
console.log("brektd.js --list-bids --asset bluna\n")
console.log("View the current premium slots:\n")
console.log("--list-queues\n")
console.log("Example: ")
console.log("brektd.js --list-queues --asset bluna\n")
console.log("Claim proceeds from liquidations:\n")
console.log("--claim-proceeds --asset bluna\n")
console.log("Example: ")
console.log("brektd.js --claim-proceeds --asset bluna")
}


anchorCli()