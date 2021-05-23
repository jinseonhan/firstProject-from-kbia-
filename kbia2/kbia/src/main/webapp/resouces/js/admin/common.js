// LAYOUT
function fn_layout() {
	var header = $("#header"),
		util = header.find(".util"),
		btnMenu = header.find(".btnMenu"),
		gnb = header.find("#gnb"),
		btnMenuClose = gnb.find(".btnMenuClose"),
		depth01 = gnb.find("> ul > li");

	depth01.find("ul").wrap("<div>");
	var depth02 = depth01.find("> div"),
		curr = gnb.find("> ul > li.curr").index();
	depth01.on({
		mouseenter : function(){
			depth01.removeClass("curr");
			$(this).find("div").show().clearQueue();
		},
		mouseleave : function(){
			depth01.eq(curr).addClass("curr");
			$(this).find("div").hide().clearQueue();
		}
	});
	
	depth01.focusin(function() {
		$(this).find("div").show();
	});
	
	depth02.find("li:last-child").focusout(function() {
		$(this).parent().hide();
	});

	btnMenu.click(function() {
		gnb.addClass("open");
		util.animate({"right":"20px"},200);
		$("html, body").css({"overflow":"hidden"});
	});

	btnMenuClose.click(function() {
		gnb.removeClass("open");
		util.animate({"right":"-300px"},200);
		$("html, body").css({"overflow-y":"auto"});
	});

	var lnb = $(".lnb");
	lnb.find("> ul > li").has("ul").addClass("more");
	lnb.find("> ul > li.more.curr ul").slideDown(0);
	lnb.find("> ul > li.more > a").click(function(e) {
		e.preventDefault();
		if($(this).parent().hasClass("on")) {
			lnb.find("> ul > li.more").removeClass("on curr");
			lnb.find("> ul > li.more ul").slideUp(200);
		} else {
			lnb.find("> ul > li.more").removeClass("on curr");
			lnb.find("> ul > li.more ul").slideUp(200);
			$(this).parent().addClass("on");
			$(this).parent().find("ul").slideDown(200);
		}
	});
}


