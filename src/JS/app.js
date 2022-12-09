//The URIs of the REST endpoint
IUPS = "https://prod-06.centralus.logic.azure.com:443/workflows/e29f4fa0190d4c78b7bdcbdf70bc5bb7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ea2BDl6TV-iwaf3Pfsm9LzTf9DGAKJSj8Q1OqBn6ZzM";

RAI = "https://prod-11.centralus.logic.azure.com:443/workflows/0c4417aff15c412eb41911556a23e6a2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5By2sGHxgwU9D_QzEI1ehRLj88JPdhA2nFsZo-XnkRo";

DAI_START = "https://prod-16.ukwest.logic.azure.com/workflows/0b2b34c5e14345e3a43ea880943e2d8b/triggers/manual/paths/invoke/rest/v1/assets/";
DAI_FINISH = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jbn9LbueVJLKx0ZkIV2_Le5TA5I2JRH_cOL6-K1PRgU";

CREATE_URI = "https://prod-20.centralus.logic.azure.com/workflows/c0a7d2d13ca24e5886e316edd9138fd2/triggers/manual/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a77Ah1BJqip6_F6udo1Bd5bhdL0otMIh3TaRkw56rJ0";

LOGIN_CHECK = "https://prod-25.centralus.logic.azure.com:443/workflows/019747dfc1394af7939ced222a59cf2e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8HwrKtKoUhnWSSDVm-eSHnHYGXRVqJJUgGLqol5Ss70";

CHANGE_PASS1 = "https://prod-14.ukwest.logic.azure.com/workflows/6eddb5345f7944089d0a70cf230dc404/triggers/manual/paths/invoke/rest/v1/assets/";
CHANGE_PASS2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=BgiMx8dJPwW-MhC3968QccfEFVbbFmiGHElTbEsayXM";

//LOGIN_START = "https://prod-16.centralus.logic.azure.com/workflows/e37bc8e58cf14354b14767c04a17c92a/triggers/manual/paths/invoke/rest/v1/assets/";
//LOGIN_END = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-unFg-vShzqFyXlk-mBaIE7BpNxcT7z21xiQzhR9brY";
// PUT_COMMENT = "https://prod-08.uksouth.logic.azure.com/workflows/e03f47e340cb4626aca2538a37bb424b/triggers/manual/paths/invoke/rest/v1/{id}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=zimcMC9Yjw-OBt5PBymz6LIKFU5BelGUXifR5yJhAPo";

BLOB_ACCOUNT = "https://b00798643blob.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retVideos").click(function(){

      //Run the get asset list function
      getVideos();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  });
  
  $("#subNewUser").click(function(){

    newuser();
    
  });

  // $("#subNewComment").click(function(){

  //   addcomment();
    
  // });
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
    //Create a form data object
     submitData = new FormData();
     //Get form variables and append them to the form data object
     submitData.append('FileName', $('#FileName').val());
     submitData.append('userID', $('#userID').val());
     submitData.append('userName', $('#userName').val());
     submitData.append('File', $("#UpFile")[0].files[0]);
     submitData.append('Title',$("#Title").val());
     submitData.append('Producer',$("#Producer").val());
     submitData.append('Publisher',$("#Publisher").val());
     submitData.append('Genre',$("#Genre").val());
     submitData.append('AgeRating',$("#AgeRating").val());
    
     //Post the form data to the endpoint, note the need to set the content type header
     $.ajax({
     url: IUPS,
     data: submitData,
     cache: false,
     enctype: 'multipart/form-data',
     contentType: false,
     processData: false,
     type: 'POST',
     success: function(data){
    
     }
     });
    } 

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getVideos(){
    //Replace the current HTML in that div with a loading message
     $('#VideoList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
     $.getJSON(RAI, function( data ) {
     //Create an array to hold all the retrieved assets
     var items = [];
    
     //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
     $.each( data, function( key, val ) {
     items.push( "<hr />");
     items.push("<video controls width='320 height='240' src='"+ BLOB_ACCOUNT + val["filepath"] +"'type='video/mp4'/></video><br/>");
     items.push( "File : " + val["fileName"] + "<br />");
     items.push( "Uploaded by: " + val["userName"] + " (user id: "+val["userID"]+") " + "<br />" + "Title: "+ val["Title"] + "| Producer: "+ val["Producer"] + "| Publisher: "+ val["Publisher"] /
                + "| Genre: "+ val["Genre"] + "| Age Rating: "+ val["AgeRating"]  + "| Comments: "+ val["Comments"] + "<br />");
     items.push( "<hr />");
     items.push('<button type="button" id="deleteVideoButton" class="btn btn-danger" onclick="deleteItems(\''+val["id"]+'\')">Delete</button><br/><br/>');
     });
     //Clear the assetlist div
     $('#VideoList').empty();
     //Append the contents of the items array to the ImageList Div
     $( "<ul/>", {
     "class": "my-new-list",
     html: items.join( "" )
     }).appendTo( "#VideoList" );
     });
    }

function deleteItems(id){
$.ajax({
  type:"DELETE",
  url: DAI_START+id+DAI_FINISH,
}).done(function(){
  getVideos();
})
}

function newuser(){
    submitUser = new FormData();

     submitUser.append('username', $('#user_name').val());
     submitUser.append('userPassword',$('#userPassword').val());
     submitUser.append('fullname',$('#fullname').val());
     
     $.ajax({
     url: CREATE_URI,
     data: submitUser,
     cache: false,
     enctype: 'multipart/form-data',
     contentType: false,
     processData: false,
     type: 'POST',
     success: function(data){
      window.location="./login.html";
     }
     });
}

// function addcomment(id){
//   submitComment = new FormData();

//    submitComment.append('Comment', $('#Comment').val());
   
//    $.ajax({
//    url: PUT_COMMENT,
//    data: submitComment,
//    cache: false,
//    enctype: 'multipart/form-data',
//    contentType: false,
//    processData: false,
//    type: 'PUT ',
//    success: function(data){
  
//    }
//    });
// }

function logincheck(){
  var userName = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  UserDataCheck =new FormData();

  UserDataCheck.append('username',userName)
  UserDataCheck.append('userPassword',password)

  console.log(userName)
  console.log(password)

  $.ajax({
    url: LOGIN_CHECK,
    type: "POST",
    data: UserDataCheck,
    cache: false,
    contentType: false,
    processData: false,
    success: function(usersData){
      console.log(usersData)
      console.log(usersData[0])

      sessionStorage.setItem("userID", usersData[0].userID)
      
      username =usersData[0].username;
      fullname =usersData[0].fullname;
      userID =usersData[0].userID;
      isAdmin =usersData[0].isAdmin;
      
      console.log(fullname)

      if(usersData[0].username){
        if(isAdmin){
          alert("Successfull Admin Login!");
          window.location="./index_creator.html";
        }else{
          alert("Successfull Login!");
          window.location="./index_user.html";
        }
      }else{
        alert("Unsuccessfull Login Please Try Again");
      }
      return false;
    }
  })
}

function updateUser(){
    userUpdate = new FormData();

     userUpdate.append('userPassword',$('#userPassChange').val());
     
     $.ajax({
     url: CHANGE_PASS1 + sessionStorage.getItem("userID") + CHANGE_PASS2,
     data: userUpdate,
     cache: false,
     enctype: 'multipart/form-data',
     contentType: false,
     processData: false,
     type: 'PUT',
     success: function(data){
      alert("Password Updated, Please Login Again With Your New Password")
      window.location="./login.html";
     }
     });
}