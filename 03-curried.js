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

const range = (n) => {
   let i = -1;
   let res = [];
   while(++i < n) { 
      console.log('i: ', i);
      res.push(i);
   };
   return res;
};
const curried = (f) => (x,...xs) => {
   return xs.length ? f (x,...xs) : (...xs)=> f(x,...xs);
};
const reduce = curried(function (f,acc,iter) {
   if (!iter){
      iter = (acc[Symbol.iterator])? acc[Symbol.iterator]():empty();
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

L.range = function* (n) {
   let i = -1;
   while(++i < n) {
      yield i;
   };
};
L.map = curried (function* (f,iter) {for(const a of iter) yield f(a)});
L.filter = curried(function* (f,iter) {for(const a of iter) if(f(a)) yield a;});

const list = L.range(4);
//list = [0,1,2,3];2
pipe (L.map((x)=>x*2), reduce((a,b)=>a+b), console.log) (list);
//pipe (list=> L.map((x)=>x*2,list), list=> reduce((a,b)=>a+b,list),console.log) (list);
//go ( list, list=> L.map((x)=>x*2,list), list=> reduce((a,b)=>a+b,list),console.log);
//console.log(reduce((a,b)=>a+b, (L.map((x)=>x*2,list))));
//console.log(reduce((a,b)=>a+b, (L.map((x)=>{return x*2},list))));

