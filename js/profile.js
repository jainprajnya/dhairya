$(document).ready(function() {
	$('a').on('click',function (){

		var host = 'http://localhost:8080/feedback-review';
				 // host = 'http://192.168.1.101:8080/feedback-review';
				var graph_c = '/company';
				var company_id = '/1';
				var params ='/questions?callback=?'
				var uri='';
				alert(this.id);
		if (this.id=="questions") {

			$.ajax({
			          url: uri.concat(host,graph_c,company_id,params),
			          dataType: 'jsonp',
			          type: 'GET',
			          cache: false,
			          jsonp: 'handle_data',
			          crossDomain:true,
			          async:false,			        
			          success: function( response ) {
			          		// alert(response);					    
				          show_questions(response);				       
    			}
			});
			
		}

		else if(this.id=="offers"){
			var offers='';
			show_offers(offers);
		}
			else if(this.id=="profile"){

			}
				else if(this.id="license"){


				}
	});
    

});

$('#questions_list_v').live('click', function(){
	this.style.height= "200px";

	var element= this.childNodes;
	for (var i=0;i<element.length;i++)
	{
		console.log(element[i]);
		element[i].style.visibility="block";
	}
});

function show_questions(questions_list){
			var rows='<table style="align: center;"><tr><th style="background-color: black; padding: 10px 40px; color: black; text-align: left; color: white;">Question</th><th style="background-color: white; padding: 10px 40px; color: black;text-align: left;">Answers</th></tr>';
			for(var question in questions_list)
			{
				 rows+='<tr><td id='+questions_list[question]["questionId"]+'>'+questions_list[question]["question"]+'</td><td ><ul class="questions_list_main"><li id="questions_list_v"  style="visibility: block"" selected="selected">Select</li>';
				 	for(var i=0; i<questions_list[question]["answers"].length;i++)
				 	{
				 		rows+='<li class="questions_list">'+questions_list[question]["answers"][i]["answer"]+'</li>'

				 	}
				 	rows+='</select></td></tr>';
				// console.log(questions_list[question]);

			}
			rows+='</table></div>';
			// console.log(rows);
			$('div#profile').append(rows);					       

}

function show_offers(offers){
var rows='<form><button type="button">Add New Offer</button><button type="button">Submit</button>'
rows+='<table id="profile_offers" style="background-color: white; padding: 10px 40px; color: black; text-align: left;>';
rows+='<tr">'
rows+='<th>Select All</th>';
rows+='<th>Category</th>';
rows+='<th>Offer/Info Details</th>';
rows+='<th>Start Date/Time</th>';
rows+='<th>End Date/Time</th>';
rows+='<th>Recurrence</th>';
rows+='<th>Push everyhour</th>';
rows+='<th>show in client app</th>';
rows+='<th>Delete</th>';
rows+='</tr></table>';
$('div#profile').append(rows);

}