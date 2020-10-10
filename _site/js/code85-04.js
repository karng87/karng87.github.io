#!/usr/local/opt/coreutils/libexec/gnubin/env node
const fetch = require('node-fetch');
//const json-smaple = "https://jsonplaceholder.typicode.com/users";
const json01="https://jsonplaceholder.typicode.com/posts"
const json02="https://jsonplaceholder.typicode.com/posts/1"
const json03="https://jsonplaceholder.typicode.com/posts/1/comments"

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
