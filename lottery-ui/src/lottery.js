import web3 from "./web3";

const address = "0xfE703ECFBcb95C68234c10729F0dDED7a789C081";

const abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
        signature: "constructor",
    },
    {
        inputs: [],
        name: "enter",
        outputs: [],
        stateMutability: "payable",
        type: "function",
        payable: true,
        signature: "0xe97dcb62",
    },
    {
        inputs: [],
        name: "getPlayers",
        outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x8b5b9ccc",
    },
    {
        inputs: [],
        name: "manager",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x481c6a75",
    },
    {
        inputs: [],
        name: "pickWinner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x5d495aea",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "players",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0xf71d96cb",
    },
    {
        inputs: [],
        name: "random",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x5ec01e4d",
    },
];

const lottery = new web3.eth.Contract(abi, address);

export default lottery;
