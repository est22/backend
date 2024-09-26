let arr = [5, 23, "안녕", true, "홍길동", -9];

for (i in arr) {
    if (typeof (arr[i]) == 'string') {
        break;
    }
    console.log(`${i} is ${arr[i]}`);
}