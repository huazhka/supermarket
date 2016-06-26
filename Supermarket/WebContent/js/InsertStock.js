/**
 *录入进货 
 */

var request;

function sendInsertStockRequest(){
	
	request=CreateRequest();
	
	request.open("POST","http://localhost:8080/Supermarket/InsertStock",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=parseInsertStockRequest;
	request.send(getInsertStockParams());
}

function getInsertStockParams(){
	
	var comno=document.getElementById("id_scomno6").value;
	var amount=document.getElementById("id_sstoamount").value;
	
	console.log("comno="+comno+"&stoamount="+amount);
	
//	location.reload(false);
	return "comno="+comno+"&stoamount="+amount;
}

function parseInsertStockRequest(){
	
	if(request.status==200&&request.readyState==4){
		console.log(request.responseText);
		
		var  stock_json=JSON.parse(request.responseText);
		
		alert(stock_json.detail);
		
		location.reload(false);
	}
	
}

function cancelStock(){
	location.reload(false);
}