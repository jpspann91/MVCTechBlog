//Function to handle loging out
const logout = async () => {
  //Variable to hold user returned from POST request
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  //If user exists
  if (response.ok) {
    //Then send to login page
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};
//Set event listener to the logout link when clicked
document.querySelector('#logout').addEventListener('click', logout);
