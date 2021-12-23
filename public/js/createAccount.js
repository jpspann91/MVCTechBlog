//variable to hold the new user form
const newUserForm = document.querySelector("#newuser")

//set event listener for new user forms
newUserForm.addEventListener("submit", (event)=> { 
  //Prevent reloading 
  event.preventDefault();
  //Variables to hold properties for new user
  let email = newUserForm[0].value.trim()
  let name = newUserForm[1].value.trim()
  let password = newUserForm[2].value.trim()

  //If none of these properties exist then return
  if(!email  || !password || !name) return ;

  //Set new user Object to the information sent from the form
  let userObject = { 
    email ,
    name , 
    password
  }
  //Fetch request to create a new yser
  fetch('/api/users/createuser',{
    method:'POST',
    body: JSON.stringify(userObject),
    headers: { 'Content-Type': 'application/json' },
  }).then((response)=>response.json())
  .then((data)=>{
    document.location.replace('/');
  })

  //Empty out the form when done
  newUserForm[0].value = ""
  newUserForm[1].value = ""
  newUserForm[2].value = ""


})