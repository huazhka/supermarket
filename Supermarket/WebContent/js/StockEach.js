/**
 * 进货-月份报表
 */

var request;
function sendStockEachRequest(month){
	request=CreateRequest();
	
	request.open("POST","http://localhost:8080/Supermarket/StockEach",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=parseStockEachRequest;
	request.send("month="+month);
}

function parseStockEachRequest(){
	
	if(request.status==200&&request.readyState==4){
		alert(request.responseText);
		
		var supply_json=JSON.parse(request.responseText);
		
		if(supply_json.status){
			
			var supply_msg=supply_json.message;
			
			CreateStockEach(supply_msg);
		}
		else
			alert(supply_json.detail);
	}
}

function CreateStockEach(msg){
	
	var name_array=msg.name;
	var value_array=msg.value;
	
	console.log("测试");
	
	  var myChart = echarts.init(document.getElementById('part2'));
	    
	  var option = {
	            title: {
	                text: '进货-月份报表'
	            },
	            tooltip: {},
	            legend: {
	            	 orient: 'vertical',
	                 left: 'center',
	                data:['销量']
	            },
	            xAxis: {
	            	
	            	name:['商品名'],
	                data: name_array
	                
	            },
	            yAxis: {
	            	name:'数量',
	            },
	            series: [{
	            	
	                type: 'bar',
	                data: value_array
	            }]
	        };

	    // 使用刚指定的配置项和数据显示图表。
	    myChart.setOption(option);
	
}