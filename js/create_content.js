var index =(function ($)
{
	 // Initialize Firebase
	 var firebase = require("firebase");

	  // Testing Firebase
	  var config = {
	    apiKey: "AIzaSyB2XVQrS6e0Qq-Jpxr8bL8tIWMbWLG7YPM",
	    authDomain: "fitbeau-41c08.firebaseapp.com",
	    databaseURL: "https://fitbeau-41c08.firebaseio.com",
	    projectId: "fitbeau-41c08",
	    storageBucket: "fitbeau-41c08.appspot.com",
	    messagingSenderId: "161854625211"
	  };
	  firebase.initializeApp(config);


    var contentCategoryArray = ["Beauty","Fitness","Health","Nutrition","Wellness"]

	var contentTypeArray = ["Cardio Training","Bodybuilding","Booty building","Clothing, Shoes & Bags",
	"Cycling","Fragrance","Gym Equipment","Hair Care & Styling",
	"Make Up","Manicure & Pedicure","Massage","Natural & Alternative Remedies",
	"Nutrition & Supplements","Oral Care","Pole Dancing","Resistance Training",
	"Running & Jogging","Salon & Spa","Shaving & Hair Removal","Skincare","Slimming",
	"Sports Clothing & footwear","Sports Equipment","Sun Care & Tanning","Swimming",
	"Swimwear","Tech & Accessories","Toning","Yoga & Pilates","Other Beauty","Other Fitness",
	"Other Health","Other Wellness"]

		var created_user;
		var created_userID='1FJ1nmDIeJSsrOPBGC7NalL4cpo2';

		var image_name;

		var bus_or_in=0; //influencer=0, business=1


	  $(document).ready(function() { 

	  				/** random 128-bit number as a string */
					function random128() {
					  var result = "";
					  for (var i = 0; i < 8; i++)
					    result += String.fromCharCode(Math.random() * 0x10000);
					  return result;
					}

					/** random 128-bit number in canonical uuid format. all bits are random. */
					function random128Hex() {
					  function random16Hex() { return (0x10000 | Math.random() * 0x10000).toString(16).substr(1); }
					  return random16Hex() + random16Hex() +
					   "-" + random16Hex() +
					   "-" + random16Hex() +
					   "-" + random16Hex() +
					   "-" + random16Hex() + random16Hex() + random16Hex();
					}

					function readURL(input,containerID)
					{

						
			            if (input.files && input.files[0]) {
			                var reader = new FileReader();
			                reader.onload = function (e) {
			                    $(containerID)
			                        .attr('src', e.target.result)
			                        .width(403)
			                        .height(301);
			                };

			                reader.readAsDataURL(input.files[0]);
			                image_file=input.files[0];
			                image_type=image_file.type;
			                image_path=URL.createObjectURL(image_file);
			                console.log('MIME Type : '+image_file.type + "some "+image_file.name);
			                console.log('path : '+image_path);
			                image_name=image_file.name;
			            	
			        	}
					}


					function uploadImage(created_userID,bus_or_in,isContent)
					{

						console.log('user uid ' + created_userID);
						// Create a root reference
						var storageRef = firebase.storage().ref();

						// Create a reference to 'mountains.jpg'
						var mountainsRef = storageRef.child(image_file.name);

						// Create a reference to 'images/mountains.jpg'
						var mountainImagesRef = storageRef.child(image_path);

						// While the file names are the same, the references point to different files
						mountainsRef.name === mountainImagesRef.name            // true
						mountainsRef.fullPath === mountainImagesRef.fullPath    // false
						// Create the file metadata
							var metadata = {
							  contentType: image_type
							};

							// Upload file and metadata to the object 'images/mountains.jpg'
							var uploadTask ;
							if(isContent)
							{
								 uploadTask = storageRef.child(created_userID+'/content/' + image_file.name).put(image_file, metadata);


							}
							else
							{
								uploadTask = storageRef.child(created_userID+'/profileImage/' + image_file.name).put(image_file, metadata);
							}

							// Listen for state changes, errors, and completion of the upload.
							uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
							  function(snapshot) {
							    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
							    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							    console.log('Upload is ' + progress + '% done');
							    switch (snapshot.state) {
							      case firebase.storage.TaskState.PAUSED: // or 'paused'
							        console.log('Upload is paused');
							        break;
							      case firebase.storage.TaskState.RUNNING: // or 'running'
							        console.log('Upload is running');
							        break;
							    }
							  }, function(error) {

							  // A full list of error codes is available at
							  // https://firebase.google.com/docs/storage/web/handle-errors
							  downloadURL=null;
							  switch (error.code) {
							    case 'storage/unauthorized':
							      // User doesn't have permission to access the object
							      alert("Error " + error.code+ " : Permission denied.")
							      break;

							    case 'storage/canceled':
							      // User canceled the upload
			  				      alert("Error " + error.code+ " : Upload canceled.")

							      break;
							    case 'storage/unknown':
							      // Unknown error occurred, inspect error.serverResponse
							      alert("Error " + error.code+ " : Unknown error.")

							      break;
							    
								  	//is Content
								  	uploadContent(created_userID);
								  
							  }
							}, function() {
							  // Upload completed successfully, now we can get the download URL
							  downloadURL = uploadTask.snapshot.downloadURL;
							  console.log('download url ' +downloadURL);
							  if(!isContent)
							  {
							  	createUser(created_userID);

							  }
							  else
							  {
							  	//is Content
							  	console.log('isContent');
							  	uploadContent(created_userID);
							  }
							  
							});

								
					}


					$("#create-content-page-form").on('change',"#create-content-page-file-input",function (){
						readURL(this,"#create-content-page-image");
					});


	  			for(var i=0; i< contentCategoryArray.length;i++)
					{
					  //creates option tag
					  jQuery('<option/>', {
					        value: contentCategoryArray[i],
					        html: contentCategoryArray[i]
					        }).appendTo('#category-page-dropdown select'); //appends to select if parent div has id dropdown
					}

					for(var i=0; i< contentTypeArray.length;i++)
					{
					//creates option tag
					  jQuery('<option/>', {
					        value: contentTypeArray[i],
					        html: contentTypeArray[i]
					        }).appendTo('#type-page-dropdown select'); //appends to select if parent div has id dropdown
					}

					$('#create-content-form').validate({
						errorClass: "my-error-class",
	   					validClass: "my-valid-class"
	   				});
				
					$('#create-content-page-form').submit(function (event){


						var isValid= $('#create-content-page-form').valid();
						console.log(isValid);
						event.preventDefault();

						img_src = $("#create-content-page-image").attr('src');
						cc_name= $('#content-page-name').val();
						cc_cat= $('#category-page-select').find(":selected").text();
						cc_type=$('#type-page-select').find(":selected").text();
						cc_web=$('#content-page-web').val();
						cc_make=$('#content-page-make').val();
						cc_desc=$('#content-page-desc').val();

						console.log(cc_name + " " +cc_cat + " " +cc_type+ " " + cc_web + " " +cc_make + " " +cc_desc + " val "+$('#content-desc').val());

						if(isValid && cc_name!="" && cc_desc!="" && cc_type!="Type:" && cc_cat!="Category:")
						{
							var temp=window.atob(img_src.split(',')[1]);
							//console.log('decode '+temp);
							//console.log('here in if' + img_src);

							
							if(img_src!= "images/original_upload_image.png")
							{
								console.log('upload image');
								bus_or_in=1;
								uploadImage(created_userID,1,true);
							}
							else
							{
								console.log('here in uc' );
								console.log(" cu " +created_user);
								uploadContent(created_user);

							}
						}
						else
						{
							alert('Please fill all the fields!');
						}

					});

					


					function uploadContent(user)
					{
						var random_string=  random128Hex();
						console.log('random' +random_string);
						if(img_src=="images/original_upload_image.png")
						{
							
							firebase.database().ref("users/"+created_userID+"/content").child(random_string).set({
							         name: cc_name,
							         topic:cc_cat,
							         type:cc_type,
							         website:cc_web,
							         make:cc_make,
							         description:cc_desc
							         
							    
							      }).then( function() {
				      					 $('#create-content-modal').modal('hide'); 
				      					 $('#wait-modal').modal('hide'); 
							

			  					      	alert("Content submitted successfully!");

							      }
							      );	

						}
						else
						{
							
							firebase.database().ref("users/"+created_userID+"/content").child(random_string).set({
							         name: cc_name,
							         topic:cc_cat,
							         type:cc_type,
							         website:cc_web,
							         make:cc_make,
							         description:cc_desc,
							         photoURL:downloadURL
							         
							    
							      }).then( function() {
				      					 $('#create-content-modal').modal('hide'); 
				      					 $('#wait-modal').modal('hide'); 
							
			  					      	alert("Content submitted successfully!");

							      }
							      );	

						}
						


			   
					}









	  	}); //Docuemnt ready end.
	



})(jQuery); //IIFE end.