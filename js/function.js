var response_d={}
var month = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
var dow = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun" ]
$(document).ready(function() {

$('body').on('click','.category_level_2',function(){
	var category_level_2_elements = document.getElementsByClassName('category_level_2');
	for (var i = 0; i < category_level_2_elements.length; i++) {
    	category_level_2_elements[i].style.background = "#bac3cd";
    	category_level_2_elements[i].style.color = "black";
	}

	this.style.background = "#193c63";
	this.style.color = "white";
	switch(this.id)
	{
		case "gen_stats":load_general_statistics();
		case "adv_stats": load_advance_statistics();
		case "emp_perf": load_employee_performance();
		case "comment": load_comments();
		default:load_dashboard();
	}


});

var heading_row = '<th class="category_level_2"><span class="category_level_2_text">Dashboard</span></th>';
	heading_row += '<th class="category_level_2" id="gen_stats"><span class="category_level_2_text" >General Statistics</span></th>';
	heading_row+='<th class="category_level_2" id="adv_stats"><span class="category_level_2_text" >Advance Statistics</span></th>';
	heading_row+='<th class="category_level_2" id="emp_perf"><span class="category_level_2_text" >Employee perfomance result</span></th>';
	heading_row+='<th class="category_level_2" id="comment"><span class="category_level_2_text" >Comments</span></th>';
	console.log("in here");
$("tr#table_heading").append(heading_row);
load_dashboard();

});

function load_dashboard()
{

var dashboard_slider = '<div id="dashboard_slider"><div id=slider> <table><tr><td id="slider_day">MONDAY</td><td id="slider_row"><div id="slider_line"></div></td></table></div></div>';
var slider_values = '<div><table id="slider_values" class="dashboard_inside_tables"><tr><th>Net promoter score</th><th>no of feedbacks</th><th>Average rating</th></tr><tr><td id="slider_day_nps"></td><td id="slider_day_feedbacks"></td><td id="slider_day_avg_rating" class="rating"></td></tr></table></div>';
var overall_values = '<div id="overall_row">Overall</div><div><table id="overall_values" class="dashboard_inside_tables"> <tr><th>Net promoter score</th><th>no of feedbacks</th><th>Average rating</th></tr><tr><td id="overall_nps"></td><td id="overall_feedbacks"></td><td id="overall_avg_rating" class="rating"></td></tr></table></div>';
var dashboard = '<div id="dashboard_elements">' + dashboard_slider + slider_values + overall_values + '</div>';
$('.main_data').html(dashboard);

var labelArr = new Array("", "1 hour", "12 hours", "1 day", "3 day", "1 week");
   $( "#slider_line" ).slider({
      value:3,
      min: 1,
      max: 7,
      step: 1,
  }).each(function() {

  var opt = $(this).data().uiSlider.options;
  var vals = opt.max - opt.min;
  var date = new Date();
  
  for (var i = 0; i <vals; i++) {
  	var dd = date.getDate();
  	var mm = date.getMonth();
  	var dy = date.getDay(); 
    var someFormattedDate = dow[dy]+', '+dd + ' '+ month[mm] 
    var el = $('<label>'+(someFormattedDate)+'</label>').css('left',(i/vals*100 - 2)+'%');
  
    $( "#slider_line" ).append(el);
    date.setDate(date.getDate() + 1);
    
  }
  var dd = date.getDate();
  	var mm = date.getMonth();
  	var dy = date.getDay(); 
    var someFormattedDate = dow[dy]+', '+dd + ' '+ month[mm]
  var el = $('<label>'+(someFormattedDate)+'</label>').css('left',(94)+'%');
  $( "#slider_line" ).append(el);
});

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
					  	console.log(response_d);
					  	dashboard_details();
					  }
				});
}

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

						// $('#slider_day_avg_rating').append(response_d.avgRating.toFixed(2));
						$('#slider_day_avg_rating').append(2.3);
						var overall_nps = '<table id="dash_overall_nps"> <tr class= "col1col2"><th> Promoters</th> <th>Detractor</th><th>Passive</th></tr>';
						overall_nps+= '<tr><td><img class="dashboard_icons" src="images/Promoters_Icon.png"></img></td><td><img class="dashboard_icons" src="images/Detractors_Icon.png"></img></td><td><img class="dashboard_icons" src="images/Passives_Icon.png"></img></td></tr>';
						overall_nps+='<tr><td>'+response_d.npsPositiveTotal+'</td><td>'+response_d.npsNegativeTotal+'</td><td>'+(response_d.countResponsesTotal- (response_d.npsPositiveTotal+response_d.npsNegativeTotal))+'</td></tr></table>';
						$('#overall_nps').append(overall_nps)

						var overall_feedbacks = '<table id="dash_overall_feeds"> <tr class= "col1col2"><th> Positive</th> <th>Negative</th><th>Neutral</th></tr>';
						overall_feedbacks+= '<tr><td><img class="dashboard_icons" src="images/Positive_Icon.png"></img></td><td><img class="dashboard_icons" src="images/Negative_Icon.png"></img></td><td><img class="dashboard_icons" src="images/Neutral_Icon.png"></img></td></tr>';
						overall_feedbacks+='<tr><td>'+response_d.countResponsesPositiveTotal+'</td><td>'+response_d.countResponsesNegativeTotal+'</td><td>'+(response_d.countResponsesTotal-(response_d.countResponsesPositiveTotal+response_d.countResponsesNegativeTotal))+'</td></tr></table>';
						$('#overall_feedbacks').append(overall_feedbacks);
						// $('#overall_avg_rating').append(response_d.avgRating.toFixed(2));
						$('#overall_avg_rating').append(3.2);
					}

function load_general_statistics(){
// var filters = '<div id="gen_stats_filter"><div id=slider> <table><tr><td id="gen_stats_branch"><input></input></td><td id="gen_stats_start"><input></input><td id="gen_stats_end"><input></td></table></div>';
var filters='<div class="container">    <form action="" class="form-horizontal"  role="form"><fieldset>';
filters+= '<div class="form-group">';

   filters+= '<label for="dtp_input2" class="col-md-2 control-label">Start Date</label>';
   filters+= '<div class="input-group date form_date col-md-5" data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">';
    filters+= ' <input class="form-control" size="16" type="text" value="" readonly>';
    filters+= '<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>';
	filters+= '<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>';
     filters+= ' </div>';
	 filters+= '<input type="hidden" id="dtp_input2" value="" /><br/>';
    filters+= '</div>';
     filters+='</fieldset></form></div>';
$('.main_data').html(filters);	

}