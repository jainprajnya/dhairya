var chart,graph_id,graph_type,left_pane;
var session_id='';
var overview_index=-1;
var rendered_attr_id=[];
var series_data=[];
var graph_type;
var graph_list_names;
 var hash_obj={};
 var response;
 var applyFilter=[];
 var graph_list={};
 response_d={};
 var company_id = '1';
 var days_of_week=["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
 var full_days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
 var active_div="statistics"
	var options_overview = {
					chart: {
						type: 'column',
						// renderTo:'overview_graph',
						 renderTo:'',
						 // backgroundColor: '#30D5C8'
							},
						title: {
							text:''
						},
					xAxis: {
						 type: 'category',
						categories: []
					
					},
					yAxis: {
						min :0,
						tickInterval: 1,
						title: {
							text: 'Number of Feedbacks',
							// align:'left'
						}
					},
					tooltip: {
                		valueSuffix: ' Number of Feedbacks'
           			 },
           			 plotOptions: {
			                column: {
			                	pointPadding: 0.2,
			                    borderWidth: 0,
			                    pointWidth: 15,
			                    dataLabels: {
			                        enabled: true
			                 		   }
			                },
                    series: {
                    	allowPointSelect: true,
                    	
                pointWidth: 25,
                pointPadding: 0,
			                cursor: 'pointer'			                  
                
           				 }

           				},
			
				series: []

				}

var options_trends = {
					chart: {
						type: 'line',
						renderTo:'',
						 // backgroundColor: '#30D5C8'
							},
						title: {
							text:''
						},
					xAxis: {
						 type: 'category',
						categories: []
					
					},
					yAxis: {
						min :0,
						tickInterval: 1,
						title: {
							text: 'Avg Number of Feedbacks',
							// align:'left'
						}
					},
					tooltip: {
                		valueSuffix: 'Avg Number of Feedbacks'
           			 },
           			 plotOptions: {
			                column: {
			                	pointPadding: 0.2,
			                    borderWidth: 0,
			                    pointWidth: 15,
			                    dataLabels: {
			                        enabled: true
			                 		   }
			                },
                    series: {
                    	allowPointSelect: true,
                    	
                pointWidth: 25,
                pointPadding: 0,
			                cursor: 'pointer'			                  
                
           				 }

           				},
			
				series: []

				}

var month = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
// var dow = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun" ]
$(document).ready(function() {
$( ".datepicker startDate" ).datepicker({
  defaultDate: +7
});
	$('body').on('focus',".datepicker", function(){
	    $(this).datepicker();
	});



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
			case "gen_stats":load_general_statistics();break;
			case "adv_stats": load_advance_statistics();break;
			case "emp_perf": load_employee_performance();break;
			case "comment": load_comments();break;
			default:{d_index = find_index_of("Dashboard");
						console.log("dashboard index is"+d_index);
					  	load_dashboard(d_index,graph_list[d_index]["graphId"]);}
		}


	});

	$('body').on('click','a.dynamic_filter',function(){
		console.log("in click filter");
		var dyn_filter = this.id.split("_");
	var selected = dyn_filter[dyn_filter.length-1];
	console.log(dyn_filter);
	var temp=dyn_filter.slice(0,dyn_filter.length-1).join("_");
	console.log(temp);
	var filter_element= document.getElementsByName(temp);
	console.log(filter_element);
	console.log(selected);
	for(var i=0; i< filter_element.length;i++)
	{
		if (selected=="all")
			{filter_element[i].checked=true;}
		if (selected=="clear")
			{filter_element[i].checked=false;}
	}
});

	$('body').on('click','a.back_link',function(){
						console.log("in back link click");
						console.log(this.id);
						var graph_type= (this.parentNode.className);
						var graph_name=(this.id).split("_")[0];
						console.log(graph_type);
						// var parent_node=document.getElementById(graph_name+"_quick_links");
						// var to_b_removed = document.getElementById(graph_name+"_quick_links").childNodes;
						var parent_node=this.parentNode;
						var to_b_removed = this.parentNode.childNodes;
						console.log(to_b_removed);
						console.log(parent_node.lastChild);
						for(var i=0;i< to_b_removed.length;i++)
						{
							var temp = to_b_removed[i].id;
							var temp2=temp.split("_");
							var temp3=(this.id).split("_");
							console.log("---**---");
							console.log(to_b_removed[i]);
							console.log(parseInt(temp2[temp2.length - 1])+"  **  "+parseInt(temp3[temp3.length-1]));
							if(temp!==undefined && parseInt(temp2[temp2.length - 1]) > parseInt(temp3[temp3.length-1]))
							 {
							 	parent_node.removeChild(to_b_removed[i]);
							 }
						}
						console.log((this.id).split("_")[2]);

						if (parseInt((this.id).split("_")[2]) == -2)
							parent_id=-1;
						else
							parent_id=parseInt((this.id).split("_")[2]);
						console.log("----"+this.innerHTML);

						var temp_array=(this.id).split("_");
						console.log(temp_array);
						console.log(temp_array.slice(1,temp_array.length -1).join("_"));
						makeSubGraph(graph_name,graph_type,temp_array.slice(1,temp_array.length -1).join("_"));
						
					});

	$('body').on('click','.filter_dropdown_style',function(){
						var elements= this.parentNode.children;
						// document.getElementsByClassName("filter_dropdown_list");
						console.log("in click");
						console.log(elements);
						elements[1].style.visibility=elements[1].style.visibility=="visible"?"hidden":"visible";
						for (var i = 0; i < elements[1].children.length; i++) {
							console.log(elements[1].children[i]);
						        elements[1].children[i].style.visibility=elements[1].children[i].style.visibility=="visible"?"hidden":"visible";
						    }

					});

	$('body').on('click','.filter_list_input',function (){
						addFilter(this.id,this.name);
						make_graph_with_filters();
					});


   // $('body').on('submit','#login',function(){
	console.log("when clicked login");
  	var uname=(document.getElementById("username")).innerHTML;
  	var pword=(document.getElementById("password")).innerHTML;
  	console.log(uname);
  	console.log(pword);

  	var login_url = 'https://bizviewz.com:8080/feedback-review/login';


var client = new XMLHttpRequest();
  client.open("POST", "https://bizviewz.com:8080/feedback-review/login",false);
  client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   var temp = "username="+uname+"&password="+pword;
   client.onreadystatechange=function()
  {
  if (client.readyState==4 && client.status==401)
    {
    window.location.href = "login.php";
    }
  }
  client.send(temp);
 

 set_session_id(client.getResponseHeader('sessionId'));
 set_company_id(JSON.parse(client.responseText));
  		

	var heading_row = '<th class="category_level_2"><span class="category_level_2_text">Dashboard</span></th>';
		// heading_row += '<th class="category_level_2" id="gen_stats"><span class="category_level_2_text" >General Statistics</span></th>';
		heading_row+='<th class="category_level_2" id="adv_stats"><span class="category_level_2_text" >Feedback Results</span></th>';
		heading_row+='<th class="category_level_2" id="emp_perf"><span class="category_level_2_text" >Employee perfomance result</span></th>';
		heading_row+='<th class="category_level_2" id="comment"><span class="category_level_2_text" >Comments</span></th>';
		// console.log("in here");
	$("tr#table_heading").append(heading_row);
					
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://bizviewz.com:8080/feedback-review/company/"+company_id+"/graphs",false);
  xhr.setRequestHeader('Content-Type', 'application/javascript;charset=UTF-8');
  xhr.setRequestHeader('sessionId', session_id);
  xhr.send();
  graph_list= JSON.parse(xhr.responseText);

  xhr.open("GET", "https://bizviewz.com:8080/feedback-review/company/"+company_id,false);
  xhr.setRequestHeader('Content-Type', 'application/javascript;charset=UTF-8');
  xhr.setRequestHeader('sessionId', session_id);
  xhr.send();
  xhr.onreadystatechange=function()
  {
  if (xhr.readyState==4 && xhr.status==401)
    {
    window.location.href = "login.php";
    }
  }
  company_data = JSON.parse(xhr.responseText);
  console.log(company_data);
  branch_id=company_data["branches"][0]["id"];

	d_index = find_index_of("Dashboard");
	console.log("dashboard index is"+d_index);
	prepare_graph_list(graph_list);
	load_dashboard(d_index,graph_list[d_index]["graphId"],branch_id);
	
});



