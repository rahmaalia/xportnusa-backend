const multer = require('multer');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const { format } = require('util');

// Konfigurasi Google Cloud Storage
const storage = new Storage({
    keyFilename: path.join(__dirname, '../config/xportnusa-425004-bcbd25508fdd.json'), // Ganti dengan path ke file kunci layanan Anda
    projectId: 'xportnusa-425004' // Ganti dengan ID proyek Anda
});

const bucket = storage.bucket('xportnusa'); // Ganti dengan nama bucket Anda

const multerStorage = multer.memoryStorage();

const uploadFileToGCS = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No file provided');
        }

        const blob = bucket.file(Date.now() + path.extname(file.originalname));
        const blobStream = blob.createWriteStream({
            resumable: false,
            gzip: true
        });

        blobStream.on('error', (err) => {
            reject(err);
        });

        blobStream.on('finish', () => {
            const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
};

const upload = multer({
    storage: multerStorage,
    limits: {
        fileSize: 3 * 1000 * 1000 // 3 MB
    }
});

module.exports = {
    upload,
    uploadFileToGCS
};