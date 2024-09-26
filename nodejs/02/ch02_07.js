let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 1) 11부터 20까지의 요소를 data 배열에 추가
for (let i = 11; i < 21; i++) {
    data.push(i);
}
console.log(data)

// 2) data2 배열을 만드는데, data 배열 각 요소 *2를 하세요
let data2 = data.map((x) => x * 2);
console.log(data2);

// 3) data 배열에서 짝수만 가진 배열을 data3으로 만들어주세요
const data3 = data.filter((x) => {
  return x % 2 == 0;
});
console.log(data3);

// 4) data 배열 중에서 5이상이고 15 이하인 값을 출력해주세요 
const data4 = data.filter((x) => {
    return x >= 5 && x <= 15;
});
console.log(data4);