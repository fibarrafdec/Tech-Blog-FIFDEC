//Handles the logout function
const logout = async () => {
    //Sends the POST request to the logout API
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });

    //If successful, redirect to the homepage
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

//Event handler
document.querySelector('#logout').addEventListener('click',logout);
