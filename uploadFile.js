import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: 'your-access-key-id',  // Замените на ваш accessKeyId
    secretAccessKey: 'your-secret-access-key',  // Замените на ваш secretAccessKey
    region: 'your-region',  // Замените на ваш регион
});

function uploadFile(file) {
    const params = {
        Bucket: 'your-bucket-name',  // Замените на имя вашего бакета S3
        Key: file.name,
        Body: file,
    };
    s3.upload(params, function(err, data) {
        if (err) {
            console.log('Error', err);
        } else {
            console.log('Successfully uploaded file', data);
        }
    });
}

// Пример использования
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        uploadFile(file);
    }
});
