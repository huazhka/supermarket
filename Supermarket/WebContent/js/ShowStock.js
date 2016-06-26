/**
 * 查询进货
 */

var request;

function sendShowStockRequest(){
	
	request=CreateRequest();
	
	request.open("POST","http://localhost:8080/Supermarket/ShowStock",true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=parseShowStockRequest;
	request.send(getShowStockParams());
}

function getShowStockParams(){
	
	var stono=document.getElementById("id_stono11").value;
	var stano=document.getElementById("id_stano5").value;
	var comno=document.getElementById("id_comno5").value;
	var stoamount1=document.getElementById("stoamount1").value;
	var stoamount2=document.getElementById("stoamount2").value;
	
	var stockall;
	var time;
	
	if(document.getElementById("stockall").checked){
		stockall="true";
	}else
		stockall="false";
	
	var sale_time=document.getElementById("stock_time");
	
	time=sale_time.options[sale_time.selectedIndex].value;
	
	console.log("stockall="+stockall+"&stono="+stono+"&stano="
			+stano+"&comno="+comno+"&time="+time+"&stoamount1="+"&stoamount2="+stoamount2);
	
	return  "stockall="+stockall+"&stono="+stono+"&stano="
			+stano+"&comno="+comno+"&time="+time+"&stoamount1="+"&stoamount2="+stoamount2;
}

function parseShowStockRequest(){
	
	if(request.status==200&&request.readyState==4){
		console.log(request.responseText);
		
		var  stock_json=JSON.parse(request.responseText);
		
		clearAll();
		if(stock_json.status){
			CreateTable(stock_json.message);
		}
		else
			alert(stock_json.detail);
			
	}
}

function CreateTable(msg){
	
	var stock_div=document.getElementById("showaddcom");
	
	var stock_ul;
	var stock_li1;
	var stock_li2;
	var stock_li3;
	var stock_li4;
	var stock_label1;
	var stock_label2;
	var stock_label3;
	var stock_label4;
	
	for(var i=0;i<msg.length;i++){
		
		stock_ul=document.createElement("ul");
		stock_ul.setAttribute("class", "title");
		
		stock_li1=document.createElement("li");
		stock_label1=document.createElement("label");
		stock_label1.setAttribute("class", "title1");
		stock_label1.setAttribute("id", "id_scomno1");
		stock_label1.innerHTML=msg[i].comname;
		stock_li1.appendChild(stock_label1);
		stock_ul.appendChild(stock_li1);
		
		stock_li2=document.createElement("li");
		stock_label2=document.createElement("label");
		stock_label2.setAttribute("class", "title1")
		stock_label2.innerHTML=msg[i].staname;
		stock_li1.appendChild(stock_label2);
		stock_ul.appendChild(stock_li2);
		
		stock_li3=document.createElement("li");
		stock_label3=document.createElement("label");
		stock_label3.setAttribute("class", "title1")
		stock_label3.innerHTML=msg[i].stoamount;
		stock_li1.appendChild(stock_label3);
		stock_ul.appendChild(stock_li3);
		
		stock_li4=document.createElement("li");
		stock_label4=document.createElement("label");
		stock_label4.setAttribute("class", "title1")
		stock_label4.innerHTML=msg[i].stadate;
		stock_li1.appendChild(stock_label4);
		stock_ul.appendChild(stock_li4);
		
		stock_div.appendChild(stock_ul);
	}
}

function clearAll(){
	
	var stock_div=document.getElementById("showaddcom");
	var child=stock_div.childNodes;
	
	while(child.length>0)
		stock_div.removeChild(child[child.length-1]);
}