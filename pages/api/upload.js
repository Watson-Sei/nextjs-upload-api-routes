import formidable from 'formidable';
const FormData = require('form-data');
const fs = require('fs');
const fetch = require('node-fetch');

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = "./public/uploads";
    form.keepExtensions = true;

    let filepath = "";

    form.parse(req, async (err, fields, files) => {
        filepath = "./" + files.file._writeStream.path

        let formback = new FormData();
        formback.append("file", fs.createReadStream(filepath));

        const options = {
            method: 'POST',
            body: formback,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        delete options.headers['Content-Type'];

        await fetch('http://localhost:5000/upload', options)
        .then((response) => {
            fs.unlinkSync(filepath)
            console.log("delete image file")
            res.status(200).json({message: "Success Upload"})  
        }).catch((err) => {
            fs.unlinkSync(filepath)
            console.log("delete image file")
            res.status(500)
        })
    });
};