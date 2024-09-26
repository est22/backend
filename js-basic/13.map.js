const map = new Map([
  ["nick", "슈가"],
  ["group", "BTS"],
  ["gender", "남"],
]);
console.log(map);  // Map(3) { 'nick' => '슈가', 'group' => 'BTS', 'gender' => '남' }

console.log(map.size);  // 3
console.log(map.has("name"));  // false
console.log(map.has("group"));  // true

console.log(map.get("name"));  // 'undefined'
console.log(map.get("group"));  // BTS

map.set("nation", "korea");
console.log(map);
map.set("group", "bts1");
console.log(map);
map.delete("gender");
console.log(map);
