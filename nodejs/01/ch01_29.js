try {
    const err = new Error("this is error");
    err.name = "My first error";
    err.message = "my first error msg";
    throw err;

} catch (e) {
    console.log(`예외처리 예외이름: ${e.name}, 예외메시지: ${e.message}`);
    
}