function set_session_id(id)
{
	session_id=id;
}

function set_company_id(response_hash)
{
	company_id=response_hash.companyId;
	if(company_id==-1)
		{company_id=1;}

}

function prepare_graph_list(graphs)
{  
	graph_list_names = new Object();
	for(var i=0;i < graph_list.length;i++)
	{	
		graph_list_names[graph_list[i]["name"]]={};
		graph_list_names[graph_list[i]["name"]]=graph_list[i]["graphId"];
	}
}

function find_index_of(graph_name)
{
	for(var i=0;i<graph_list.length;i++)
		{
			if (graph_list[i]["name"]==graph_name){return i;}
		}
	return -1;
}

function load_dashboard(dashboard_index,dashboard_graphID,branch_id){
	document.getElementById("adjustment_div").style.height="55%";
   var todays_date = new Date();
	var todays_day = full_days[todays_date.getDay()];
	var current_div = '<div id="activeDiv" className='+dashboard_graphID+'></div>';
	var dashboard_slider = '<div id="dashboard_slider"><div id=slider> <table><tr><td id="slider_day" class="dashboard_heading">'+todays_day+'</td><td id="slider_row"><div id="slider_line"></div></td></table></div></div>';
	var slider_values = '<div id='+graph_list[dashboard_index]["name"]+"_current"+'></div>';
	var overall_values = '<div id='+graph_list[dashboard_index]["name"]+"_overall"+'>Overall</div>';
	var dashboard = current_div + '<div id="dashboard_elements">' + dashboard_slider + slider_values + overall_values + '</div>';
	$('.main_data').html(dashboard);

	var labelArr = new Array("", "1 hour", "12 hours", "1 day", "3 day", "1 week");
	   $( "#slider_line" ).slider({
	      value:7,
	      min: 1,
	      max: 7,
	      step: 1,
	      slide: function( event, ui ) {
	      			day_diff= 6 - ui.value;
	      			var date = new Date();
					date.setDate(date.getDate() - day_diff);
					delete hash_obj["dashboard_current"];
	                load_current_day_dashboard(dashboard_index,dashboard_graphID,date,date);
	            }
	  }).each(function() {
	  var opt = $(this).data().uiSlider.options;
	  var vals = opt.max - opt.min;
	  var date = new Date();
	  date.setDate(date.getDate() - 6);
	  for (var i = 0; i <vals; i++) {
	  	var dd = date.getDate();
	  	var mm = date.getMonth();
	  	var dy = date.getDay(); 
	    var someFormattedDate = days_of_week[dy]+', '+dd + ' '+ month[mm] 
	    var el = $('<label>'+(someFormattedDate)+'</label>').css('left',(i/vals*100 - 2)+'%');
	  
	    $( "#slider_line" ).append(el);
	    date.setDate(date.getDate() +1 );
	    
	  }
	  var dd = date.getDate();
	  	var mm = date.getMonth();
	  	var dy = date.getDay(); 
	    var someFormattedDate = days_of_week[dy]+', '+dd + ' '+ month[mm]
	  var el = $('<label>'+(someFormattedDate)+'</label>').css('left',(94)+'%');
	  $( "#slider_line" ).append(el);
	});

	  // console.log("while starting");
	  // console.log(hash_obj);
	  var to_date = new Date();
	  var start_date=(to_date.getFullYear()*100+(to_date.getMonth()+1))*100+(to_date.getDate()-365);
	var end_date=(to_date.getFullYear()*100+(to_date.getMonth()+1))*100+to_date.getDate();
  load_current_day_dashboard(dashboard_index,dashboard_graphID,start_date,end_date,branch_id);
  load_one_year_data_dashboard(dashboard_index,dashboard_graphID,branch_id);
}

function load_current_day_dashboard(dashboard_index,dashboard_graphID,from_date,to_date)
{
	if (hash_obj.hasOwnProperty(graph_list[dashboard_index]["name"]+"_current"))
	{   
		dashboard_render(dashboard_index,graph_list[dashboard_index]["name"]+"_current");
		return;
	}
	var to_date = new Date();
	var end_date=(to_date.getFullYear()*100+(to_date.getMonth()+1))*100+to_date.getDate();
	var host = 'https://bizviewz.com:8080';
	var path = '/feedback-review/company/'+company_id+'/graph/';
				
	var uri='';
	filters_g='startDate='+end_date+'&endDate='+end_date;
	params='/statistics?'+'branch='+branch_id+'&'+filters_g;


	var xhr = new XMLHttpRequest();
  xhr.open("GET", uri.concat(host,path,dashboard_graphID,params),false);
  xhr.setRequestHeader('Content-Type', 'application/javascript;charset=UTF-8');
  xhr.setRequestHeader('sessionId', session_id);
  xhr.send();
   xhr.onreadystatechange=function()
  {
  if (xhr.readyState==4 && xhr.status==401)
    {
    window.location.href = "login.php";
    }
  }
  current_day_data= JSON.parse(xhr.responseText);
  // console.log("in load_current_day_dashboard current day");
	make_graph_obj(current_day_data,graph_list[dashboard_index]["name"]+"_current",dashboard_index);
	dashboard_render(dashboard_index,graph_list[dashboard_index]["name"]+"_current");

}

function load_one_year_data_dashboard(dashboard_index,dashboard_graphID,branch_id)
{	
 if (hash_obj.hasOwnProperty(graph_list[dashboard_index]["name"]+"_overall"))
	{   
		dashboard_render(dashboard_index,graph_list[dashboard_index]["name"]+"_overall");
		return;
	}

	var to_date = new Date();
	// var from_date = to_date.setDate(to_date.getDate() - 365);
  	// var someFormattedDate = yy+mm+dd ;
  				var someFormattedDate='20141120';
				var host = 'https://bizviewz.com:8080';
				var path = '/feedback-review/company/'+company_id+'/graph/';
			
				var start_date=(to_date.getFullYear()*100+(to_date.getMonth()+1))*100+(to_date.getDate()-7);
				var end_date=(to_date.getFullYear()*100+(to_date.getMonth()+1))*100+to_date.getDate();
				var uri='';
				filters_g='startDate='+start_date+'&endDate='+end_date;
				params='/statistics?branch='+branch_id+'&'+filters_g;

	var xhr = new XMLHttpRequest();
  xhr.open("GET", uri.concat(host,path,dashboard_graphID,params),false);
  xhr.setRequestHeader('Content-Type', 'application/javascript;charset=UTF-8');
  xhr.setRequestHeader('sessionId', session_id);
  xhr.send();
   xhr.onreadystatechange=function()
  {
  if (xhr.readyState==4 && xhr.status==401)
    {
    window.location.href = "login.php";
    }
  }
  current_day_data= JSON.parse(xhr.responseText);
  // console.log("in load_one_year_data_dashboard");
	make_graph_obj(current_day_data,graph_list[dashboard_index]["name"]+"_overall",dashboard_index);
	dashboard_render(dashboard_index,graph_list[dashboard_index]["name"]+"_overall","Overall");

}

