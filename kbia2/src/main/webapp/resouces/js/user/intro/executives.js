$(document).ready(function(){
	
	getFntExcuList();
	
	$("#langType").on("change", function(){
		getFntExcuList();
	});
});

function getFntExcuList(){
	
	$.ajax({
		url : '/json/openExecutives.do',
		type : 'post',
		async : false,
		dataType :'json',
		data : {
			"languageType" : $("#langType").val(),
			"useYn" : 'Y'	
		},
		success : function(data){
			console.log(data);
			//execCode
			var html = "";
				html += '<h3>임원현황</h3>';
							
				$(data.execCode).each(function(idx,item){
					html += '<div class="titArea">'
					html += '	<h4>'+item.CODE_NM+'</h4>'
					html += '</div>'
					html += '<div class="ExecList">';
					html += '	<ul>';

					$(data.result).each(function(idx2,item2){				
						if(item.CODE_NM == item2.EXCU_TYPE){
							html +='	<li>';
							html +='		<img src="/upFile/upFile/'+item2.ST_FILE_NM+'"/>';
							html +='		<p><strong>'+item2.EXCU_NAME+'</strong>'+item2.EXCU_POSITION+'</p>';
							html +='		<p>'+item2.EXCU_COMPANY+'</p>'
							html +='	</li>';
						}
					});	
					html += '	</ul>';
					html += '</div>';
				});

				
				$(".contents").html(html);
		}/*,
			error: function (request, status, error) {
			var msg = "ERROR : " + request.status + "<br>"
			msg += + "내용 : " + request.responseText;
			console.log(msg);
		}*/
	});
};