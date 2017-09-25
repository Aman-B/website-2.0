var create_tips =(function ($)
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


 	var tipCategoryArray = ["Beauty","Fitness","Health","Nutrition","Wellness"]

	var tipContentArray = ["Cardio Training","Bodybuilding","Booty building",
	"Clothing, Shoes & Bags","Cycling","Fragrance","Gym Equipment","Hair Care & Styling","Make Up",
	"Manicure & Pedicure","Massage","Natural & Alternative Remedies","Nutrition & Supplements",
	"Oral Care","Pole Dancing","Resistance Training","Running & Jogging","Salon & Spa",
	"Shaving & Hair Removal","Skincare","Slimming","Sports Clothing & footwear","Sports Equipment",
	"Sun Care & Tanning","Swimming","Swimwear","Tech & Accessories","Toning","Yoga & Pilates","Other Beauty",
	"Other Fitness","Other Health","Other Wellness"]
    
    var tipType = ["Profile","Tools","Follower","Engagement"]

		var created_user;
		var created_userID='1FJ1nmDIeJSsrOPBGC7NalL4cpo2';

		var image_name;

		

		var  tip_img_src,tip_title,tip_cat,tip_topic,tip_type,tip_website,tip_desc;


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


					function uploadImage(created_userID)
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
						    uploadTask = storageRef.child(created_userID+'/tips/' + image_file.name).put(image_file, metadata);


							

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
							 
							  	uploadContent(created_userID);
							  							  
							});

								
					}


					$("#create-tips-form").on('change',"#create-tip-file-input",function (){
						readURL(this,"#tip-image");
					});


	  			for(var i=0; i< tipCategoryArray.length;i++)
					{
					  //creates option tag
					  jQuery('<option/>', {
					        value: tipCategoryArray[i],
					        html: tipCategoryArray[i]
					        }).appendTo('#tip-cat-dropdown select'); //appends to select if parent div has id dropdown
					}

					for(var i=0; i< tipContentArray.length;i++)
					{
					//creates option tag
					  jQuery('<option/>', {
					        value: tipContentArray[i],
					        html: tipContentArray[i]
					        }).appendTo('#tip-topic-dropdown select'); //appends to select if parent div has id dropdown
					}

					for(var i=0; i< tipType.length;i++)
					{
					//creates option tag
					  jQuery('<option/>', {
					        value: tipType[i],
					        html: tipType[i]
					        }).appendTo('#tip-type-dropdown select'); //appends to select if parent div has id dropdown
					}

					$('#create-tips-form').validate({
						errorClass: "my-error-class",
	   					validClass: "my-valid-class"
	   				});
				
					$('#create-tips-form').submit(function (event){


						var isValid= $('#create-tips-form').valid();
						console.log(isValid);
						event.preventDefault();

						tip_img_src = $("#tip-image").attr('src');
						tip_title= $('#tip-title').val();
						tip_cat= $('#tip-cat-select').find(":selected").text();
						tip_topic=$('#tip-topic-select').find(":selected").text();
						tip_type=$('#tip-type-select').find(":selected").text();
						tip_website=$('#tip-website').val();
						tip_desc=$('#tip-desc').val();
						

						console.log(tip_img_src + " " +tip_title + " " +tip_cat+ " " +tip_topic+" " + tip_type + " " +tip_website +" "+tip_desc);
						console.log(isValid);
						var condition =isValid && tip_title!="" && tip_desc!="" && tip_type!="Blog type:" && tip_cat!="Blog Category:" && tip_topic !="Blog Topic:";
						console.log(condition);
						if(isValid && tip_title!="" && tip_desc!="" && tip_type!="Blog type:" && tip_cat!="Blog Category:" && tip_topic !="Blog Topic:")
						{
							/*var temp=window.atob(tip_img_src.split(',')[1]);
							console.log('decode '+temp);*/
							console.log('here in if' + tip_img_src);

							
							if(tip_img_src!= "images/original_upload_image.png")
							{
								console.log('upload image');
								uploadImage(created_userID);
							}
							else
							{
								console.log('here in uc' );
								
								uploadContent(created_userID);

							}
						}
						else
						{
							alert('Please fill all the fields!');
						}

					});

					


					function uploadContent(created_userID)
					{
						var random_string=  random128Hex();
						console.log('random' +random_string);
						if(tip_img_src=="images/original_upload_image.png")
						{
							
							firebase.database().ref("users/"+created_userID+"/tips").child(random_string).set({
							         description: tip_desc,
							         tipType:tip_type,
							         title:tip_title,
							         topic:tip_topic,
							         type:tip_type,
							         website:tip_website
							         
							    
							      }).then( function() {
				      					

			  					      	alert("Content submitted successfully!");

							      }
							      );	

						}
						else
						{
							
							firebase.database().ref("users/"+created_userID+"/tips").child(random_string).set({
							         description: tip_desc,
							         tipType:tip_type,
							         title:tip_title,
							         topic:tip_topic,
							         type:tip_type,
							         website:tip_website,
							         iconURL:downloadURL
							         
							    
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