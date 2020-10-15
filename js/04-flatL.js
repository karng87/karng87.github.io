#!/run/current-system/sw/bin/env node
const products = [
   { name: '반팔티', price: 15000 },
   { name: '긴팔티', price: 20000 },
   { name: '후드티', price: 40000 },
   { name: '긴바지', price: 30000 },
   { name: '반바지', price: 25000 },
];
const users = [
   { age: 32 },
   { age: 31 },
   { age: 37 },
   { age: 28 },
   { age: 25 },
   { age: 32 },
   { age: 31 },
   { age: 37 }
];
const curried = (f) => (x,...xs) => {
   return xs.length ? f (x,...xs) : (...xs)=> f(x,...xs);
};

const reduce = curried(function (f,acc,iter) {
   if (!iter){
      iter = (acc[Symbol.iterator]) ? acc[Symbol.iterator](): (function*(){})();
      acc = iter.next().value;
   };
   for (const a of iter) { 
      acc = f (acc, a); 
   };
   return acc;
});

const go = (x,...xs) => reduce ((x,f)=>f(x),x,xs);
const pipe = (...xs) => (arg) => go(arg,...xs);
const L = {};

L.flat = function* (iter) {
   for (const a of iter){
      if (a[Symbol.iterator]){ //console.log(a[Symbol.iterator]);
         yield* a;
      }else { //console.log(a[Symbol.iterator]);
         yield a
      };
   };
}

const flat = (iter) => [...L.flat(iter)]

L.range = function* (start, stop, step=1) {
   for (let i = start; i < stop; i += step) 
      yield i; 
};
const range = curried((..._)=>[...L.range(..._)]);

L.map = curried (function* (f,iter) {for(const a of iter) yield f(a)});
const map = curried((..._) => [...L.map(..._)]);

L.filter = curried(function* (f,iter) {for(const a of iter) if(f(a)) yield a;});
const filter = curried((..._)=> [...L.filter(..._)]);

L.take = curried (function* (n,iter) {
   for (const a of iter) {
      yield a;
      if (--n == 0) break;
   };
});
const take = curried((..._)=> [...L.take(..._)]);

const mlist= [1,[2,1],2,[5,[5,7]],5];
const list = [1,2,1,2,5,5,7,5];
go(innerlist, map(l=>l));
let arr = go (
   mlist
   , flat
   , console.log
);

let count = reduce((x,y)=> {
      x[y] = (x[y] || 0) + 1;
      return x;
   },{},list)

console.log(count);

