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
        // Если регистрация успешна, показываем игру
        document.getElementById('registration-container').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        startGame();
    });
});

// Логика игры
let randomNumber;
let attempts = 0;

function startGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // Генерация случайного числа от 1 до 100
    attempts = 0;
    document.getElementById('submit-guess').addEventListener('click', checkGuess);
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guess').value);
    attempts++;

    if (guess === randomNumber) {
        document.getElementById('result-message').textContent = `Congratulations! You guessed the number in ${attempts} attempts.`;
        document.getElementById('submit-guess').disabled = true;
        document.getElementById('restart-game').style.display = 'inline-block';
    } else if (guess < randomNumber) {
        document.getElementById('result-message').textContent = 'Too low! Try again.';
    } else {
        document.getElementById('result-message').textContent = 'Too high! Try again.';
    }
}

document.getElementById('restart-game').addEventListener('click', function() {
    startGame();
    document.getElementById('guess').value = '';
    document.getElementById('result-message').textContent = '';
    document.getElementById('restart-game').style.display = 'none';
    document.getElementById('submit-guess').disabled = false;
});
