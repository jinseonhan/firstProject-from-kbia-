$(document).ready(function() {
	//권한관리
	var author = $("#sessionAuthor").val();
	$('.headerA').click(function(){
    	var id_check = $(this).attr("id");
		switch(id_check) {
		  	case "industryStat": //산업통계
		    if(author != "U2" && author != "U3" && author != "U4"){
				alert("준회원이상 이용 가능한 서비스입니다.(문의:02-3461-9405)");
				event.preventDefault();
			}
			break;
			case "brief": //브리프
		    if(author != "U2" && author != "U4"){
				alert("정회원이상 이용 가능한 서비스입니다.(문의:02-3461-9400)");
				event.preventDefault();
			}
			break;
			case "battery": //베터리
		    if(author != "U2" && author != "U4"){
				alert("정회원이상 이용 가능한 서비스입니다.(문의:02-3461-9400)");
				event.preventDefault();
			}
			break;
			case "tRoom": //기술자료실
		    if(author != "U2" && author != "U4"){
				alert("정회원이상 이용 가능한 서비스입니다.(문의:02-3461-9400)");
				event.preventDefault();
			}
			break;
			case "tTrends": //기술동향
		    if(author != "U2" && author != "U4"){
				alert("정회원이상 이용 가능한 서비스입니다.(문의:02-3461-9400)");
				event.preventDefault();
			}
		 	break;
			case "aTrends": //유관
		    if(author != "U2" && author != "U4"){
				alert("정회원이상 이용 가능한 서비스입니다.(문의:02-3461-9400)");
				event.preventDefault();
			}
		 	break;
		  default:
		    // code block
		}
	});

});


