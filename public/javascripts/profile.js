 $(document).ready(function(){
// Retrieve the object from storage
// var retrievedObject = localStorage.getItem('testObject');
//  var dat = JSON.parse(retrievedObject);
 //console.log(dat);
 axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
 axios.get('/api/profile').then((res)=>{

 
        document.getElementById('uname').innerText = res.data.username;
        document.getElementById('uemail').innerText = res.data.useremail;
        
    }).catch((e)=>{
        console.log(e);
    })
});