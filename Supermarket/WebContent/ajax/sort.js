/**
 * 
 */
function AlterSort(a){
	var sortno = $(a).attr("name");
	//alert(sortno);
	$("#altersure").attr("name",sortno);
}

function DeleteSort(d){
	var sortno = $(d).attr("name");
	$.ajax({
		url: "../DeleteSort",
		type: "post",
		data:{
			sortno:sortno
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
}


$(function(){
	$("#sortseek").bind("click",function(){
		$("#ss_print").empty();
		$.ajax({
			url: "../ShowSort",
			type: "POST",
			data:{
				all:$("#sortall").prop("checked"),
				sortno:$("#id_sortno1").val()
			},
			dataType:"json",
			success: function (data) {
				if(data.status){
					alert(data.detail);
					var msg=data.message;
					for(i=0;i<msg.length;i++){
						var html="<ul class='title12'><li><label class='title4'>"+msg[i].sortno+"</label></li>"+
							"<li><label class='title4'>"+msg[i].sortname+"</label></li>"+
							"<li><input type='button' class='button' name='"+msg[i].sortno+"' id='"+msg[i].sortno+"' data-uk-modal='' value='修改' onclick='AlterSort(this)'/>"+
							"<input type='button' class='button' name='"+msg[i].sortno+"' onclick='DeleteSort(this)' value='删除'/></li></ul>";
						$("#ss_print").append(html);
						$("#"+msg[i].sortno).attr("data-uk-modal","{target:'#sortchange'}");
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
	//插入sort
	$("#insertsort").bind("click",function(){
		//alert("insertsort");
		$.ajax({
			url: "../InsertSort",
			type: "post",
			data:{
				sortname:$("#id_sortname3").val()
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
	
	//修改
	$("#altersure").bind("click",function(){
		//alert("altersort");
		var sort = $("#altersure").attr("name");
		$.ajax({
			url: "../AlterSort",
			type: "post",
			data:{
				sortno:sort,
				sortname:$("#id_sortname2").val()
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