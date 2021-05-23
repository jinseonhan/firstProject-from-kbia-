$(document).ready(function() {
	
	$("#area1").click(function(){
		$("#area2").removeClass('curr'); //curr 제거
		$("#area3").removeClass('curr'); //curr 제거
		$("#area1").addClass('curr'); 
		$("#techArea2").css("display",'none');
		$("#techArea3").css("display",'none');
		$("#techArea1").css("display",'');		
	});
	$("#area2").click(function(){
		$("#area1").removeClass('curr'); 
		$("#area3").removeClass('curr'); //curr 제거
		$("#area2").addClass('curr'); 
		$("#techArea1").css("display",'none');
		$("#techArea3").css("display",'none');
		$("#techArea2").css("display",'');
	});
	$("#area3").click(function(){
		$("#area1").removeClass('curr'); 
		$("#area2").removeClass('curr'); //curr 제거
		$("#area3").addClass('curr'); 
		$("#techArea1").css("display",'none');
		$("#techArea2").css("display",'none');
		$("#techArea3").css("display",'');
	});
});
