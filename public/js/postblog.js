
const blogForm = document.querySelector("#postblog")
console.log(blogForm)

blogForm.addEventListener("submit", (event)=> { 
  event.preventDefault();
  let title = blogForm[0].value.trim()
  let content = blogForm[1].value.trim()

  if(!title  || !content) return ;
  
  fetch('/api/blog/createblog',{
    method:'POST',
    body: JSON.stringify({title,content}),
    headers: { 'Content-Type': 'application/json' },
  }).then((response)=>response.json())
  .then((data)=>{
    document.location.replace('/');
  })

  blogForm[0].value = ""
  blogForm[1].value = ""


})