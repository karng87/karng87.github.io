#!/usr/local/opt/coreutils/libexec/gnubin/env node
//npm install node-fetch
const fetch = require('node-fetch');

const jsons ="https://jsonplaceholder.typicode.com/users";
const json01="https://jsonplaceholder.typicode.com/posts"
const json02="https://jsonplaceholder.typicode.com/posts/1"
const json03="https://jsonplaceholder.typicode.com/posts/1/comments"

const dataLoader = async function*(...iters){
  for ( const iter of iters) yield* iter
};

const render = async function (...iters){
  for await (const json of dataLoader(...iters)) console.log(json);
};

const urls = async function*(...urls){
  //for await (const url of urls) {yield* url(url)}
  const j = [];
  for (const urlIter of urls.map(url)) j.push( (await urlIter.next()).value);
  yield j;
};

const url = async function* (url){
  yield await (await fetch(url,{method: "GET"})).json();
};

render(urls(jsons,json01,json02),url(json03));

/*
const urlLoader = async function* (url) {
  yield await(await fetch(url,{method: "GET"})).json();
};

const jsonLoader = async function* (...urls){
  for (const url of urls) yield* urlLoader(url);
};

const render = async (...urls) =>{
  for await (const json of jsonLoader(...urls)){
    console.log(json)
  }
};

render(jsons,json01,json02,json03);
*/
/*
const dataLoader = async function*(...urls){
  for (const url of urls){
    yield await(await fetch(url,{method: "GET"})).json();
  }
};

const render = async (...urls)=>{
  for await (const json of dataLoader(...urls)) {
    console.log(json)
  }
};
render(jsons,json01,json02,json03);

*/


/*
const dataLoader = function*(f,...urls){
  for (const url of urls){
    const json = yield fetch(url, {method: "GET"}).then(res=>res.json());
    f(json);
  };
};

const render = function(...urls){
  const iter = dataLoader(console.log, ...urls);
  const next = ({value,done})=>{
    if(!done) value.then(v=>next(iter.next(v)));
  };
  next(iter.next())
};

render(json01, json02, json03);
*/
