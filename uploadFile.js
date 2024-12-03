const uploadFileToS3 = (file) => {
    const AWS = require('aws-sdk');
    AWS.config.update({
        region: 'us-west-2',
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'your-identity-pool-id',
        }),
    });

    const s3 = new AWS.S3();

    const params = {
        Bucket: 'your-s3-bucket-name',
        Key: file.name,
        Body: file,
        ACL: 'public-read',
    };

    s3.upload(params, function(err, data) {
        if (err) {
            console.log('Error uploading file:', err);
        } else {
            console.log('File uploaded successfully:', data.Location);
        }
    });
};
