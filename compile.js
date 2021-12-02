import path from "path";
import { fileURLToPath } from "url";

import fs from "fs";
import solc from "solc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");

const source = fs.readFileSync(lotteryPath, "utf8");

const input = {
    language: "Solidity",
    sources: {
        "Lottery.sol": {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

const compiledCode = solc.compile(JSON.stringify(input));
let output = JSON.parse(compiledCode);

const abi = output["contracts"]["Lottery.sol"]["Lottery"].abi;
const bytecode =
    output["contracts"]["Lottery.sol"]["Lottery"].evm.bytecode.object;

export default {
    interface: abi,
    bytecode,
};
