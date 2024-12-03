document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (!username || !email || !password) {
        document.getElementById('error-message').textContent = 'All fields are required.';
        return;
    }

    // Here you would handle registration logic, for example with AWS Cognito.
    alert('Registration successful!');
});
