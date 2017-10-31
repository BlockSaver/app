import * as neo from "neo-api";

export function testneo() {
  return (dispatch, getState) => {
    // dispatch({});
    const node = neo.node('http://188.226.138.245:20333/');
    node.getBlockCount().then(function (result) {
      console.log(result);
    });
  };
}
