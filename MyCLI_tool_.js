const fs = require("node:fs");
// Just Fun ASCII Art :) - But Not Work
// let ReadFileValueOne =  fs.readFileSync('./DataBase/ACSIIARt.txt',"utf-8")
// let SplitTheTxtFile = ReadFileValueOne.split(',')
// for(let i in SplitTheTxtFile){
//     console.log(...SplitTheTxtFile[i])
// }
// ____________________________________________________________________________
// The Harder Way V1.1.0
// Create a Node CLI Tool To ka4yr El Afrke To Calc The Price Of "El Mamno3aaaat" with a taxes 20$
// The --Price:{ThePrice} or -p:{ThePrice}
// The --Taxe or -T
// The --version or -v 
const { toNumber, toInteger, indexOf } = require("lodash");
// let GetThePriceNumber;
// for(let i in process.argv){
//     if(process.argv[i].match(/--price:[0-9]{1,6}/gi) !== null || process.argv[i].match(/-p:[0-9]{1,6}/gi) !== null ){
//         GetThePriceNumber = toInteger(process.argv[i].slice(process.argv[i].indexOf(':',0)+1,process.argv[i].length))
//         // console.log(typeof GetThePriceNumber)
//     }else if(process.argv[i].match(/--AddTaxes/gi) !== null || process.argv[i].match(/-at/gi)){
//         let AllResult = GetThePriceNumber + 20
//         console.log(`Pay :${AllResult}$`)
//     }else if(process.argv[i].match(/--version/gi) !== null || process.argv[i].match(/-v/gi) !== null){
//         console.log("V1.0.1")
//     }else{
//         if(i != 0 && i != 1){
//             console.log(`ERR:305 The ARGV : ${process.argv[i]} is Undefinde`)
//         }
//     }
// }
// The Command Way -- V1.3.2
const { Command } = require('commander');
const { brotliDecompress } = require("node:zlib");
const ElAfreke = new Command();
ElAfreke
    .name("El Afrekee Sotre")
    .description("ka4yr El Afrke To Calc The Price Of \"El Mamno3aaaat\" with a taxes 20$")
    .version('1.0.0')
ElAfreke.command('add')
    .alias('a')
    .alias('A')
    .description("Add Price Of El Mamno3aaaaaaat")
    .argument('<Mamno3aatName>',"The Name of Mamno3aaaaat")
    .option('--price <price>','The price of El Mamno3aaat')
    .action((Mamno3aatName,price) => {
        let start = Date.now()
        let ThePrice = JSON.stringify(price)
        let TheReadPointerFile = fs.readFileSync('./DataBase/IDPointer.txt','utf-8')
        let ThePointerNumber = toInteger(TheReadPointerFile.slice(TheReadPointerFile.indexOf(':')+1,TheReadPointerFile.length))
        let GetThePriceNumber = ThePrice.slice(ThePrice.indexOf(':')+2,-2)
        ThePointerNumber+=1
        if(isNaN(GetThePriceNumber) === false){
            let TheTxtDBAndSessios = `{\n    The Name of T'Shirt is: ${Mamno3aatName}\n    The price Of This is : ${+GetThePriceNumber+20}$\n    With ID:${ThePointerNumber} \n},`
            fs.writeFileSync('./DataBase/IDPointer.txt',`IdPointer:${ThePointerNumber}`)
            fs.writeFile('./DataBase/TheDBOfAlAfreke.txt',`${TheTxtDBAndSessios}\n`,{flag:'a+'},(err) => {
                if (err) {
                    console.log(err)
                }
            })
            console.log(TheTxtDBAndSessios)    
        }else{
            console.log(GetThePriceNumber,"is NAN")
        }
        console.log(`   Time Taken >>>>>>>>>>>     ${Date.now() - start} MiliSecond`)
    })
// Read The DataBase
ElAfreke.command("showDB")
    .alias('show')
    .alias('listshow')
    .description("Show The Data base")
    .action(() => {
        let ReadFileValueOfDB = fs.readFileSync('./DataBase/TheDBOfAlAfreke.txt','utf-8')
        console.log(ReadFileValueOfDB)
    })
// Non interActive Delet DB With Commender
ElAfreke.command('RM_DataBase')
    .alias('rmDB')
    .description("Remove Data base")
    .argument('<Access>',"y or n To Remove The DB")
    .action((acc) => {
        let start = Date.now()
        if (acc == "y" || acc == "Y" || acc == "yes" || acc == "YES" || acc == "Yes"){

            fs.writeFileSync('./DataBase/TheDBOfAlAfreke.txt',"",(err) => {
                if(err){ 
                    console.log(err)
                }
            })
            fs.writeFileSync('./DataBase/IDPointer.txt',`IdPointer:0`)
            console.log("Data Base Now Is Removed")
        }else if(acc == "n" || acc == "N" || acc == "no" || acc == "NO" || acc == "No"){
            return;
        }else{
            console.log(`ERROR:301 ${acc} is Not Definde Just Write y or n`)
        }
        console.log(`   Time Taken >>>>>>>>>>>     ${Date.now() - start} MiliSecond`)
    })
ElAfreke.parse(process.argv)


