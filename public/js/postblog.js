//variable to hold blogForm
const blogForm = document.querySelector("#postblog")

//Add event listener to the blog form on submit
blogForm.addEventListener("submit", (event)=> { 
  //Prevent page reloading
  event.preventDefault();
  //Variable for title and content trimmed down
  let title = blogForm[0].value.trim()
  let content = blogForm[1].value.trim()

  //If one of them does not exist then return
  if(!title  || !content) return ;

  //POST request to create a new blog post
  fetch('/api/blog/createblog',{
    method:'POST',
    body: JSON.stringify({title,content}),
    headers: { 'Content-Type': 'application/json' },
  }).then((response)=>response.json())
  .then((data)=>{
    document.location.replace('/');
  })
  //Clear out the blog form when done
  blogForm[0].value = ""
  blogForm[1].value = ""


})