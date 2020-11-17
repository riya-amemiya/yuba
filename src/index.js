import fs from 'fs';
let yuba_command = ["y "]
let js_command = [
    [`console.log(`, 1, ');\n']
]
let out = ""
let inpfile = "";
const check = (file) => {
    let hasfaile = false;
    try {
        fs.statSync(file);
        hasfaile = true;
    } catch (err) {
        hasfaile = false;
    }
    return hasfaile;
}

const read = (file) => {
    if (check(file)) {;
        inpfile = fs.readFileSync(file, 'utf8');
    }
    return inpfile;
}
let inp = (read('src/index.yuba').replace(/\n/g, '')).split(/;/);

for (const i in inp) {
    inp[i] = inp[i].split(/"/)
}
console.log(inp);
for (const i in inp) {
    for (const u in yuba_command) {
        if (~inp[i][0].indexOf(yuba_command[u])) {
            for (const f in js_command[u]) {
                if (typeof js_command[u][f] == 'number') {
                    let n = `${inp[i][f]}`
                    let m = n[new Date % n.length]
                    out += `"フン。${n}というのかい。贅沢な名だねぇ。今からお前の名前は${m}だ。いいかい、${m}だよ。分かったら返事をするんだ、${m}!!"`
                } else {
                    out += js_command[u][f]
                }
            }
        }
    }
}
console.log(out);
out = out.replace(/\n/g, '')
if (check('build_yuba')) {
    fs.writeFile('build_yuba/build.js', out, function(err) {
        if (err) { throw err; }
        console.log('build_yuba/build.jsが作成されました');
    });
} else {
    fs.mkdir('build_yuba', (err) => {
        if (err) { throw err; }
        fs.writeFile('build_yuba/build.js', out, function(err) {
            if (err) { throw err; }
            console.log('build_yuba/build.jsが作成されました');
        });
    });
}