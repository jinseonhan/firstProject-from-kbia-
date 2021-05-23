$(document).ready(function() {
	
	showHistory();
	
	
	/*$("#area1").click(function(){
		$("#area2").removeClass('curr'); //curr 제거
		$("#area1").addClass('curr'); 
		$("#historyArea2").css("display",'none');
		$("#historyArea1").css("display",'');		
	});
	$("#area2").click(function(){
		$("#area1").removeClass('curr'); 
		$("#area2").addClass('curr'); 
		$("#historyArea1").css("display",'none');
		$("#historyArea2").css("display",'');
		showHistory();
		
	});*/
	
	$("#langType").on("change", function(){
		showHistory();
	});
});

function showHistory(){
	$.ajax({
		type : 'POST'
		, url : '/user/showHistory.do'
		, async: false
		, data : {
			"boardType" : "HISTORY",
			"division" : "C",
			"languageType" : $("#langType").val(),
			"useYn" : 'Y'
		}
		, dataType : 'json'
		, success : function(data){
			$("#hisbody").html("");
			view();	
			function view(){
				for(var i=0; i<data.length; i++){
					var title = (data[i].title);
					var Y = (data[i].historyY);
					var M = (data[i].historyM);
					
					var html = "";
					html += "<li>";
					html += "<dl>";
					html += "<dt>"+ data[i].historyY + "</dt>";
					html += "<dd id='title'><strong id='"+ data[i].historyM + "'>" + data[i].historyM + ". </strong>"+ data[i].title + "</dd>";
					
					if(i<data.length-1){					
						while(data[i].historyY == data[i+1].historyY ){	
							console.log(data[i].historyY);
							html += "<dd id='title'><strong id='"+ data[i+1].historyM + "'>" + data[i+1].historyM + ". </strong>"+ data[i+1].title + "</dd>";
							i = i+1;	
							if(i==data.length-1){
								break;
							}
						}
					}
					html += "</dl>";
					html += "</li>";
					$("#hisbody").append(html);
					$("#hisy").html(Y);
					$("#hism").html(M);	
				} //end for
			}
		}
	});
}