function submituser(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;
    var cpassword = document.getElementById('cpass').value;
// console.log(name,email,password,cpassword);
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');

    axios.post('/api/signup',{name:name,email:email,password:password,cpassword:cpassword})
    .then((doc)=>{
        if(doc.data.status){
            alert(doc.data.message);
            window.location='/';
        }else{
            alert(doc.data.message);

        }
    },(e)=>{
        alert(doc.data.message);
    })
}
