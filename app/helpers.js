import fetch from 'isomorphic-fetch';
import axios from 'axios';
import * as Neon from "neon-js";

import {RESTEndpoint} from "./config";

export function str2hex(str) {
  let hex;
  let result = "";
  for (let i = 0; i < str.length; i++) {
    hex = str.charCodeAt(i).toString(16);
    result += ("000" + hex).slice(-4);
  }

  return result;
}

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
