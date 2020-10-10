#!/usr/local/opt/coreutils/libexec/gnubin/env node

const curried1 = f => {
  return function curry (...xs){
     if(xs.length >= f.length ){
       return f.apply(this,xs);  
     }else{
       return (...ys)=>{
         return curry.apply(this,xs.concat(ys)); 
       }
     }
  }
}

const curried = (f) => 
    (x,...xs) => {
    console.log('====== start Curried ======');
      if (xs.length) { 
        //console.log ("Curried Arg 2개");
        return f(x, ...xs);  
      }else {
        //console.log ("Curried Arg 1개");
        return (...xs) => f(x,...xs)
      }
    };
let sum = (a, b) => a + b ; 
let curriedSum = curried(sum);
console.log( curriedSum(1, 2 ) ); // 6, 보통때 처럼 단일 callable 형식으로 호출하기
console.log( curriedSum(1)(2) ); // 6, 첫 번째 인수를 커링하기

L = {}
L.range = function* (start = 0, end, step=1){
  while(start < end){
    yield start;
    start += step;
  }
};
const range = (...xs) => [...L.range(...xs)];

L.map = curried(function* (f,iter) {
  for(const a of iter) {
    yield f(a);
  }
});
const map = curried((...xs) => [...L.map(...xs)]);

const reduce = curried((f,acc,iter)=>{
  if(!iter) {
    iter = acc && acc[Symbol.iterator] ? acc[Symbol.iterator]() : (function*(){})();
    acc = iter.next().value;
  };
  for (const a of iter) {
    acc = f(acc,a);
  }
  return acc;
});
const go = (x,...xs) => reduce ((a,f)=>f(a), x, ...xs);
const pipe = (...xs) => (...y) => go(...y, ...xs);


console.log(
  reduce(
    (a,b)=> a + b,100,
    map(x=> x+2,
      range(1,11))
  )
);


