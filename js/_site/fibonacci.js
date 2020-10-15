#!/usr/local/opt/coreutils/libexec/gnubin/env node
/*
 https://designatedroom87.tistory.com/41?category=868275
 https://designatedroom87.tistory.com/49
 https://designatedroom87.tistory.com/category/C%20%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0/1.%20%EC%9E%AC%EA%B7%80%ED%95%A8%EC%88%98
 https://shoark7.github.io/programming/algorithm/%ED%94%BC%EB%B3%B4%EB%82%98%EC%B9%98-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98%EC%9D%84-%ED%95%B4%EA%B2%B0%ED%95%98%EB%8A%94-5%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95
*/
const curried = (f) => (x, ...xs) => {
  if(xs.length)  return f(x, ...xs) 
  else return (...xs)=> f(x, ...xs); 
}
const L = {};
L.range = function* (start=0,end=10,step=1) {
  while(start < end){
    yield start;
    start += step;
  };
};
const range = (..._) => [ ...L.range(..._) ];

const reduce =  curried((f, acc, iter) => {
  if(!iter){
    iter = acc && acc[Symbol.iterator] ? acc[Symbol.iterator]() : (function*(){})();
    acc = iter.next().value;
  };
  for(const a of iter) {
    acc = f(acc, a);
  };
  return acc;
});


L.map = curried (function* (f,iter) {
  for(const a of iter) yield f(a)
});

const go = (x, ...xs) => reduce((a,b) => b(a), x, xs);

const map = curried((..._) => [ ...L.map(..._) ]);

//console.log(
//  go(
//    range(1,10),
//    map((x)=>x+3),
//    reduce((a,b)=>a+b)
//  )
//);

function fibonacci_n(n=10){
  let current = 1;
  let next = 1;
  while(n > 0) {
    console.log(current);
    pcurr = current;
    current = next;
    next = pcurr + next;
    --n;

  };
}

function* fibonacci_01() {
  let current = 1;
  let next = 1;
  while(true) {
    yield current;
    pCurrent = current;
    current = next;
    next = pCurrent + next
  };
};

function* fibonacci() {
  curr = 1;
  next = 1;
  while (true) {
    let reset = yield curr;
    [curr, next] = [ next, curr + next ];
    if(reset) [curr, next] = [1,1];
  };
};

function fiboN(n) {
  if (n < 2) {
    return n;
  }
  else if (n==2) {
    return 1;
  }
  else return fiboN(n-1) + fiboN(n-2)
};

console.log('10th fiboN: ',fiboN(10));

// [0,1] [1,1] [1,2] [2,3] [3,5]
function fiboM(n) {
  if (n <2) return n;

  let curr = 0;
  let next = 1;
  for (const a of range(0,n-1)) {
    [ curr, next ] = [ next, curr + next ];
  };
  return next;
};
console.log('10th fiboM: ',fiboM(100));

function fiboCache(n) {
  if (n <2) return n;
  cache = [];
  cache [0] = 0
  cache [1] = 1
  for (const a of range(2,n+1)) cache[a] = cache[a-1] + cache[a-2];
  return cache[n];
};

console.log('10th fiboCache : ',fiboCache(10));
//const fibo = fibonacci();
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log('==== reset by next(1) ====');
//console.log(fibo.next(1));
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log('==== reset by next(a) ====');
//console.log(fibo.next('a'));
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log('==== reset by next(true) ====');
//console.log(fibo.next(true));
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log('==== reset by next(false) ====');
//console.log(fibo.next(false));
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
//console.log(fibo.next());
