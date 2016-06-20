/**
 * 
 */
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
						  "<li><input type='button' class='button' name='"+msg[i].stano+"' id='d"+msg[i].stano+"' data-uk-modal='' value='详情'/>"+
						  "<input type='button' class='button' name='"+msg[i].stano+"' id='a"+msg[i].stano+"' data-uk-modal='' value='修改'/>"+
						  "<input type='button' class='button' name='"+msg[i].stano+"' onclick='display2()' value='删除'/></li></ul>";
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
});