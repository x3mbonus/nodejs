//5. Напишите скрипт, который создает 50 каталогов в указанной директории, в каждом каталоге должен находится файл с содержимым "Файл из каталога №___", после того как каталоги и файлы созданны, срипт должен пройтись по всем созданным каталогам и вывести содержимое файлов в консоль

let path = require('path');
let fs = require('fs');
let number = 50;
let pathName = __dirname+"\\temp";
if (!fs.existsSync(pathName)) {
    fs.mkdirSync(pathName);
}

for (let i = 0; i < number; i++)
{
    let folder = pathName+"\\folder"+i;
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
    let fileName = folder+"\\file.txt";    
    fs.writeFileSync(fileName, `File from folder #${i}`,);
}

/*
fs.readdir(pathName, function (err, files){
    if (err)
    {
        console.error(err);
        return;
    }
    for(var i = 0; i < files.length; i++)
    {
        
        console.log(files[i]);
    }
});
*/

for(let i = 0; i < number+3; i++)
{
    let filePath = pathName + `\\folder${i}\\file.txt`;
    fs.exists(filePath, (exists) => {
        if (!exists)
        {
            console.log(`${filePath} not exists`);
            return;
        }
        fs.readFile(filePath, (err, data) => {
            if (err)
            {
                console.error(err);
                return;
            }
            console.log(`${filePath} : ${data}`);
        })
    });
}