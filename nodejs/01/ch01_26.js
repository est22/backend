let personInfo = {
  name: "홍길동",
  age: 25,
  address: "서울시 금천구 독산동",
    hobby: ["등산", "독서", "코딩"],
    addAge: function () {
        this.age = this.age + 1;
    },
    changeAddress: function () {
        this.address = "서울시 종로구 익선동";
    },
    getAddress: function () {
        return this.address;
    },
    getAge: function () {
        return this.age;
    }
};

console.log(`before age: ${personInfo.age}`);
personInfo.addAge();
console.log(`after age: ${personInfo.age}`);

// 주소 변경
console.log(`변경 전 주소: ${personInfo.address}`);
personInfo.changeAddress();
console.log(`변경 후 주소: ${personInfo.address}`);

console.log(personInfo.getAddress());