function dashboard_render(dashboard_index,dashboard_element,dash_element_name)
{
	// console.log("in dashboard render");
	// console.log(dashboard_index+":"+dashboard_element);
	// console.log(hash_obj);
	var nps_bool = 0;
	var avgRating_bool = 0;
	var nofeedbacks_bool = 0;
	var dashboard_heading='';
	var avg_rating=0;

	if(dash_element_name!=null)
	{
		dashboard_heading='<div class="dashboard_heading">'+dash_element_name+'</div>';
	}
	var rows=dashboard_heading+'<table id='+dashboard_element+"_values"+' class="dashboard_inside_tables">';
					  	var table_heading='<tr>';
					  	// var row2='<tr>';
					  	var attributeList=graph_list[dashboard_index]["attributeList"];
					  	var day_nps='';
					  	for(var i=0;i< attributeList.length;i++)
						{
							
							var attr_id=attributeList[i]["attributeId"];
							attr_present = (hash_obj[dashboard_element][attr_id]).hasOwnProperty("listCountPPl");
						 	if ( attr_present && (hash_obj[dashboard_element][attr_id]["listCountPPl"]) !== null )						  
							{
						var neutral = hash_obj[dashboard_element][attributeList[i]["attributeId"]]["listCountPPl"][2];
							var negative=hash_obj[dashboard_element][attributeList[i]["attributeId"]]["listCountPPl"][3]+hash_obj[dashboard_element][attributeList[i]["attributeId"]]["listCountPPl"][4];
							var positive=hash_obj[dashboard_element][attributeList[i]["attributeId"]]["listCountPPl"][0]+hash_obj[dashboard_element][attributeList[i]["attributeId"]]["listCountPPl"][1];
							var total=neutral+negative+positive;
							var feedbacks_total=total
							console.log(total);
							if(total==0 ) {neutral=0;positive=0;negative=0;total=1;}
					
								var rating_temp=hash_obj[dashboard_element][attributeList[i]["attributeId"]]["listCountPPl"];
								if(attributeList[i]["attributeString"].trim().toLowerCase().indexOf("netpromoterscore")>-1)
								{	
									nps_bool=1;
									console.log("in if");
									day_nps+= '<td><table id="dash_day_nps"> <tr class= "col1col2"><th> Promoters</th> <th>Detractor</th><th>Passive</th></tr>';
									day_nps+= '<tr><td><img class="dashboard_icons" src="images/Promoters_Icon.png"></img></td><td><img class="dashboard_icons" src="images/Detractors_Icon.png"></img></td><td><img class="dashboard_icons" src="images/Passives_Icon.png"></img></td></tr>';
									day_nps+='<tr><td>'+(positive/total)+' %</td><td>'+(negative/total)+' %</td><td>'+(neutral/total)+' %</td></tr></table></td>';
									table_heading+='<th style="font-size: 25px;">'+attributeList[i]["attributeString"]+": "+Math.abs((positive-negative)/total)+' %</th>';

								}

								if(attributeList[i]["attributeString"].trim().toLowerCase().indexOf("overall_experience")>-1)
								{	
									nofeedbacks_bool=1;
									console.log("in if1");
									
									day_nps+= '<td><table id="dash_day_nps"> <tr class= "col1col2"><th> Positive</th> <th>Negative</th><th>Neutral</th></tr>';
									day_nps+= '<tr><td><img class="dashboard_icons" src="images/Positive_Icon.png"></img></td><td><img class="dashboard_icons" src="images/Negative_Icon.png"></img></td><td><img class="dashboard_icons" src="images/Neutral_Icon.png"></img></td></tr>';
									day_nps+='<tr><td>'+(positive/total)+' %</td><td>'+(negative/total)+' %</td><td>'+(neutral/total)+' %</td></tr></table></td>';
									table_heading+='<th style="font-size: 25px;">No. Of Feedbacks: '+feedbacks_total+'</th>';
									
									var temp_avg_rating=hash_obj[dashboard_element][attributeList[i]["attributeId"]]["listCountPPl"];
									for(var temp=0;temp<5;temp++)
									{
										avg_rating+=(temp+1)*temp_avg_rating[temp];
									}
								}

							}
						  else
						   {
						   	console.log("in else");
						   	day_nps+='<td style="height:120px; text-align:center;"> No Data </td>';
						   	
						   	if(attributeList[i]["attributeString"].trim().toLowerCase().indexOf("netpromoterscore")>-1)
								{
									nps_bool=1;
									table_heading+='<th style="font-size: 25px;">'+attributeList[i]["attributeString"]+' 0 %</th>';
								}
							if(attributeList[i]["attributeString"].trim().toLowerCase().indexOf("overall_experience")>-1)
								{
									nofeedbacks_bool=1;
									table_heading+='<th style="font-size: 25px;">No. Of Feedbacks: 0</th>';
								}

						   }						
						}

						

						if(nps_bool==0)
						{
							table_heading+='<th style="font-size: 25px;">Net Promoter Score: 0%</th>';
							day_nps+='<td style="height:120px; text-align:center;"> No Data </td>';
						}

						if(avgRating_bool==0)
						{
							console.log("in avg rating if");
							table_heading+='<th style="font-size: 25px;">Average Rating</th>';
							day_nps+='<td style="height:120px; text-align:center; font-size:50px;">'+(avg_rating/5)+'</td>';
						}

						table_heading+='</tr>'

					  	rows=rows+table_heading+'<tr>'+day_nps+'</tr></table>';
					  	$("#"+dashboard_element).html(rows)
}


function load_advance_statistics(){
	document.getElementById("adjustment_div").style.height="85%";
	var adv_overview_div='';
	var adv_trends_div='';
	var overview_basic_filters;
	var trends_basic_filters;
     var adv_stats_elements =[{"name":"adv:Customer Experience", "type":"overview"},{"name":"adv:Trends", "type":"trends"},{"name":"pre:Customer Preference Result", "type":"overview"}];
     // var adv_stats_elements =[{"name":"adv:Customer Experience", "type":"overview"},{"name":"adv:Trends", "type":"trends"}];

    console.log("in adv stats load");
    var advance_stats_div='';
    for(var i=0 ;i< adv_stats_elements.length;i++)
		{
			var graph_name_temp= adv_stats_elements[i]["name"];
			graph_name_temp=graph_name_temp.replace(/\s+/g, '-');
			var temp = set_current_elements(graph_name_temp,adv_stats_elements[i]["type"]);
			advance_stats_div+=temp;
			    
		}// document.getElementById("activeDiv").className="advance_stats";
	$('.main_data').html(advance_stats_div);
	
	for(var i=0 ;i<adv_stats_elements.length ;i++)
		{
			console.log("while seeting fileter");

			var temp = find_index_of(adv_stats_elements[i]["name"]);
			var graph_name_temp= adv_stats_elements[i]["name"];

			graph_name_temp=graph_name_temp.replace(/\s+/g, '-');
			console.log(adv_stats_elements[i]["name"]+temp);
			set_filter(graph_name_temp,graph_list[temp]["filterList"]);
			populateDefaultDates(graph_name_temp,adv_stats_elements[i]["type"]);
			if (adv_stats_elements[i]["type"]=="overview")
			{
				load_overview(temp,graph_list[temp]["graphId"],adv_stats_elements[i]["name"].replace(/\s+/g, '-'));		    
			}
			else
			{
				load_trends(temp,graph_list[temp]["graphId"],adv_stats_elements[i]["name"].replace(/\s+/g, '-'),30);
			}
		}


				$('body').on('click','.label',function (){

						var params_index= get_params_index(this.id,response);
					    applyFilter=[];
					    graph_type=response[params_index]["type"];
					    set_graph_level(-1);
					    graph_name=response[params_index]["name"];
						collect_stats_populate_graph(this.id,response[params_index]["attributeList"],response[params_index]["filterList"],applyFilter);

				});

	

}