$(function() {
	/*>>>>> 공통 <<<<<*/
	// LAYOUT
	fn_layout();

	// 셀렉트박스
	var selectBox = $('.selectbox select');
	selectBox.change(function() {
		var selectName = $(this).children('option:selected').text();
		$(this).siblings('span').text(selectName);
	});
	selectBox.each(function() {
		var selectName = $(this).children('option:selected').text();
		$(this).siblings('span').text(selectName);
	});

	// 데이트피커
	$(".date input").datepicker({
		dateFormat: 'yy-mm-dd',
		showOtherMonths: true,
		showMonthAfterYear:true,
		changeYear: true,
		changeMonth: true,          
		showOn: "both",
		buttonImage: "/resouces/images/admin/btn-date.png",
		buttonImageOnly: true,
		buttonText: "선택",
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일']               
	});

	// 파일 선택
	var inputFile = $(".file").find("input[type=file]");
	inputFile.change(function(){
		var i = $(this).val();
		$(this).siblings("input").val(i);
	});

	/*var file = $(".file");
	file.each(function(){
		var inputFile = $(this).find("input[type=file]"),
			inputText = $(this).find("input[type=text]");
		inputFile.change(function(){
			var i = $(this).val();
			inputText.val(i);
		});
	});*/

	// 탭
	tabArea = $(".tabFunc");
	tabArea.each(function(){
		var btnTab = $(this).find("> ul li a"),
			tabBox = $(this).find(".tabContArea > div"),
			liCurr = $(this).find("> ul li.curr").index();
		
		tabBox.not(":eq("+ liCurr +")").hide();

		btnTab.click(function(e){
			e.preventDefault();
			var i = $(this).parent().index();
			btnTab.parent().removeClass("curr");
			$(this).parent().addClass("curr");
			tabBox.hide();
			tabBox.eq(i).show();
		});
	});
	/*>>>>> 페이지 <<<<<*/
	
	//글자 byte 수 제한
    $('.byteLimit').keyup(function(){         
        var thisObject = $(this);
        var limit = thisObject.attr("limitbyte"); //제한byte를 가져온다.
        var str = thisObject.val();
        var strLength = 0;
        var strTitle = "";
        var strPiece = "";
        var check = false;
                
        for (i = 0; i < str.length; i++){
            var code = str.charCodeAt(i);
            var ch = str.substr(i,1).toUpperCase();
            //체크 하는 문자를 저장
            strPiece = str.substr(i,1)
            
            code = parseInt(code);
            
            if ((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") && ((code > 255) || (code < 0))){
                strLength = strLength + 3; //UTF-8 3byte 로 계산
            }else{
                strLength = strLength + 1;
            }       
            if(strLength>limit){ //제한 길이 확인
                check = true;
                break;
            }else{
                strTitle = strTitle+strPiece; //제한길이 보다 작으면 자른 문자를 붙여준다.
            }     
        }
        thisObject.val(strTitle); 
    });

	//숫자만
	$("input:text[numberOnly]").on("keyup", function() {
		$(this).val($(this).val().replace(/[^0-9]/g,""));
	});
	
	//날짜형식이 맞는지 확인
	$(".date").find("input:text").blur(function() {
		if( $(this).val() != "" &&  $(this).val() != null){
			if(!isDate( $(this).val().replace(/-/gi,"") )){
				alert("날짜형식에 맞지 않습니다.");
				$(this).val(null);
				return ;	
			}
		}
	});
	
	

});
//fileDivId, 파일위치, 넣을 파일 갯수, boardType, boardNo, url
function fileViewSetting(divId, filePath, num, boardType, boardNo){

	var addClickNum = 1;
	var fileNum = 1; //삭제번호
	var fileDiv = $("#"+divId);
	var basicHtml = '<div class="file" id="dtlFile'+filePath+fileNum+'" name="dtlFile'+filePath+fileNum+'" style="margin-top:10px;">'
	var fileHtml = '<input type="text" class="fileN'+filePath+'" id="fileN'+filePath+fileNum+'" name="'+filePath+fileNum+'" title="첨부파일 명">';
	fileHtml += '<input type="file" class="inputFile'+filePath+'" id="'+filePath+fileNum+'" name="upLoad'+filePath+fileNum+'" title="파일 첨부"></div>';
	var addHtml = '<button class="btn btnGray" id="fileAdd'+filePath+'"  style="margin-left: 11px; margin-top:10px;">추가</button>';
	var delHtml = '<button class="btn btnGray" id="fileDel'+filePath+'" name="del'+fileNum+'" style="margin-left: 11px; margin-top:10px;">삭제</button>';
	var hiddenHtml = '';
	if(boardType != null){
		$.ajax({
			type : 'POST'
			, url : '/admin/fileList.do'
			, async: false
			, data : {
				"refIdx" : boardNo,
				"refType" : boardType,
				"subFilePath" : filePath
			}
			, dataType : 'json'//xml,json,local 3형식 
			, success : function(data) {
			
				var forNum=0;
				
				for(var i=0; i<data.length; i++){
					var dataIdx=data[i].idx;
					var dataDelYn=data[i].delYn;
					var dataFilePath = data[i].filePath;
					var dataOgnFileNm = data[i].ognFileNm;
					var filePathChk = dataFilePath.substring(dataFilePath.length-filePath.length-1, dataFilePath.length-1);	
					if(filePathChk == filePath){
						forNum++;
						hiddenHtml = '<input type="hidden" class="idx'+filePath+'" id="idx_'+dataIdx+'" value="'+dataIdx+'"></input>';
						hiddenHtml += '<input type="hidden" class="delYn'+filePath+'" id="delYn_'+dataIdx+'" name="delYn_'+filePath+fileNum+'" value="'+dataDelYn+'"></input>';
						//해당 fileDiv에 첫번째 세팅
						var newHtml = '<div id="delDiv_'+fileNum+'_'+filePath+'">';
						newHtml += '<div class="file" id="dtlFile'+filePath+fileNum+'" name="dtlFile'+filePath+fileNum+'" style="margin-top:10px;">'
						fileHtml = '';
						fileHtml += '<input type="text" class="fileN'+filePath+'" id="fileN'+filePath+fileNum+'" name="'+filePath+fileNum+'" value="'+dataOgnFileNm+'"title="첨부파일 명">';
						fileHtml += '<input type="file" class="inputFile'+filePath+'" id="'+filePath+fileNum+'" name="upLoad'+filePath+fileNum+'" title="파일 첨부"></div>';
						newHtml += fileHtml;
						delHtml = '<button class="btn btnGray" id="fileDel'+filePath+'" name="del'+fileNum+'" style="margin-left: 11px; margin-top:10px;">삭제</button>';		
						newHtml += delHtml;
						newHtml += addHtml;
						newHtml += '</div>'
						newHtml += hiddenHtml;
						fileDiv.append(newHtml);
						newHtml = '';
						fileNum++;
					}
				}

				if(data.length==0){
					forNum++;
					//해당 fileDiv에 첫번째 세팅
					var newHtml = '<div id="delDiv_'+fileNum+'_'+filePath+'">';
					newHtml += '<div class="file" id="dtlFile'+filePath+fileNum+'" name="dtlFile'+filePath+fileNum+'" style="margin-top:10px;">'
					fileHtml = '';
					fileHtml += '<input type="text" class="fileN'+filePath+'" id="fileN'+filePath+fileNum+'" name="'+filePath+fileNum+'" value=""title="첨부파일 명">';
					fileHtml += '<input type="file" class="inputFile'+filePath+'" id="'+filePath+fileNum+'" name="upLoad'+filePath+fileNum+'" title="파일 첨부"></div>';
					newHtml += fileHtml;
					delHtml = '<button class="btn btnGray" id="fileDel'+filePath+'" name="del'+fileNum+'" style="margin-left: 11px; margin-top:10px;">삭제</button>';		
					newHtml += delHtml;
					newHtml += addHtml;
					newHtml += '</div>'
					newHtml += hiddenHtml;
					fileDiv.append(newHtml);
					newHtml = '';
					fileNum++;
				}
			}
		});//end ajax	
	} else{
		//해당 fileDiv에 첫번째 세팅
		var firstHtml = '<div id="delDiv_'+fileNum+'_'+filePath+'">'+basicHtml;
		firstHtml += fileHtml;
		if(num > 1){
			firstHtml += delHtml;
			firstHtml += addHtml;
		}
		firstHtml += '</div>'
		fileDiv.append(firstHtml);
	}
	
	//파일을 넣엇을시
	$(document).on('change','.inputFile'+filePath,function(){
		var clickText = $(this).attr('name');
		var fullStr = clickText;
		var lastChar = fullStr.charAt(fullStr.length-1); //열  
		if($(this)[0].files[0] != null && $(this)[0].files[0] != '' && $(this)[0].files[0] != 'undefined'){
			var fileName = $(this)[0].files[0].name;
			if(boardType != null){
				$("input[name=delYn_"+filePath+lastChar+"]").val('Y');
			}
			fileDiv.find("input[name="+filePath+lastChar+"]").val(fileName);
		}else{ //파일 찾아보기를 열었다가 닫아서 파일을 못담았을시
			fileDiv.find("input[name="+filePath+lastChar+"]").val('');
		}
	}); 
	
	//파일 추가버튼
	$(document).on('click','#fileAdd'+filePath,function(){
		var length = $("#"+divId).find(".file").length;
		if( length >= num) {
			alert("더이상 추가 할 수 없습니다.");
			return;
		}
		fileNum++;
		
		var newHtml = '<div id="delDiv_'+fileNum+'_'+filePath+'">';
		newHtml += '<div class="file" id="dtlFile'+filePath+fileNum+'" name="dtlFile'+filePath+fileNum+'" style="margin-top:10px;">'
		fileHtml = '';
		fileHtml += '<input type="text" class="fileN'+filePath+'" id="fileN'+filePath+fileNum+'" name="'+filePath+fileNum+'" title="첨부파일 명">';
		fileHtml += '<input type="file" class="inputFile'+filePath+'" id="'+filePath+fileNum+'" name="upLoad'+filePath+fileNum+'" title="파일 첨부"></div>';
		newHtml += fileHtml;
		delHtml = '<button class="btn btnGray" id="fileDel'+filePath+'" name="del'+fileNum+'" style="margin-left: 11px; margin-top:10px;">삭제</button>';
		
		newHtml += delHtml;
		newHtml += addHtml;
		
		newHtml += '</div>'
		fileDiv.append(newHtml);
		newHtml = '';	
	});
	
	//파일 삭제
	$(document).on('click','#fileDel'+filePath,function(){
		var length = $("#"+divId).find(".file").length;	
		var clickText = $(this).attr('name');
		var fullStr = clickText;
		var lastChar = fullStr.charAt(fullStr.length-1); //열   
		if(length == 1) {
			alert("더이상 줄일 수 없습니다.");
			return;
		}
		if(boardType != null){
			$("input[name=delYn_"+filePath+lastChar+"]").val('Y');
		}
		$("div").remove("#delDiv_"+lastChar+'_'+filePath);
		
	});
}
//fileDivId, 파일위치, FormData명, insert/updqte 상태, 파일필수값 체크, file이미지 check
function fileParamSetting(divId, filePath, registData, state, fileValid, fileCheck){
	var resultReturn = true;
	//필수값체크 기본 false;
	if(fileValid != null && fileValid == ''){
		fileValid = false;
	}
	//file 이미지 기본 false;
	if(fileCheck != null && fileCheck == ''){
		fileValid = false;
	}
	var length = $("#"+divId).find(".fileN"+filePath).length;
	var fileNum = $.makeArray($(".fileN"+filePath).map(function(){
		var clickText = $(this).attr("name");
		var fullStr = clickText;
		var lastChar = fullStr.charAt(fullStr.length-1); //열 
	    return lastChar;
	}));
	
	if(state=='insert'){
		
		for(var i=1; i<=length; i++){
			var upFile = $("input[name=upLoad"+filePath+fileNum[i-1]+"]")[0].files[0];
	
			//파일검사
			if(fileValid == true && (upFile == null || upFile == '' || upFile == 'undefined')){
				alert("넣지 않은 파일이 있습니다.");
				resultReturn = false;
				return resultReturn;
			}
			if(fileCheck && upFile != null && upFile != '' && upFile != 'undefined'){
				var fileCk = imgCheck(upFile);
				if(!fileCk){
					resultReturn = false;
					return resultReturn;
				}
			}
			registData.append(filePath+i, upFile);
		}
	}else if(state=='update'){	
		
		$.makeArray($(".fileN"+filePath).map(
			function(){
				var fileNm = $(this).val();
				if(fileValid == true && (fileNm == null || fileNm == '' || fileNm == 'undefined')){
					alert("넣지 않은 파일이 있습니다.");
					resultReturn = false;
					return resultReturn;
				}
			})
		);//end array
		var fileNum = 0;
		$.makeArray($(".inputFile"+filePath).map(
			function(){
				var fileval = $(this).val();
				if(fileval != null && fileval != ''){
					fileNum++;
					var upFile = $(this)[0].files[0];
					if(fileCheck){
						var fileCk = imgCheck(upFile);
						if(!fileCk){
							resultReturn = false;
							return resultReturn;
						}
					}
					registData.append(filePath+fileNum, upFile);
				}			
			})
		);//end array
		
	
		var arrayDelYn=[];
		fileNum=0;
		$.makeArray($(".delYn"+filePath).map(
			function(){
				var delYnVal = $(this).val();
				arrayDelYn[fileNum] = delYnVal;
				fileNum++;
			})
		);
		var key = "delYn" + String(filePath);
		registData.append(key, arrayDelYn);

		var arrayIdx=[];
		fileNum=0;
		$.makeArray($(".idx"+filePath).map(
			function(){
				var idxVal = $(this).val();
				arrayIdx[fileNum] = idxVal;
				fileNum++;
			})
		);
		var key = "idx" + String(filePath);
		registData.append(key, arrayIdx);
		
	}
	
	return resultReturn;	
}

// 파일 저장 유효성 체크
function imgCheck(obj){
	var pathpoint=obj.name.lastIndexOf('.');
	var filepoint =obj.name.substring(pathpoint+1,obj.length);
	console.log(filepoint);
	console.log(pathpoint);
	var filetype=filepoint.toLowerCase();
	if(filetype=='jpg'||filetype=='gif'||filetype=='png'||filetype=='jpeg'||filetype=='bmp'){
		return true;
	}else{
		alert('이미지 파일만 선택할 수 있습니다.');
		var parentObj =obj.parentNode;
		var node=parentObj.replaceChild(obj.cloneNode(true),obj);
		return false;	
	}
	
	if(filetype=='bmp'){
		var upload=confirm('BMP 파일은 웹상에서 사용하기엔 적절한 이미지 포맷이 아닙니다.\n 그래도 계속 업로드하시겠습니까?');
		if(!upload)
		return false;
	}
}


/* 날짜 리턴 월,일 2자리수*/
function getDateStr(myDate){
	var year = myDate.getFullYear();
	var month = ("0"+(myDate.getMonth()+1)).slice(-2);
	var day = ("0"+myDate.getDate()).slice(-2);
	return ( year + '-' + month + '-' + day );
}


/* 오늘 날짜 */
function today() {
	var d = new Date();
	return getDateStr(d);
}


/* 오늘로부터 며칠전 날짜 */
function prevDay(days) {
	var d = new Date();
	var dayOfMonth = d.getDate();
	d.setDate(dayOfMonth - days);
	return getDateStr(d);
}



/* 오늘로부터 몇개월전 날짜 */
function prevMonth(month) {
	var d = new Date();
	var monthOfYear = d.getMonth();
	d.setMonth(monthOfYear - month);
	return getDateStr(d);
}

//문자가 날짜형이 맞는지 체크 20180101           
function isDate(txtDate) {
    var currVal = txtDate;
    if (currVal == '')
        return false;
 
    var rxDatePattern = /^(\d{4})(\d{1,2})(\d{1,2})$/; //Declare Regex                  
    var dtArray = currVal.match(rxDatePattern); // is format OK?
 
    if (dtArray == null)
        return false;
 
    //Checks for yyyymmdd format.
    dtYear = dtArray[1];
    dtMonth = dtArray[2];
    dtDay = dtArray[3];
 
    //alert(dtArray);
    //alert(dtYear);
    //alert(dtMonth);
    //alert(dtDay);
 
    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}

/**
 * 바이트 문자 입력가능 문자수 체크
 * 
 * @param id : tag id 
 * @param title : tag title
 * @param maxLength : 최대 입력가능 수 (byte)
 * @returns {Boolean}
 */
function maxLengthCheck(id, title, maxLength){
     var obj = $("#"+id);
     if(maxLength == null) {
         maxLength = obj.attr("maxLength") != null ? obj.attr("maxLength") : 1000;
     }
     
     if(Number(byteCheck(obj)) > Number(maxLength)) {
         alert(title + "이(가) 입력가능문자수를 초과하였습니다.\n(영문, 숫자, 일반 특수문자 : " + maxLength + " / 한글, 한자, 기타 특수문자 : " + parseInt(maxLength/3, 10) + ").");
         obj.focus();
         return false;
     } else {
         return true;
    }
}
 
/**
 * 바이트수 반환  
 * 
 * @param el : tag jquery object
 * @returns {Number}
 */
function byteCheck(el){
    var codeByte = 0;
    for (var idx = 0; idx < el.val().length; idx++) {
        var oneChar = escape(el.val().charAt(idx));
        if ( oneChar.length == 1 ) {
            codeByte ++;
        } else if (oneChar.indexOf("%u") != -1) {
            codeByte += 2;
        } else if (oneChar.indexOf("%") != -1) {
            codeByte ++;
        }
    }
    return codeByte;
}


/**
*
*  Secure Hash Algorithm (SHA256)
*  http://www.webtoolkit.info/
*  Original code by Angel Marin, Paul Johnston.
*
**/

function SHA256(s) {
    var chrsz   = 8;
    var hexcase = 0;

    function safe_add (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    function S (X, n) {return (X >>> n) | (X << (32 - n));}

    function R (X, n) {return ( X >>> n );}

    function Ch(x, y, z) {return ((x & y) ^ ((~x) & z));}

    function Maj(x, y, z) {return ((x & y) ^ (x & z) ^ (y & z));}

    function Sigma0256(x) {return (S(x, 2) ^ S(x, 13) ^ S(x, 22));}

    function Sigma1256(x) {return (S(x, 6) ^ S(x, 11) ^ S(x, 25));}

    function Gamma0256(x) {return (S(x, 7) ^ S(x, 18) ^ R(x, 3));}

    function Gamma1256(x) {return (S(x, 17) ^ S(x, 19) ^ R(x, 10));}

    function core_sha256 (m, l) {	
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;

        for ( var i = 0; i<m.length; i+=16 ) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];

            for ( var j = 0; j<64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));
                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }

            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }

        return HASH;
    }

    function str2binb (str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;

        for(var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
        }

        return bin;
    }

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {	
            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}

		return utftext;
	}

	function binb2hex (binarray) {
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";

		for(var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
		}

		return str;
	}

	s = Utf8Encode(s);

	return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}