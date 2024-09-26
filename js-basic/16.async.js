function sayHello(name) {
  return `안녕, ${name}`;
}

function doOtherThing() {
  for (let i = 0; i < 10; i++) {
    console.log(`${i}번째 처리`);
  }
}

// callback 지옥: 비동기처리의 단점: 개발자 입장에서 디버깅을 하기 어려움(compared to 동기)
function asyncTest(name, callback) {
  console.log("타이머 시작");
  setTimeout(() => {
      console.log(callback(name));
  }, 3000); // 3초 후에 데이터를 가져온다고 가정
}
asyncTest("뷔",sayHello); // sayHello() 아님!!
doOtherThing();