function set_current_elements(graph_name,graph_type)
{
			var custom_filters='';
			var overall_filters='';
 			var basic_filters='<table id='+graph_name+"_basic_filters"+' class="basic_filters">';
			basic_filters+='<tr>';
			var b_filters='<td id='+graph_name+"_branch"+'><a class="filter_dropdown_style">Select branch</a><ul class="filter_dropdown_list" style="visibility: hidden;"> ';
			branchesList=company_data["branches"];
			console.log(branchesList);
			var a=(graph_name.split(":"))[1];

			for(var j=0; j<branchesList.length;j++)
			{
				
				b_filters+='<li class="filter_list_elements"><input type="checkbox" class="filter_list_input" name='+graph_name+"-branches"+' id='+branchesList[j]["name"]+'>&nbsp;&nbsp;'+branchesList[j]["name"]+'</input></li>';
			}
			b_filters+='<li class="filter_list_elements last_row" ><a class="dynamic_filter" style="font-size: 11px; color: blue; float: right; margin-right: 2px; padding-top: 3px;" id='+graph_name+"-"+"branches"+"_clear"+'> clear </a>';
			b_filters+='<a class="dynamic_filter" style="font-size: 11px; color: blue; float: left; margin-left: 2px;padding-top: 3px;" id='+graph_name+"-"+"branches"+"_all"+'> all </a></li></ul></td>';

			basic_filters+=b_filters;
			 // var b_filters='';
			basic_filters+='<td class="startDate" id='+graph_name+"_from_date_filter"+'>Start Date: <input type="text" id='+graph_name+"_start_date"+' class="datepicker startDate"></p></td>';
			basic_filters+='<td class="endDate" id='+graph_name+"_to_date_filter"+'>End Date: <input id='+graph_name+"_end_date"+' class="datepicker endDate" /></td>';
			basic_filters+='<td id='+graph_name+"filter_button"+' rowspan=2><button class="filter_button">Filter</button></td></tr>'
			var quick_links='';


			quick_links='<div class='+graph_type+' id=' + graph_name+"_quick_links"+'><a id='+graph_name+"_"+graph_type+"_-2" + ' class="back_link">'+"Home"+'</a></div>';
			quick_links+='<div id='+graph_name+"_container_graph_child"+' name='+graph_name+"_level_identify_div"+' style="display:hidden;"></div>';
            quick_links+='<div id='+graph_name+"_container_graph_id"+' name='+graph_name+"_id_identify_div"+' style="display:hidden;"></div>';
            quick_links+='<div id='+graph_name+"_container_graph_filter"+' name='+graph_name+"_filter_identify_div"+' style="display:hidden;"></div>'
			custom_filters='<tr id='+graph_name+"_filter_row"+'></tr></table>';
			var comments='<div class="comments_less" id='+graph_name+"_comments"+'>View other Comments<img src="images/comments_icon.png" style="height:20px; width:20px;margin-left:5px;" /></div>';
			overall_filters = '<div id='+graph_name+"_filters"+ '><div class="stats_main_div">'+(graph_name.split(":"))[1]+'</div>'+basic_filters+custom_filters+comments+quick_links+'<table class="main_graph_plot"><tr><td id='+graph_name+"_graph"+'></td></tr></table></div>';
	

	
return overall_filters;

}

function load_overview(adv_overview_index,adv_overview_graphId,adv_overview_name,from_date,to_date)
{
console.log("in load_overview");
	if (hash_obj.hasOwnProperty(adv_overview_name))
	{   
		console.log("in if load_overview");
		 set_data_of_series_normal(hash_obj[adv_overview_name],-1,null,adv_overview_name);
		return;
	}

	var to_date = new Date();

  				var someFormattedDate='20141120';
				var host = 'https://bizviewz.com:8080';
				var path = '/feedback-review/company/'+company_id+'/graph/';
				var start_date=(to_date.getFullYear()*100+(to_date.getMonth()+1))*100+(to_date.getDate()-7);
				var end_date=(to_date.getFullYear()*100+(to_date.getMonth()+1))*100+to_date.getDate();
				var uri='';
				filters_g='startDate='+start_date+'&endDate='+end_date;
				var params='/statistics?branch='+branch_id+'&'+filters_g;


	var xhr = new XMLHttpRequest();
	  xhr.open("GET", uri.concat(host,path,adv_overview_graphId,params),false);
	  xhr.setRequestHeader('Content-Type', 'application/javascript;charset=UTF-8');
	  xhr.setRequestHeader('sessionId', session_id);
	   xhr.onreadystatechange=function()
	  {
	  if (xhr.readyState==4 && xhr.status==401)
	    {
	    window.location.href = "login.php";
	    }
	  }
	  xhr.send();

	  overview_data= JSON.parse(xhr.responseText);
	  

					    console.log(overview_data);
					    make_graph_obj(overview_data,adv_overview_name,adv_overview_index);
					    set_data_of_series_normal(hash_obj[adv_overview_name],-1,null,adv_overview_name);
					    				        set_graph_level(adv_overview_name,-1);

}

function load_trends(adv_trends_index,adv_trends_graphId,adv_trends_name,days)
{
	  console.log("in load_trends");
if (hash_obj.hasOwnProperty(adv_trends_name))
	{   
		set_data_of_series_trends(hash_obj[adv_trends_name],-1,"listDailyAttributeStatisticValues",days,adv_trends_name);
		return;
	}

	var to_date = new Date();
	// var from_date = to_date.setDate(to_date.getDate() - 365);
  	// var someFormattedDate = yy+mm+dd ;
  				var someFormattedDate='20141120';
				var host = 'https://bizviewz.com:8080';
				var path = '/feedback-review/company/'+company_id+'/graph/';
				var start_date=(to_date.getFullYear()*100+(to_date.getMonth()+1))*100+(to_date.getDate()-days);
				var end_date=(to_date.getFullYear()*100+(to_date.getMonth()+1))*100+to_date.getDate();
				var uri='';
				filters_g='startDate='+start_date+'&endDate='+end_date;
				params='/statistics?branch='+branch_id+'&'+filters_g;
			

var xhr = new XMLHttpRequest();
console.log(uri.concat(host,path,adv_trends_graphId));
  xhr.open("GET", uri.concat(host,path,adv_trends_graphId,params),false);
  xhr.setRequestHeader('Content-Type', 'application/javascript;charset=UTF-8');
  xhr.setRequestHeader('sessionId', session_id);
   xhr.onreadystatechange=function()
  {
  if (xhr.readyState==4 && xhr.status==401)
    {
    window.location.href = "login.php";
    }
  }
  xhr.send();
  trends_data= JSON.parse(xhr.responseText);

					    // renderLayout(response);
					    console.log("in trends query");
					    console.log(trends_data);
				
					    make_graph_obj(trends_data,adv_trends_name,adv_trends_index);
						set_data_of_series_trends(hash_obj[adv_trends_name],-1,"listDailyAttributeStatisticValues",days,adv_trends_name);
						set_graph_level(adv_trends_name,-1);

}
function make_graph_with_filters(){
				applyFilter=[];
				var param=(document.getElementsByName("id_identify_div")[0].id).split("_")[1];								
				var params_index= get_params_index(param,response);								
				setFilter(applyFilter);
				collect_stats_populate_graph(param,response[params_index]["attributeList"],response[params_index]["filterList"],applyFilter);

			}
			
function plot_graph(main_graph)
{				// populate_filter(main_graph["filterList"]);
	collect_stats_populate_graph(main_graph["graphId"],main_graph["attributeList"],main_graph["filterList"],applyFilter);
}

function set_graph_level(graph_type,parent)
{
	console.log("inside set graph" + graph_type);
	console.log(document.getElementsByName(graph_type+"_level_identify_div"));
	var container_parent=document.getElementsByName(graph_type+"_level_identify_div")[0].id;
	var container_graphid='';
	document.getElementsByName(graph_type+"_level_identify_div")[0].id=container_parent.concat('_',parent);
	// document.getElementsByName("id_identify_div")[0].id=container_graphid.concat(graph_name+"_"+graph_id);
}
		    
function collect_stats_populate_graph(graph_id,attributeList,filterList,applyFilter)
{						
	options.xAxis.categories=[];
	// set_chart_type();
	var host = 'https://bizviewz.com:8080/feedback-review/company/1/graph/';
	var uri='';
	graphsValues={};
	var response11;
	filters_g='startDate=20141010&endDate=20141122&';
					 	// console.log("in stats"+applyFilter);
					 	// for(var i=0;i< applyFilter.length;i++)
					 	// {
					 	// 	filters_g+=applyFilter[i]+"="+applyFilter[i+1]+"&";
					 	// 	i++;
					 	// }
					
	params='/statistics?'+filters_g+'callback=?';
	a=uri.concat(host,graph_id,params);
	$.ajax({	
		url: uri.concat(host,graph_id,params),
		dataType: 'jsonp',
		type: 'GET',
		cache: false,
		jsonp: 'handle_data',
		crossDomain:true,
		async: false,
		success: function( pass ) {
		
							         response11=pass;
							         var graphsValues= '';
							          // console.log(response11);
							        
									make_graph_obj(response11,attributeList,filterList,hash_obj);
					
										set_data_of_series_normal(hash_obj,-1,null);
									// else if(graph_type=="trend")
									// 	set_data_of_series_trends(hash_obj,-1,"listDailyAttributeStatisticValues",7);
									// // set_date("listCountPPl_7Days");
							         
			    			}	
						});
						  
					}
