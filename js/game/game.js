#!/usr/local/opt/coreutils/libexec/gnubin/env node
//https://opengameart.org/sites/default/files/496_RPG_icons.zip
const row = 8;    //width
const column = 8; // height
const blockType = 5;
//const dataBuff = new ArraryBuffer(row * column);
//const data = new Int8Arrary(dataBuff);
//
const data  = [];
for (let i =0; i<row ; i++){
  const res = [];
  data.push(res);
  for (let j =0; j<column; j++){
    res[j] = parseInt(Math.random() * 5);
  }
}

let table = document.createElement('table');

data.map(row =>{
  table.appendChild(
    row.reduce((tr,item)=>{
      let td = document.createElement('td');
      let txt = document.createTextNode(item);
      td.appendChild(txt);
      tr.appendChild(td);
      return tr;
    },document.createElement('tr'))
  )
})

document.body.appendChild(table);
