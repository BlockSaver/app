import fetch from 'isomorphic-fetch';
import axios from 'axios';
import * as Neon from "neon-js";

import {RESTEndpoint} from "./config";


function queryRPC(method, params, id = 1) {
  const jsonRequest = axios.create({ headers: { 'Content-Type': 'application/json' } });
  const jsonRpcData = { method, params, id, jsonrpc: '2.0' };

  return axios.get(RESTEndpoint + '/v2/network/best_node').then(function (response) {
    return response.data.node;
  }).then(function (rpcEndpoint) {
    return jsonRequest.post(rpcEndpoint, jsonRpcData).then(function (response) {
      return response.data;
    });
  });
}

export function testInvokeRPC (scriptHash, operation, args) {
  const jsonRequest = axios.create({ headers: { 'Content-Type': 'application/json' } });
  const jsonRpcData = { method: 'invokefunction', params: [scriptHash, operation, args], id: 1, jsonrpc: '2.0' };

  return jsonRequest.post("http://neo.marinpetrunic.com:30334/", jsonRpcData).then(({data}) => {
    if (data.result.state === 'HALT, BREAK') {
      const parsed = parseVMStack(data.result.stack);
      const gasConsumed = parseInt(data.result.gas_consumed, 10);
      return Object.assign(data.result, { stack: parsed, gas_consumed: gasConsumed });
    } else {
      return data;
    }
  });
}

export function executeTransaction(fromAccount, invoke, gasCost, intents = []) {
  return fetch(RESTEndpoint + '/v2/address/balance/' + fromAccount.address)
    .then((res) => {
      return res.data
    }).then((balances) => {
      const unsignedTx = Neon.create.invocation(fromAccount.publicKeyEncoded, balances, intents, invoke, gasCost, {version: 1});
      const signedTx = Neon.signTransaction(unsignedTx, fromAccount.privateKey);
      const hexTx = Neon.serializeTransaction(signedTx);
      return queryRPC('sendrawtransaction', [hexTx]);
    }).catch(function (error) {
      console.log(error);
    });
}

/** Parsing and converting functions **/
/**************************************/
export function str2hex(str) {
  let arr1 = [];
  for (let n = 0, l = str.length; n < l; n++) {
    const hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
}

function hexstring2ab(str) {
  let result = [];
  while (str.length >= 2) {
    result.push(parseInt(str.substring(0, 2), 16));
    str = str.substring(2, str.length);
  }

  return result;
}

const ab2str = buf => { return String.fromCharCode.apply(null, new Uint8Array(buf)) }

/**
 * Parses the VM Stack and returns human readable strings
 * @param {{type:string, value: string}[]} stack - VM Output
 * @return {any[]} Array of results
 */
function parseVMStack(stack) {
  return stack.map((item) => {
    switch (item.type) {
      case 'ByteArray':
        return ab2str(hexstring2ab(item.value));
      case 'Integer':
        return parseInt(item.value, 10);
      default:
        throw Error(`Unknown type: ${item.type}`);
    }
  })
}