function make_graph_obj(data,name,index)
	{

					console.log("in make graph");
					console.log(name+":"+index);
					console.log(data);

						attributeList=graph_list[index]["attributeList"];
						if (hash_obj.hasOwnProperty(name))
							{console.log("second time for "+name); return;}
						else
							// hash_obj= new Object()
							hash_obj[name]={};
						console.log(hash_obj);
						hash_obj[name]["filterList"]={}
						hash_obj[name]["filterList"]=graph_list[index]["filterList"];
						for(var i=0;i< attributeList.length;i++)
						{						  
						var attr_id=attributeList[i]["attributeId"];
						hash_obj[name][attr_id]={};
						hash_obj[name][attr_id]["name"]=attributeList[i]["attributeString"];
						hash_obj[name][attr_id]["parent_id"]=attributeList[i]["parentId"];
						hash_obj[name][attr_id]["type"]=attributeList[i]["type"];							
						}
						
						for(var i=0;i<data.length;i++){	
							attr_id= data[i]["attributeId"];
							hash_obj[name][attr_id]["listDailyAttributeStatisticValues"]=data[i]["listDailyAttributeStatisticValues"];
							hash_obj[name][attr_id]["listCountPPl"]=data[i]["listCountPPl"];
						
						}

						console.log(hash_obj);
						 				
	}		
					
function set_data_of_series_normal(hash_obj,parent_id,days,graph_name)
{
						console.log("in series");
						var category_ids=[];
						options_overview.xAxis.categories=[];
						series_data=[];
						var series_name_array=["POOR","AVG","GOOD"];
						// var color_array=[];
						var color_array=['#FF7400','#FFCE00','#00B233']
						var child_found=-1;
						for(var i=0;i<series_name_array.length;i++)
						{
							var temp={data:[],
							showInLegend:true,
							name: series_name_array[i],
							color: color_array[i],
							point:{events: { 'click': function(e) { makeSubGraph(graph_name,"overview",this.category); } }}
                   			 	}
							series_data.push(temp);							
						}

						for(attr_id in hash_obj){
							
							if(hash_obj[attr_id]["parent_id"]==parent_id ){
								child_found=1;
								// set_graph_level(parent_id);								
								handle_normal_graph(hash_obj,attr_id);
								options_overview.xAxis.categories.push(hash_obj[attr_id]["name"]);
								category_ids.push(parseInt(attr_id));  	
						  }
						}
						console.log(category_ids);
						if(category_ids.length!=0)
						{
							set_chartseries_data_normal(category_ids,hash_obj);
							options_overview.chart.renderTo=graph_name+"_graph";
							make_chart(options_overview);
						}
						
						
}

					

function set_chartseries_data_normal(category_ids,hash_obj)
{
	console.log(category_ids);
	console.log(series_data);
	console.log(hash_obj);
	for (var id in category_ids)
	{
		for(var i in series_data)
		{
			console.log(hash_obj[category_ids[id]]["count_of_ppl"][i]);
			series_data[i]["data"].push(hash_obj[category_ids[id]]["count_of_ppl"][i]);
		}
	}
	options_overview.series=series_data;
}

function set_data_of_series_trends(hash_obj,parent_id,period,days,graph_name)
	{
		console.log("in set data of series trends");
		var child_found=-1;
		var category_ids=[];
		options_trends.xAxis.categories=[];
		options_trends.renderTo="trends_graph";
		series_data=[];
						
		var series_name_array=[];
		var start;
		var someFormattedDate;
		var date = new Date();
		date.setDate(date.getDate() - days );
	  	for (var i = 0; i < days; i++) {
		  	var dd = date.getDate();
	  		var mm = date.getMonth()+1;
	  		var dy = date.getDay(); 
	    	someFormattedDate = dd + ' '+ month[mm-1] 
			options_trends.xAxis.categories.push(someFormattedDate);
			series_name_array.push(((date.getFullYear()*100)+mm)*100+dd);  
	    	date.setDate(date.getDate() +1 );  
		  }
		  
					
		for(attr_id in hash_obj)
		{
			if(hash_obj[attr_id]["parent_id"]==parent_id ){
				child_found=1;
								// set_graph_level(parent_id);
				var temp={data:[],
					showInLegend:true,
					name: hash_obj[attr_id]["name"],
					point:{events: { 'click': function(e) {console.log("when clicked trends");console.log(this.series.name);makeSubGraph(graph_name,"trends",this.series.name); } }}
                   		}
				series_data.push(temp);
				handle_trend_graph(hash_obj,attr_id,period,days);
				category_ids.push(parseInt(attr_id));						
			}
							  	
		}
						
						
		if(category_ids.length!=0)
		{
			set_chartseries_data_trends(category_ids,hash_obj,series_name_array,"");
			console.log(options_trends);
			options_trends.chart.renderTo=graph_name+"_graph";
			make_chart(options_trends);
		}
						
	}

function handle_normal_graph(hash_obj,attr_id)
{
	console.log("in handle");
	var a=0,b=0,c=0;
	if(hash_obj[attr_id]["type"]=="weighted")
								{
										if(hash_obj[attr_id]["listCountPPl"]!=null)
										{
										 a+=hash_obj[attr_id]["listCountPPl"][0]+hash_obj[attr_id]["listCountPPl"][1];
										 b+=hash_obj[attr_id]["listCountPPl"][2];
										 c+=hash_obj[attr_id]["listCountPPl"][3]+hash_obj[attr_id]["listCountPPl"][4];
										}
								 hash_obj[attr_id]["count_of_ppl"]=[a,b,c];

						  		}

}

function handle_trend_graph(hash_obj,attr_id,period,days)
	{
		console.log("handle trends starts");
		var a=0;var b=0;var c=0;var n=0;var avg=0;
		var start;
					
		start=0;

		for(start;start<days;start++)
		{
			if(hash_obj[attr_id]["type"]=="weighted")
			{
				if (hash_obj[attr_id][period]!=null && hash_obj[attr_id][period][start]!==undefined)
				{
					var d = hash_obj[attr_id][period][start]["date"];
					console.log(d);
					hash_obj[attr_id][d]= {} ;
					for(var i =1; i<=hash_obj[attr_id][period][start]["listCountPPL"].length;i++)
					{
						if (hash_obj[attr_id][period][start]["listCountPPL"]!== null)
						{
							a+=(i*(hash_obj[attr_id][period][start]["listCountPPL"][i-1]));
							n+=hash_obj[attr_id][period][start]["listCountPPL"][i-1];
						}						     // console.log(a);
						hash_obj[attr_id][hash_obj[attr_id][period][start]["date"]]["count_of_ppl"]={};
						if (n!=0)
							hash_obj[attr_id][hash_obj[attr_id][period][start]["date"]]["count_of_ppl"]= parseInt(a/n) ;
						else
							hash_obj[attr_id][hash_obj[attr_id][period][start]["date"]]["count_of_ppl"]=0;
					}								
													
					a=0;n=0;
				}
			}
		}

	}

function set_chartseries_data_trends(category_ids,hash_obj,series_name_array,subgraph_name)
{
	console.log("in set data trends");
	console.log(series_name_array);
	for(var j=0 ;j< series_name_array.length;j++)
	{
		for (var id=0; id<category_ids.length;id++)
		{
			// console.log("in charts---");
			// console.log(hash_obj["adv_trends"][category_ids[id]][series_name_array[j]]);
			if (hash_obj[category_ids[id]][series_name_array[j]]!==undefined)
				series_data[id]["data"].push(hash_obj[category_ids[id]][series_name_array[j]]["count_of_ppl"]);
			else
				series_data[id]["data"].push(0);
		}
	}
	options_trends.series=series_data;
	console.log(options_trends);
	console.log(options_trends.series);
}
					
