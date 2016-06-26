/**
 * 
 */
/*function createparameter(){
	alert("saleno"+$("#saleno").val());
	alert("salecomno:"+$("#salecomno").val());
	alert("salesortno:"+$("#salesortno").val());
	alert("id_state:"+$("input:radio[name='id_state']:checked").val());
	alert("id_saledate:"+$("input:radio[name='id_saledate']:checked").val());
	alert("saleall:"+$("#saleall").prop("checked"));
}*/



//alert("salemess");
$(function(){
	
	$("#record").bind("click",function(){
		//alert("insertstork");
		$.ajax({
			url: "../InsertSale",
			type: "post",
			data:{
				comno:$("#comno").val(),
				saleamount:$("#saleamount").val()
			},
			dataType:"json",
			success: function (data) {
				//alert("请求成功！");
				if(data.status){
					alert(data.detail);
				}else{
					alert(data.detail);
				}
			},
			error:function(jqXHR){
				alert("发生错误："+jqXHR.status);
			}
		});
	});
	
	
	$("#saleseek").bind("click",function(){
		//alert("searchstork");
		$.ajax({
			url: "../SearchSale",
			type: "post",
			data:{
				saleall:$("#saleall").prop("checked"),
				saleno:$("#saleno").val(),
				salecomno:$("#salecomno").val(),
				//salesortno:$("#salesortno").val(),
				id_state:$("input:radio[name='id_state']:checked").val(),
				id_saledate:$("input:radio[name='id_saledate']:checked").val(),
				saleamount1:$("#id_saleamount1").val(),
				saleamount2:$("#id_saleamount2").val()
			},
			dataType:"json",
			success: function (data) {
				//alert("请求成功！");
				if(data.status){
//					alert(data.detail);
					var msg=data.message;
					
					parseSearch(msg);
				}else{
					alert(data.detail);
				}
			},
			error:function(jqXHR){
				alert("发生错误："+jqXHR.status);
			}
		});
	});
	
	function parseSearch(msg){
	
	var sale_div=document.getElementById("sale_div");
	var sale_ul=null;
	var sale_li1=null;
	var sale_li2=null;
	var sale_li3=null;
	var sale_li4=null;
	
	var sale_label1=null;
	var sale_label2=null;
	var sale_label3=null;
	var sale_label4=null;
	
	for(var i=0;i<msg.length;i++){
		
		sale_ul=document.createElement("ul");
		sale_ul.setAttribute("class", "title");
		
		//第一列
		sale_li1=document.createElement("li");
		sale_label1=document.createElement("label");
		sale_label1.setAttribute("class", "title1");
		sale_label1.innerHTML=msg[i].comno;
		sale_li1.appendChild(sale_label1);
		sale_ul.appendChild(sale_li1);
		
		//第二列
		sale_li2=document.createElement("li");
		sale_label2=document.createElement("label");
		sale_label2.setAttribute("class", "title4");
		sale_label2.innerHTML=msg[i].comname;
		sale_li2.appendChild(sale_label2);
		sale_ul.appendChild(sale_li2);
		
		//第三列
		sale_li3=document.createElement("li");
		sale_label3=document.createElement("label");
		sale_label3.setAttribute("class", "title1");
		sale_label3.innerHTML=msg[i].saleamount;
		sale_li3.appendChild(sale_label3);
		sale_ul.appendChild(sale_li3);
		
		//第四列
		sale_li4=document.createElement("li");
		sale_label4=document.createElement("label");
		sale_label4.setAttribute("class", "title4");
		sale_label4.innerHTML=msg[i].dateTime;
		sale_li4.appendChild(sale_label4);
		sale_ul.appendChild(sale_li4);
		
		sale_div.appendChild(sale_ul);
	console.log(msg[i].dateTime);
	}
}
	
});
