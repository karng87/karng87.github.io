#!/usr/local/opt/coreutils/libexec/gnubin/env node

class Test1 {
  #map = new Map();
  set name(v) {this.#map.name = v}
  get name() { return this.#map.name ?? "no name";}

  set company(v) {this.#map.company = v;}
  get company() {return this.#map.company ?? "no company"}
}

class Test2 {
  #map = new Map();
  _set(k,v) { this.#map.set(k,v);}
  _get(k) { return this.#map.get(k) ?? `no ${k}`}

  set name(v){ this._set("name",v);}
  get name(){ return this._get("name");}

  set company(v) { this._set("company",v); }
  get company() { return this._get("company"); }
}

class Test3{
  #map = new Map;
  //delegate = new TestDelegate3(this.#map);
  //set name(v) { this.delegate.setValue("name",v) }
  //get name() { return this.delegate.getValue("name"); }
  //set company(v) { this.delegate.setValue("company",v) }
  //get company() { return this.delegate.getValue("company") }

  #name = new ValueDelegate("");
  #company = new ValueDelegate("");
  set name(v) { this.#name.setValue(v); }
  get name(){ return this.#name.getValue()};

  set company(v) { this.#company.setValue(v); }
  get company() { return this.#company.getValue() }
}
class TestDP1 {
  #map = new Map;

  constructor(){
    const name = new TestDelegate3(this.#map);
    Object.defineProperty(
      this
      ,"name"
      ,{
        get(){
          return name.getValue("name");
        }
        ,set(v){
          name.setValue("name",v);
        }
      }
    );

    const company = new ValueDelegate("no company...");
    Object.defineProperty(
      this
      ,"company"
      ,{
        get(){
          return company.getValue();
        }
        ,set(v){
          company.setValue(v);
        }
      }
    );
  }
}
class ValueDelegate1{
  #v
  constructor(v) { this.#v = v;}
  getValue(k) { return this.#v } 
  setValue(k,v) { this.#v = v; }
}
class TestDelegate3{
  #map;
  constructor(map){ this.#map = map; }
  getValue(k) { return this.#map.get(k) ?? `no ${k}...`; }
  setValue(k,v) { this.#map.set(k,v); }
}
class TestDP {
  #map = new Map;
  constructor(){
    prop(this,"name",new TestDelegate3(this.#map));
    prop(this,"company",new ValueDelegate("no Company..."));
  }
}
const prop = (thisTarget,nKey,delegate)=>{
  Object.defineProperty(
    thisTarget
    ,nKey
    ,{
      get(){return delegate.getValue(nKey);}
      ,set(v){delegate.setValue(nKey,v)}
    }
  ); 
}

const proto = (target, key, delegate)=>{
  Object.defineProperty(target
    ,key
    ,{
      get() {
        return delegate.getValue(this,key);
      }
      ,set(v){
        delegate.setValue(this,key,v);
      }
    }
  );
}

class TestProto{
  map = new Map;
}
class TestDelegate{
  getValue(target,k){ return target.map.get(k) ?? `no prototype ${k}`}
  setValue(target,k,v) {target.map.set(k,v)}
};
class ValueDelegate{
  #v
  constructor(v){ this.#v = v;}
  getValue(target,k) { return this.#v}
  setValue(target,k,v){ this.#v = v}
};

test = new TestProto();
proto(TestProto.prototype,"name",new TestDelegate);
proto(TestProto.prototype,"company", new ValueDelegate("no Prototype Company..."));
console.log(test.name);
test.name = "My Name"
console.log(test.name);

console.log(test.company);
test.company = "My Company";
console.log(test.company);