function make_chart(options)
{
	console.log("in make chart");
	console.log(options.chart.renderTo);
	chart = new Highcharts.Chart(options);
}

function populate_summary(options)
{
	var tbl=document.getElementById("summay_table");
	var row='<tr><th class="cell_with_border">'+'Summmary'+'</th>';
	for(var i in options.xAxis.categories)
		row+='<th class="cell_with_border">'+ options.xAxis.categories[i]+'</th>';
		row+='</tr>';
		for(var data in options.series)
		{
			row+='<tr><td class="cell_with_border">'+options.series[data]["name"]+'</td>';
			for(var i in options.series[data]["data"])
				row+='<td>'+options.series[data]["data"][i]+'</td>';
				row+='</tr>';
		}
		tbl.html=row;
							
}

function populateDefaultDates(graph_name,graph_type) {
    var to_date = new Date();
    var start_date=(to_date.getFullYear()*100+(to_date.getMonth()+1))*100+(to_date.getDate()-7);
	var end_date=(to_date.getFullYear()*100+(to_date.getMonth()+1))*100+to_date.getDate();
	
	var tble=document.getElementById(graph_name+"_basic_filters");
	var td = document.getElementById(graph_name+"_start_date");
	$("#"+graph_name+"_start_date").val($.datepicker.formatDate('yy-mm-dd', new Date()));

}


function populate_filter(filterList)
{						// console.log(filterList);
	a = [{"a" : 1}]
	filterList = [{"type":"non-weighted","attributeString":"sex","parentId": -1,"attributeId":3,"attributeValues":[{"name":"male","value":1,"maxValue":-1},{"name":"female","value":2,"maxValue":-1}]},
					{"type":"non-weighted","attributeString":"branch","parentId":-1,"attributeId":3,"attributeValues":[{"name":"a","value":1,"maxValue":-1},{"name":"b","value":2,"maxValue":-1},{"name":"c","value":1,"maxValue":-1}]},
					{"type":"non-weighted","attributeString":"city","parentId":-1,"attributeId":3,"attributeValues":[{"name":"male","a1":1,"maxValue":-1},{"name":"b1","value":2,"maxValue":-1}]}];
	var row = document.getElementById("filter_row");
	var filters='';

	for(var i in filterList)
	{
		filters+='<td><a class="filter_dropdown_style">'+filterList[i]["attributeString"]+'</a><ul class="filter_dropdown_list" style="visibility: hidden;"> ';
		for(var j in filterList[i]["attributeValues"])
		{
			filters+='<li class="filter_list_elements"><input type="checkbox" class="filter_list_input" name='+filterList[i]["attributeString"]+' id='+filterList[i]["attributeValues"][j]["name"]+'>&nbsp;&nbsp;'+filterList[i]["attributeValues"][j]["name"]+'</input></li>';
		}
		filters+='<li class="filter_list_elements" ><a style="font-size: 11px; color: blue; float: right;"> clear </a></li></ul></td>';
		var x = row.insertCell(-1);
		x.html=filters;
		filters='';
	}
						
	$('body').on('mouseover','a.filter_list_input',function(){
		if(document.getElementById(this.id).className === "filter_list_input")
		{
			this.style.backgroundColor = "red";
		}
	});
	$('a.filter_list_input').live('mouseout',function(){
		this.style.backgroundColor = "black";
	});
				
}

function load_employee_performance()
{
	document.getElementById("adjustment_div").style.height="77%";
var adv_overview_div='';
	var adv_trends_div='';
	var overview_basic_filters;
	var trends_basic_filters;
    var adv_stats_elements =[{"name":"epr:Employee Performance Result", "type":"overview"},{"name":"epr:Employee Performance Trend", "type":"trends"}];
    console.log("in adv stats load");
    var advance_stats_div='';
    for(var i=0 ;i< adv_stats_elements.length;i++)
		{
			var graph_name_temp= adv_stats_elements[i]["name"];
			graph_name_temp=graph_name_temp.replace(/\s+/g, '-');
			var temp = set_current_elements(graph_name_temp,adv_stats_elements[i]["type"]);
			advance_stats_div+=temp;
			    
		}// document.getElementById("activeDiv").className="advance_stats";
	$('.main_data').html(advance_stats_div);
	
	for(var i=0 ;i<adv_stats_elements.length ;i++)
		{
			console.log("while seeting fileter");

			var temp = find_index_of(adv_stats_elements[i]["name"]);
			var graph_name_temp= adv_stats_elements[i]["name"];

			graph_name_temp=graph_name_temp.replace(/\s+/g, '-');
			console.log(adv_stats_elements[i]["name"]+temp);
			set_filter(graph_name_temp,graph_list[temp]["filterList"]);
			populateDefaultDates(graph_name_temp,adv_stats_elements[i]["type"]);
			if (adv_stats_elements[i]["type"]=="overview")
			{
				load_overview(temp,graph_list[temp]["graphId"],adv_stats_elements[i]["name"].replace(/\s+/g, '-'));		    
			}
			else
			{
				load_trends(temp,graph_list[temp]["graphId"],adv_stats_elements[i]["name"].replace(/\s+/g, '-'),30);
			}
		}


				$('body').on('click','.label',function (){

						var params_index= get_params_index(this.id,response);
					    applyFilter=[];
					    graph_type=response[params_index]["type"];
					    set_graph_level(-1);
					    graph_name=response[params_index]["name"];
						collect_stats_populate_graph(this.id,response[params_index]["attributeList"],response[params_index]["filterList"],applyFilter);

				});


}

$(document).on('change', 'select', function () {
    					// alert(this.value);
});


					$('body').on('click','.filter_list_elements',function(){


					});

					function get_params_index(id,response)
					{
						for(var i=0;i<response.length;i++)
							{
								
								if (response[i]["graphId"]==id){return i;}

							}
							
							return -1;

					}

					function addFilter(id,name)
					{
						var element = document.getElementById(value);
						if(typeof (element) != undefined && element != null && typeof (element) != 'undefined')
						{
							element.name=name;
							element.parentNode.html=name+'<a class="display_filters_graph" id='+value+' name='+name+' >x</a>';
						}
						else
						{
							var filter='<span class="timeline">'+name+'<a class="display_filters_graph" id='+value+' name='+name+' >x</a></span>'
							$('div#display_filters').append(filter);
						}
					}
					
function makeSubGraph(graph_name,graph_type,whose_subgraph)
{
	console.log("in make subgraph");
	console.log(whose_subgraph);
	var current_id;
	for(id in hash_obj[graph_name])
	{
		 
		if(hash_obj[graph_name][id]["name"]==whose_subgraph){
			console.log("got something");
		parent_id=id;
		current_id=hash_obj[graph_name][id]["parent_id"];
		}
	}
						 console.log(parent_id);

	setQuickLink(graph_name,whose_subgraph,current_id);
	if (graph_type=="overview")
		set_data_of_series_normal(hash_obj[graph_name],parent_id,"listCountPPl_7Days",graph_name);
	else
		set_data_of_series_trends(hash_obj[graph_name],parent_id,"listDailyAttributeStatisticValues",30,graph_name);						
}

			
function set_chart_type()
{
	if (graph_type=='normal')
	{
		options.chart.type='column'; 
		var series_names=["POOR","AVG","GOOD"];
	}
	else if (graph_type=='trend')
	{
		options.chart.type='line'; 
	}
}

function set_chart_name()
{
	options.title.text='';
}

function set_chart_xaxis(xaxis_category,parent_id,attr_id)
{
	var node= document.getElementById("container_graph");
	var child = node.firstChild;
	var id_name= child.id;
	if(parent_id==parseInt(id_name.split("_")[2])-1)
	{options.xAxis.categories.push(xaxis_category);rendered_attr_id.push(attr_id);}
}	

