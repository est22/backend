const path = require("path");
const fs = require('fs');

const newFilePath = path.join(__dirname, "folder", "file.txt");
console.log(newFilePath, path.parse(newFilePath).dir);



// newFilePath에 파일을 생성하고, file.txt에 아무 문자열이나 넣어보세요
// fpath = "a2/b2/c2/3.txt", "a3/b3/c4/4.txt"
const makeFile = (fpath, content) => {
    const patharr = fpath.split('/');
    const filename = patharr.pop();
    const dirname = patharr.join('/');
    fs.mkdirSync(dirname, { recursive: true });
    fs.writeFileSync(fpath, content);
}
makeFile(newFilePath, "content");

// what if 
// fpath = "a2/b2/c2/3.txt", "a3/b3/c4/d4"??
const makeFile2 = (fpath, content) => {
    const filename = path.parse(fpath).base // extract filename from fpath
    if (filename.includes(".")){
        const dirname = path.parse(fpath).dir // extract dirname from fpath
        fs.mkdirSync(dirname, { recursive: true });
        fs.writeFileSync(fpath, content);
    }
    
}


// makeFile2(newFilePath,"test3");