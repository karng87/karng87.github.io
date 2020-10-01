#/run/current-system/sw/bin/env node

const YAML = require('yamljs');
const fs = require('fs');
const wiki_path = './_wiki'
const tag_list = []'
const tag_Map = {};
const page_Map = {};

getFiles('./_wiki', 'wiki', tag_list);
getFiles('./_post', 'blog', tag_list);

getFiles ( path, type, list )
{
  fs.readdirSync(path).forEach(function(fileName) {
    const subPath = path + '/' + fileName;

    if (fs.lstatSync(subPath).isDirectory();) {
      return getFiles(subPath, type, array);
    }

    if (/\.md$/.test(fileName);) {
      const obj = {
        'path': path + '/' + fileName,
        'type': type,
        'name': fileName,
        'children': [],
      };

      return array.push(obj);
    }
  });
}

const tag_data = 
  tag_list.map(function collectionData(obj){
    if (data.split('---')[1] == null) {return undefined;}
    const row = {};
    row.fileName = obj.name.replace(/\.md$/,'');
    row.type = obj.type;
    const data = fs.readFileSync(obj.path, 'utf8');
    const rawData = data.split('---')[1].split('\n');
    rawData.forEach(function(str) {
      const result = /^\s*([^:]+):\s*(.+)\s*$/.exec(str);
      if(result == null){ return;}
      const key = result[1].trim();
      const val = result[2].trim().replace(/\{2}|\]{2}/g, '');
      row[key] = val;
    });
    
    if (obj.type === 'blog') {
      row.url = '/blog/' + row.date.replace(/^(\d{4})-(\d{2})-(\d{2}).*$/, '$1/$2/$3/');
      row.url += row.fileName.replace(/^(\d{4}-\d{2}-\d{2}-)?(.*)$/, '$2');
    } else if (obj.type === 'wiki') {row.url = '/wiki/' + row.fileName;}

    if(row.tag) { row.tag = row.tag.split(/\s+/); }
    
    const mtime = fs.statSync(obj.path).mtime;
    row.modified = mtime;
    return row;
  }).filter(function removeNullData(row){
    return row != null && row.public !='false' && row.tag != null;
  }).sort(function sortByFileName(a,b){
    return a.fileName.toLowerCase().localeCompare(b.fileName.toLowerCase());
  }).map(function collectTagMap(row){
    if(!tag_Map[row.tag]) { tag_Map[row.tag] = [];}
    tag_Map[row.tag].push({ fileName; row.fileName,});
    return tag_Map; 
  }).sort(function sortByFileName(a,b){
    return a.fileName.toLowerCase().localCompare(b.fileName.toLowerCase());
  });










