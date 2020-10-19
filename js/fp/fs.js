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

  const reduce = curried( async (f,acc,iter,n=Infinity) => {
    if(!iter) {
      iter = (await acc)[Symbol.iterator] ? (await acc)[Symbol.iterator]() : (function*(){})();
      acc = (await iter.next()).value;
    }

    for (const a of iter) {
      if (n === 0) break;
      acc = await f(acc, a);
      n--;
    }
    return acc;
  });

  const take = curried( async(n, iter) => 
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

  A.take = curried(async(n,iter) => {
    if (typeof(n) !== 'number' || n < 1) return;
    let res = [];
    for (const a of iter) {
      try {
        res.push(await a);
      }catch(err){
        return Promise.reject(err);
      }
      if (res.length === n) return res;
    }
  });

  C.take = curried( (n,iter) => {
    const il = iter.length;
    if (il < 1 || typeof(n) !== 'number' || n < 1) return;
    let limit = n;
    if (il < limit) limit = il;

    let res = [];
    for (const a of iter) {
      res.push(a);
      if (res.length === limit) return res;
    }
  });


  const map = curried( async (f,iter) => {
    return reduce ( (acc, b) => { acc.push(f(b)); return acc; }, [], await iter)} );
  const filter = curried( async (f,iter) => reduce ((a,b)=>{ 
    f(b) ? a.push(b) : a;
    return a;
  },[],await iter)); 

  const pipe = (...fs) => x => reduce( (x,f)=>f(x), x, fs );
  const go = (x,...xs) => reduce((a,b)=> b(a),x,xs);

  const find = curried((f,iter) => {
    for (const a of iter) if(f(a)) return a;
  });


  Object.assign(
    window, 
    {
      take, range, L, C, A, curried, reduce, map, filter, pipe, go, find
    }); 
} ();
