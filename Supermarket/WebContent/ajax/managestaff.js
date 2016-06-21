/**
 * 
 */
//删除员工
function deletestaff(d){
	var stno=$(d).attr("name");
	alert(stno);
	$.ajax({
		url: "../StaffDelete",
		type: "POST",
		data:{
			stano:stno
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


//传递参数
function SendStano(b){
	var stano=$(b).attr("name");
	$("#sure").attr("name",stano);
}

//显示详细信息
function ShowStaff(b){
	alert("name")
	var stno = $(b).attr("name");
	$("#id_dstano").html(stno);
	$.ajax({
		url: "../StaffShow",
		type: "get",
		data:{
			all:"false",
			stano:stno,
			account:"",
			name:""
		},
		dataType:"json",
		success: function (data) {
			if(data.status){
				alert(data.detail);
				var msg = data.message;
				$("#id_dstaname").html(msg[0].name);
				$("#id_daccount").html(msg[0].account);
				$("#id_dpwd").html(msg[0].pwd);
				if(msg[0].sex==1){
					$("#id_dsex").html("男");
				}else{
					$("#id_dsex").html("女");
				}
				$("#id_dtele").html(msg[0].tele);
				if(msg[0].identity==1){
					$("#id_dauthority").html("管理员");
				}else{
					$("#id_dauthority").html("员工");
				}
				$("#id_dbirthday").html(msg[0].birthday);
				
			}else{
				alert(data.detail);
			}
		},
		error:function(jqXHR){
			alert("发生错误："+jqXHR.status);
		}
	});
}
//查询和显示员工信息
$(function(){
	$("#seekstaff").bind("click",function(){
		alert("managestaff");
		$.ajax({
			url: "../StaffShow",
			type: "get",
			data:{
				all:$("#staffall").prop("checked"),
				stano:$("#id_stano1").val(),
				account:$("#id_account1").val(),
				name:$("#id_staname1").val(),
			},
			dataType:"json",
			success: function (data) {
				$("#showstaff").empty();
				alert("请求成功！");
				if(data.status){
					alert(data.detail);
					var msg = data.message;
					for(i=0;i<msg.length;i++){
						  var html="<ul class='title'><li><label class='title1' id='id_pstano'>"+msg[i].stano+"</label></li>"+			 
						  "<li><label class='title1' id='id_pstaname'>"+msg[i].name+"</label></li>"+
						  "<li><label class='title2' id='id_paccount'>"+msg[i].account+"</label></li>"+
						  "<li><label class='title2' id='id_ptele'>"+msg[i].tele+"</label></li>"+ 
						  "<li><input type='button' class='button' name='"+msg[i].stano+"' id='d"+msg[i].stano+"' data-uk-modal='' value='详情' onclick='ShowStaff(this)'/>"+
						  "<input type='button' class='button' name='"+msg[i].stano+"' id='a"+msg[i].stano+"' data-uk-modal='' value='修改' onclick='SendStano(this)'/>"+
						  "<input type='button' class='button' name='"+msg[i].stano+"' onclick='deletestaff(this)' value='删除'/></li></ul>";
						  $("#showstaff").append(html);
						  $("#d"+msg[i].stano).attr("data-uk-modal","{target:'#detailpart'}");
						  $("#a"+msg[i].stano).attr("data-uk-modal","{target:'#staffchange'}");
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
	$(function(){
		$("#insert").bind("click",function(){
			alert("staffinsert");
			$.ajax({
				url: "../StaffInsert",
				type: "POST",
				data:{
					account:$("#id_caccount").val(),
					staname:$("#id_cstaname").val(),
					pwd:$("#id_cpwd").val(),
					sex:$("#insertradio :radio").val(),
					tele:$("#id_ctele").val(),
					birthday:$("#id_dbirthday").val()
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
	
//修改员工信息	
	$("#sure").bind("click",function(){
		alert("staffalter");
		var button=this;
		var stno=$(button).attr("name");
		$.ajax({
			url: "../StaffAlter",
			type: "POST",
			data:{
				stano:stno,
				staname:$("#id_acstaname").val(),
				pwd:$("#id_acpwd").val(),
				sex:$("#alterstaff :radio").val(),
				tele:$("#id_actele").val(),
				birthday:$("#id_adbirthday").val()
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

