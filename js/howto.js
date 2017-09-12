(function ($)
{

     var first_template=
     {
        "page_head" : "Search using filters",
        "laptopscreen_image" : "images/search_page.png",
        "laptop_p" :  "If you know what types of content you’re looking for, filter by:",
        "laptop_li_type" :"ul",
        "laptop_li_num" : "3",
        "laptop_li_one" : "Category (e.g. Fitness, Beauty, Nutrition)",
        "laptop_li_two" : "Keywords (for more specific filter search for things like make up, protein shake, bodybuilding)",
        "laptop_li_three" : "Platform type (e.g. snapchat, Instagram, Facebook, Youtube)",
        "laptop_second_para":"",
        "phone_head" : "Browse the app",
        "appscreen1" : "images/appscreen_2.png",
        "appscreen2" : "images/appscreen_3.png",
        "phone_p" : "Swipe right (like) or left (don’t like) to discover the content our influencers have created. Influencers add their best work to their portfolio, and we share it across the whole platform.Content may be from previous promotions they’ve done, or content they’ve created purely for their fans.",
        "phone_li_num" : "0",
        "phone_li_one" : "",
        "phone_li_two" : "",
        "phone_li_three" : ""

     }

     var second_template=
     {
        "page_head" : "Launch campaigns and discover the best talent",
        "laptopscreen_image" : "images/camp_popup.jpg",
        "laptop_p" :  "Launching a campaign is simple:",
         "laptop_li_type" :"ol",
        "laptop_li_num" : "5",
        "laptop_li_one" : "Add an image of product.",
        "laptop_li_two" : "Fill in name, duration, theme and description.",
        "laptop_li_three" : "Upload your brief (details on the does/don’t etc)",
        "laptop_li_four" : "Select the incentive(s) to offer influencers.",
        "laptop_li_five" : "Set your criteria that influencers must meet.",
        "laptop_second_para": "Take note of the tips on the right to ensure you’ve covered these key points in your brief. When incentivizing influencers, generally they are happy with a <strong> flat fee</strong> as we encourage influencers to buy the product themselves so that they promote it as an authentic customer. But if you want to attract bigger influencers you could offer them a <strong>free gift</strong>, or a <strong>discount code</strong> to give to their followers, or perhaps a combination of the three. ",
        "phone_head" : "Connect with your campaigners",
        "appscreen1" : "images/appscreen_2.png",
        "appscreen2" : "images/appscreen_3.png",
        "phone_p" : "Once you’ve accepted an influencer’s proposal, you’ll be able to chat with them on the app to go through the details of your brief and negotiate a fair price.",
        "phone_li_num" : "0",
        "phone_li_one" : "",
        "phone_li_two" : "",
        "phone_li_three" : ""

     }

      var third_template=
     {
        "page_head" : "Get to know the Influencers to make informed decisions",
        "laptopscreen_image" : "images/pp.png",
        "laptop_p" :  "Get even deeper insight",
         "laptop_li_type" :"ul",
        "laptop_li_num" : "3",
        "laptop_li_one" : "Category (e.g. Fitness, Beauty, Nutrition)",
        "laptop_li_two" : "Keywords (for more specific filter search for things like make up, protein shake, bodybuilding)",
        "laptop_li_three" : "Platform type (e.g. snapchat, Instagram, Facebook, Youtube)",
        "laptop_second_para":"Dig deeper by reviewing their social media analytics to see audience demographics and see how engaging and appealing their audience find their content. Swipe right to connect with influencers you like. When they like you back, you can chat to each other. If you really like them, you can save their profile (click grey star) and invite them to campaigns in the future. You can review their bios, social media profiles and portfolio to get a 360 view of who they are and what they’re about.",
        "phone_head" : "Browse through profiles",
        "appscreen1" : "images/browse1.png",
        "appscreen2" : "images/browse2.png",
        "phone_p" : "",
        "phone_li_num" : "3",
        "phone_li_one" : "Category (e.g. Fitness, Beauty, Nutrition)",
        "phone_li_two" : "Keywords (for more specific filter search for things like make up, protein shake, bodybuilding)",
        "phone_li_three" : "Platform type (e.g. snapchat, Instagram, Facebook, Youtube)"

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

                 if(template["phone_li_num"] == "3")
                 {
                    $($(".phone-list-container")[0]).html("<ul class='"+points+" slide-in-content animated "+ animationType +" go' style='color: #FFF;margin-top:5%;'> <li style='color: #FFF;margin-top: 4%;margin-bottom: 5%; font-size:17px;'>"+template["phone_li_one"]+" </li>"
                        +"<li style='color: #FFF;margin-top: 4%;margin-bottom: 5%; font-size:17px;'>"+template["phone_li_two"]+ "</li>"
                        +"<li style='color: #FFF;margin-top: 4%;margin-bottom: 5%; font-size:17px;'>"+template["phone_li_three"]+ "</li>"
                        +"</ul>");
                 }
                 


             }

             /*<ul style="font-size:17px; color:#FFF;">
                        <li style="padding:5%;" class="phone_li_one" ></li>
                        <li style="padding:5%;" class="phone_li_two"></li>
                        <li style="padding:5%;" class="phone_li_three"></li>
                    </ul>*/


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