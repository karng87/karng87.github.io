!function() {
  const curried = f => (...xs) => xs.length <2 ? (...ys) => f (...xs,...ys) : f(...xs);

  const reduce = curried(
    (f,acc,iter) => {for(const a of iter) acc = f(acc,a); return acc;}
  );

  const pipe = (...fs) => x => reduce((x,f)=> f(x),x,fs);
  const go = (x,...xs) => reduce((a,b)=> b(a),x,xs);

  const find = curried((f,iter) => {
    for (const a of iter) if(f(a)) return a;
  });


  Object.assign(
    window, 
    {
      curried, reduce, pipe, go, find
    }
  );
} ();
