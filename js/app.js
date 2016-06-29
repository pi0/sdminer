
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

// Default Tab
$(document).ready(function(){
	eventFire(document.getElementById('default-tab'), 'click');
});

// App Instance
var app = new Vue({
	'el':'#app',
	data:{
		url:'https://private-a1e9a-sdminer.apiary-mock.com',
		sessions:'',
		session_number:0,
		class_name:'DistributedRandomSamplingFixedReservoir',
		args:'localhost,9999,2,10',
		file_name:'/home/sinash/ssdirty.jar',
		result:null
	},
	methods:{

		reload: function() {
			app.getSessionStatus();
		},
		
		implementMe: function() {
			alert("Implement Me :D");
		},
	
		getSessionStatus: function() {
			$.ajax({url: app.url+'/sessions',dataType:'json',success:function(d){
				app.sessions=d;
			}});
		},
		
		sendBatch: function() {
			var data= {
				file: $('#userFile').val(),
				className: app.class_name,
				args: app.args.split(','),
			};
			
			app.result={};
			app.result.id='';
			app.result.kind='';
			app.result.state='Sending request...'
			
			console.log(data);//TODO batch
			$.ajax({url: app.url+'/batch',type:"POST",data:data,dataType:'json',success:function(d){
				console.log(d);
				app.result=d;
			}});
		},
		
		 

	}
});

app.reload();

$('#userFile').change( function(event) {
app.file_name=$(this).val()
});