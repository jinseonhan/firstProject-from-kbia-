$(document).ready(function() {
	$("#area1").click(function(){
		$("#area2").removeClass('curr'); //curr 제거
		$("#area1").addClass('curr'); 
		$("#area3").removeClass('curr'); 
		$("#infoArea2").css("display",'none');
		$("#infoArea3").css("display",'none');
		$("#infoArea1").css("display",'');		
	});
	$("#area2").click(function(){
		$("#area1").removeClass('curr'); 
		$("#area2").addClass('curr'); 
		$("#area3").removeClass('curr'); 
		$("#infoArea1").css("display",'none');
		$("#infoArea3").css("display",'none');
		$("#infoArea2").css("display",'');
		$("#container").css("min-height", '678px');
	});
	$("#area3").click(function(){
		$("#area1").removeClass('curr'); 
		$("#area3").addClass('curr'); 
		$("#area2").removeClass('curr'); 
		$("#infoArea1").css("display",'none');
		$("#infoArea2").css("display",'none');
		$("#infoArea3").css("display",'');
		$("#container").css("min-height", '678px');
	});


});
