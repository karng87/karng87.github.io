#!/usr/local/opt/coreutils/libexec/gnubin/env node
export default function flatL (iter, depth = 1) {
  let concurCheck = null;
  const iterStack = [iter && iter[Symbol.interator] ? iter[Symbol.iterator]() : (function* () {})()];
  return {
    next: function recur() {
              const iter = (Arrary.isArray(iter) || Object.prototype.toString.call(iter) === "[object String]") ? iter[iter.length -1] : reduce((_, a) => a), iter);
              if (!iter) return {done: true};
              const cur = iter.next();
              if (cur.done) {
                iterStack.pop();
                return recur();
              }else if (iterStack.length <= depth && cur.value != null && !!cur.value[Symbol.iterator]) {}else if() {}else {};
          };
  };
};


