#!/run/current-system/sw/bin/env node
console.log('Hi');

const iterable = {
  [Symbol.iterator]() {
    let i = 5;
    return {
      next() { 
        return i === 0 ? { value: undefined, done: true } : { value: i--, done: false };
      },
      [Symbol.iterator]() { return this; }
    }
  }
};

let iter2 = iterable[Symbol.iterator]();
console.log(iter2[Symbol.iterator]() == iter2);
for (const a of iter2) console.log(a);

/*
제네레이터 함수의 선언은 function 앞에 *을 붙여서 function* func() 형식으로 선언하면 된다. 
  그리고 yield를 통해서 몇 번의 next()를 할 수 있는지를 결정할 수 있으며, 

  return값을 설정함으로써 
  done이 true가 되는 시점에 
  value값을 리턴할 수 있다.

※단, 기본적으로 순회하면서 조회할때는 리턴값은 무시된다.
*/
function* gen() {
  console.log('첫번째');
  yield 1; 
  console.log('두번째');
  yield 2; 
  console.log('세번째');
  yield 3;
  console.log('네번째');
  return 100;
  console.log('5번째');
  console.log('6번째');
}
const genIter = gen();
console.log(genIter.next());
console.log(genIter.next());
console.log(genIter.next());
console.log(genIter.next());
console.log(genIter.next());
//console.log(genIter.next());
//console.log(genIter.next());

//for (const a of gen) console.logt(a);

function* infinity(i=0) { 
  while (true) yield i++; 
}
function* limit(n,iter) {
  for (const a of iter) {
    yield a;
    if (a == n) return;
  }
}

function* odds(n) {
  for (const a of limit(n, infinity(1))) {
    if (a % 2) yield a;
  }
}
