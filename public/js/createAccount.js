const form = document.querySelector("#newuser")
console.log(form)

form.addEventListener("submit", (event)=> { 
  event.preventDefault();
  let email = form[0].value.trim()
  let name = form[1].value.trim()
  let password = form[2].value.trim()

  if(!email  || !password || !name) return ;

  let userObject = { 
    email ,
    name , 
    password
  }
  
  fetch('/api/users/createuser',{
    method:'POST',
    body: JSON.stringify(userObject),
    headers: { 'Content-Type': 'application/json' },
  }).then((response)=>response.json())
  .then((data)=>{
    document.location.replace('/');
  })

  form[0].value = ""
  form[1].value = ""
  form[2].value = ""


})