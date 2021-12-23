//LoginForm handler function
const loginFormHandler = async (event) => {
  event.preventDefault();

  //Grab email and password from the form and trim it
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  //If both exists
  if (email && password) {
    //Variable to hold the return object from our POST request
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    //If the user exists then reroute to homepage
    if (response.ok) {
      document.location.replace('/');
      //IF not then send a message
    } else {
      alert('Failed to log in');
    }
  }
};

//Set event listener to the login form
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
