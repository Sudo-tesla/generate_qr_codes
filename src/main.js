const csv=require('csvtojson')
const QRCode = require('qrcode');
const { Parser } = require('json2csv');
const  fs = require('fs');

const csvFilePath='./students.csv'
const classes = ['AA','BB','CC','DD'];
let imageType = 'svg';

csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        let studentList = [];
        classes.forEach(class_id=>{
            const studentsInClass = jsonObj.filter(student=>student.class_id===class_id);

            for(let i=0; i < studentsInClass.length && i<15;i++) {
                console.log(studentsInClass[i]);
                studentList.push(studentsInClass[i]);
                QRCode.toFile(`..\\output\\svg_output\\class_${studentsInClass[i].class_id} id_${studentsInClass[i]._id}.${imageType}`,studentsInClass[i]._id,{ errorCorrectionLevel: 'H',type: imageType }, function (err, url) {

                })
                //imageType = 'png';
                QRCode.toFile(`..\\output\\png_output\\class_${studentsInClass[i].class_id} id_${studentsInClass[i]._id}.png`,studentsInClass[i]._id,{ errorCorrectionLevel: 'H',type: 'png' }, function (err, url) {

                })

            }
        })

        const parser = new Parser();
        const csv = parser.parse(studentList);

        fs.appendFile('..\\output\\excel_output\\students_filtered.csv', csv, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });


    })
