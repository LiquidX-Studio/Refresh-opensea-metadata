require("dotenv").config()
const axios = require("axios");

const PRODUCTION = !process.argv.includes("--test");
const API_KEY = process.env.API_KEY || "";
if (PRODUCTION && API_KEY === "") {
    console.error("API_KEY is required");
    process.exit(1);
}
const hostname = PRODUCTION ? "api.opensea.io":"testnets-api.opensea.io"
const contract = process.env.CONTRACT || "";
let start;
let end;

try {
    start = Number(process.env.START_TOKEN_ID) || 1;
    end = Number(process.env.END_TOKEN_ID) || start+10;
} catch(err) {
    console.error(err);
    process.exit(1);
}
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const init = async() => {
    for(let tokenId = start;tokenId <= end; tokenId++){
        const url = `https://${hostname}/api/v1/asset/${contract}/${tokenId}/?force_update=true`;
        const options = {
            headers: {
                "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
            }
        };

        if (PRODUCTION)
            options.headers["X-API-KEY"] = API_KEY

        for (let retry=1; retry < 4; retry++){
            try{
                console.log("Calling", url, "to refresh metadata", tokenId)
                const response = await axios.get(url, options);
                console.log("Response", response.status, response.statusText);
                break;
            } catch(err) {
                console.error(err.response.status, err.response.statusText);
                console.log(`Retrying ...(${retry})`);
                await timeout(2000)
            }
        }
        await timeout(3000) // OpenSea has rate limit in 4 seconds
    }
}
init();