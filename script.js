// Настройка параметров Cognito
const poolData = {
    UserPoolId: 'your-user-pool-id', // Укажите свой User Pool ID
    ClientId: 'your-app-client-id' // Укажите свой App Client ID
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Обработчик формы регистрации
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Создание списка атрибутов (например, email)
    const attributeList = [];
    const emailAttribute = new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'email',
        Value: email,
    });
    attributeList.push(emailAttribute);

    // Регистрация пользователя
    userPool.signUp(username, password, attributeList, null, function(err, result) {
        if (err) {
            console.error(err);
            document.getElementById('error-message').textContent = err.message || JSON.stringify(err);
            return;
        }
        alert('Registration successful!');
    });
});
