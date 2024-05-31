const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Buat instance storage
const storage = new Storage({
    keyFilename: path.join(__dirname, './xportnusa-425004-bcbd25508fdd.json'), // Ganti dengan path ke file kunci layanan Anda
    projectId: 'xportnusa-425004' // Ganti dengan ID proyek Anda
});

const bucketName = 'xportnusa'; // Ganti dengan nama bucket Anda

const bucket = storage.bucket(bucketName);

module.exports = bucket;