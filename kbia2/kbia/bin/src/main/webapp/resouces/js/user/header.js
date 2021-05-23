$(document).ready(function() {
	var author = $("#author").val();
	$('.headerA').click(function(){
    	var id_check = $(this).attr("id");
		switch(id_check) {
		  case "industryStat":
		    if(author != "U2" && author != "U4"){
				alert("유료회원만 이용 가능한 서비스입니다.(문의:02-3461-9405)");
				event.preventDefault();
			}
		  break;
		  default:
		    // code block
		}
	});

});


