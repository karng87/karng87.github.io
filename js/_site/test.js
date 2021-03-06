#!/usr/local/opt/coreutils/libexec/gnubin/env node
function* gen() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
};

let itergen = gen();
let arr = [0,1,2,[3,4,[5,6,7]],[8,9]];
let arj = [1,2,3,4,5,6,7,8,9];


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
const go = (x, ...fs) => reduce ((a,f)=> f(a), x, fs);
const pipe = (...xs) => (...ys) => go(...ys,...xs);

function* empty() {}

function toIter(iter) {
  return iter && iter[Symbol.iterator] ? iter[Symbol.iterator]() : empty();
}

const reduce = curried((f, acc, iter) => {
    console.log('====== start reduce ======');
    //console.log('2st acc: ',acc);
    //console.log('3st iter: ',iter);
  if(!iter) {
    iter = acc && acc[Symbol.iterator] ? acc[Symbol.iterator]() : (function*(){})();
    acc = iter.next().value;
    //console.log('if acc: ',acc);
  };

  for (const a of iter) { 
    //console.log("for a.....",a);
    //console.log("ACC .....",acc);
    acc = f(acc, a);
  }; 
  return acc;
});

const L = {};
const M = {};
L.range = curried(function* (start=0,end=100,step=1) { 
  console.log('====== start RANGE======');
  let iterationCount = 0;
  for(let i = start; i < end; i += step){
    iterationCount++;
    yield i;
  }
  return iterationCount;
});
const range = curried((..._) => [...L.range(..._)]);

M.range = curried((start=0, end=100, step=1) => {
  let iterationCount = 0;
  const rangeIterator = {
    next: 
      function() {
        let result;
        if(start < end){
          result = { value: start, done: false }
          start += step
          iterationCount++;
          return result;
        }
        return { value: iterationCount, done: true }
      },
      [Symbol.iterator](){
        return this;
      }
  };
  return rangeIterator;
});


L.map = curried(function* (f, iter) { for (const a of iter) yield f(a) });
const map = curried((..._) => [...L.map(..._)]);
L.flat = function* (iter) { for (const a of iter) (a && a[Symbol.iterator])? yield* a : yield a; };
const flat = (..._)=>[...L.flat(..._)];

const isIterable = function (iter) {return iter != null && !!iter[Symbol.iterator]};
const iStack = [ toIter(arr) ];
const str = "hello";
//console.log('toIter: ', toIter(arr));
//console.log('toIter:length ', toIter.length);
//console.log('toIter:value:',toIter.value);
//console.log('toIter ======:end');
//console.log('toIter[]: ', [...toIter(arr)]);
//console.log('toIter[] length: ', [...toIter(arr)].length);
//console.log('toIter[]value:',[...toIter(arr)].value);
console.log('==========');
console.log('*** iStack:',iStack);
console.log('*** iStack:length ',iStack.length);
console.log('*** iStack:value:',iStack.value);
console.log('*** iStack:to[...]:',[...iStack]);
console.log('==========');

function recur (iter) {
    const iStack = [ toIter(iter) ]
    const popIter = iStack.pop();
    //const popIter = iStack[iStack.length -1];
    console.log('popIter :',popIter);
    console.log('popIter isIterable:',isIterable(popIter));
console.log('==========');
    while (true){
      const cur = (popIter.next())
      console.log('cur :',cur)   
      console.log('cur isIterable:',isIterable(cur.value));
      if(isIterable(cur.value)) {
        iStack.push(cur.value[Symbol.iterator]());
console.log('=== recur =======');
        return recur();
      };
      console.log('what type of the cur.value : ', typeof (cur.value));
      if (cur.done) break;
    };
  //}
};
//recur(arr);
//console.log('pop: ',iStack.pop());
//console.log(isIterrable(iStack.pop()));
/*
funciton flatL (iter, depth = 1) {
  let concurCheck = null;
  const iterStack = [ ( (iter && iter[Symbol.iterator]) ? iter[Symbol.iterator]() : (function* ()=>{})() ) ];
  return {
    next: function recur() {
              const iter = (Arrary.isArray(iterStack) || Object.prototype.toString.call(iterStack) === "[object String]") ? iterStack[iterStack.length -1] : reduce((_, a) => a), iterStack);
              if (!iter) return {done: true};
              const cur = iter.next();
              if (cur.done) {
                iterStack.pop();
                retrun recur();
              }else if ( cur.length <= depth && ){}else if () {};

          };
  };
};
*/

const users = [
  { name: 'a', age: 21, family: [
    { name: 'a1', age: 53 }, { name: 'a2', age: 47 },
    { name: 'a3', age: 16 }, { name: 'a4', age: 14 }
  ] },
  { name: 'b', age: 24, family: [
    { name: 'b1', age: 58 }, { name: 'b2', age: 51 },
    { name: 'b3', age: 10 }, { name: 'b4', age: 22 }
  ] },
  { name: 'c', age: 31, family: [
    { name: 'c1', age: 64 }, { name: 'c2', age: 62 }
  ] },
  { name: 'd', age: 20, family: [
    { name: 'd1', age: 42 }, { name: 'd2', age: 42 },
    { name: 'd3', age: 11 }, { name: 'd4', age: 7 }
  ] }
];


console.log(
  go(
    range(0,5),
    map((x)=>range(0 ,x)),
    map(map(()=> '\xa0*')),
    map(reduce((acc, x)=>acc + x )),
    reduce(((acc,x) => `${acc}\n${x}`)),
  )
  //map(map(()=>`\xa0`) ,map((x)=>range(1 ,x),L.range(1,5))),
);


console.log(
  go(
    range(1,10),
    map((x)=>x+3),
    reduce((a,b)=>a+b)
  )
);

