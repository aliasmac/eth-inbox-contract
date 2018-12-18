const assert = require('assert'); // for testing 
const ganache = require('ganache-cli') // allows us to create a local eth network 
const Web3 = require('web3'); 
// Allows us to use the Web3 constructor function to make instances of web libraries 
// Each instance is designed to connect a different eth network, e.g. main, ropsten, rinkeby etc.

const web3 = new Web3(ganache.provider())
const {interface, bytecode } = require('../compile')

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!'

beforeEach(async () => {
    // Get a list of all accounts 
    // web3.eth accesses the Etheruem mobule of the web3 library which serves many crypto
    accounts = await web3.eth.getAccounts() 
        // .then(fetchedAccounts => {
        //     console.log(fetchedAccounts)
        // })

    // Use one of those accounts to deploy contract
    // the inbox var actually represents what exists on the blockchain in JS form 
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({from: accounts[0], gas: '1000000' })

})

describe('Inbox', () => {
    it('deploys a contract', () => {
        // console.log(inbox)
        assert.ok(inbox.options.address)
    })

    it('has a default message', async () => {
        const message = await inbox.methods.message().call()
        assert.equal(message, INITIAL_STRING)
    })

    it('can change the message', async () => {
        await inbox.methods.setMessage("bye").send({ from: accounts[0] })
        const message = await inbox.methods.message().call()
        assert.equal(message, "bye")
    })

})


// INBOX OBJECT!!!!

// (node:8539) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 data listeners added. Use emitter.setMaxListeners() to increase limit
// Contract {
//   currentProvider: [Getter/Setter],
//   _requestManager:
//    RequestManager {
//      provider:
//       b {
//         _events: [Object],
//         _eventsCount: 1,
//         _maxListeners: undefined,
//         options: [Object],
//         engine: [d],
//         manager: [u],
//         sendAsync: [Function: bound ],
//         send: [Function: bound ],
//         close: [Function: bound ],
//         _queueRequest: [Function: bound ],
//         _processRequestQueue: [Function: bound ],
//         _requestQueue: [],
//         _requestInProgress: false },
//      providers:
//       { WebsocketProvider: [Function: WebsocketProvider],
//         HttpProvider: [Function: HttpProvider],
//         IpcProvider: [Function: IpcProvider] },
//      subscriptions: {} },
//   givenProvider: null,
//   providers:
//    { WebsocketProvider: [Function: WebsocketProvider],
//      HttpProvider: [Function: HttpProvider],
//      IpcProvider: [Function: IpcProvider] },
// ......
// ......
//   options:
//    { address: [Getter/Setter],
//      jsonInterface: [Getter/Setter],
//      data: undefined,
//      from: undefined,
//      gasPrice: undefined,
//      gas: undefined },
//   defaultAccount: [Getter/Setter],
//   defaultBlock: [Getter/Setter],
//   methods:
//    { setMessage: [Function: bound _createTxObject],
//      '0x368b8772': [Function: bound _createTxObject],
//      'setMessage(string)': [Function: bound _createTxObject],
//      message: [Function: bound _createTxObject],
//      '0xe21f37ce': [Function: bound _createTxObject],
//      'message()': [Function: bound _createTxObject] },
//   events: { allEvents: [Function: bound ] },
//   _address: '0x672dDA3712D47E80b2f4711029a04c2081b3b7f2',
//   _jsonInterface:
//    [ { constant: false,
//        inputs: [Array],
//        name: 'setMessage',
//        outputs: [],
//        payable: false,
//        stateMutability: 'nonpayable',
//        type: 'function',
//        signature: '0x368b8772' },
//      { constant: true,
//        inputs: [],
//        name: 'message',
//        outputs: [Array],
//        payable: false,
//        stateMutability: 'view',
//        type: 'function',
//        signature: '0xe21f37ce' },
//      { inputs: [Array],
//        payable: false,
//        stateMutability: 'nonpayable',
//        type: 'constructor',
//        constant: undefined,
//        signature: 'constructor' } ] }
    


// Sample Mocha test refresher

// class Car {
//     park() {
//         return 'stopped'
//     }

//     drive() {
//         return 'vroom'
//     }
// }

// describe('Car', () => {

//     let car;

//     beforeEach(() => {
//         car = new Car();
//     })

//     it('can park', () => {
//         assert.equal(car.park(), 'stopped');
//     })

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     })

// });

