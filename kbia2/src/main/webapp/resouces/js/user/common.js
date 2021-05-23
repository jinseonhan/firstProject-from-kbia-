function fn_layout(){
	var header = $("#header"),
		btnMenu = header.find(".btnMenu"),
		gnb = $("#gnb"),
		gnbMenu = gnb.find(".inner > ul"),
		btnClose = gnb.find(".btnClose"),
		container = $("#container"),
		path = container.find(".path"),
		footer = $("#footer"),
		familySite = footer.find(".familySite"),
		lang = gnb.find(".inner .lang");

	btnMenu.click(function(e){
		e.preventDefault();
		gnb.fadeIn(200);
	});
	btnClose.click(function(e){
		e.preventDefault();
		gnb.fadeOut(200);
	});
	gnbMenu.find("> li").has("ul").addClass("more");
	$(window).resize(function(){
		if($(window).width() >= 1160){
			gnbMenu.find("> li.more > a").unbind("click");
		}else{
			gnbMenu.find("> li.more > a").click(function(e){
				e.preventDefault();
				gnbMenu.find("> li").removeClass("curr");
				$(this).parent().addClass("curr");
			});
		}
	}).resize();

	familySite.find("strong").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			$(this).siblings("ul").slideUp(200);
		}else{
			$(this).addClass("on");
			$(this).siblings("ul").slideDown(200);
		}
	});

	path.find(".inner > div > a").click(function(e){
		e.preventDefault();
		if($(this).hasClass("on")){
			path.find(".inner > div > a").stop().removeClass("on");
			path.find(".inner > div > ul").stop().slideUp(200);
		}else{
			path.find(".inner > div > a").stop().removeClass("on");
			path.find(".inner > div > ul").stop().slideUp(200);
			$(this).stop().addClass("on");
			$(this).siblings("ul").stop().slideDown(200);
		}
	});
	path.find(".inner > div").mouseleave(function(){
		path.find(".inner > div > a").removeClass("on");
		path.find(".inner > div > ul").slideUp(200);
	});

	$(window).resize(function(){
		container.css({"min-height":$(window).height() - header.height() - footer.height()});
	}).resize();
	
	// 언어 변경
	lang.find("> ul li a").each(function(){
		$(this).click(function(e){
			e.preventDefault();
			lang.find("> ul li").removeClass("curr");
			$(this).parent("li").addClass("curr");
			var langType = $(this).parent("li").attr("id");
			$.ajax({
				url : "/user/setLangType.do"
				, type : "post"
				, dataType : "json"
				, data : { langType : langType }
				, success : function(data){
					$("#langType").val(langType);
					$("#langType").trigger("change");
				}
			})
		})
	})
	
	// 언어에 따른 curr 추가
	var langType = $("#langType").val();
	$("#" + langType).addClass("curr");
}
// 데이터 팝업
function fn_dataPop(e,s) {
	var pdt = $("."+e).find(".inner").css('padding-top').replace(/[^-\d\.]/g, '');
	$("."+e).fadeIn(200).addClass("on").find(".inner").css({"width":s+"px"});
	$("body, html").css({"overflow":"hidden"});
	$(window).resize(function(){
		$("."+e).find(".cont").css({"max-height":($("."+e).height()*0.9) - (Number(pdt))});
		$("table.v1").each(function(){
			var table2 = $(this).next().height();
			$(this).find("tbody td").height(table2 - 26);
		});
	}).resize();
}
// 팝업 닫기
function fn_layer_close(t){
	$(t).closest(".inner").parent().fadeOut(200).removeClass("on");
	$("body, html").css({"overflow":"auto"});
}
// 지도 팝업
function fn_mapPop(e) {
	$(".mapPop").fadeOut(200).removeClass("on");
	$("."+e).fadeIn(200).addClass("on");
	$("."+e).mouseleave(function(){
		$("."+e).fadeOut(200).removeClass("on");
	});
}
$(function(){
	/*>>>>>>>>>> 공통 <<<<<<<<<<*/
	// 레이아웃
	fn_layout();

	// 스킵네비
	$("a[href^='#']").click(function(evt){
	  var anchortarget = $(this).attr("href");
	  $(anchortarget).attr("tabindex", -1).focus();
	  $(anchortarget).removeAttr("tabindex");
	 });
	if (window.location.hash) {
		$(window.location.hash).attr("tabindex", -1).focus();
	};
	var skipNav = $("#skipNav a");
	skipNav.focus(function(){
		skipNav.removeClass("on");
		$(this).addClass("on");
	});
	skipNav.blur(function(){
		skipNav.removeClass("on");
	});

	// 셀렉트 탭
	var selectTab = $(".selectTab");
	selectTab.each(function(){
		var tabBtn = $(this).find(".tabBtn"),
			btn = tabBtn.find("strong"),
			list = tabBtn.find("ul"),
			tabBox =  $(this).find(".tabBox > div");
		btn.click(function(){
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				list.slideUp(100);
			}else{
				$(this).addClass("on");
				list.slideDown(100);
			}
		});
		tabBtn.mouseleave(function(){
			list.slideUp(200);
			btn.removeClass("on");
		});
		list.find("li a").click(function(e){
			e.preventDefault();
			var i = $(this).parent().index(),
				txt = $(this).text();
			btn.text(txt).removeClass("on");
			list.slideUp(100);
			list.find("li").removeClass("on");
			$(this).parent().addClass("on");
			tabBox.hide();
			tabBox.eq(i).show();
		});
	});

	// 이미지 영역
	var imgWrap = $(".imgWrap");
	imgWrap.each(function(){
		var $this = $(this).find("img"),
			thisSrc = $this.attr("src"),
			thisSrc02 = $this.attr("src").replace(".png","")+"-m.png";
		$(window).resize(function(){
			if($(window).width() > 767){
				$this.attr("src",thisSrc);
			}else{
				$this.attr("src",thisSrc02);
			}
		}).resize();
	});

	// 셀렉트박스
	var selectBox = $('.selectBox select');
	selectBox.change(function() {
		var selectName = $(this).children('option:selected').text();
		$(this).siblings('span').text(selectName);
	});
	selectBox.each(function() {
		var selectName = $(this).children('option:selected').text();
		$(this).siblings('span').text(selectName);
	});

	/*>>>>>>>>>> 페이지 <<<<<<<<<<*/
	// 메인
	if($(".mainContents").length){
		/* 메인 배너  (main.js에서 배너 검색 후 실행)*/
		/*var mainSwiper = new Swiper('.mainSwiper', {
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: '.swiper-pagination',
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '">' + (index + 1) + '</span>';
				},
			},
		});
		var btnStop = $(".btnStop"),
			btnPlay = $(".btnPlay");
		btnStop.click(function(e){
			e.preventDefault();
			mainSwiper.autoplay.stop();
			$(this).hide();
			btnPlay.show();
		});
		btnPlay.click(function(e){
			e.preventDefault();
			mainSwiper.autoplay.start();
			$(this).hide();
			btnStop.show();
		});
		*/
		/* 공지사항 */
		var noticeSwiper = new Swiper('.noticeSwiper .inBox', {
			slidesPerView: 2,
			slidesPerColumn: 2,
			breakpoints: {
				767: {
					slidesPerView: "auto",
				},
				1160: {
					slidesPerView: 1,
				},
			}
		});
		/* KBIA 회원사 */
		/*var memCompSwiper = new Swiper('.memCompSwiper', {
			slidesPerView: "auto",
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});*/

		/* 사이트맵 */
		var siteMap = $(".siteMap .inner > ul");
		siteMap.find("> li").has("ul").addClass("more");
		siteMap.find("> li.more > a").click(function(e){
			e.preventDefault();
			if($(this).parent().hasClass("curr")){
				siteMap.find("> li").removeClass("curr");
				siteMap.find("> li ul").slideUp(200);
			}else{
				siteMap.find("> li").removeClass("curr");
				siteMap.find("> li ul").slideUp(200);
				$(this).parent().addClass("curr");
				$(this).parent().find("ul").slideDown(200);
			}
		});
		$(window).resize(function(){
			if($(window).width() >= 767){
				siteMap.find("> li.more > a").unbind("click");
			}
			$(".mainCont").css({"min-height":$(window).height() - $("#header").height()});
		}).resize();

		/* KBIA Membership Service */
		var mainCont02 = $(".mainCont.v2 dl");
		mainCont02.eq(0).find("dt").addClass("on").siblings("dd").show();
		mainCont02.find("dt").click(function(){
			if($(this).hasClass("on")){
				mainCont02.find("dt").removeClass("on");
				mainCont02.find("dd").slideUp(200);
			}else{
				mainCont02.find("dt").removeClass("on");
				mainCont02.find("dd").slideUp(200);
				$(this).addClass("on");
				$(this).siblings("dd").slideDown(200);
			}
		});

		// 메인 스크롤
		var main = $(".mainContents"),
			mainCont = main.find(" > div");
		mainCont.each(function () {
			$(this).on("mousewheel DOMMouseScroll", function(event) {
				var delta = 0;
				var boxMax = mainCont.length - 1;
				var winEvent = "";
				var thisT = $(this).offset().top;
				var thisH = $(this).outerHeight() - $("#header").outerHeight();
				var thisH2 = $(this).prev().outerHeight() + $("#header").outerHeight();
				if(!winEvent) {
					winEvent = window.event;
				}
				if(winEvent.wheelDelta) {
					delta = winEvent.wheelDelta / 120;
					if(window.opera) {
						delta = -delta;
					}
				}else if(winEvent.detail) {
					delta = -winEvent.detail / 3;
				}
				if(delta < 0) {
					if($(this).index() < boxMax) {
						if($(this).outerHeight() > $(window).height()){
							if($(window).scrollTop() == thisT + (thisH - $(window).height())){
								$("html,body").animate({scrollTop:thisT + thisH}).clearQueue();
								return false;
							}else{
								$("html,body").animate({scrollTop:thisT + (thisH - $(window).height())}).clearQueue();
								return false;
							}
						}else{
							$("html,body").animate({scrollTop:thisT + thisH}).clearQueue();
							return false;
						}
					}else {
						if($(this).outerHeight() > $(window).height()){
							if($(window).scrollTop() == thisT + (thisH - $(window).height())){
								$("html,body").animate({scrollTop:thisT + thisH}).clearQueue();
							}else{
								$("html,body").animate({scrollTop:thisT + (thisH - $(window).height())}).clearQueue();
							}
							return false;
						}else{
							$("html,body").animate({scrollTop:$("#footer").offset().top}).clearQueue();
							return false;
						}
					}
				}else {
					if($(this).index() > 0) {
						$("html,body").animate({scrollTop:thisT - thisH2}).clearQueue();
						return false;
					}else {
						// 첫번째 페이지
						return false;
					}
				}
				return false;
			});
		});
	}

	// 조직도 및 연락처
	/*var orgaChart = $(".orgaChart"),
		btnOrga = orgaChart.find("> ul > li dl"),
		orgaList = $(".orgaList > .listTable");
	btnOrga.click(function(){
		var i = $(this).parent().index();
		orgaList.hide();
		orgaList.eq(i).show();
	});*/

	// 이미지 리스트 - 이미지 비율
	$(window).resize(function(){
		var imgArea = $(".imgList .imgArea");
		imgArea.each(function(){
			var $this = $(this);
			$this.height($this.width()/0.727)
		});
	}).resize();
	
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

});

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
         alert(title + "이(가) 입력가능문자수를 초과하였습니다.\n(영문, 숫자, 일반 특수문자 : " + maxLength + " / 한글, 한자, 기타 특수문자 : " + parseInt(maxLength/2, 10) + ").");
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