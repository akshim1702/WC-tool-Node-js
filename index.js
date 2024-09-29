import readline from 'readline';
import { access, } from 'fs';
import path from 'path';
import { countBytes, countChar, countLines, countWords } from './Operations.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



let CurrentFile = '';







function main(fileName) {
    if (fileName) {
        let absPath = path.resolve(fileName);
        handleOperation(absPath);
    } else {
        rl.question('Enter File name: ', (answer) => {
            if (answer != null || answer != undefined || answer != '' || answer != ' ') {
                CurrentFile = answer;
                let absPath = path.resolve(answer);
                handleOperation(absPath);
            }
        });
    }

}


function handleOperation(absPath) {
    if (absPath) {
        access(absPath, async (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.error("\x1b[31m", path.basename(absPath) + ' does not exist');
                    newUpdate()
                    return;
                }

                throw err;
            }


            if (process.argv[2] == '-c') {
                let res = countBytes(absPath);
                res.then((data) => {
                    console.log("\x1b[32m", data);
                    newUpdate()
                })
            }
            if (process.argv[2] == '-l') {
                let res = countLines(absPath);


                res.then((data) => {
                    console.log("\x1b[32m", data);
                    newUpdate()
                })
            }
            if (process.argv[2] == '-w') {
                let res = countWords(absPath);
                res.then((data) => {
                    console.log("\x1b[32m", data);
                    newUpdate()
                })
            }
            if (process.argv[2] == '-m') {
                let res = await countChar(absPath);
                res.then((data) => {
                    console.log("\x1b[32m", data);
                    newUpdate()
                })

            }
            if (process.argv[2] == undefined) {

                let [bytes, lines, words, char] = await Promise.all([
                    countBytes(absPath),
                    countLines(absPath),
                    countWords(absPath),
                    countChar(absPath)]);

                console.log(`\x1b[0m`,
                    `Bytes: ${bytes}, Lines: ${lines}, Words: ${words}, Characters: ${char}`);
                newUpdate()
            }

        });
    }
}


function newUpdate() {
    console.log("\x1b[0m");
    rl.question(`
        Please input next operation with indicated option name
        ( A ) Update filename
        ( B ) Update process (Available process '-l [Get Line count]' , '-c [Get Bytes count]' , '-w [Get Word count]' , '-m [Get character count]')
        ( C ) Exit
        `, (answer) => {

        if (answer.toUpperCase() == 'A') {
            main();
        } else if (answer.toUpperCase() == 'B') {
            rl.question('Enter operation: ', (op) => {
                if (op.toLowerCase() == '-l') {
                    process.argv[2] = op.toLocaleLowerCase();
                    main(CurrentFile)
                }
                if (op.toLowerCase() == '-c') {
                    process.argv[2] = op.toLocaleLowerCase();
                    main(CurrentFile)
                }
                if (op.toLowerCase() == '-w') {
                    process.argv[2] = op.toLocaleLowerCase();
                    main(CurrentFile)
                }
                if (op.toLowerCase() == '-m') {
                    process.argv[2] = op.toLocaleLowerCase();
                    main(CurrentFile)
                }

            });
        } else if (answer.toUpperCase() == 'C') {
            rl.close();
        }
        else {
            console.error("\x1b[31m", 'Invalid input. Please try again.');
            newUpdate()
        }

    });
}




main();