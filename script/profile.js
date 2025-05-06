function loadProfile() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if(userProfile) {
        document.getElementById('name').textContent = userProfile.name;
    }else{
        alert('oops your account is 404')
        window.location.href = '/create-account'
    }
}
loadProfile();