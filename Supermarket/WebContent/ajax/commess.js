/**
 * 
 */
/*function creatParameter(){
	var a;
	alert($("#all").prop("checked"));
	if($("#all").prop("checked")==true){
		
		a="true";
	}
	else
		a="false";
	alert("all:"+a);
	alert("comno:"+$("#comno").val());
	alert("comname:"+$("#comname").val());
	alert("sortno:"+$("#sortno").val());
	alert("price1:"+$("#price1").val());
	alert("price2:"+$("#price2").val());
}*/
$(function(){
	$("#seek").bind("click",function(){
		//alert("searchcom");
		$.ajax({
			url: "../SearchCom",
			type: "post",
			data:{
				all:$("#all").prop("checked"),
				comname:$("#comname").val(),
				comno:$("#comno").val(),
				sortno:$("#sortno").val(),
				price1:$("#price1").val(),
				price2:$("#price2").val()
			},
			dataType:"json",
			success: function (data) {
				$("#comprint").empty();
				//alert("请求成功！");
				if(data.status){
					alert(data.detail);
					var msg = data.message;
					for(i=0;i<msg.length;i++){
						  var html="<ul class='title'>"+
						  	"<li><label class='title1' >"+msg[i].comno+"</label></li>"+
					        "<li><label class='title4' >"+msg[i].comname+"</label></li>"+
					        "<li><label class='title1' >"+Math.round(msg[i].price*100)/100+"</label></li>"+
					        "<li><label class='title1' >"+msg[i].sortname+"</label></li>"+
					        "<li><label class='title1' >"+msg[i].wareamount+"</label></li></ul><br/>";
						  $("#comprint").append(html);
					}
				}else{
					alert(data.detail);
				}
			},
			error:function(jqXHR){
				alert("发生错误："+jqXHR.status);
			}
		});
	})
});