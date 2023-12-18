// const express = require('express')
// const { default: axios } = require('axios');
// const fs = require('fs');
// const { log } = require('console');
import got from 'got';
import express from 'express'
import fs from 'fs'
import { log } from 'console';
import querystring from 'querystring';
import OpticalCharacterRecognition from "@nanonets/optical-character-recognition";
import cors from 'cors'
import fileUpload from 'express-fileupload';

// const nanonets = require('nanonets')('cea98485-9bd1-11ee-b5b3-a630e16cc42c')

const app = express()

app.use(express.static('images'))
app.use(cors())
app.use(fileUpload())


// const url = "https://app.nanonets.com/api/v2/OCR/Model/71a1422d-1268-4df5-9722-a8647bc1e8e2/LabelFile/";
// const apiKey = 'cea98485-9bd1-11ee-b5b3-a630e16cc42c';



// app.get('/final', async (req, res) => {
//     const form_data = {
//         'urls': ['https://pbs.twimg.com/media/E9oAD0cVUAQ4yzj.jpg:large'],
        // for base64 of file instead of url
        //'base64_data' : fs.readFileSync("REPLACE_IMAGE_PATH.jpg").toString('base64')
    // }
    // const options = {
    //     url: 'https://app.nanonets.com/api/v2/OCR/Model/REPLACE_MODEL_ID/LabelFile/?async=true',
    //     formData: form_data,
    //     headers: {
    //         'Authorization': 'Basic ' + Buffer.from('cea98485-9bd1-11ee-b5b3-a630e16cc42c' + ':').toString('base64')
    //     }
    // }

//     const response = await got.post(url, {
//         // body: data,
//         json: { body: querystring.stringify(form_data), modelId: "71a1422d-1268-4df5-9722-a8647bc1e8e2" },
//         headers: {
//             'Authorization': 'Basic ' + Buffer.from('cea98485-9bd1-11ee-b5b3-a630e16cc42c' + ':').toString('base64'),
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     });
//     res.send(response.json())
// })


// app.get('/', async (req, res) => {


//     const urlOptions = {
//         method: 'POST',
//         url: 'http://app.nanonets.com/api/v2/OCR/Model/71a1422d-1268-4df5-9722-a8647bc1e8e2/LabelFile/',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             Authorization: 'Basic Y2VhOTg0ODUtOWJkMS0xMWVlLWI1YjMtYTYzMGUxNmNjNDJjOg=='
//         },
//         formData: {
//             modelId: '71a1422d-1268-4df5-9722-a8647bc1e8e2',
//             'files': {
//                 'file': fs.createReadStream("pi.jpg"),
//                 'options': {
//                     'filename': "pi",
//                     'contentType': null
//                 }
//             }
//         }
//     }

//     let resp = await got(urlOptions)
//     console.log(resp)
// })


// app.get("/abc", async (req, res) => {
//     try {
        // const fileData = await fs.createReadStream('pi.jpg');
        // console.log(fileData)

        // const formData = new FormData();
        // formData.append('file', fileData, { filename: 'Ecp5OYUWAAAdVec.jpg', knownLength: fileData.length });
        // const form_data = {file: fileData}

        // const formData = {
        // 'file': {
        //     'value': fs.createReadStream("pi.jpg"),
        //     'options': {
        //         'filename': "pi",
        //         'contentType': null
        //     }
        // }
        // }
//         fs.readFile('pi.png', async (err, data) => {
//             if (err) {
//                 res.send(err)
//             } else {
//                 const response = await got.post(url, {
//                     // body: data,
//                     json: { file: data, modelId: "71a1422d-1268-4df5-9722-a8647bc1e8e2" },
//                     headers: {
//                         // 'Content-Type': "image/jpeg",
//                         'Content-Type': "application/json",
//                         'Authorization': 'Basic ' + Buffer.from('cea98485-9bd1-11ee-b5b3-a630e16cc42c' + ':').toString('base64')
//                     }
//                 });
//                 res.send({ 'message': response.json() });
//             }

//         });
//     } catch (error) {
//         res.send({ message: error.message });
//     }
// });

app.post('/new-demo', async (req, res) => {
    log(req.files.photo)
    let file = req.files.photo
    file.mv('images/passport.png', async(err) => {
        if (err) {
            res.send({ error: err })
        } else {
            const ocr = new OpticalCharacterRecognition("cea98485-9bd1-11ee-b5b3-a630e16cc42c", "71a1422d-1268-4df5-9722-a8647bc1e8e2");
            // let d = await ocr.getModelDetails();
            // let a = await ocr.getAllPredictedFileData(startInterval, endInterval);
            let resp = await ocr.predictUsingFile("images/passport.png", false);
            res.send(resp)
        }
    })

})



// app.get("/", async (req, res) => {
//     try {
//         const fileData = await fs.readFile('Ecp5OYUWAAAdVec.jpg');

//         const response = await axios.post(url, fileData, {
//             headers: {
//                 'Content-Type': 'image/jpeg', // Adjust the content type based on your file type
//                 'Authorization': 'Basic ' + Buffer.from(apiKey).toString('base64')
//             }
//         });

//         res.send({'message': response.data})
//     } catch (error) {
//         res.send({message: error.message})
//     }
// })


// app.get('/tryFile', (req, res) => {
//     fs.readFile('Ecp5OYUWAAAdVec.jpg', (err, data) => {
//         if (err) {
//             console.error('Error:', err);
//             return;
//         }

//         // Process the file data here
//         console.log('File data:', data);
//     });
// })



app.listen(3000, () => {
    console.log("Server is Running");
})
