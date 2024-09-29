import { stat, readFile } from 'fs/promises';

async function countBytes(fileName, skip) {
    try {
        let statData = await stat(fileName);
        return statData.size;
    } catch (err) {
        console.error("\x1b[31m", 'Error reading file:', err);
    }
}

async function countLines(fileName, skip) {

    try {
        let fileData = await readFile(fileName, 'utf8');
        return fileData.split('\n').length;
    } catch (err) {
        console.error("\x1b[31m", 'Error reading file:', err);
    }
}


async function countWords(fileName, skip) {
    try {
        let fileData = await readFile(fileName, 'utf8');
        return fileData.split(/\s+/).length;
    } catch (err) {
        console.error("\x1b[31m", 'Error reading file:', err);
    }
}

async function countChar(fileName, skip) {
    try {
        let fileData = await readFile(fileName, 'utf8');
        return fileData.split('').length;
    } catch (err) {
        console.error("\x1b[31m", 'Error reading file:', err);
    }
}



export { countBytes, countChar, countWords, countLines };