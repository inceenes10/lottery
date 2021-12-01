import assert from "assert";
import ganache from "ganache-cli";
import Web3 from "web3";
import compile from "../compile.js";

const web3 = new Web3(ganache.provider());


let lottery,
    accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(compile.interface)
        .deploy({ data: compile.bytecode })
        .send({ from: accounts[0], gas: "1000000" });
});


describe("Lottery contract", () => {

    it("deploys a contract", () => {
        assert.ok(lottery.options.address);
    });

    it("allows one account to enter", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("0.02", "ether")
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(players[0], accounts[0]);
        assert.equal(players.length, 1);

    });

    it("allows multiple accounts to enter", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("0.02", "ether")
        });

        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei("0.02", "ether")
        });

        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei("0.02", "ether")
        });


        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(players[0], accounts[0]);
        assert.equal(players[1], accounts[1]);
        assert.equal(players[2], accounts[2]);
        assert.equal(players.length, 3);

    });

    it("requires a minimum amount of ether", async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 200
            });
            assert(false);
        }
        catch(err) {
            assert.ok(err);
        }
    });

    it("Only manager call pickWinner", async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1],
                value: web3.utils.toWei("0.02", "ether")
            });
            assert(false);
        }
        catch(err) {
            assert.ok(err);
        }
    });

    it("sends money to the winner and resets the players array", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("2", "ether")
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        const finalBalance = await web3.eth.getBalance(accounts[0]);

        const difference = finalBalance - initialBalance;
        console.log(difference);

        assert(difference > web3.utils.toWei("1.8", "ether"))
         
    });

});
























