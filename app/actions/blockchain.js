import * as neo from "neo-api";

export function testneo() {
  return (dispatch, getState) => {
    // dispatch({});
    const node = neo.node('http://seed1.neo.org:10332');
    node.getBlockCount().then(function (result) {
      console.log(result);
    });
  };
}
