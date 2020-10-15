#!/run/current-system/sw/bin/env node

//deepFlat = function* f(iter) {
//  for (const a of iter) {
//    if (isIterable(a)) yield* f(a);
//    else yield a;
//  }
//};
console.log([...deepFlat([1, [2, [3, 4], [[5]]]])]);
// [1, 2, 3, 4, 5];

const YAML = require('yamljs');
const fs = require('fs');
const wiki_path = './_wiki'
const file_List = [];
const tag_Map = {};
const page_Map = {};

/*** flatMap *** 
xs.flatMap(f) == xs.map(f).reduce((a,b) => a.concat(b), [])
xs.flatMap(f) == xs.reduce((a,b) => a.concat(f(b)), [])
const list = [[1,[4,6]],2,3,4,5].flatMap((x)=>{return x});
console.log(list);

const f1 = () => () => 1;
console.log(f1)

const arr = [1,2,3];
let iter1 = arr[Symbol.iterator]();
for (const a of iter1) console.log(a);
for (const a of arr) console.log(a);

const set = new Set ([1,2,2]);
for (const a of set) console.log(a);

const map = new Map([['a',1],[4,3]]);
for (const a of map) console.log(a);

console.log([...arr, ...set, ...map.keys()]);
const f1 = () => () => 1;
console.log(f1)

const arr = [1,2,3];
let iter1 = arr[Symbol.iterator]();
for (const a of iter1) console.log(a);
for (const a of arr) console.log(a);

const set = new Set ([1,2,2]);
for (const a of set) console.log(a);

const map = new Map([['a',1],[4,3]]);
for (const a of map) console.log(a);

console.log([...arr, ...set, ...map.keys()]);
*/

getFileList('./_wiki', 'wiki', file_List);
getFileList('./_posts', 'blog', file_List);

function getFileList(path, type, list)
{
  fs.readdirSync(path)
    .forEach((file)=>
    {
      const fullPath = path + '/' + file;
      //console.log(fullPath);

      if(fs.lstatSync(fullPath).isDirectory())
      {
        return getFileList(fullPath, type, list);
      };

      if(/\.md$/.test(file)) 
      {
        const obj = {
          'path': path + '/' + file,
          'type': type,
          'name': file,
          'children': [],
        };
        console.log(obj);
        return list.push(obj);
      };
    });
}

const dataList = 
  file_List
    .map ((objs)=>
      {
        const fileContents = fs.readFileSync(objs.path, 'utf8');
        const headerContents = fileContents.split('---')[1];

        if (headerContents == null) { return undefined; };

        const obj = {};
        obj.fileName = objs.name.replace(/\.md$/, '');
        obj.type = objs.type;

        headerContents.split('\n')
          .forEach ((str) =>
            {
              const result = /^\s*([^:]+):\s*(.+)\s*$/.exec(str);
              if (result == null) {return};
              const key = result[1].trim();
              const val = result[2].trim().replace(/\[{2}|\]{2}/g, '');

              obj[key] = val;
            });

        if(objs.type === 'blog') {
          obj.url = '/blog/' + obj.fday.replace(/^(\d{4})-(\d{2})-(\d{2}).*$/, '$1/$2/$3/');
          obj.url += obj.fileName.replace(/^(\d{4}-\d{2}-\d{2}-)?(.*)$/, '$2');
        }else if (objs.type === 'wiki') { 
          obj.url = '/wiki/' + obj.fileName;
        }

        const mtime = fs.statSync(objs.path).mtime;
        obj.modified = mtime;
        return obj; 
      })
    .filter((obj)=> { 
      return obj != null && obj.public != 'false'; 
      })
    .sort((a,b)=> { 
      return a.fileName.toLowerCase().localeCompare(b.fileName.toLowerCase()); 
      })
    .map ((obj)=> { 
      console.log(obj);
      return obj;
      });



//dataList.forEach((data) => {
//  if (!data.tags) { return; };
//  JSON.parse(data.tags).forEach((tag)=>{
//    if(!tag_Map[tag]) { tag_Map[tag] = [] };
//    tag_Map[tag].push({fileName: data.fileName,});
//  });
//});
//
//for (tag in tag_Map) {
//    tag_Map[tag].sort((a, b) => {
//        return a.fileName.toLowerCase().localeCompare(b.fileName.toLowerCase());
//    });
//}
//
//fs.writeFile("./_data/tag_Map.yml", YAML.stringify(tag_Map), (err)=>{
//  if (err) {return console.log(err)};
//  console.log("tag_Map saved");
//});
//console.log(tag_Map);
