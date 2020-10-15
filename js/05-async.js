#!/run/current-system/sw/bin/env node
const products = [
   { name: '반팔티', price: 15000 },
   { name: '긴팔티', price: 20000 },
   { name: '후드티', price: 40000 },
   { name: '긴바지', price: 30000 },
   { name: '반바지', price: 25000 },
];


const curried = f => (x,...xs)=>{
   xs.length ? f(x,...xs) : (...xs)=>f(x,...xs)
};

const reduce = (f,acc,iter) => {
   iter = !iter && acc[Symbol.iterator] ? acc[Symbol.iterator]() : (function*(){})();
   acc = iter.next().value;
   for (const a of iter) acc=f(acc,a);
   return acc;
};
const L ={};
const range = function* (start=0,end,step=1) {

};

const working =_=>{};
for(let i=0; i<10000; i++) working();

const nbFor=(max,load,block)=>{
   let i=0;
   const f= time=>{
      let curr = load;
      while(curr-- && i<max){
         block();
         i++;
      };

      console.log(i);
      if(i<max-1) setTimeout(f,0);
   };
   setTimeout(f,0);
};

//nbFor(100,10,working);

const gene = function*(max,load,block){
   let i = 0;
   curr = load;
   while(i<max){
      if(curr--){
         block();
         i++;
      }else{
         curr = load;
         console.log(i);
         yield;
      }
   }
};
const nbGen= (max,load,block)=>{
   const iterator = gene(max,load,block);
   const f =_=>iterator.next().done||setTimeout(f,0);
   setTimeout(f,0);
};
//nbGen(100,10,working);

const gene2 = function*(max,load,block){
   let i = 0;
   while(i < max){
      yield new Promise(res=> {
         let curr = load;
         while(curr-- && i<max){
            block();
            i++;
         }
      console.log(i);
      res("resolve: " + i);
      //setTimeout(res(i),0);
      });
   }
};
const iter = gene2(100, 10, working);
iter.next().value.then(r=> iter.next());
for (const a of iter) console.log(a);

//const nbGene2 = (max, load, block) => {
//   const iter = gene2(max, load, block);
//   const next = ({value, done})=> {
//         done || value.then(r=>{
//            console.log(r);
//            next(iter.next());
//         })
//   };
//   next(iter.next());
//};
//
//nbGene2(100,10,working);


const g2 = a=>{
   let b;
   return wrap( _context=>{
         while(1){
            switch(_context.prev = _context.next){
               case 0:
                  _context.next = 2;
                  return a;
               case 2:
                  b = a;
                  _context.next =5;
                  return b;
               case 5:
               case "end":
               return _context.stop();
            }
         }
      }
   );
};

const wrap = block => new SwitchIterable(block);
const SwitchIterable = class {
   #block;
   constructor(block){this.#block = block;}
   [Symbol.iterator](){return new SwitchIterator(this.#block);}
};

const SwitchIterator = class {
   static done = {done:true};
   #block;
   #context = new Context;
   constructor(block){this.#block = block;}
   next(){
      const value = this.#block(this.#context);
      return value === Context.stop ? SwitchIterator.done : {value, done:false};
   }
};

const Context = class {
   static stop = Symbol();
   prev = 0;
   next = 0;
   stop() {return Context.stop};
};

const iterg2 = g2(5);
for (const a of iterg2) console.log('SwitchIterator :',a);

const gene4 = a => {
   let b;
   return new SeqIterable(
      continuation => {continuation.resume(a);}
      ,continuation => {b=a; continuation.resume(b);}
   );
};

async function* myGene(start, end) {
   for (let i = start; i<=end; i++){
      await new Promise(res => setTimeout(res,1000));
      yield i;
   } 
};
let it = myGene(1,5);
(async _=>{console.log(await it.next())})();
(async _=>{console.log(await it.next())})();
(async _=>{console.log(await it.next())})();
(async _=>{console.log(await it.next())})();
(async _=>{console.log(await it.next())})();

let ged = function*(){ 
   yield "a";
   yield "b";
   yield "c";
   yield "d";
};

let gei = ged();
console.log(gei.next());
console.log(gei.next().value);
console.log(gei.next().done);
console.log(gei.next());
new Promise
(
   (f,g)=>
   { 
      console.log('here is in promise'); 
      setTimeout(()=>f("a"),1000);
   }
);
//promise.then(v=> console.log('resolve: ', v),e=> console.log('reject: ', e))

//new Promise(f=>f(1))
//   .then(y=>{console.log(y);return y * 2})
//   .then(y=>{
//      console.log(y);
//      return new Promise (f=>setTimeout(()=>f(y * 100),1000));
//      //return "time"
//   })
//   .then(y=>console.log("last01",y))
//   .then(y=>console.log("last",y));
((x,f) =>{
   console.log("call back",x); 
   setTimeout(_=>f("bang"+x),1000);
})(3,x=>console.log(x));