function find_in_array(array,value)
{
	for(var i=0;i<array.length;i++)
	{
		if(value==array[i])
			return true;
	}
	return false;
}


function set_date(period)
{
	var to = new Date();
	//var dateOffset = (24*60*60) * 7;
	var from = new Date();
	var ndays=-1;
	if(period=="listCountPPl_7Days"){ ndays=7;}
	else if(period=="listCountPPl_30Days") {ndays=30;}
	else if(period=="listCountPPl_365Days") {ndays=365;}
	from = new Date(from.setDate(to.getDate()-ndays));
	var from_to = "FROM : " + from.toDateString() + "  TO : "+ to.toDateString();
	document.getElementById("period").html= from_to;
}

function setFilter(applyFilter)
{						
	var element= document.getElementById("display_filters");
	var filters= element.getElementsByTagName('a');
	for(var i=0;i < filters.length;i++)
	{
		applyFilter.push(filters[i].id,filters[i].name);
	}						
}

function setQuickLink(graph_name,whose_subgraph,parent_id)
{
	console.log("in quick links");
	console.log(parent_id);
	console.log(graph_name);
	var active_graph_level=document.getElementById(graph_name+"_quick_links").lastChild;
	console.log(active_graph_level);

	var active_div=active_graph_level.id.split("_");
	console.log(parseInt(active_div[active_div.length-1]));
	if(parseInt(active_div[active_div.length-1]) < parent_id)
	{
		 $(document.getElementById(graph_name+"_quick_links")).append('<a class="back_link" id='+graph_name+"_"+whose_subgraph+"_"+parent_id+'>'+" > "+whose_subgraph+'</a>');
		 // document.getElementById(graph_name+"_quick_links").append('<a>Home</a>');

	}
	else if (parseInt(active_div[active_div.length-1])==parent_id)
	{

		document.getElementById(graph_name+"_quick_links").lastChild.innerHTML = " > "+whose_subgraph;
	}
	else
		console.log("wrong click");
}

function set_filter(graph_name,filterList)
{
console.log("in set filetr");
var row = document.getElementById(graph_name+"_filter_row");
console.log(filterList);
  var filters='';

						for(var i in filterList)
						{
							filters+='<td><a class="filter_dropdown_style">'+filterList[i]["attributeString"]+'</a><ul class="filter_dropdown_list" style="visibility: hidden;"> ';
							for(var j in filterList[i]["attributeValues"])
								{
									filters+='<li class="filter_list_elements"><input type="checkbox" class="filter_list_input" name='+graph_name+"_"+filterList[i]["attributeString"].replace(/\s+/g, '_')+' id='+filterList[i]["attributeValues"][j]["name"]+'>&nbsp;&nbsp;'+filterList[i]["attributeValues"][j]["name"]+'</input></li>';
								}
							filters+='<li class="filter_list_elements last_row" ><a class="dynamic_filter" style="font-size: 11px; color: blue; float: right; margin-right: 2px; padding-top: 3px;" id='+graph_name+"_"+filterList[i]["attributeString"].replace(/\s+/g, '_')+"_clear"+'> clear </a>';
							filters+='<a class="dynamic_filter" style="font-size: 11px; color: blue; float: left; margin-left: 2px;padding-top: 3px;" id='+graph_name+"_"+filterList[i]["attributeString"].replace(/\s+/g, '_')+"_all"+'> all </a></li></ul></td>';
							var x = row.insertCell(-1);
							x.innerHTML=filters;
							filters='';
						}

}

