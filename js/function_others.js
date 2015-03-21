$(document).ready(function() {
var form;

$('body').on('click','.button',function(){
// form.onsubmit = function (e) {
  // stop the regular form submission
  // e.preventDefault();
		var name1= document.getElementById('contactus_name').value;
		var email1= document.getElementById('contactus_email').value;
		var city1 = document.getElementById('contactus_city').value;
		var business1=document.getElementById('contactus_business').value;
		var comments1=document.getElementById('contactus_comments').value;

		// var data="name:"+name+",emailId:"+email+",city:"+city+",businessType:"+business+",comment:"+comments;
		var xhr = new XMLHttpRequest();
	  	xhr.open("POST", "https://bizviewz.com:8080/feedback-review/contactUs",false);
	  	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	     xhr.send(JSON.stringify({name: name1, emailId: email1, city: city1, businessType: business1, comment: comments1}
));

	  	// xhr.send(JSON.stringify({name:name1,emailId:email1,city:city1,businessType:business1,comments:comments1}));
	  	graph_list= JSON.parse(xhr.responseText);
	  	console.log(graph_list);

			 // e.preventDefault();

		  // collect the form data while iterating over the inputs
// 		  var data = {};
// 		  for (var i = 0, ii = form.length; i < ii; ++i) {
// 		    var input = form[i];
// 		    if (input.name) {
// 		      data[input.name] = input.value;
// 		    }
// 		  }

// 		  // construct an HTTP request
// 		  var xhr = new XMLHttpRequest();
// 		  xhr.open(form.method, form.action, true);
// 		  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

// 		  // send the collected data as JSON
// 		  xhr.send(JSON.stringify(data));

// 		graph_list= JSON.parse(xhr.responseText);
// 	  	console.log(graph_list);

// };
});

});