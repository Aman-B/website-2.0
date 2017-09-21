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


	  // Initialize Firebase
	 /* var config = {
	    apiKey: "AIzaSyAmKeQlqDKE-1XYPLQtJfNHjdTmuv6huyE",
	    authDomain: "fitbeau-5606d.firebaseapp.com",
	    databaseURL: "https://fitbeau-5606d.firebaseio.com",
	    projectId: "fitbeau-5606d",
	    storageBucket: "fitbeau-5606d.appspot.com",
	    messagingSenderId: "987676980472"
	  };
	  firebase.initializeApp(config);
*/
	//var validate = require("validate.js");
	var click=false;
	
	// Business sign up form elements
	var b_name,b_email,b_password;

	var in_name,in_email,in_password;

	var image_file, image_type,image_path, downloadURL="../images/original_upload_image.png";

	var img_src;

	var cc_name, cc_cat,cc_type,cc_web,cc_make,cc_desc;

	var bus_or_in=0; //influencer=0, business=1

	var isContent= false;

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

	/* For instagram*/
	var instagram = {
		client_id : "c759d889ae7145128d33b14e84be1068",
		redirect_uri : "http://localhost:8888/website/profile.html",
		response_type : "token"
	};


	/* For twitter*/

	var Twitter = require('twitter');
	var client = new Twitter({
	  consumer_key: 'Y6739jX1YW38PNTyJyKQVnmro',
	  consumer_secret: '3Q8WA2lTtJDS2xSv0Ge81TavzQfElp1dKvKDc1AwF56fMEbwUd',
	  access_token_key: '1628153359-QyeQk0YYOmYkhoteGGqaxVg7moqqnUsx9HIGqY8',
	  access_token_secret: '5PAdgJ4GvaiFQVq8WlwjBzM93f8fUiqqphCMEBPHBRgrx'
	});
	/* For twitter end*/
	//mytoken : 546034003.c759d88.d4577d5fff9746f098742d342670d0c7


	var FB_user,FB_token,FB_email,FB_credential;


	$(document).ready(function() { 



		
		 	
			console.log('yolo');
		 

		 
		  
		 
  		  //provider.addScope('user_posts');

  		  $('#twitter-login-button').click(function ()
  		  {
  		  	var provider = new firebase.auth.TwitterAuthProvider();
  		  	firebase.auth().signInWithPopup(provider).then(function(result) {
			  // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
			  // You can use these server side with your app's credentials to access the Twitter API.
			  var token = result.credential.accessToken;
			  var secret = result.credential.secret;
			  // The signed-in user info.
			  var user = result.user;
			  console.log(result.user);	
			  console.log('user '+result.user+' secret '+result.credential.secret + ' token '+result.credential.accessToken);
			  // ...
			  client.get('statuses/user_timeline', function(error, tweets, response) {
				  if (!error) {
				    console.log(tweets);
				  }
				});




			}).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
			  // ...
  			  console.log('error '+error.code+' message '+error.message + ' error-email '+error.email+' credential '+error.credential);

			});
			
  		  })
			

  		  $("#fb-login-button").click( function() {
  		  	// body...
  		  	 var provider = new firebase.auth.FacebookAuthProvider();
			  provider.addScope('email');
			  provider.addScope('user_friends');
			  provider.addScope('manage_pages');
			  provider.addScope('read_insights');
			 firebase.auth().signInWithPopup(provider).then(function(result) {
			  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
			  FB_token = result.credential.accessToken;
			  // The signed-in user info.
			  FB_user = result.user;
			  console.log(FB_user);
			  console.log('user'+FB_user + "token "+ FB_token);
			  
			  // ...
			}).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
			  console.log('user'+ credential);
			  // ...
			});
			//FBinit();
			});

  		 
		 
		
		/* Reading from firebase and adding to UI*/

		function snapshotToArray(snapshot) {
		    var returnArr = [];

		    snapshot.forEach(function(childSnapshot) {
		        var item = childSnapshot.val();
		        item.key = childSnapshot.key;

		        returnArr.push(item);
		    });

		    return returnArr;
		};

		function setProfileData(array){
				//console.log(''+array[0]+array.length );
				var textnode = document.createTextNode(""+array[0].name);    
				for (var i = 0; i < array.length; i++) {
					var div = document.createElement('div');
					div.className="col-lg-3 col-md-3 col-sm-3 col-xs-6 content-img-container";

					var innerDiv = document.createElement('div');
					innerDiv.className="fixOverlayDiv";


					var img=document.createElement("img");
					img.className="category-banner img-responsive";
					if(array[i].photoURL!=null)
					{
						img.src=array[i].photoURL;
					}
					else
					{
						img.src="images/profile_image1.png";

					}

					var overlayDiv= document.createElement('div');
					overlayDiv.className="OverlayText";
					if(array[i].name!=null)
					{
						overlayDiv.innerHTML=array[i].name;
					}
					else
					{
						overlayDiv.innerHTML="Your Post";
					}
					


					innerDiv.appendChild(img);
					innerDiv.appendChild(overlayDiv);

					div.appendChild(innerDiv);


					document.getElementById("ftw").appendChild(div);
				};

				$(".mcontainer").css("visibility","visible");
				$("#spinner").css("display","none");


				
		}

		function getProfileData()
		{
			  
			firebase.database().ref('/users/' + 'D3VaOIHRDbVvg5DmF7Ht1IkT2Rk2'+'/content').once('value').then(function(snapshot) {
		  //console.log(snapshot.val().content);
		
			var arr=snapshotToArray(snapshot);
			 //s console.log(arr[0]);
			  setProfileData(arr);
			 
			});
			 
		}

		function setProfileBio (snapshot) {
			// body...
			console.log(snapshot.val().name);
			$("#user-name-surname").html(snapshot.val().name);
			$("#user-title").html(snapshot.val().career);
			$("#profile-image").attr('src', snapshot.val().profileURL);
		}

		function getProfileBio()
		{
			firebase.database().ref('/users/' + 'D3VaOIHRDbVvg5DmF7Ht1IkT2Rk2').once('value').then(function(snapshot) {
		 	 //console.log(snapshot.val().content);
		
			
			  setProfileBio(snapshot);
			 
			});

		}



		/* Reading from firebase and adding to UI end.*/
		if(window.location.href.indexOf("profile.html") > -1) {
			$(".mcontainer").css("visibility","hidden");
			getProfileBio();
			getProfileData();

			/*grab access token of instagram from URL.*/
			console.log(window.location.href.toString());
			var access_token=window.location.href.toString().split('=');
			console.log(access_token[1]);
			
		}


		//$('#signin-modal').modal('show'); 
		$('#insta-login-button').click(function (){
			console.log('insta');
			console.log(''+instagram["client_id"]+" uri "+instagram["redirect_uri"] +" rt "+instagram["response_type"]);
			window.location.replace("https://api.instagram.com/oauth/authorize/?client_id="+instagram["client_id"]+"&redirect_uri="+instagram["redirect_uri"]+"&response_type="+instagram["response_type"]+"&scope=follower_list");
		})

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

		


		console.log('Index page here');
		/* For instagram.*/
		/*$.ajax({
		    dataType: "jsonp",
		    type : 'GET',
		    url: "https://api.instagram.com/v1/users/546034003/followed-by?access_token=546034003.c759d88.d4577d5fff9746f098742d342670d0c7",
		    success: function (data)
		    {
		    	console.log(data.data[0].username);
		    }
		});*/
		/*$.getJSON("https://api.instagram.com/v1/users/self/followed-by?access_token="+"546034003.c759d88.d4577d5fff9746f098742d342670d0c7").success(function(data){
    			console.log(data); // will contain all data (and display it in console)
		})*/
	/*
		$('#myCarousel').carousel({
			    interval: 3000,
			    cycle: true
		});*/


		/* For twitter*/

		//Callback functions
		/*var error = function (err, response, body) {
	    	console.log('ERROR [%s]', err);
		};
		var success = function (data) {
	    	console.log('Data [%s]', data);
		};

		client.get('favorites/list', function(error, tweets, response) {
			  if(error) throw error;
			  console.log(tweets);  // The favorites.
			  console.log(response);  // Raw response object.
			});

*/
		/* For twitter end.*/

		function showModal(urlModal,modalContainerID,modalID,type)
		{
			$.ajax({
			  url: urlModal,
			  dataType: 'html',
			  success: function(data) {

			    //console.log(data);
			    // todo:  add the html to the dom...
			    $(modalContainerID).append(data);
			    //$(modalID).modal('show'); 
			    
			    setSubmitEvent(type);
			      
			  }
			});
		}


		//load signupmodal
		showModal("signup_modal.html","#signup-container","#signup-modal","s");

		//load business modal
		showModal("business_modal.html","#business-modal-container","#business-modal","b");

	 	//load influencer modal
	 	showModal("influencer_modal.html","#influencer-modal-container","#influencer-signup-modal","i");
	 	
	 	// load wait modal
	 	showModal("wait_modal.html","#wait-modal-container","#wait-modal","w");

	 	// load email-sent modal
	 	showModal("email_sent_modal.html","#email-sent-modal-container","#email-sent-modal","e");

 	 	// load email-sent modal
	 	showModal("create_content_modal.html","#create-content-modal-container","#create-content-modal","cc");


	 	$("#email-sent-modal-container").css("visibility","hidden");






		function setSubmitEvent(type)
		{
			if(type=="i")
			{
				$('#influencer-signup-form').validate({
					errorClass: "my-error-class",
   					validClass: "my-valid-class"
   				}
   				);
				
				$('#influencer-signup-form').submit(function (event){

				//form
				var isValid= $('#influencer-signup-form').valid();
				console.log(isValid);
				event.preventDefault();
				//alert("here"+img_src);
				
				//event.preventDefault();
					
				/*$("#influencer-signup-form").submit(function(event) {
						 event.preventDefault();	*/
						
						
						//console.log('here in signup influnecer.');

						in_name=$("#influencer-name").val();
						in_email=$("#influencer-email").val();

						in_password=$("#influencer-password").val();

						img_src = $("#influencer-image").attr('src');

						if(img_src == "images/original_upload_image.png")
						{
							alert("Please upload an image.");
						}
						
        				
						

						//console.log(' email ' + in_email.length + " password "+in_password);

						if(isValid && in_name!=null && in_email!=null && in_password !=null && img_src != "images/original_upload_image.png")
						{

							//alert("here"+img_src + " " +in_name + " " + in_email +" "+in_password);

							$('#influencer-signup-modal').modal('hide'); 
							$('#create-content-modal').modal('show'); 

							//$("#wait-modal").modal("show");


							firebase.auth().createUserWithEmailAndPassword(in_email, in_password).then(function(user) {
							    // [END createwithemail]
							    // callSomeFunction(); Optional
							    // var user = firebase.auth().currentUser;
							    //console.log('created user');

								

							    bus_or_in=0;
							    created_user=user;
							    uploadImage(user,bus_or_in,false);


							}, function(error) {
							    // Handle Errors here.
							    $('#create-content-modal').modal('hide'); 
							    var errorCode = error.code;
							    var errorMessage = error.message;
							    // [START_EXCLUDE]
							    if (errorCode == 'auth/weak-password') {
							        alert('The password is too weak.');
							        $("#wait-modal").modal("hide");
							    } 
						        else if (errorCode == "auth/email-already-in-use") {
							    	alert("Sorry, but the email id is already in use. Try with a different one!");
							    	$("#wait-modal").modal("hide");
							    }
							    else {
							        console.error(error);
							    }
							    // [END_EXCLUDE]
							});

						}
					/*});	*/
					

				});
			}

			if(type=="b")
			{
				$('#business-signup-form').validate({   
					errorClass: "my-error-class",
   					validClass: "my-valid-class"});

				$('#business-signup-form').submit(function (event)
				{
					
							
					
					
				
					b_name=$("#business-name").val();

					b_email=$("#business-email").val();

					b_password=$("#business-password").val();

					img_src = $("#business-image").attr('src');

					console.log('src' + img_src+' '+b_name);

					//form
					var isValid= $('#business-signup-form').valid();
					console.log(isValid);
					event.preventDefault();	

					if(img_src == "images/original_upload_image.png")
					{
						alert("Please upload an image.");
					}



					if(isValid && b_name!= null && b_email!=null && b_password !=null && img_src != "images/original_upload_image.png")
					{

							//alert("here"+img_src + " " +b_name + " " + b_email +" "+b_password);
						

						$('#business-modal').modal('hide'); 
						$('#create-content-modal').modal('show'); 
						//$("#wait-modal").modal("show");

						
						firebase.auth().createUserWithEmailAndPassword(b_email, b_password).then(function(user) {
						    // [END createwithemail]
						    // callSomeFunction(); Optional
						    // var user = firebase.auth().currentUser;
						    //console.log('created user');
						  /*  user.updateProfile({
							  displayName: b_name,
							}).then(function() {
							  // Update successful.
							  //console.log('Name saved.');
							}).catch(function(error) {
							  // An error happened.
							  //console.log('Error in saving name : '+error);
							});
		*/	
							

							bus_or_in=1;
							created_user=user;
							uploadImage(user,bus_or_in,false);
							


						},function(error) {
						    // Handle Errors here.
						    $('#create-content-modal').modal('hide'); 
						    var errorCode = error.code;
						    var errorMessage = error.message;
						    // [START_EXCLUDE]
						    if (errorCode == 'auth/weak-password') {
						        alert('The password is too weak.');
						        $("#wait-modal").modal("hide");
						    }
						    else if (errorCode == "auth/email-already-in-use") {
						    	alert("Sorry, but the email id is already in use. Try with a different one!");
						    	$("#wait-modal").modal("hide");
						    }

						    else {
						        console.error(error);
						    }
						    // [END_EXCLUDE]
							});
						}
					});

				

				}

				if(type="cc")
				{
					for(var i=0; i< contentCategoryArray.length;i++)
					{
					//creates option tag
					  jQuery('<option/>', {
					        value: contentCategoryArray[i],
					        html: contentCategoryArray[i]
					        }).appendTo('#category-dropdown select'); //appends to select if parent div has id dropdown
					}

					for(var i=0; i< contentTypeArray.length;i++)
					{
					//creates option tag
					  jQuery('<option/>', {
					        value: contentTypeArray[i],
					        html: contentTypeArray[i]
					        }).appendTo('#type-dropdown select'); //appends to select if parent div has id dropdown
					}

					$('#create-content-form').validate({
						errorClass: "my-error-class",
	   					validClass: "my-valid-class"
	   				});
				
					$('#create-content-form').submit(function (event){


						var isValid= $('#create-content-form').valid();
						console.log(isValid);
						event.preventDefault();

						img_src = $("#create-content-image").attr('src');
						cc_name= $('#content-name').val();
						cc_cat= $('#category-select').find(":selected").text();
						cc_type=$('#type-select').find(":selected").text();
						cc_web=$('#content-web').val();
						cc_make=$('#content-make').val();
						cc_desc=$('#content-desc').val();

						console.log(cc_name + " " +cc_cat + " " +cc_type+ " " + cc_web + " " +cc_make + " " +cc_desc);

						if(isValid && cc_name!="" && cc_desc!="")
						{
							$("#wait-modal").modal("show");
							$("#create-content-modal").modal("hide");
							if(img_src!= "images/original_upload_image.png")
							{
								uploadImage(created_user,1,true);
							}
							else
							{
								uploadContent(created_user);
							}
						}

					});
				}
			
		
		}

		function uploadContent(user)
		{
			var random_string=  random128Hex();
			//console.log('random' +random_string);
			if(img_src=="images/original_upload_image.png")
			{
				
				firebase.database().ref("users/"+user.uid+"/content").child(random_string).set({
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
				$('#create-content-modal').modal('hide'); 
				$("#wait-modal").modal('show');
				firebase.database().ref("users/"+user.uid+"/content").child(random_string).set({
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


		$('#nav-signup-btn').click(function(){
			
			//$("#signup-container").load("signup_modal.html");
			
			$('#signup-modal').modal('show'); 

		});

		$('#signup-free-btn').click(function(){
			
			$('#signup-modal').modal('show'); 

		});

		$('#nav-signin-btn').click(function(){
			$('#signin-modal').modal('show'); 

		});

		$('#signup-container').on('click', '#business-btn',function(){
			$('#signup-modal').modal('hide'); 

			

			 $('#business-modal').modal('show'); 
		});

		$('#signup-container').on('click','#influencer-btn',function(){
			$('#signup-modal').modal('hide'); 
			$('#influencer-signup-modal').modal('show');
		});

		$('#brand-signup-link').click(function(){
			 $('#business-modal').modal('show'); 
		});
		$('#influencer-signup-link').click(function(){
			 $('#influencer-signup-modal').modal('show'); 
		});
		$('#two-brand-signup-link').click(function(){
			 $('#business-modal').modal('show'); 
		});
		$('#two-influencer-signup-link').click(function(){
			 $('#influencer-signup-modal').modal('show'); 
		});

		

		$("#signup-container").each(function(){
			$(this).on('mouseover',"#business-btn,#influencer-btn",function ()
				{
					
					$(this).css("filter","brightness(80%)");	


				});	

		});
		$("#signup-container").each(function(){
			$(this).on('mouseleave',"#business-btn,#influencer-btn",function ()
				{
					
					$(this).css("filter","brightness(100%)");	

				});	

		});

		$("#signup-container").each(function(){
			$(this).on('click',"#business-btn,#influencer-btn",function ()
				{
					
					$(this).css("filter","brightness(80%)");	

				});	

		});

		

		// console.log("here");

		function createUser (user) {
			// body...
				if(bus_or_in == 0)
				{

					influencerUserCreation(user);

					//console.log('uid '+user.uid);
		  			 firebase.database().ref("users/"+user.uid).set({
				         email: in_email,
				         name:in_name,
				         profileURL:downloadURL,
				         type:  "influencer"
				    
				      });	

				}
				else
				{
					businessUserCreation(user);

					firebase.database().ref("users/"+user.uid).set({
				         email: b_email,
				         name:  b_name,
				         profileURL: downloadURL,
				         type:  "business"
				    
				      });	
				}
		}
		function businessUserCreation(user)
		{
			console.log('user uid in bs:' + user.uid);

			

			user.sendEmailVerification().then(function() {
				  // Email sent.
  					$("#wait-modal").modal("hide");
				  	
	 				$("#email-sent-modal-container").css("visibility","visible");
		 		 	$("#email-sent-modal").addClass("animated bounceInUp");


					setTimeout(function(){
	 					$("#email-sent-modal-container").css("visibility","hidden");
	 					$("#email-sent-modal").removeClass("animated bounceOutDown");



					}, 5000)
					  console.log('email sent');
		  			$("#email-sent-message").html("Verification sent to your email!");
	  				console.log('uid '+user.uid);
	  				
	  			    	


					}, function(error) {
					  // An error happened.
					  $('#business-modal').modal('hide'); 
	 					$("#email-sent-modal-container").css("visibility","visible");
		 		 	$("#email-sent-modal").addClass("animated bounceInUp");


					  setTimeout(function(){
	 						$("#email-sent-modal-container").css("visibility","hidden");
		 		 			$("#email-sent-modal").addClass("animated bounceOutDown");


					   }, 5000)
					  //console.log('email error : '+error);
	  				  $("#email-sent-message").html("Email not proper. Signup again, please.");

					});  
		}

		function influencerUserCreation(user)
		{
					//$('#create-content-modal').modal('show'); 


					user.sendEmailVerification().then(function() {
				  // Email sent.
	  				$("#wait-modal").modal("hide");
				  
	 				$("#email-sent-modal-container").css("visibility","visible");
		 		 	$("#email-sent-modal").addClass("animated bounceInUp");


					setTimeout(function(){
	 					$("#email-sent-modal-container").css("visibility","hidden");
		 		 	$("#email-sent-modal").addClass("animated bounceOutDown");



					}, 5000)
					  //console.log('email sent');
		  			
		  			$("#email-sent-message").html("Verification sent to your email!");


		  			


					}, function(error) {
					  // An error happened.
					  $('#influencer-signup-modal').modal('hide'); 
	 				  $("#email-sent-modal-container").css("visibility","visible");
		 		 	  $("#email-sent-modal").addClass("animated bounceInUp");


						setTimeout(function(){
	 						$("#email-sent-modal-container").css("visibility","hidden");
		 		 			$("#email-sent-modal").addClass("animated bounceOutDown");


						}, 5000)
					 // console.log('email error : '+error);
	  				  $("#email-sent-message").html("Email not proper. Try again, please.");

					});      

		}

		function uploadImage(user,bus_or_in,isContent)
		{

			console.log('user uid ' + user.uid);
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
				var uploadTask = storageRef.child(user.uid+'/profileImage/' + image_file.name).put(image_file, metadata);

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
				      if(!isContent)
					  {
					  	createUser(user);

					  }
					  else
					  {
					  	//is Content
					  	uploadContent(user);
					  }
				  }
				}, function() {
				  // Upload completed successfully, now we can get the download URL
				  downloadURL = uploadTask.snapshot.downloadURL;
				  console.log('download url ' +downloadURL);
				  if(!isContent)
				  {
				  	createUser(user);

				  }
				  else
				  {
				  	//is Content
				  	console.log('isContent');
				  	uploadContent(user);
				  }
				  
				});

				
		}


		


		$("#signin-form").submit(function(event) {
			/* Act on the event */
			alert("Form Submitted!");
			/*Implement Firebase Sign In*/



			/*Hide modal after successful signin*/
			$('#signin-modal').modal('show'); 

		})

		/*$("#change-one").html("<p> Hello </p>");
		$("#change-two").html("<button type='button' class='btn navbar-btn blue-btn font-class-bold' id='nav-signout-btn' style='font-size :12px;''>SIGN OUT</button>")
		$("#nav-signout-btn").css({	'height': '32px','width':'98px', 'border-radius': '20px','padding-bottom':'10px'});
*/

		console.log('Here');

		$('#learn-more').on("click",function(){
			console.log('Learn more');
		
			window.location.href="about_us.html"
		})

		//image preview
		// $("#image-input").on("change",readURL(this));

		function readURL(input,containerID)
		{

			
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $(containerID)
                        .attr('src', e.target.result)
                        .width(150)
                        .height(200);
                };

                reader.readAsDataURL(input.files[0]);
                image_file=input.files[0];
                image_type=image_file.type;
                image_path=URL.createObjectURL(image_file);
                console.log('MIME Type : '+image_file.type);
                console.log('path : '+image_path);
            	
        	}
		}

		$('#influencer-modal-container').on('change','#influencer-file-input',function (){
			readURL(this,"#influencer-image");
		});

		$("#business-modal-container").on('change',"#file-input",function (){
			readURL(this,"#business-image");
		});

		$("#create-content-modal-container").on('change',"#create-content-file-input",function (){
			readURL(this,"#create-content-image");
		});

		$('#brand-signup').click(function(){
			 $('#business-modal').modal('show'); 
		});
		$('#inf-signup').click(function(){
			 $('#influencer-signup-modal').modal('show'); 
		});

		return getProfileData;

	}); //Docuemnt ready end.
	



})(jQuery); //IIFE end.