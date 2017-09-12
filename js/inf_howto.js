(function ($)
{
     

     var first_template=
     {
        "page_head" : "Discover Content & Campaigns",
        "laptopscreen_image" : "images/search_page.png",
        "laptop_p" :  "If you know what types of content you’re looking for, filter by:",
        "laptop_li_type" :"ul",
        "laptop_li_num" : "3",
        "laptop_li_one" : "Category (e.g. Fitness, Beauty, Nutrition)",
        "laptop_li_two" : "Keywords (for more specific filter search for things like make up, protein shake, bodybuilding)",
        "laptop_li_three" : "Platform type (e.g. snapchat, Instagram, Facebook, Youtube)",
        "laptop_second_para":"",
        "phone_head" : "Browse content for inspiration",
        "appscreen1" : "images/appscreen_9.png",
        "appscreen2" : "images/appscreen_11.png",
        "phone_p" : "Swipe right (like) or left (don’t like) to discover the content other influencers have created. Other influencers add their best work to their portfolio, because it’s the fastest way to get noticed and headhunted by brands, as we share it across the whole platform. Content may be from previous promotions they’ve done, or content they’ve created purely for their fan.",
        
        "phone_li_one" : "",
        "phone_li_two" : "",
        "phone_li_three" : ""

     }

     var second_template=
     {
        "page_head" : "Connect & Collaborate with Brands and Influencers",
        "laptopscreen_image" : "images/search_page.png",
        "laptop_p" :  "Find other Influencers you admire :",
         "laptop_li_type" :"ol",
        "laptop_li_num" : "0",
        "laptop_li_one" : "",
        "laptop_li_two" : "",
        "laptop_li_three" : "",
        "laptop_li_four" : "",
        "laptop_li_five" : "",
        "laptop_second_para": "Swipe right to connect with influencers you like. When they like you back, you can chat to each other. If you really click with each other, invite them to collaborate on your media site/youtube video and they return the favour. This is one of the fastest ways to grow your audience.You can review their bios, social media profiles and portfolio to get a 360 view of who they are and what they’re about",
        "phone_head" : "Connect with Brands",
        "appscreen1" : "images/appscreen_1.png",
        "appscreen2" : "images/appscreen_3.png",
        "phone_p" : "Once a brand accepts your proposal, you’ll be able to chat with them on the app to go through the details and negotiate a fair price.",
       
        "phone_li_one" : "",
        "phone_li_two" : "",
        "phone_li_three" : ""

     }

      var third_template=
     {
        "page_head" : "Share your best content & hottest tips to get notices",
        "laptopscreen_image" : "images/pp.png",
        "laptop_p" :  "Sharing is caring :",
         "laptop_li_type" :"ul",
        "laptop_li_num" : "3",
        "laptop_li_one" : "Category (e.g. Fitness, Beauty, Nutrition)",
        "laptop_li_two" : "Keywords (for more specific filter search for things like make up, protein shake, bodybuilding)",
        "laptop_li_three" : "Platform type (e.g. snapchat, Instagram, Facebook, Youtube)",
        "laptop_second_para": "You’ve come a long way to get to where you are, but you’ve also have the potential to go so much further. Share your top influencer tips, and tools you’ve used to create amazing content. Your one great tip could have such a massive impact on the community, and the best thing is, you’ll discover amazing tips back that help you out a 100 fold.You can add content and tips from both the site and the app.",
        "phone_head" : "Let them come to you",
        "appscreen1" : "images/browse1.png",
        "appscreen2" : "images/browse2.png",
        "phone_p" : "You get more than what you put in, because sharing your best work not only make your ‘Media Kit’ extremely powerful, but it can get brands chasing you! /n Find your best work, or find that Instagram post that got the most likes and add it to your profile. We spread this throughout the app and the website platform for all to see.",
        "phone_li_one" : "",
        "phone_li_two" : "",
        "phone_li_three" : ""

     }

     var templates= [first_template,second_template,third_template];

     var count= 0;

    $(document).ready(function() {  


            load_template(count,"next");
             function load_template(count,buttonClicked)
             {
                $("#test").load("sample_template.html",function (){
                    console.log(templates[count]);
                    parseTemplate(templates[count],buttonClicked);
                });
             }
             
             
             /*$("#test2").load("b_template2.html");
             $("#test3").load("b_template3.html");*/
             
             function parseTemplate(template,buttonClicked)
             {
                var animationType="fadeInLeft";
                if(buttonClicked =="prev")
                {
                    animationType="fadeInRight"
                }

                $($(".page_head")[0]).addClass("slide-in-content animated "+ animationType +" go");
                $(".page_head")[0].innerHTML =template["page_head"];

                $($(".laptopscreen_image")[0]).addClass("slide-in-content animated "+ animationType +" go");
                $($(".laptopscreen_image")[0]).attr('src',template["laptopscreen_image"]);

                $($(".page_head")[0]).addClass("slide-in-content animated "+ animationType +" go");
                $(".page_head")[0].innerHTML =template["page_head"];
                
                $($(".laptop_p")[0]).addClass("slide-in-content animated "+ animationType +" go");
                $(".laptop_p")[0].innerHTML =template["laptop_p"];

                $($(".laptop_second_para")[0]).addClass("slide-in-content animated "+ animationType +" go");
                $(".laptop_second_para")[0].innerHTML =template["laptop_second_para"];
                
                if(template["laptop_li_type"]=="ul")
                {
                    console.log('here');
                    var listType="ul";
                    var points="points";
                   
                }
                else
                {
                    listType="ol";
                }
               if(template["laptop_li_num"] == "3")
                {
                    $($(".laptop-list-container")[0]).html("<"+listType+" class='"+points+" slide-in-content animated "+ animationType +" go'> <li>"+template["laptop_li_one"]+" </li>"
                        +"<li>"+template["laptop_li_two"]+ "</li>"
                        +"<li>"+template["laptop_li_three"]+ "</li>"
                        +"</"+listType+">");
                }
                if(template["laptop_li_num"] == "5")
                {
                    $($(".laptop-list-container")[0]).html("<"+listType+" class='"+points+" slide-in-content animated "+ animationType +" go'> <li>"+template["laptop_li_one"]+" </li>"
                        +"<li>"+template["laptop_li_two"]+ "</li>"
                        +"<li>"+template["laptop_li_three"]+ "</li>"
                        +"<li>"+template["laptop_li_four"]+ "</li>"
                        +"<li>"+template["laptop_li_five"]+ "</li>"
                        +"</"+listType+">");

                }


                $($(".phone_head")[0]).addClass("slide-in-content animated "+ animationType +" go");
                $(".phone_head")[0].innerHTML =template["phone_head"];

                $($(".phone_p")[0]).addClass("slide-in-content animated "+ animationType +" go");                
                 $(".phone_p")[0].innerHTML =template["phone_p"];

                $($(".appscreen1")[0]).addClass("slide-in-content animated "+ animationType +" go");
                $(".appscreen1")[0].innerHTML =template["appscreen1"];

                 $($(".appscreen2")[0]).addClass("slide-in-content animated "+ animationType +" go");
                $(".appscreen2")[0].innerHTML =template["appscreen2"];

                 


             }




            /*$("#test").html("../html/template.html");
            console.log('here too');*/

           

            // setInterval(function() { 
            //   $('#slideshow > div:first')
            //     .fadeOut(1000)
            //     .next()
            //     .fadeIn(1000)
            //     .end()
            //     .appendTo('#slideshow');
            // },  3000);

            $("#next-btn").click(function (){
                if(count <2)
                {
                    count=count+1;

                }
                else
                {
                    count=0;
                }

                
                load_template(count,"next");

            })
            $("#prev-btn").click(function (){
                if(count >0)
                {
                    count=count-1;

                }
                else
                {
                    count=2;
                }

                load_template(count,"prev");

            })
            
        }); //Docuemnt ready end.
    



})(jQuery); //IIFE end.