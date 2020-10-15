#!/usr/local/opt/coreutils/libexec/gnubin/env node
let str = "hello";
let iter = str[Symbol.iterator]();
while(1){
  let result = iter.next();
  if(result.done) break;
  alert(result.value);
};