function set_branch_filter(graph_type, branchesList)
{
var row = document.getElementById("overview_basic_filters");
console.log("ins et brnach");
console.log(row);
var filters='';
filters+='<ul class="filter_dropdown_list" style="visibility: hidden;"> ';
for(var i in branchesList)
{
	
	filters+='<li class="filter_list_elements"><input type="checkbox" class="filter_list_input" name='+graph_type+"_"+branchesList[i]["name"]+' id='+branchesList[i]["name"]+'>&nbsp;&nbsp;'+filterList[i]["attributeValues"][j]["name"]+'</input></li>';
}

filters+='<li class="filter_list_elements" ><a class="dynamic_filter" style="font-size: 11px; color: blue; float: right; margin-right: 2px; padding-top: 3px;" id='+graph_type+"-"+"branches"+"-clear"+'> clear </a>';
filters+='<a class="dynamic_filter" style="font-size: 11px; color: blue; float: left; margin-left: 2px;padding-top: 3px;" id='+graph_type+"-"+"branches"+"-all"+'> all </a></li></ul>';
// row.innerHTML(filters);



}
function updateFilter(filter_name)
{
	for(var i=0;i<applyFilter.length;i=i+2)
	{
		if(applyFilter[i]==filter_name)
			applyFilter.splice(i,2);				
	}
}


					
					

					$('body').on('click','a.display_filters_graph',function(){
						var current_node=this.parentNode;
						var parent_node=current_node.parentNode;
						parent_node.removeChild(current_node);
						updateFilter(current_node.getElementsByTagName('a')[0].id);
						make_graph_with_filters();						
					})
					$('body').on('click','.timeline',function(){
						elements = document.getElementsByClassName('timeline');
						    for (var i = 0; i < elements.length; i++) {
						        elements[i].style.backgroundColor="black";
						    }
						this.style.backgroundColor="#c4c71c";
						if(graph_type=="normal")
						{
						if(this.id=="week"){set_data_of_series_normal(hash_obj,-1,"listCountPPl_7Days",null);set_date("listCountPPl_7Days");}
						else if(this.id=="month"){set_data_of_series_normal(hash_obj,-1,"listCountPPl_30Days",null);set_date("listCountPPl_30Days");}
						else if(this.id=="year"){set_data_of_series_normal(hash_obj,-1,"listCountPPl_365Days",null);set_date("listCountPPl_365Days");}
						}
						else if(graph_type=="trend")
						{
						if(this.id=="week"){set_data_of_series_trends(hash_obj,-1,"listDailyAttributeStatisticValues",7);set_date("listCountPPl_7Days");}
						else if(this.id=="month"){set_data_of_series_trends(hash_obj,-1,"listDailyAttributeStatisticValues",30);set_date("listCountPPl_30Days");}
						else if(this.id=="year"){set_data_of_series_trends(hash_obj,-1,"listMonthlyAttributeLevelStatisticValues",365);set_date("listCountPPl_365Days");}
						}
						
					});

					$('body').on('click', 'a.dashboard_heading',function(){
						elements = document.getElementsByClassName('dashboard_heading');
						    for (var i = 0; i < elements.length; i++) {
						        elements[i].style.backgroundColor="#CCCCCC";
						        elements[i].style.borderBottom="";
						    }
						    this.style.backgroundColor="black";

						    this.style.marginBottom ="5px" ;
						    this.style.borderBottom ="solid 5px #66ccff";
						    dashboard_details(this.id);
					});

					$('body').on('click','a#dashboard_close',function(){
						if (this.innerHTML=='hide')
						{
						document.getElementById('dashboard').style.display="none";
						document.getElementsByClassName('opaque')[0].style.height='90px';
						this.innerHTML='show';
						}
						else if(this.innerHTML='show'){
							document.getElementsByClassName('opaque')[0].style.height='400px';
						document.getElementById('dashboard').style.display="block";
						this.innerHTML='hide';
						}
					});

					$('body').on('click', 'a.marketing',function(){
						var offers='';
						header_navigation(this.className);
						// console.log("in offers");
						show_offers(offers);
					});


					function show_offers(offers){
						var rows='<form><p class="followup_title">Offers</p><button class="marketing_btn" id="mrktng_add_offer" type="button">Add New Offer</button><button type="button" id="mrktng_add_submit" class="marketing_btn">Submit</button>'
						rows+='<table class="marketing_offers">';
						rows+='<tr>'
						rows+='<th><input type="checkbox">&nbsp;Select All</input></th>';
						rows+='<th>Category</th>';
						rows+='<th>Offer Details</th>';
						rows+='<th>Start Date/Time</th>';
						rows+='<th>End Date/Time</th>';
						rows+='<th>Recurrence</th>';
						rows+='<th>Disable</th>';
						rows+='</tr>';
							var host = 'http://localhost:8080/feedback-review';
				var graph_c = '/company';
				var company_id = '/1';
				var params ='/offersAndInfo?callback=?'
				var uri='';
						var offers_res = $.ajax({
					  url: uri.concat(host,graph_c,company_id,"/offersAndInfo?callback=?"),
			          dataType: 'jsonp',
			          type: 'GET',
			          cache: false,
			          jsonp: 'handle_data',
			          crossDomain:true,
			          async:false,
					  success: function(response){
					  	offersRes=response;
					  	for(var i in offersRes){
					  		// console.log(offersRes[i]);
							rows+='<tr>'
							rows+='<td class="offers_row"><input type="checkbox">&nbsp;&nbsp;Select</input></td>';
							rows+='<td class="offers_row">'+offersRes[i]["type"]+'</td>';
							rows+='<td class="offers_row">'+offersRes[i]["details"]+'</td>';
							rows+='<td class="offers_row"><input id="demo1" type="text" size="25"><a href="javascript:NewCal('+"demo1"+","+"ddmmyyyy"+","+'true'+","+24+')"><img src="images/cal.gif" width="16" height="16" border="0" alt="Pick a date"></a>'+offersRes[i]["start"]+'</td>';
							rows+='<td class="offers_row">'+offersRes[i]["end"]+'</td>';
							rows+='<td class="offers_row">'+offersRes[i]["recurrence"]+'</td>';
							rows+='<td class="offers_row"><img></img></textarea></td>';
							rows+='</tr>';
						}
						rows+='</table>';
						$('div#body_table').html(rows);
					  	// console.log(response);
					  }
				});
						
						

					}

					$('body').on('click', '#mrktng_add_offer',function(){
						rows='';
						rows+='<tr>'
							rows+='<td class="offers_row"><input type="checkbox">&nbsp;&nbsp;Select</input></td>';
							rows+='<td class="offers_row">'+'type'+'</td>';
							rows+='<td class="offers_row">'+'details'+'</td>';
							rows+='<td class="offers_row">'+'start'+'</td>';
							rows+='<td class="offers_row">'+'end'+'</td>';
							rows+='<td class="offers_row">'+'recurrence'+'</td>';
							rows+='<td class="offers_row"><img></img></textarea></td>';
							rows+='</tr>';

							$('.marketing_offers tr').last().after(rows);

					});

					$('body').on('click','a.profile', function(){
						// console.log("in profile");
						header_navigation(this.className);
						show_questions(response);	
					});

					$('body').on('click', 'a.followup',function(){
						// console.log(active_div);
						header_navigation(this.className);
						// console.log("in followup");
						var rows='<p class="followup_title">Negative Followup</p><form><button class="profile_btn" type="button">Followup Email-id</button><button type="button" class="profile_btn">Branch - 5</button>'
						rows+='<table class="followup">';
						rows+='<tr>'
						rows+='<th>Name</th>';
						rows+='<th>Email-id/contact no.</th>';
						rows+='<th>Rating</th>';
						rows+='<th>Comment</th>';
						rows+='<th>Status</th>';
						rows+='<th>Customer response</th>';
						rows+='<th>Action taken</th>';
						rows+='</tr>';

						followupRes = [{"Name":"abc","email":"mayaj@gmail.com","contact": 1234567,"rating":[{"food":2,"service":2,"ambience":2}],"comment":"service was good", "status" : "pending", "customer_response" : "abcdefg", "action_taken" : "done from our side"},
										{"Name":"xyz","email":"indravadhanj@gmail.com","contact": 1234567,"rating":[{"food":2,"service":2,"ambience":2}],"comment":"service was good", "status" : "pending", "customer_response" : "abcdefg", "action_taken" : "done from our side"},
										{"Name":"pqr","email":"rosheshj@gmail.com","contact": 1234567,"rating":[{"food":2,"service":2,"ambience":2}],"comment":"service was good", "status" : "pending", "customer_response" : "abcdefg", "action_taken" : "done from our side"},
										{"Name":"lmn","email":"monishaj@gmail.com","contact": 1234567,"rating":[{"food":2,"service":2,"ambience":2}],"comment":"service was good", "status" : "pending", "customer_response" : "abcdefg", "action_taken" : "done from our side"},
										{"Name":"ooo","email":"sahilj@gmail.com","contact": 1234567,"rating":[{"food":2,"service":2,"ambience":2}],"comment":"service was good", "status" : "pending", "customer_response" : "abcdefg", "action_taken" : "done from our side"}];
						;
						for(var i in followupRes){
							rows+='<tr>'
							rows+='<td class="profile_row">'+followupRes[i]["Name"]+'</td>';
							rows+='<td class="profile_row">'+followupRes[i]["email"]+'</td>';
							rows+='<td class="profile_row">'+followupRes[i]["rating"]+'</td>';
							rows+='<td class="profile_row">'+followupRes[i]["comment"]+'</td>';
							rows+='<td class="profile_row">'+followupRes[i]["status"]+'</td>';
							rows+='<td class="profile_row"><textarea>'+followupRes[i]["customer_response"]+'</textarea></td>';
							rows+='<td class="profile_row"><textarea>'+followupRes[i]["action_taken"]+'</textarea></td>';
							rows+='</tr>';
						}

						rows+='</table></form>';
						rows+='<div class="more_followup"> Load more followups</div>';
						$('div#body_table').html(rows);


						
					});

					$('body').on('click','a.analysis', function(){
						// console.log("in analysis");
						header_navigation(this.className);
						// console.log(active_div);
						var rows='<p class="followup_title">Analysis Results</p><form><button class="profile_btn" type="button">Month</button><button type="button" class="profile_btn">Branch - 5</button>'
						rows+='<table class="followup">';
						rows+='<tr>'
						rows+='<td class="analysis_head">Service</td>';
						rows+='<td class="analysis_comment">Between 7pm to 9 pm cuastomers say service is bad</td>';
						rows+='</tr>';

						rows+='<tr>'
						rows+='<td class="analysis_head">Offer</td>';
						rows+='<td class="analysis_comment">Between 11am to  1pm on weekdays 40% of your customer using buffet say food is good</td>';
						rows+='</tr>';

						rows+='<tr>'
						rows+='<td class="analysis_head">Food</td>';
						rows+='<td class="analysis_comment">Week1- 60% people think starters are below average</td>';
						rows+='</tr>';

						rows+='<tr>'
						rows+='<td class="analysis_head">NPS</td>';
						rows+='<td class="analysis_comment">Compared to last month NPS has dropped by 4%</td>';
						rows+='</tr>';
						
						rows+='</table>';
						rows+='<div class="more_followup"> Load more followups</div>';
						$('div#body_table').html(rows);
					});

					function header_navigation(current_div)
					{
						document.getElementsByClassName(active_div)[0].style.backgroundColor="#66ccff";
						document.getElementsByClassName(active_div)[0].style.color='';
						active_div=current_div;
						document.getElementsByClassName(active_div)[0].style.backgroundColor='white';
						document.getElementsByClassName(active_div)[0].style.color="#66ccff";
					}


					function show_questions(questions_list){
						var host = 'http://localhost:8080/feedback-review';
				 // host = 'http://192.168.1.101:8080/feedback-review';
						var graph_c = '/company';
						var company_id = '/1';
						var params ='/questions?callback=?'
						var uri='';
			

					$.ajax({
					          url: uri.concat(host,graph_c,company_id,params),
					          dataType: 'jsonp',
					          type: 'GET',
					          cache: false,
					          jsonp: 'handle_data',
					          crossDomain:true,
					          async:false,			        
					          success: function( response ) {
					          		console.dir(response);					    
						          			       
		    			
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
					$('div#body_table').append(rows);	

					}
							});			


				}

				$('li.sibling').hover(function() {
  $(this).addClass("blue");}
  , function() {
  $(this).removeClass("blue");
});