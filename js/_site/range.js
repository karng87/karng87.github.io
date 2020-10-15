#!/usr/local/opt/coreutils/libexec/gnubin/env node
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
M.range = curried(start=0, end=100, step=1) => {
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

const it = makeRangeIterator(1,10,2);
console.log(it);
console.log(it.next());
//while(!it.done) {
//  console.log(it);
//  result = it.next();
//}

console.log("====result ===== after it");
let result = it[Symbol.iterator]();
for(const a of result){
  console.log(a);
}
//let result = it.next();
while(!it.next().done) {
  console.log(it.next());
  //result = it.next();
}
console.log(it.next());
console.log(it.next());
console.log(it.next());

const ra = range(1,10,2);
console.log(ra);

const a = ra[Symbol.iterator]();
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
for(const a of ra){
//for(const a of ra[Symbol.iterator]()){
//for(const a of range(1,10,2)){
//for(const a of range(1,10,2)[Symbol.iterator]()){
  console.log(a)
  console.log(a.done)
}

