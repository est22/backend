const set = new Set([1, 2, 3, 4, 5]);
console.log(set);

console.log(set.size);
set.add(6);
console.log(set);
set.add(6);
console.log(set);

console.log(set.has(3));
console.log(set.has(6));
