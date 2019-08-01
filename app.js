const ip = 'http://192.168.100.11:5000'
const cloudName = 'deqt9oyyi'
const unsignedUploadPreset = 'wmad36pl';
var imgList = [];

function getProfiles(){
    const xhr = new XMLHttpRequest();

    xhr.open('GET',ip+'/suspect',true);

    xhr.onload = function(){
  if(this.status === 200){
    
      data = JSON.parse(this.responseText);
      // localStorage.setItem(this.responseText);
      getSuspect(data)
      data.forEach(function(user){
        output += `
        
        <div class="card mb-3" id = "${user.id}">
          <img class="card-img-top" src="${user.image}.jpg"  alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${user.name}</h5>
            <p class="card-text">${user.message}</p>
            <p class="card-text">${user.id}</p>
            <button class="btn btn-primary" id="deletePost" onclick='deletePost(${user.id})' ">Delete</button>
            <button class="btn btn-primary" id="updatePost" onclick='updateProfile(${user.id})' ">updatepost</button>
          </div>
        </div>
        `;
      }
    );
      document.getElementById('output').innerHTML = output;
  }
  

}

 xhr.send();
}

function deletePost(sus_id){
   
// var url = "http://192.168.100.9:5000/suspect";
var xhr = new XMLHttpRequest();
xhr.open("DELETE", ip+'/suspect'+`/${sus_id}`, true);
xhr.onload = function () {
  var users = JSON.parse(JSON.stringify(xhr.responseText));
  if (xhr.readyState == 4 && xhr.status == "200") {
        console.log('users');
        document.getElementById(`${sus_id}`).remove();
        // const obj = document.querySelector('#deletePost');
        // obj.parentElement.parentElement.remove();
        // s = document.querySelector('#deletePost');
        // s.parentElement.parentElement.removeChild();
  } else {
    console.log(users);   
    document.getElementById(`"${sus_id}"`).remove();
    }
    
    // const obj = document.querySelector('#deletePost');
    // obj.parentElement.parentElement.remove();
//     s = document.querySelector('#deletePost');
// s.parentElement.parentElement.remove();
}
xhr.send(null);
// s = document.querySelector('#deletePost');
// s.parentElement.parentElement.remove();
}

function updateProfile(sus_id){
  const xhr = new XMLHttpRequest();

  xhr.open('GET',ip+'/suspect'+`/${sus_id}`,true);

  xhr.onload = function(){
if(this.status === 200){
    
    data = JSON.parse(this.responseText);

    // pass the response ojects to getSuspect()

    data.forEach(function(user){
     output = `
      <form method="POST" action="http://192.168.100.9:5000/suspect/${sus_id}" enctype="multipart/form-data">
      <input type="text" id="defaultContactFormName" name="name" class="form-control mb-4" placeholder="${user.name}" value= "${user.name}">
      <!-- Email -->
      <!-- Message -->
       <div class="form-group">
      <textarea class="form-control rounded-0" id="exampleFormControlTextarea2" name="message" rows="3" placeholder="${user.message}"></textarea>
      </div>
      <div class="custom-file">
      <input type="file" class="custom-file-input" id="inputGroupFile01" name="img" aria-describedby="inputGroupFileAddon01">
      <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
      <button class="btn btn-info btn-block" type="submit">Send</button>
      </div>
      </form>
        `;
    }
  );
    document.getElementById(`${sus_id}`).innerHTML = output;
}
}
xhr.send();
}

function getSuspect(){
  var id = document.querySelector("#sus_id").value;
    const xhr = new XMLHttpRequest();
  xhr.open('GET',ip+'/suspect/'+id,true);

  xhr.onload = function(){
  if(this.status === 200){
    document.getElementById('output').innerHTML = ' ';  
      data = JSON.parse(this.responseText);
      console.log(data);
      data.forEach(function(user){
      output = `
      
      <div class="card mb-3" id = "${user.id}">
        <img class="card-img-top" src="${user.image}.jpg"  alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${user.name}</h5>
          <p class="card-text">${user.message}</p>
          <p class="card-text">${user.id}</p>
          <button class="btn btn-primary" id="deletePost" onclick='deletePost(${user.id})' ">Delete</button>
          <button class="btn btn-primary" id="updatePost" onclick='updateProfile(${user.id})' ">updatepost</button>
        </div>
      </div>
      `;
    }
  );
   document.getElementById('output').innerHTML = output;
  }
  

}
xhr.send();
}




function addSuspect(){

  var form = document.getElementById('sus-upload');
  var formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  
    xhr.open('POST',ip+'/suspect',true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', ip+'/suspect');
    xhr.onload = function(){
        if(this.status === 200){
          //   data = console.log(this.responseText);
          if(this.responseText == 'Successfully Add'){
              window.location.replace('SuspectRecord.html');
          }else{
              console.log('bad');
          }
        }
    }
   
    formData.append('imgList',imgList);
    

  xhr.send(formData);

  
 }
  function fileInput(){
    
   var fileInput  = document.getElementById('sus-img');
    var fileList =[];
      for(var i=0;i<fileInput.files.length;i++){
        fileList.push(fileInput.files[i]);
       }
      for(i=0;i<fileList.length;i++){
        console.log(fileList[i]);
        
      addSuspectImage(fileList[i]);

      }
      console.log(imgList);
      
      addSuspect();


  }

  function addSuspectImage(file){
    console.log(file);
   
    var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
  
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  
  
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // File uploaded successfully

        // var response = JSON.parse(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
       
       var url = response.secure_url;
      console.log(url);
      imgList.push(url);
       return url;
       
        
      }
    };
    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', file);
    xhr.send(fd);
  }
  
  function addUser(){

    var form = document.getElementById('user-upload');
    var formData = new FormData(form);
    
        const xhr = new XMLHttpRequest();
    
      xhr.open('POST',ip+'/User',true);
    
      xhr.onload = function(){
          if(this.status === 200){
                window.location.replace('userRecord.html');
            }else{
                console.log('bad');
            }
          }
     
    xhr.send(formData);
  console.log('upload user'); 
  }

    
  
// document.querySelector('body').addEventListener('DOMContentLoaded',getProfiles()); 