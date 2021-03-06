var response_d={}
$(document).ready(function() {

$('.category_level_2').live('click',function(){
	var category_level_2_elements = document.getElementsByClassName('category_level_2');
	for (var i = 0; i < category_level_2_elements.length; i++) {
    	category_level_2_elements[i].style.background = "#bac3cd";
    	category_level_2_elements[i].style.color = "black";
	}

	this.style.background = "#193c63";
	this.style.color = "white";


});

var heading_row = '<th class="category_level_2"><span class="category_level_2_text">Dashboard</span></th>';
	heading_row += '<th class="category_level_2"><span class="category_level_2_text">General Statistics</span></th>';
	heading_row+='<th class="category_level_2"><span class="category_level_2_text">Advance Statistics</span></th>';
	heading_row+='<th class="category_level_2"><span class="category_level_2_text">Employee perfomance result</span></th>';
	heading_row+='<th class="category_level_2"><span class="category_level_2_text">Comments</span></th>';
	console.log("in here");
$("tr#table_heading").append(heading_row);

var dashboard_slider = '<div id="dashboard_slider"><div id=slider> <span id="slider_day">MONDAY</span><span id="slider_line"></span></div>';
var slider_values = '<div><table id="slider_values" class="dashboard_inside_tables"><tr><td id="slider_day_nps"></td><td id="slider_day_feedbacks"></td><td id="slider_day_avg_rating" class="rating"></td></tr></table></div>';
var overall_values = '<div><table id="overall_values" class="dashboard_inside_tables"> <tr><td id="overall_nps"></td><td id="overall_feedbacks"></td><td id="overall_avg_rating" class="rating"></td></tr></table></div>';
var dashboard = '<div id="dashboard_elements">' + dashboard_slider + slider_values + overall_values + '</div>';
$('.main_data').append(dashboard);
var host = 'http://localhost:8080/feedback-review';
				var graph_c = '/company';
				var company_id = '/1';
				var params ='/graphs?callback=?'
				var uri='';
				var dashboard_stats = $.ajax({
					  url: uri.concat(host,graph_c,company_id,"/dashboard?callback=?"),
			          dataType: 'jsonp',
			          type: 'GET',
			          cache: false,
			          jsonp: 'handle_data',
			          crossDomain:true,
			          async:false,
					  success: function(response){
					  	response_d=response;
					  	dashboard_details();
					  }
				});

function dashboard_details()
					{
						console.log("in dash");

						var day_nps = '<table id="dash_day_nps"> <tr class= "col1col2"><th> Promoters</th> <th>Detractor</th><th>Passive</th></tr>';
						day_nps+= '<tr><td><img class="dashboard_icons" src="images/Promoters_Icon.png"></img></td><td><img class="dashboard_icons" src="images/Detractors_Icon.png"></img></td><td><img class="dashboard_icons" src="images/Passives_Icon.png"></img></td></tr>';
						day_nps+='<tr><td>'+response_d.npsPositive+'</td><td>'+response_d.npsNegative+'</td><td>'+(response_d.countResponsesToday- (response_d.npsPositive+response_d.npsNegative))+'</td></tr></table>';
						$('#slider_day_nps').append(day_nps)

						var day_feedbacks = '<table id="dash_day_feeds"> <tr class= "col1col2"><th> Positive</th> <th>Negative</th><th>Neutral</th></tr>';
						day_feedbacks+= '<tr><td><img class="dashboard_icons"src="images/Positive_Icon.png"></img></td><td><img class="dashboard_icons" src="images/Negative_Icon.png"></img></td><td><img class="dashboard_icons" src="images/Neutral_Icon.png"></img></td></tr>';
						day_feedbacks+='<tr><td>'+response_d.countResponsesPositiveToday+'</td><td>'+response_d.countResponsesNegativeToday+'</td><td>'+(response_d.countResponsesTotal-(response_d.countResponsesPositiveTotal+response_d.countResponsesNegativeTotal))+'</td></tr></table>';
						$('#slider_day_feedbacks').append(day_feedbacks);

						$('#slider_day_avg_rating').append(response_d.avgRating.toFixed(2));

						var overall_nps = '<table id="dash_overall_nps"> <tr class= "col1col2"><th> Promoters</th> <th>Detractor</th><th>Passive</th></tr>';
						overall_nps+= '<tr><td><img class="dashboard_icons" src="images/Promoters_Icon.png"></img></td><td><img class="dashboard_icons" src="images/Detractors_Icon.png"></img></td><td><img class="dashboard_icons" src="images/Passives_Icon.png"></img></td></tr>';
						overall_nps+='<tr><td>'+response_d.npsPositiveTotal+'</td><td>'+response_d.npsNegativeTotal+'</td><td>'+(response_d.countResponsesTotal- (response_d.npsPositiveTotal+response_d.npsNegativeTotal))+'</td></tr></table>';
						$('#overall_nps').append(overall_nps)

						var overall_feedbacks = '<table id="dash_overall_feeds"> <tr class= "col1col2"><th> Positive</th> <th>Negative</th><th>Neutral</th></tr>';
						overall_feedbacks+= '<tr><td><img class="dashboard_icons" src="images/Positive_Icon.png"></img></td><td><img class="dashboard_icons" src="images/Negative_Icon.png"></img></td><td><img class="dashboard_icons" src="images/Neutral_Icon.png"></img></td></tr>';
						overall_feedbacks+='<tr><td>'+response_d.countResponsesPositiveTotal+'</td><td>'+response_d.countResponsesNegativeTotal+'</td><td>'+(response_d.countResponsesTotal-(response_d.countResponsesPositiveTotal+response_d.countResponsesNegativeTotal))+'</td></tr></table>';
						$('#overall_feedbacks').append(overall_feedbacks);
						$('#overall_avg_rating').append(response_d.avgRating.toFixed(2));

					}





});