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
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

app.use(express.static('images'))
app.use(cors())
app.use(fileUpload())


app.post('/new-demo', async (req, res) => {
    log(req.files.photo)
    let file = req.files.photo
    file.mv(path.join(__dirname,'../../','/images/passport.png'), async(err) => {
        if (err) {
            res.send({ error: err })
        } else {
            const ocr = new OpticalCharacterRecognition("cea98485-9bd1-11ee-b5b3-a630e16cc42c", "71a1422d-1268-4df5-9722-a8647bc1e8e2");
            // let d = await ocr.getModelDetails();
            // let a = await ocr.getAllPredictedFileData(startInterval, endInterval);
            let resp = await ocr.predictUsingFile(path.join(__dirname,'../../','/images/passport.png'), false);
            res.send(resp)
        }
    })

})





app.listen(3000, () => {
    console.log("Server is Running");
})
