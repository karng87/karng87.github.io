#!/run/current-system/sw/bin/env node
const products = [
   { name: '반팔티', price: 15000 },
   { name: '긴팔티', price: 20000 },
   { name: '후드티', price: 40000 },
   { name: '긴바지', price: 30000 },
   { name: '반바지', price: 25000 },
];

const map = (f, iter) => 
{
   let res = [];
   for (const a of iter)
     res.push(f(a));
   return res;
};

const filter = (f, iter) => {
   let res = [];
   for (const a of iter)
      if (f(a)) res.push(a);
   return res;
};

const reduce = (f, acc, iter) => {
   if (!iter) {
      iter = acc[Symbol.iterator]();
      acc = iter.next().value;
   };

   for (const a of iter) {
      acc = f (acc, a);
      //console.log(a);
   };
   return acc;
};

const go = (x,...fs) => {
   reduce ((acc,f)=>{return f(acc)},x,fs);
};

const pipe = (...fs) => (x) => {
   //reduce ((acc,f)=>{return f(acc)},x,args);
   go (x,...fs);
};

const curry = (f) => 
   (x,...xs) => 
      xs.length ? 
         f(x,...xs) 
         : (...xs) => f(x, ...xs)

const add = curry ((x,y)=> x + y);
console.log(add(3)(9));
//console.log( products.map((p)=>{return p.price}) .reduce((a,b)=>{return a+b}));
//console.log( reduce( (acc,bcc)=>{return acc+bcc} ,map((p)=>{return p.price},products)));

go (
      products,
      products => filter((p)=>{return p.price > 20000},products),
      products => map((p)=>{return p.price},products),
      products => reduce((a,b)=>{return a+b},products),
      console.log
)
pipe (
      products => filter((p)=>{return p.price > 20000},products),
      products => map((p)=>{return p.price},products),
      products => reduce((a,b)=>{return a+b},products),
      console.log
) (products);









