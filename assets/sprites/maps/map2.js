(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("map2",
{ "height":10,
 "layers":[
        {
         "data":[17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 7, 7, 7, 7, 7, 7, 7, 7, 17, 17, 7, 7, 7, 7, 7, 7, 7, 7, 17, 17, 7, 7, 7, 7, 7, 7, 7, 7, 17, 17, 7, 7, 7, 7, 7, 7, 7, 7, 17, 17, 7, 7, 7, 7, 7, 7, 7, 7, 17, 17, 7, 7, 7, 7, 7, 7, 7, 7, 17, 17, 7, 7, 7, 7, 7, 7, 7, 7, 17, 17, 7, 7, 7, 7, 7, 7, 7, 57, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17],
         "height":10,
         "name":"Capa de Patrones 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }],
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.0.3",
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "source":"zombiepix.tsx"
        }],
 "tilewidth":32,
 "type":"map",
 "version":1,
 "width":10
});