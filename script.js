// Подключение SDK
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'your-user-pool-id', // Замените на ваш UserPoolId
    ClientId: 'your-client-id', // Замените на ваш ClientId
};

const userPool = new CognitoUserPool(poolData);

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const attributeList = [];
    const emailAttribute = new CognitoUserAttribute({
        Name: 'email',
        Value: email,
    });
    attributeList.push(emailAttribute);

    userPool.signUp(username, password, attributeList, null, function(err, result) {
        if (err) {
            console.error(err);
            document.getElementById('error-message').textContent = err.message || JSON.stringify(err);
            return;
        }
        alert('Registration successful!');
    });
});
