
// OpenTab Function
function openTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" w3-blue", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " w3-blue";
}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    if (options.url.match(/^https?:/)) {
		options.headers={};
        options.headers['X-Proxy-URL'] = options.url;
        options.url = './ajax.php';
    }
});


function post(url,data,cb,type){
	if(type==null)type="POST";
	data = JSON.stringify(data);
	console.log(data);
	$.ajax({url: url,datatype : "json",contentType: "application/json",data:data,type:type,dataType:'json',success:function(d){
		console.log(d);
		if(cb!=null)cb(d)
	}});
}

// Default Tab
$(document).ready(function(){
	eventFire(document.getElementById('default-tab'), 'click');
});

// App Instance
var app = new Vue({
	'el':'#app',
	data:{
		//url:'https://private-a1e9a-sdminer.apiary-mock.com',
		url:'http://localhost:8998',
		sessions:'',
		session_number:0,
		class_name:'DistributedRandomSamplingFixedReservoir',
		args:'localhost,9999,2,10',
		file_name:'/home/sinash/ssdirty.jar',
		result:null,
		batches:'',
		lastUpdate:'',
	},
	methods:{

		reload: function() {
			app.getSessionStatus();
			app.getJobs();
			
		},
		
		u: function() {
			app.lastUpdate=new Date();
		},
		
		implementMe: function() {
			alert("Implement Me :D");
		},
	
		getSessionStatus: function() {
			$.ajax({url: app.url+'/sessions',dataType:'json',success:function(d){
				//console.log("Sessions Loaded!");
				app.u();
				app.sessions=d;
			}});
		},
		
		getJobs: function() {
			$.ajax({url: app.url+'/batches',dataType:'json',success:function(d){
				//console.log("Batches Loaded!");
				app.u();
				app.batches=JSON.stringify(d,null, "\t");
				app.batches_j=d;
			}});
		},
		
		startSession: function() {
			post(app.url+'/sessions',{kind:'spark'},app.getSessionStatus);
		},
		
		deleteSession: function(id) {
			post(app.url+'/sessions/'+id,{kind:'spark'},app.getSessionStatus,"DELETE");
		},
		
		deleteBatch: function() {
			post(app.url+'/batches/'+app.batches_j.sessions[0].id,{kind:'spark'},app.getSessionStatus,"DELETE");
		},
		
		sendBatch: function() {
			var data= {
				file: app.file_name,
				className: app.class_name,
				args: app.args.split(','),
			};
			
			app.result={};
			app.result.id='';
			app.result.kind='';
			app.result.state='Sending request...'
			
			post(app.url+'/batches',data,function(d){app.result=d;});
			
		},
		
		 

	}
});

app.reload();

setInterval(app.reload,1000);

$('#userFile').change( function(event) {
	app.file_name=$(this).val()
});