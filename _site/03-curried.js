#!/usr/local/opt/coreutils/libexec/gnubin/env node
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

const function* empty() {};

const curried = (f) => (x,...xs) => {
   return xs.length ? f (x,...xs) : (...xs)=> f(x,...xs);
};
const id = x => x;
const head = pipe(L.take(1), reduce(id));
const tail = pipe(

const go = (x,...xs) => reduce ((x,f)=>f(x),x,xs);
const pipe = (...xs) => (...args) => go(...args, ...xs);

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
const L = {};

L.flat = curried(function* (iter) {
   for (const a of iter){
      if (a[Symbol.iterator]){ //console.log(a[Symbol.iterator]);
         yield* a;
      }else{ //console.log(a[Symbol.iterator]);
         yield a
      };
   };
});
const flat = (iter) => [...L.flat(iter)]

L.range = curried(function* (start, stop, step=1) {
   while (start < stop)
    yield start;
    start += step;
   //for (let i = start; i < stop; i += step) 
   //   yield i; 
});
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

const innerlist = [1,2,3,[4,[5,6]],7];
console.log('map: ', map(l=>l,innerlist));
go (innerlist, L.flat,map((l)=>l),take(4),console.log);
//go (innerlist, L.flat,reduce((a,b)=>(a+b)), console.log);
//pipe (L.flat, reduce((a,b)=>(a+b)),console.log)(innerlist);
//console.log(flat(innerlist));
//const list = L.range(0,4);
//list = [0,1,2,3];2
//pipe (L.map((x)=>x*2), reduce((a,b)=>a+b), console.log) (list);
//pipe (list=> L.map((x)=>x*2,list), list=> reduce((a,b)=>a+b,list),console.log) (list);
//go ( list, L.map((x)=>x*2), reduce((a,b)=>a+b),console.log);
//console.log(reduce((a,b)=>a+b, (L.map((x)=>x*2,list))));
//console.log(reduce((a,b)=>a+b, (L.map((x)=>{return x*2},list))));
 
