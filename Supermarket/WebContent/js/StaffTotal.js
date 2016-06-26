/**
 * 员工报表
 */

//window.onload=function(){
//	
//	sendStaffTotalRequest();
//}

var request;

function sendStaffTotalRequest(){
	
	request=CreateRequest();
	
	request.open("POST","http://localhost:8080/Supermarket/StaffTotal",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=parseStaffTotalRequest;
	request.send("");
	
}

function parseStaffTotalRequest(){
	
	if(request.status==200&&request.readyState==4){
//		alert(request.responseText);
		
		var supply_json=JSON.parse(request.responseText);
		
		if(supply_json.status){
			
			var supply_msg=supply_json.message;
			
			CreateStaffTotal(supply_msg);
		}
		else
			alert(supply_json.detail);
		
		sendSupplyTotalRequest();
		
	}
}

function CreateStaffTotal(msg){
	
	var name_array=msg.name;
	var value_array=msg.value;
	
	console.log("测试");
	
	  var myChart = echarts.init(document.getElementById('part3'));
	    
	  var option = {
	            title: {
	                text: '员工报表'
	            },
	            tooltip: {},
	            legend: {
	            	 orient: 'vertical',
	                 left: 'center',
	                data:['销量']
	            },
	            xAxis: {
	            	
	            	name:['姓名'],
	                data: name_array
	                
	            },
	            yAxis: {
	            	name:'销售金额/千元',
	            },
	            series: [{
	            	
	                type: 'bar',
	                data: value_array
	            }]
	        };

	    // 使用刚指定的配置项和数据显示图表。
	    myChart.setOption(option);
}