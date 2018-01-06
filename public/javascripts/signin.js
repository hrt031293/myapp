
function signin(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;
    if(email=="" && password==""){
        alert("fields are empty");
        return false;
    }
   //console.log('this:',email,password);
   axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');

    axios.post('/api/signin',{email:email,password:password})
    .then((response)=>{
        if(response.data.status){
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("jwtToken", response.data.token);
            }
            // username = response.data.name;
            // useremail= response.data.email;
            // var testObject = {username,useremail};
            // localStorage.setItem('testObject', JSON.stringify(testObject));
           // console.log("qwertyu",username,useremail)
            alert(response.data.message);
            window.location='/home';
        }else{
            alert(response.data.message);
            console.log(response);
        }},(e)=>{
            // alert(response.data.message);
            alert("Error",e);
        });
};
