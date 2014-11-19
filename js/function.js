var chart,graph_id,graph_type,left_pane;
var overview_index=-1;
var rendered_attr_id=[];
var series_data=[];
var graph_type;
 var hash_obj={};
 var response;
 var applyFilter=[];
 response_d={}
 var active_div="statistics"
	var options = {
					chart: {
						type: 'column',
						renderTo:'main_data_td',
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

var month = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
var dow = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun" ]
$(document).ready(function() {
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
	console.log("id is *** "+this.id);
	switch(this.id)
	{
		case "gen_stats":load_general_statistics();break;
		case "adv_stats": load_advance_statistics();break;
		case "emp_perf": load_employee_performance();break;
		case "comment": load_comments();break;
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
var slider_values = '<div><table id="slider_values" class="dashboard_inside_tables"><tr><th>Net Promoter Score</th><th>No of Feedbacks</th><th>Average Rating</th></tr><tr><td id="slider_day_nps"></td><td id="slider_day_feedbacks"></td><td id="slider_day_avg_rating" class="rating"></td></tr></table></div>';
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

function load_general_statistics()
{
	
// var filters = '<div id="gen_stats_filter"><div id=slider> <table><tr><td id="gen_stats_branch"><input></input></td><td id="gen_stats_start"><input></input><td id="gen_stats_end"><input></td></table></div>';
var filters='<table id="basic_filters"><tr><td id="branch">Branch id<input></input></td>';
filters+='<td id="from_date_filter"> <p>Start Date: <input type="text" class="datepicker"></p></td>';
filters+='<td id="to_date_filter">End date<input id="end_date" class="datepicker" /></td></tr></table>';

$('.main_data').html(filters);	

}

function load_advance_statistics(){
	var host = 'https://bizviewz.com:8080/feedback-review';
				var graph_c = '/company';
				var company_id = '/1';
				var params ='/graphs?callback=?'
				var uri='';
				var response1= $.ajax({
			          url: uri.concat(host,graph_c,company_id,params),
			          dataType: 'jsonp',
			          type: 'GET',
			          cache: false,
			          jsonp: 'handle_data',
			          crossDomain:true,
			          async:false,
			          success: function( response_g ) {
						response=response_g;
					    // renderLayout(response);
					    console.log(response);
				        overview_graph = response[0];
				        graph_id=overview_graph["graphId"];
				        graph_type=overview_graph["type"];
				        attributeList= overview_graph["attributeList"];
				        filterList=overview_graph["filterList"];
				        console.log(filterList);
				        graph_name=overview_graph["name"]
				        set_graph_level(-1);
						$("div#quick_links").append(' > <a class="back_link" id="-2" href="index_new.php" >overview</a>');
				        plot_graph(response[0]);
    			}	
			});
				$('a.filter_list_input').live('click',function (){
								addFilter(this.id,this.name);
								make_graph_with_filters();
					});

				$('.label').live('click',function (){

						var params_index= get_params_index(this.id,response);
					    applyFilter=[];
					    console.dir(params_index);
					    graph_type=response[params_index]["type"];
					    set_graph_level(-1);
					    graph_name=response[params_index]["name"];
						collect_stats_populate_graph(this.id,response[params_index]["attributeList"],response[params_index]["filterList"],applyFilter);

				});

}

function make_graph_with_filters(){
				applyFilter=[];
				var param=(document.getElementsByName("id_identify_div")[0].id).split("_")[1];								
				var params_index= get_params_index(param,response);								
				setFilter(applyFilter);
				collect_stats_populate_graph(param,response[params_index]["attributeList"],response[params_index]["filterList"],applyFilter);

			}
			
			function plot_graph(main_graph)
			{
				// populate_filter(main_graph["filterList"]);
				collect_stats_populate_graph(main_graph["graphId"],main_graph["attributeList"],main_graph["filterList"],applyFilter);

			}

			function set_graph_level(parent)
			{
				var container_parentid='';
				var container_graphid='';
				// document.getElementsByName("level_identify_div")[0].id=container_parentid.concat(graph_name,'_level_',parent);
				// document.getElementsByName("id_identify_div")[0].id=container_graphid.concat(graph_name+"_"+graph_id);
			}
		    
			function collect_stats_populate_graph(graph_id,attributeList,filterList,applyFilter)
					{						
						options.xAxis.categories=[];
						set_chart_type();
						
						var host = 'http://localhost:8080/feedback-review/company/1/graph/';
						var uri='';
						graphsValues={};
					 	var response11;
					 	filters_g='';
					 	// console.log("in stats"+applyFilter);
					 	for(var i=0;i< applyFilter.length;i++)
					 	{
					 		filters_g+=applyFilter[i]+"="+applyFilter[i+1]+"&";
					 		i++;
					 	}
					
						params='/statistics?'+filters_g+'callback=?'
						$.ajax({
						          url: uri.concat(host,graph_id,params),
						          dataType: 'jsonp',
						          type: 'GET',
						          cache: false,
						          jsonp: 'handle_data',
						          crossDomain:true,
						          async: false,
						          
						          success: function( pass ) {
							        // console.log("query to  graph id "+ graph_id+" : ");
							         response11=pass;
							         var graphsValues= '';
							          // console.log(response11);
							        
									make_graph_obj(response11,attributeList,filterList,hash_obj);
									if(graph_type=="normal")
										set_data_of_series_normal(hash_obj,-1,"listCountPPl_7Days",null);
									else if(graph_type=="trend")
										set_data_of_series_trends(hash_obj,-1,"listDailyAttributeStatisticValues",7);
									// set_date("listCountPPl_7Days");
							         
			    			}	
						});
						  
					}
			function make_graph_obj(uff,attributeList,filterList,hash_obj)
					{
						
						for(var i=0;i< attributeList.length;i++)
						{						  
						var attr_id=attributeList[i]["attributeId"];
						hash_obj[attr_id]=new Object();
						hash_obj[attr_id].name=attributeList[i]["attributeString"];
						hash_obj[attr_id]["parent_id"]=attributeList[i]["parentId"];
						hash_obj[attr_id]["type"]=attributeList[i]["type"];							
						}
						
						for(var i=0;i<uff.length;i++){	
							attr_id= uff[i]["attributeId"];
							hash_obj[attr_id]["listCountPPl_7Days"]=uff[i]["listCountPPl_7Days"];
							hash_obj[attr_id]["listCountPPl_30Days"]=uff[i]["listCountPPl_30Days"];
							hash_obj[attr_id]["listCountPPl_365Days"]=uff[i]["listCountPPl_365Days"];
							hash_obj[attr_id]["listDailyAttributeStatisticValues"]=uff[i]["listDailyAttributeStatisticValues"];
							hash_obj[attr_id]["listMonthlyAttributeLevelStatisticValues"]=uff[i]["listMonthlyAttributeLevelStatisticValues"];
						}
						 				
					}		
					
					function set_data_of_series_normal(hash_obj,parent_id,period,days)
					{
						
						var category_ids=[];
						options.xAxis.categories=[];
						series_data=[];
						var series_name_array=["POOR","AVG","GOOD"];
						// var color_array=[];
						var color_array=['#00B233','#FF7400','#FFCE00'];
						var child_found=-1;
						for(var i=0;i<series_name_array.length;i++)
						{
							var temp={data:[],
							showInLegend:true,
							name: series_name_array[i],
							color: color_array[i],
							point:{events: { 'click': function(e) {  makeSubGraph(this.category); } }}
                   			 	}
							series_data.push(temp);							
						}

						for(attr_id in hash_obj){
							
							if(hash_obj[attr_id]["parent_id"]==parent_id ){
								child_found=1;
								set_graph_level(parent_id);								
								handle_normal_graph(hash_obj,attr_id,period);
								options.xAxis.categories.push(hash_obj[attr_id]["name"]);
								category_ids.push(parseInt(attr_id));  	
						  }
						}
						// console.log(category_ids);
						if(category_ids.length!=0)
						{
						if(graph_type=="normal")	
							set_chartseries_data_normal(category_ids,hash_obj);
					    else
					    	set_chartseries_data_trends(category_ids,hash_obj,series_name_array);
						make_chart(options);
					}
						
						
					}

					function set_chartseries_data_normal(category_ids,hash_obj){
						
						for (var id in category_ids)
						{
							
							for(var i in series_data)
							{
								series_data[i]["data"].push(hash_obj[category_ids[id]]["count_of_ppl"][i]);
							}
						}
						options.series=series_data;
					}

					function set_data_of_series_trends(hash_obj,parent_id,period,days)
					{
						var child_found=-1;
						var category_ids=[];
						options.xAxis.categories=[];
						series_data=[];
						
						var series_name_array=[];
						var start;
						  		if(days==7)
						  			 start=23;
						  		else
						  			start=0;

						for(start;start<hash_obj[0][period].length;start++)
						{
							options.xAxis.categories.push(hash_obj[0][period][start]["date"]);
							series_name_array.push(hash_obj[0][period][start]["date"]);
						}

						for(attr_id in hash_obj)
						{
							if(hash_obj[attr_id]["parent_id"]==parent_id ){
								child_found=1;
								set_graph_level(parent_id);
								var temp={data:[],
							showInLegend:true,
							name: hash_obj[attr_id]["name"],
							point:{events: { 'click': function(e) {makeSubGraph(this.category); } }}
                   			 	}
								series_data.push(temp);
								handle_trend_graph(hash_obj,attr_id,period,days);
								category_ids.push(parseInt(attr_id));
										
									}
							  	
						  }
						
						
						if(category_ids.length!=0)
						{
							set_chartseries_data_trends(category_ids,hash_obj,series_name_array);
							make_chart(options);
						}
						

					}

					function handle_normal_graph(hash_obj,attr_id,period){
						var a=0,b=0,c=0;
						if(hash_obj[attr_id]["type"]=="weighted")
								{
								 a+=hash_obj[attr_id][period][0]+hash_obj[attr_id][period][1];
								 b+=hash_obj[attr_id][period][2];
								 c+=hash_obj[attr_id][period][3]+hash_obj[attr_id][period][4];

								 hash_obj[attr_id]["count_of_ppl"]=[a,b,c];

						  		}
					}

					function handle_trend_graph(hash_obj,attr_id,period,days)
					{
						var a=0;var b=0;var c=0;var n=0;var avg=0;
						var start;
						if(days==7)
						  	start=23;
						else
						  	start=0;

						  		for(start;start<hash_obj[attr_id][period].length;start++)
						  				{
						  					if(hash_obj[attr_id]["type"]=="weighted")
											{
												hash_obj[attr_id][hash_obj[attr_id][period][start]["date"]]= {} ;
												for(var i =1; i<=hash_obj[attr_id][period][start]["listCountPPL"].length;i++)
											     {
											     a+=(i*(hash_obj[attr_id][period][start]["listCountPPL"][i-1]));
											     n+=hash_obj[attr_id][period][start]["listCountPPL"][i-1];


											     if (n!=0)
											     	hash_obj[attr_id][hash_obj[attr_id][period][start]["date"]]["count_of_ppl"]= parseInt(a/n) ;
											     else
											     	hash_obj[attr_id][hash_obj[attr_id][period][start]["date"]]["count_of_ppl"]=0;
											     
												}
												
												
											     a=0;n=0;
									  		}
									  	}
					}

					function set_chartseries_data_trends(category_ids,hash_obj,series_name_array,subgraph_name)
					{
						for(var j=0 ;j< series_name_array.length;j++)
						{
						for (var id=0; id<category_ids.length;id++)
							{
								if(graph_type=="normal")						
									series_data[id]["data"].push(hash_obj[category_ids[id]]["count_of_ppl"][j]);
								else
									series_data[id]["data"].push(hash_obj[category_ids[id]][series_name_array[j]]["count_of_ppl"]);
							}
						}
						options.series=series_data;

					}
					
					function make_chart(options)
					{
						chart = new Highcharts.Chart(options);
					}

					function populate_summary(options){
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

					function populate_filter(filterList){
						console.log(filterList);
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
						
						
						
						$('a.filter_list_input').live('mouseover',function(){
							
							if(document.getElementById(this.id).className === "filter_list_input")
							{
								this.style.backgroundColor = "red";
							}
						});
						$('a.filter_list_input').live('mouseout',function(){
								this.style.backgroundColor = "black";
						});
				
					}
					$(document).on('change', 'select', function () {
    					// alert(this.value);
					});

					$('.filter_dropdown_style').live('click',function(){
						var elements= this.parentNode.children;
						// document.getElementsByClassName("filter_dropdown_list");
						elements[1].style.visibility=elements[1].style.visibility=="visible"?"hidden":"visible";
						for (var i = 0; i < elements[1].children.length; i++) {
						        elements[1].children[i].style.visibility=elements[1].children[i].style.visibility=="visible"?"hidden":"visible";
						    }

					});

					$('.filter_list_elements').live('click',function(){


					});

					function get_params_index(id,response)
					{
						for(var i=0;i<response.length;i++)
							{
								
								if (response[i]["graphId"]==id){return i;}

							}
							
							return -1;

					}

					function addFilter(name,value)
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
					
					function makeSubGraph(whose_subgraph)
					{

						console.log(whose_subgraph);
						for(id in hash_obj)
						{

							if(hash_obj[id]["name"]==whose_subgraph){
								parent_id=id;
							}
						}
						console.log(parent_id);
						setQuickLink(whose_subgraph);
						if (graph_type=="normal")
							set_data_of_series_normal(hash_obj,parent_id,"listCountPPl_7Days",hash_obj);
						else
							set_data_of_series_trends(hash_obj,parent_id,"listCountPPl_7Days",hash_obj);						
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

					function find_in_array(array,value){
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

					function setQuickLink(category)
					{
						var level = ((document.getElementsByName("level_identify_div")[0]).id.split("_"))[2];
						if(document.getElementById("quick_links").lastChild.id!=level && document.getElementById("quick_links").lastChild.innerHTML!=category)
							$("div#quick_links").append(' > <a class="back_link" id='+level+'>'+category+'</a>');
						else 
								document.getElementById("quick_links").lastChild.innerHTML = category;
					}

					function updateFilter(filter_name)
					{
						for(var i=0;i<applyFilter.length;i=i+2)
						{
							if(applyFilter[i]==filter_name)
							{
								applyFilter.splice(i,2);
							}
						}
					}

					
					$('a.back_link').live('click',function(){
						var to_b_removed = document.getElementById("quick_links").childNodes.length - 2;
						for(var i=0;i< to_b_removed;i++)
						if(document.getElementById("quick_links").lastChild.innerHTML!=this.innerHTML)
						{
							var node=document.getElementById("quick_links").lastChild;
							var parent_node=document.getElementById("quick_links");
							parent_node.removeChild(node);
						}
						makeSubGraph(this.innerHTML);
						
					});

					$('a.display_filters_graph').live('click',function(){
						var current_node=this.parentNode;
						var parent_node=current_node.parentNode;
						parent_node.removeChild(current_node);
						updateFilter(current_node.getElementsByTagName('a')[0].id);
						make_graph_with_filters();						
					})
					$('.timeline').live('click',function(){
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

					$('a.dashboard_heading').live('click', function(){
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

					$('a#dashboard_close').live('click',function(){
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

					$('a.marketing').live('click', function(){
						var offers='';
						header_navigation(this.className);
						console.log("in offers");
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
					  		console.log(offersRes[i]);
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
					  	console.log(response);
					  }
				});
						
						

					}

					$('#mrktng_add_offer').live('click', function(){
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

					$('a.profile').live('click', function(){
						console.log("in profile");
						header_navigation(this.className);
						show_questions(response);	
					});

					$('a.followup').live('click', function(){
						console.log(active_div);
						header_navigation(this.className);
						console.log("in followup");
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

					$('a.analysis').live('click', function(){
						console.log("in analysis");
						header_navigation(this.className);
						console.log(active_div);
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