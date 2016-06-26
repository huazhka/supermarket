/**
 * 
 */
$(function(){
	$("#id_saleseek").bind("click",function(){
		//alert("saleseek");
		$.ajax({
			url: "../SeekSale",
			type: "post",
			data:{
				all:$("#id_saleall").prop("checked"),
				saleno:$("#id_saleno").val(),
				salecomno:$("#id_salecomno").val(),
				stano:$("#id_salestano").val(),
				state:$("input:radio[name='id_salestate']:checked").val(),
				saledate:$("input:radio[name='id_saledate']:checked").val(),
				saleamount1:$("#id_saleamount1").val(),
				saleamount2:$("#id_saleamount2").val()
			},
			dataType:"json",
			success: function (data) {
				$("#showsale").empty();
				//alert("请求成功！");
				if(data.status){
					alert(data.detail);
					var msg = data.message;
					for(i=0;i<msg.length;i++){
						  var html=" <ul class='title'><li><label class='title1' >"+msg[i].saleno+"</label></li>"+
						  "<li><label class='title1' >"+msg[i].stano+"</label></li>"+
						  "<li><label class='title1' >"+msg[i].comno+"</label></li>"+
						  "<li><label class='title4' >"+msg[i].comname+"</label></li>"+
						  "<li><label class='title1' >"+msg[i].saleamount+"</label></li>"+
						  "<li><label class='title1' >"+msg[i].date+"</label></li></ul><br/>";
						  $("#showsale").append(html);
					}
				}else{
					alert(data.detail);
				}
			},
			error:function(jqXHR){
				alert("发生错误："+jqXHR.status);
			}
		});
	});
	//insert
	$("#insale").bind("click",function(){
		//alert("saleseek");
		$.ajax({
			url: "../InsertSale",
			type: "post",
			data:{
				comno:$("#insalecomno").val(),
				saleamount:$("#insaleamount").val(),
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
})
