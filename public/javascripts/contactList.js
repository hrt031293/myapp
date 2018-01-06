var username = '', useremail='';

function saveContact(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var num = document.getElementById('num').value;
   // console.log('contact data',name,email,num);
    // var retrievedObject = localStorage.getItem('testObject');
    // var dat = JSON.parse(retrievedObject);
    // var usermail = dat.useremail;
    //console.log(name,email,num,usermail);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
    axios.post('/api/addContact',{name:name,email:email,num:num})
    .then((response)=>{
        if(response.data.status)
        {
            //console.log(response);
            contactList();
        }
        else
        {
            alert(response.data.message);
        }
    },(e)=>{
        console.log(e);
    });
}

function contactList(){
    var len = '',name='',email="",num="",html='',admin='';
    // var retrievedObject = localStorage.getItem('testObject');
    // var dat = JSON.parse(retrievedObject);
    // var usermail = dat.useremail;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
    axios.post('/api/fetchContact')
    .then((response)=>{
        //console.log('mycontacts',response);
        len = response.data.contact.length;
        //console.log('arraylength',len);
        for(i=0;i<len;i++){
            name=response.data.contact[i].name;
            email=response.data.contact[i].email;
            num = response.data.contact[i].number;
            
            html += `<tr>
            <td contenteditable='false' class="row${i}" id="name${i}">${name}</td>
            <td contenteditable='false' class="row${i}" id="email${i}">${email}</td>
            <td contenteditable='false' class="row${i}" id="num${i}">${num}</td>
            <td><button id="btne${i}" onclick="editRow(this.id)">Edit</button></td>
            <td><button id="btndel${i}" onclick="deleteRow(this.id)">Delete</button></td>
            </tr>`;    
        }
       document.getElementById('contactTableBody').innerHTML = html;
    },(e)=>{
        console.log(e);
    })};

    

function editRow(id){
    //   console.log('id',id.slice(3));
    var j=id.slice(4);
    document.getElementsByClassName(`row${j}`)[0].setAttribute("contenteditable","true");
    document.getElementsByClassName(`row${j}`)[1].setAttribute("contenteditable","true");
    document.getElementsByClassName(`row${j}`)[2].setAttribute("contenteditable","true");
    document.getElementById(`name${j}`).focus();
    
    oldemail = document.getElementById(`email${j}`).innerHTML;
    document.getElementById(id).innerText='Update';
    document.getElementById(id).removeAttribute("onclick");
    document.getElementById(id).setAttribute('onclick','updateRow(this.id)'); 
        // updateRow(oldemail);
        // console.log(j);
        // console.log(oldemail);
    }

function updateRow(id){
    var k=id.slice(4);  
    //console.log('dara',k);  
    var name = document.getElementById(`name${k}`).innerHTML;
    var email = document.getElementById(`email${k}`).innerHTML;
    var num = document.getElementById(`num${k}`).innerHTML;
   // console.log(name,email,num,oldemail);
//    var retrievedObject = localStorage.getItem('testObject');
//    var dat = JSON.parse(retrievedObject);
//    var usermail = dat.useremail;
   axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
   
    axios.post('/api/updateContact',{name:name,email:email,num:num,oldemail:oldemail})
    .then((response)=>{
        //console.log(response);
        if(response.data.status)
        {
            contactList();
            alert(response.data.message);
           
        }
        else
        {
            alert(response.data.message);
        }
    },(e)=>{
        alert(response.data.message);
    }); 
}

function deleteRow(id){
    var k=id.slice(6);
    var email =  document.getElementById(`email${k}`).innerHTML;
    //console.log('sraray',k,email);
    // var retrievedObject = localStorage.getItem('testObject');
    // var dat = JSON.parse(retrievedObject);
    // var usermail = dat.useremail;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');

    axios.post('/api/deleteContact',{email}).then((res)=>{
        if(res.data.status){
            contactList();
            alert(res.data.message);
        }else{
            alert(res.data.message);
        }
    },(e)=>{
        alert(res.data.message);
    })
    }


function profile(){
        window.location='/profile';
        
}

function logout(){
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
	axios.get('/api/signout').then(function(response){
		if(response.data.status)
		{
			axios.defaults.headers.common['Authorization'] = '';
			if (typeof(Storage) !== "undefined") {
				localStorage.setItem("jwtToken", '');
			}
			location.replace('/');
		}
		else{
			axios.defaults.headers.common['Authorization'] = '';
			if (typeof(Storage) !== "undefined") {
				localStorage.setItem("jwtToken", '');
			}
			location.replace('/');
		}
	}).catch(function(err){
			axios.defaults.headers.common['Authorization'] = '';
			if (typeof(Storage) !== "undefined") {
				localStorage.setItem("jwtToken", '');
			}
			location.replace('/');
	});
}


