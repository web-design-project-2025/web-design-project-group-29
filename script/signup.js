const form = document.getElementById('register-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value
    };

    const users = JSON.parse (localStorage.getItem('users')) || [];

    if (users.find(u => u.email === user.email)){
        alert('user already exist');
        return;
    }

    users.push(user);
    localStorage.setItem('users',JSON.stringify(users));

    alert ('Account created');
    form.reset();
});
