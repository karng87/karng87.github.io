<script>const log = console.log;
const log = console.log;

const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};
</script>
# 코드를 값으로 다루어 표현력 높이기

## go, pipe

<script>
  const go = (...args) => reduce((a, f) => f(a), args);
  const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
  
  pipe = (f, ...fs) => (...as) => reduce((a,f)=> f(a), (f(...as),...fs);

  go(
    add(0, 1),
    a => a + 10,
    a => a + 100,
    log);
  // 111

  const f = pipe(
    (a, b) => a + b,
    a => a + 10,
    a => a + 100);

  log(f(0, 1));

  console.clear();

</script>
<script>
  const products = [
    {name: '반팔티', price: 15000},
    {name: '긴팔티', price: 20000},
    {name: '핸드폰케이스', price: 15000},
    {name: '후드티', price: 30000},
    {name: '바지', price: 25000}
  ];
</script>


# map

<script>
  const map = (f, iter) => {
    let res = [];
    for (const a of iter) {
      res.push(f(a));
    }
    return res;
  };

  // let names = [];
  // for (const p of products) {
  //   names.push(p.name);
  // }
  // log(names);

  log(map(p => p.name, products));

  // let prices = [];
  // for (const p of products) {
  //   prices.push(p.price);
  // }
  // log(prices);

  log(map(p => p.price, products));

</script>

# 이터러블 프로토콜을 따른 map의 다형성

<script>
  log([1, 2, 3].map(a => a + 1));

  log(map(el => el.nodeName, document.querySelectorAll('*')));

  // const it = document.querySelectorAll('*')[Symbol.iterator]();
  // log(it.next());
  // log(it.next());
  // log(it.next());
  // log(it.next());
  // log(it.next());

  function* gen() {
    yield 2;
    if (false) yield 3;
    yield 4;
  }

  log(map(a => a * a, gen()));

  let m = new Map();
  m.set('a', 10);
  m.set('b', 20);
  log(new Map(map(([k, a]) => [k, a * 2], m)));

  console.clear();
</script>


# filter

<script>
  const filter = (f, iter) => {
    let res = [];
    for (const a of iter) {
      if (f(a)) res.push(a);
    }
    return res;
  };

  // let under20000 = [];
  // for (const p of products) {
  //   if (p.price < 20000) under20000.push(p);
  // }
  // log(...under20000);

  log(...filter(p => p.price < 20000, products));

  // let over20000 = [];
  // for (const p of products) {
  //   if (p.price >= 20000) over20000.push(p);
  // }
  // log(...over20000);

  log(...filter(p => p.price >= 20000, products));

  log(filter(n => n % 2, [1, 2, 3, 4]));

  log(filter(n => n % 2, function* () {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
  }()));

  console.clear();
</script>

# reduce

<script>
  const nums = [1, 2, 3, 4, 5];

  let total = 0;
  for (const n of nums) {
    total = total + n;
  }
  log(total);

  const reduce = (f, acc, iter) => {
    if (!iter) {
      iter = acc[Symbol.iterator]();
      acc = iter.next().value;
    }
    for (const a of iter) {
      acc = f(acc, a);
    }
    return acc;
  };

  const add = (a, b) => a + b;

  log(reduce(add, 0, [1, 2, 3, 4, 5]));
  // 15

  log(add(add(add(add(add(0, 1), 2), 3), 4), 5));
  // 15

  log(reduce(add, [1, 2, 3, 4, 5]));
  // 15

  console.clear();
</script>

<script>
  log(
    reduce(
      (total_price, product) => total_price + product.price,
      0,
      products));
</script>
<script src="../lib/fx.js"></script>

<script>
  const add = (a, b) => a + b;

  log(
    reduce(
      add,
      map(p => p.price,
        filter(p => p.price < 20000, products))));

  log(
    reduce(
      add,
      filter(n => n >= 20000,
        map(p => p.price, products))));
</script>
<script src="../lib/fx.js"></script>

<script>
  const add = (a, b) => a + b;

  log(
    reduce(
      add,
      map(p => p.price,
        filter(p => p.price < 20000, products))));
  console.clear();
</script>

# 코드를 값으로 다루어 표현력 높이기

## go, pipe

<script>
  const go = (...args) => reduce((a, f) => f(a), args);
  const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

  go(
    add(0, 1),
    a => a + 10,
    a => a + 100,
    log);
  // 111

  const f = pipe(
    (a, b) => a + b,
    a => a + 10,
    a => a + 100);

  log(f(0, 1));

  console.clear();

</script>

<script>

  log(
    reduce(
      add,
      map(p => p.price,
        filter(p => p.price < 20000, products))));

  go(
    products,
    products => filter(p => p.price < 20000, products),
    products => map(p => p.price, products),
    prices => reduce(add, prices),
    log);

  go(
    products,
    filter(p => p.price < 20000),
    map(p => p.price),
    reduce(add),
    log);

</script>

## curry

<script>

  const mult = curry((a, b) => a * b);
  log(mult(3)(2));

  const mult3 = mult(3);
  log(mult3(10));
  log(mult3(5));
  log(mult3(3));
  console.clear();
</script>

# 함수 조합으로 함수 만들기

<script>
  const total_price = pipe(
    map(p => p.price),
    reduce(add));

  const base_total_price = predi => pipe(
    filter(predi),
    total_price);

  go(
    products,
    base_total_price(p => p.price < 20000),
    log);

  go(
    products,
    base_total_price(p => p.price >= 20000),
    log);
</script>
