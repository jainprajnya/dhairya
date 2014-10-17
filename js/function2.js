var chart;
	var drilldownSeries = [1,2,3,4];
	var options = {
					chart: {
						renderTo: 'container',
						type: 'column'

					},
					title: {
						text:'PJ' 		
					},
					subtitle: {
						text: 'customized'
					},
					xAxis: {
						 type: 'category',
						categories: []
					
					},
					yAxis: {
						min :0,
						title: {
							text: 'Number of people',
							align:'high'
						}
					},
					tooltip: {
                valueSuffix: ' number of people'
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
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {

                        	var graphsValues=[{"b1d1feb2-007f-4179-a4d4-db150b2d262b":[
						{
						"attributeId":0,
						"name":"starters",
						"listAttributeValue":[
						{"name":"poor", "value":1, "maxValue":5},
						{"name":"ok", "value":2, "maxValue":5},
						{"name":"good", "value":3, "maxValue":5},
						{"name":"better", "value":4, "maxValue":5},
						{"name":"best", "value":5, "maxValue":5}
						],
						"listDailyAttributeStatisticValues":[
						{"date":20140501, "listCountPPL":[0,1,2,3,4]},
						{"date":20140502, "listCountPPL":[0,1,2,3,4]},
						{"date":20140503, "listCountPPL":[0,1,2,3,4]},
						{"date":20140504, "listCountPPL":[0,1,2,3,4]},
						{"date":20140505, "listCountPPL":[0,1,2,3,4]},
						{"date":20140506, "listCountPPL":[0,1,2,3,4]},
						]
						},
						{
						"attributeId":1,
						"name":"main_course",
						"listAttributeValue":[
						{"name":"poor", "value":1, "maxValue":5},
						{"name":"ok", "value":2, "maxValue":5},
						{"name":"good", "value":3, "maxValue":5},
						{"name":"better", "value":4, "maxValue":5},
						{"name":"best", "value":5, "maxValue":5}
						],
						"listDailyAttributeStatisticValues":[
						{"date":20140501, "listCountPPL":[0,1,2,3,4]},
						{"date":20140502, "listCountPPL":[0,1,2,3,4]},
						{"date":20140503, "listCountPPL":[0,1,2,3,4]},
						{"date":20140504, "listCountPPL":[0,1,2,3,4]},
						{"date":20140505, "listCountPPL":[0,1,2,3,4]},
						{"date":20140506, "listCountPPL":[0,1,2,3,4]},
						]
						}]
					}];
					if(this.category=='food'){
					makeGraph(graphsValues);}
                            // alert ('Category: '+ this.category +', value: '+ this.y);
                        }
                    }
                }
                
            }
                  
                
            },
			
				series: []

				}
				 
  
			$(document).ready(function() {
				
				
				var response = [{"name":"overview1","graphId":"b1d1feb2-007f-4179-a4d4-db150b2d262b","attributeList":[0,1,2],"filterList":[3]},
								{"name":"overview2","graphId":"b1d1feb2-007f-4179-a4d4-db150b2d262b","attributeList":[0,1,2],"filterList":[3]},
								{"name":"overview3","graphId":"b1d1feb2-007f-4179-a4d4-db150b2d262b","attributeList":[0,1,2],"filterList":[3]},
								{"name":"overview4","graphId":"b1d1feb2-007f-4179-a4d4-db150b2d262b","attributeList":[0,1,2],"filterList":[3]},
								{"name":"overview5","graphId":"b1d1feb2-007f-4179-a4d4-db150b2d262b","attributeList":[0,1,2],"filterList":[3]},
								{"name":"overview6","graphId":"b1d1feb2-007f-4179-a4d4-db150b2d262b","attributeList":[0,1,2],"filterList":[3]}							
										];
	 

					// console.log(typeof response);
					// alert(response.length);
					var rows='<table id="inerTable">';
					options.title.text=response[0]["name"];
					for(var i=0;i<response.length;i++)
					{
						// console.log(response[i]["name"]);
						rows+='<tr><td class="left_pannel_elem" id='+response[i]["graphId"]+'>'+response[i]["name"]+'</td></tr>';


					}
					rows+='</table>'
					$( rows ).appendTo( "#left_pannel" );
					var graphsValues=[{"b1d1feb2-007f-4179-a4d4-db150b2d262b":[
						{
						"attributeId":0,
						"name":"food",
						"listAttributeValue":[
						{"name":"poor", "value":1, "maxValue":5},
						{"name":"ok", "value":2, "maxValue":5},
						{"name":"good", "value":3, "maxValue":5},
						{"name":"better", "value":4, "maxValue":5},
						{"name":"best", "value":5, "maxValue":5}
						],
						"listDailyAttributeStatisticValues":[
						{"date":20140501, "listCountPPL":[0,1,2,3,4]},
						{"date":20140502, "listCountPPL":[0,1,2,3,4]},
						{"date":20140503, "listCountPPL":[0,1,2,3,4]},
						{"date":20140504, "listCountPPL":[0,1,2,3,4]},
						{"date":20140505, "listCountPPL":[0,1,2,3,4]},
						{"date":20140506, "listCountPPL":[0,1,2,3,4]},
						]
						},
						{
						"attributeId":1,
						"name":"service",
						"listAttributeValue":[
						{"name":"poor", "value":1, "maxValue":5},
						{"name":"ok", "value":2, "maxValue":5},
						{"name":"good", "value":3, "maxValue":5},
						{"name":"better", "value":4, "maxValue":5},
						{"name":"best", "value":5, "maxValue":5}
						],
						"listDailyAttributeStatisticValues":[
						{"date":20140501, "listCountPPL":[0,1,2,3,4]},
						{"date":20140502, "listCountPPL":[0,1,2,3,4]},
						{"date":20140503, "listCountPPL":[0,1,2,3,4]},
						{"date":20140504, "listCountPPL":[0,1,2,3,4]},
						{"date":20140505, "listCountPPL":[0,1,2,3,4]},
						{"date":20140506, "listCountPPL":[0,1,2,3,4]},
						]
						},
						{
						"attributeId":2,
						"name":"ambience",
						"listAttributeValue":[
						{"name":"poor", "value":1, "maxValue":5},
						{"name":"ok", "value":2, "maxValue":5},
						{"name":"good", "value":3, "maxValue":5},
						{"name":"better", "value":4, "maxValue":5},
						{"name":"best", "value":5, "maxValue":5}
						],
						"listDailyAttributeStatisticValues":[
						{"date":20140501, "listCountPPL":[0,1,2,3,4]},
						{"date":20140502, "listCountPPL":[0,1,2,3,4]},
						{"date":20140503, "listCountPPL":[0,1,2,3,4]},
						{"date":20140504, "listCountPPL":[0,1,2,3,4]},
						{"date":20140505, "listCountPPL":[0,1,2,3,4]},
						{"date":20140506, "listCountPPL":[0,1,2,3,4]},
						]
						},
						{
						"attributeId":3,
						"name":"Experience",
						"listAttributeValue":[
						{"name":"poor", "value":1, "maxValue":5},
						{"name":"ok", "value":2, "maxValue":5},
						{"name":"good", "value":3, "maxValue":5},
						{"name":"better", "value":4, "maxValue":5},
						{"name":"best", "value":5, "maxValue":5}
						],
						"listDailyAttributeStatisticValues":[
						{"date":20140501, "listCountPPL":[0,1,2,3,4]},
						{"date":20140502, "listCountPPL":[0,1,2,3,4]},
						{"date":20140503, "listCountPPL":[0,1,2,3,4]},
						{"date":20140504, "listCountPPL":[0,1,2,3,4]},
						{"date":20140505, "listCountPPL":[0,1,2,3,4]},
						{"date":20140506, "listCountPPL":[0,1,2,3,4]},
						]
						}
						]}];			 	
				// response=JSON.parse(response);
				
				var a= response.data;
				// console.log(typeof a);
			var basic_attributes = new Array();
			var graphId="";
			 
			for(innerElem in response[0])
							{
								
								if (innerElem=="graphId")
									{graphId=response[0][innerElem];}
								if(innerElem=="attributeList")
								{
									// sconsole.log(response[elem][innerElem]);
										makeGraph(graphsValues);
										//console.log(response[elem][innerElem][attribute]);
									}
					 	// console.log(typeof elem);
					 			}
			 		 		
			 		 // }
					
					$(".left_pannel_elem").click(function() {

					//json call with element id
					var graphsValues=[{"b1d1feb2-007f-4179-a4d4-db150b2d262b":[
						{
						"attributeId":0,
						"name":"food",
						"listAttributeValue":[
						{"name":"poor", "value":1, "maxValue":5},
						{"name":"ok", "value":2, "maxValue":5},
						{"name":"good", "value":3, "maxValue":5},
						{"name":"better", "value":4, "maxValue":5},
						{"name":"best", "value":5, "maxValue":5}
						],
						"listDailyAttributeStatisticValues":[
						{"date":20140501, "listCountPPL":[0,1,2,3,4]},
						{"date":20140502, "listCountPPL":[0,1,2,3,4]},
						{"date":20140503, "listCountPPL":[0,1,2,3,4]},
						{"date":20140504, "listCountPPL":[0,1,2,3,4]},
						{"date":20140505, "listCountPPL":[0,1,2,3,4]},
						{"date":20140506, "listCountPPL":[0,1,2,3,4]},
						]
						},
						{
						"attributeId":1,
						"name":"service",
						"listAttributeValue":[
						{"name":"poor", "value":1, "maxValue":5},
						{"name":"ok", "value":2, "maxValue":5},
						{"name":"good", "value":3, "maxValue":5},
						{"name":"better", "value":4, "maxValue":5},
						{"name":"best", "value":5, "maxValue":5}
						],
						"listDailyAttributeStatisticValues":[
						{"date":20140501, "listCountPPL":[0,1,2,3,4]},
						{"date":20140502, "listCountPPL":[0,1,2,3,4]},
						{"date":20140503, "listCountPPL":[0,1,2,3,4]},
						{"date":20140504, "listCountPPL":[0,1,2,3,4]},
						{"date":20140505, "listCountPPL":[0,1,2,3,4]},
						{"date":20140506, "listCountPPL":[0,1,2,3,4]},
						]
						}]
					}];
					
					makeGraph(graphsValues);			
			});


	});
			
	function makeGraph(graphsValues)
					{
						// api call to that graph_id

						options.xAxis.categories=[];
						 
						 var series_names=["POOR","AVG","GOOD"]
						 var hash_obj = new Object();
						

						for(elem in graphsValues)
						{
							for (attributes in graphsValues[elem])
								{
									// console.log(graphsValues[elem][attributes]);
									// options.xAxis.categories.push();
								for(values in graphsValues[elem][attributes])
									{
											// console.log(graphsValues[elem][attributes][values]["name"]);
											 options.xAxis.categories.push(graphsValues[elem][attributes][values]["name"]);
											 //if attribute_id in filterList setFilters/createFilters
											 var data =graphsValues[elem][attributes][values]["listDailyAttributeStatisticValues"];
											 setDate(data[0]["date"],data[data.length-1]["date"]);
											 setDataOfSeries(graphsValues[elem][attributes][values]["name"],data,hash_obj);
											 // console.log(graphsValues[elem][attributes][values]["listDailyAttributeStatisticValues"]);
											// return graphsValues[elem][attributes][values];
										}

								}
							}
						
						 var i=0;
						 var a=[];
						 var b=[];
						 var c=[];
						chart = new Highcharts.Chart(options);
						 for(categories in options.xAxis.categories)
						 {
						 	attribute_name=options.xAxis.categories[categories];
						 	// console.log("for "+ attribute_name+": "+hash_obj[attribute_name][0]);
						 	a.push(hash_obj[attribute_name][0]);
						 	b.push(hash_obj[attribute_name][1]);
						 	c.push(hash_obj[attribute_name][2]);

						 }


						 	//  console.log(a);
						  // console.log(b);
						  // console.log(c);

						  //if graph is normal

						  var series_data=[ {                      
					        name: "POOR",
					        data: a,
					        showInLegend: true,
					        allowPointSelect: true,
					     },{                        
					        name: "AVG",
					        data: b,
					        showInLegend: true,
					        allowPointSelect: true,
					        
					    },{                        
					        name: "GOOD",
					        data: c,
					        showInLegend: true,
					        allowPointSelect: true,
					       
					    }]

						options.series=series_data;									
						chart = new Highcharts.Chart(options);
						
					}


					function setDataOfSeries(attribute_name,array_of_data_date_wise,hash_obj,from_date,to_date)
					{
						
						var a=0,b=0,c=0;
						//console.log(array_of_data_date_wise);
						// console.log(hash_obj);
						for(values in array_of_data_date_wise)
						{
							a+=(array_of_data_date_wise[values]["listCountPPL"][0]+array_of_data_date_wise[values]["listCountPPL"][1]);
							b+=(array_of_data_date_wise[values]["listCountPPL"][2]);
							c+=(array_of_data_date_wise[values]["listCountPPL"][3]+array_of_data_date_wise[values]["listCountPPL"][4]);
						}

						// console.log("name os "+attribute_name+"a is "+a+"b is "+b+"c is "+c);
						
						hash_obj[attribute_name]=[a,b,c];
						// console.log("hash is "+ hash_obj);
						

					}

					function setDate(from_date, to_date)
					{

						var from_year = parseInt(from_date/10000);
						var from_month = parseInt((from_date%10000) / 100);
						var from_day = parseInt(from_date%100);
						var from = new Date();
						from.setDate(from_day);
						from.setMonth(from_month);
						from.setFullYear(from_year);
						// console.log(from);
						// from = from_day + "/" + from_month +"/" +from_year;
						//console.log(from);
						$('#from_date').attr('value', from);
						document.getElementById("from_date").valueAsDate = from;

						var to_year = to_date/10000;
						var to_month = (to_date%10000) / 100;
						var to_day = (to_date%100);
						var to = new Date();
						// console.log(to);
						document.getElementById("to_date").valueAsDate = to;


					}
