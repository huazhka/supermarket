/**
 * 
 */
//showdatial
function ShowDatail(d){
	var reno=d;
	//alert(reno);
	$.ajax({
		url: "../ShowRestock",
		type: "post",
		data:{
			all:'false',
			resno:reno,
			stano:"",
			comno:"",	
			time:"",	
			reamount1:"",	
			reamount2:"",	
		},
		dataType:"json",
		success: function (data) {
			if(data.status){
				alert(data.detail);
				var msg = data.message;
				$("#dresno").html(msg[0].resno);
				$("#dcomname").html(msg[0].comname);
				$("#dstaname").html(msg[0].staname);
				$("#dreamount").html(msg[0].reamount);
				$("#ddate").html(msg[0].redate);	
				$("#dreason").html(msg[0].reason);
			}else{
				alert(data.detail);
			}
		},
		error:function(jqXHR){
			alert("发生错误："+jqXHR.status);
		}
	});
}


//show
$(function(){
	$("#restockseek").bind("click",function(){
		//alert("restock");
		$.ajax({
			url: "../ShowRestock",
			type: "post",
			data:{
				all:$("#restockall").prop("checked"),
				resno:$("#restockresno").val(),
				stano:$("#restockstano").val(),
				comno:$("#restockcomno").val(),	
				time:$("#restocktime").val(),	
				reamount1:$("#restockreamount1").val(),	
				reamount2:$("#restockreamount2").val(),	
			},
			dataType:"json",
			success: function (data) {
				if(data.status){
					alert(data.detail);
					$("#showrestock").empty();
					var msg=data.message;
					for(i=0;i<msg.length;i++){
						var html="<ul class='title'><li><label class='title1' >"+msg[i].resno+"</label></li>"+
						"<li><label class='title2' >"+msg[i].comname+"</label></li>"+
						"<li><label class='title1' >"+msg[i].staname+"</label></li>"+
						"<li><label class='title1' >"+msg[i].reamount+"</label></li>"+
						"<li><input type='button' class='button' id='"+msg[i].resno+"' data-uk-modal='' value='详情' onclick='ShowDatail("+msg[i].resno+")'/></li>"+
						"</ul><br>";
						$("#showrestock").append(html);
						$("#"+msg[i].resno).attr("data-uk-modal","{target:'#restockdetail'}");
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
	$("#insertrestock").bind("click",function(){
		//alert("restock");
		$.ajax({
			url: "../InsertRestock",
			type: "post",
			data:{
				comno:$("#insertcomno").val(),
				reamount:$("#insertreamount").val(),
				reason:$("#insertreason").val()
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
	});
});
	