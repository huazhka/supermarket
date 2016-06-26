/**
 * 进货报表
 */
//window.onload=function(){
//	
//	sendStockTotalRequest();
//}

var request;

function sendStockTotalRequest(){
	
	request=CreateRequest();
	
	request.open("POST","http://localhost:8080/Supermarket/StockTotal",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=parseStockTotalRequest;
	request.send("");
	
}

function parseStockTotalRequest(){

	if(request.status==200&&request.readyState==4){
//		alert(request.responseText);
		
		var supply_json=JSON.parse(request.responseText);
		
		if(supply_json.status){
			
			var supply_msg=supply_json.message;
			
			CreateStockTotal(supply_msg);
		}
		else
			alert(supply_json.detail);
		
		sendStaffTotalRequest();
		
	}
}

function CreateStockTotal(msg){
	
	var name_array=msg.name;
	var value_array=msg.value;
	
	console.log("测试");
	
	  var myChart = echarts.init(document.getElementById('part1'));
	    
	  var option = {
	            title: {
	                text: '进货报表'
	            },
	            tooltip: {},
	            legend: {
	            	 orient: 'vertical',
	                 left: 'center',
	                data:['销量']
	            },
	            xAxis: {
	            	
	            	name:['月份'],
	                data: name_array
	                
	            },
	            yAxis: {
	            	name:'进货数量',
	            },
	            series: [{
	            	
	                type: 'bar',
	                data: value_array
	            }]
	        };

	    // 使用刚指定的配置项和数据显示图表。
	    myChart.setOption(option);
	    
	    myChart.on('click', function (params) {
	    	
	        console.log(params.name);
	        sendStockEachRequest(params.name);
	        
	    });
}