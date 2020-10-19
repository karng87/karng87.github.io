!function() {
  const L = {};
  const A = {};
  const C = {};

  const curried = f => (...xs) => xs.length <2 ? (...ys) => f (...xs,...ys) : f(...xs);
  const range = function* (start, end, step=1){
    while(start < end){
      yield start;
      start += step;
    }
  } 

  const reduce = curried( async (f, acc, iter, n=Infinity) => {
    if(!iter) {
      iter = [Symbol.iterator] ? [Symbol.iterator]() : (function*(){})();
      acc = await iter.next().value;
    }

    for (const a of iter) {
      acc = await f(acc, await a);
      if( --n == 0 ) break;
    }
    return acc;
  });

  const pipe = (...fs) => x => reduce( (x,f)=>f(x), x, fs );
  const go = (x,...xs) => reduce((a,b)=> b(a),x,xs);

  const take = curried( async (n, iter) => 
    reduce( 
      (a,b)=>{ 
        if (a.length === n) return a; 
        a.push(b); 
        return a; 
      }, 
      [], 
      await iter,
      n
    )
  );

  L.flat = function* (iter) {
    for (const a of iter){
      a[Symbol.iterator] ? yield* a : yield a;
    }
  }

  L.flatten = function* rec (iter) {
    for (const a of iter){
      a[Symbol.iterator] ? yield* rec(a) : yield a;
    }
  }

  L.map = async function*(f,iter){
    for (const a of await iter){
      yield await f(await a);
    }
  }
  const map = curried( async (f,iter) => {
    return reduce ( 
      (acc, b) => 
      { 
        acc.push(f(b)); 
        return acc; 
      }, [], await iter)} );

  const filter = curried( async (f,iter) => 
    {
      return reduce (
        (acc,b)=>
        { 
          f(b) ? acc.push(b) : acc;
          return acc;
        }, [], await iter)
    }); 

  const find = curried((f,iter) => {
    for (const a of iter) if(f(a)) return a;
  });


  Object.assign(
    window, 
    {
      take, range, L, C, A, curried, reduce, map, filter, pipe, go, find
    }); 
} ();
