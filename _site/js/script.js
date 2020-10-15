#!/usr/local/opt/coreutils/libexec/gnubin/env node

class Test {
  #map = new Map; // # means private
  set name(v) {
    this.#map.set("name",v);
  }
  get name(){
    return this.#map.get("name") ?? "no name"; // ?? when undefined, null
  }
}

const test = new Test;
console.log(test.name);

test.name = "hika";
console.log(test.name);
