$(document).ready(function() {
	var lnbset1 = $("#lnbset1").val();
	var lnbset2 = $("#lnbset2").val();
	
	var mainCurr = $('#'+lnbset1);
	var dtlCurr = $('#'+lnbset2);

	$("#navi").find("li").removeClass('curr'); //현채 curr 제거
	$("#"+lnbset1).addClass('curr');  
	$("#"+lnbset2).addClass('curr');  
	$("#dtlPath").hide();
	$("#"+lnbset1).find("ul").show();

	var author = $("#sessionAuthor").val();
	var authorList = author.split(",");
	
	$("li.authorList").on("click",function(){
		var answer="N";
//		console.log($(this).children().val());
		var mine = $(this).children().val();
		for(var i=0;i<authorList.length;i++){
			if(mine==authorList[i]){
				answer="Y";
			}
		}
			if(answer=="N"){
				alert("권한이 없습니다.");
				return false;
			}
	});
});