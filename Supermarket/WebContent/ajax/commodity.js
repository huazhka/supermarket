/**
 * 
 */
function AlterCom(ac){
	var comno = $(ac).attr("name");
	//alert(comno);
	$("#bcomno").attr("name",comno);
}

//删除
function DeleteCom(d){
	var cono = $(d).attr("name");
	//alert(cono);
	$.ajax({
		url: "../DeleteCom",
		type: "post",
		data:{
			comno:cono,		
		},
		dataType:"json",
		success: function (data) {
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
}


$(function(){
	//alert("commodity");
	$("#searchcom").bind("click",function(){
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
				$("#printlight").empty();
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
					        "<li><label class='title1' >"+msg[i].wareamount+"</label></li>" +
					        "<li><div class='title1'><input type='button' class='button' name='"+msg[i].comno+"' id='"+msg[i].comno+"' data-uk-modal='' value='修改' onclick='AlterCom(this)'/>"+
                            "<input type='button' class='button' name='"+msg[i].comno+"' onclick='DeleteCom(this)' value='删除'/></div></li></ul><br/>";
						  $("#printlight").append(html);
						  $("#"+msg[i].comno).attr("data-uk-modal","{target:'#comesschange'}");
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
	
	
	//修改
	$("#bcomno").bind("click",function(){
		//alert("altercom");
		var cono = $(this).attr("name");
		//alert(cono);
		$.ajax({
			url: "../AlterCom",
			type: "post",
			data:{
				comno:cono,
				comname:$("#altercomname").val(),
				price:$("#alterprice").val(),
				sortno:$("#altercomsort").val(),			
			},
			dataType:"json",
			success: function (data) {
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
	})
	
	//插入
	$("#insertcom").bind("click",function(){
		//alert("insertcom");
		$.ajax({
			url: "../InsertCom",
			type: "post",
			data:{
				comname:$("#insertcomname").val(),
				price:$("#insertcomprice").val(),
				sortno:$("#insertcomsort").val(),			
			},
			dataType:"json",
			success: function (data) {
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
	})
});