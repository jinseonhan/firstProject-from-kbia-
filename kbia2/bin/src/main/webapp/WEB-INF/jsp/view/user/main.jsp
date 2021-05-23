<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
	<!-- header -->
	<jsp:include page="../user/header.jsp" flush="false"></jsp:include>
	<!--// header -->
	<script src="/resouces/js/user/main.js"></script>
	<!-- container -->
	<div id="container">
		<div class="mainContents">
			<!-- mainCont -->
<!-- 			<div class="mainCont v1">
				mainSwiper
				<div class="mainSwiper">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<div class="inBox">
								<strong>Moving the world<br /><span>Korea Battery</span></strong>
							</div>
							<img src="resouces/images/user/main/img0101.png" alt=" ">
						</div>
						<div class="swiper-slide">
							<div class="inBox">
								<strong>Moving the world<br /><span>Korea Battery</span></strong>
							</div>
							<img src="resouces/images/user/main/img0102.png" alt=" ">
						</div>
					</div>
					btnArea
					<div class="btnArea">
						<div class="swiper-pagination"></div>
						<a href="" class="btnPlay">재생</a>
						<a href="" class="btnStop">정지</a>
					</div>
					// btnArea
				</div>
				// mainSwiper
				<div class="inner">
					<a href="/openMemberGuide.do">
						<strong>회원사<br />가입 안내</strong>
						<p>KBIA MEMBERSHIP SERVICE 회원가입</p>
					</a>
				</div>
			</div> -->
			<!--// mainCont -->

			<!-- mainCont -->
			<div class="mainCont v3">
				<div class="inner">
					<div class="left">
						<h2>공지사항</h2>
						<div class="noticeSwiper">
							<div class="inBox">
								<div class="swiper-wrapper">
									<div class="swiper-slide">
										<a id="notice1_href">
											<span id="notice1_div" style="display:none"></span>
											<strong id="notice1_title"></strong>
											<p id="notice1_title">2020-12-23</p>
										</a>
									</div>
									<div class="swiper-slide">
										<a id="notice2_href">
											<span id="notice2_div" style="display:none"></span>
											<strong id="notice2_title"></strong>
											<p id="notice2_dt"></p>
											<!--em class="icofile">첨부파일</em-->
										</a>
									</div>
									<div class="swiper-slide">
										<a id="notice3_href">
											<span id="notice3_div" style="display:none"></span>
											<strong id="notice3_title"></strong>
											<p id="notice3_dt"></p>
											<!--em class="icofile">첨부파일</em-->
										</a>
									</div>
									<div class="swiper-slide">
										<a id="notice4_href">
											<span id="notice4_div" style="display:none"></span>
											<strong id="notice4_title"></strong>
											<p id="notice4_dt"></p>
											<!--em class="icofile">첨부파일</em-->
										</a>
									</div>
								</div>
							</div>
						</div>
						<a href="/openNotice.do" class="btnMore">공지사항 더보기</a>
					</div>
					<div class="right">
				        <a href="/openViewContent.do?boardNo=974&boardType=NOTICE" class="btnBanner"><img src="resouces/images/user/main/img-banner01.png" alt="charge your business INTER BATTERY "></a>
                        <a href="http://interbattery.or.kr/" target="_blank" title="새창으로 열기" class="btnBanner"><img src="resouces/images/user/main/img-banner02.png" alt="charge your business INTER BATTERY "></a>
						<a href="http://www.evtrendkorea.co.kr" target="_blank" title="새창으로 열기" class="btnBanner"><img src="resouces/images/user/main/img-banner03.png" alt="charge your business INTER BATTERY "></a>

					</div>
				</div>
			</div>
			<!--// mainCont -->

<!-- mainCont -->
			<div class="mainCont v2">
				<div class="inner">
					<div class="left">
						<h2>KBIA<br />Membership Service</h2>
						<ul>
							<li>01. 회원사 애로사항 지원</li>
							<li>02. 전지 산업정보 제공</li>
							<li>03. 협회 추진사업 참여 기회 제공</li>
							<li>04. 해외시장 개척 지원</li>
							<li>05. R&amp;D 사업 참여기회 확대</li>
							<li>06. 회원사간 교류활동 지원</li>
						</ul>
					</div>
					<div class="right">
						<dl>
							<dt>신청절차</dt>
							<dd>
								<ul class="list01">
									<li>
										<div class="imgArea">
											<span><img src="resouces/images/user/main/img0201.png" alt=" "></span>
										</div>
										<div class="txtArea">
											<strong>회원가입 <span>신청서 작성</span></strong>
											<p>가입의사 표시 및 <br />신청서 우편접수</p>
										</div>
									</li>
									<li>
										<div class="imgArea">
											<span><img src="resouces/images/user/main/img0202.png" alt=" "></span>
										</div>
										<div class="txtArea">
											<strong>회비납부안내 및<br />공문발송</strong>
											<p>회비납부 안내 및 <br />공문발송</p>
										</div>
									</li>
									<li>
										<div class="imgArea">
											<span><img src="resouces/images/user/main/img0203.png" alt=" "></span>
										</div>
										<div class="txtArea">
											<strong>회비납부</strong>
											<p>입회비, 일반회비,<br />임원회비 납부</p>
										</div>
									</li>
									<li>
										<div class="imgArea">
											<span><img src="resouces/images/user/main/img0204.png" alt=" "></span>
										</div>
										<div class="txtArea">
											<strong>회원가입 승인</strong>
											<p>7일이 지나도 승인처리가 <br />되지 않을 시 담당자에게 문의</p>
										</div>
									</li>
								</ul>
							</dd>
						</dl>
						<dl>
							<dt>회원의 구분</dt>
							<dd>
								<ul class="list02">
									<li>
										<strong>정회원</strong>
										<p>전지관련 전지, 장비, 부품, 재료, <br />기타 전지 관련 제품의 <br />제조&middot;판매 또는 용역을 제공하는 기업체</p>
									</li>
									<li>
										<strong>특별회원</strong>
										<p>전지관련산업 발전과 관련되는 <br />국내의 대학, 연구기관 및 유관단체</p>
									</li>
									<li>
										<strong>준회원</strong>
										<p>협회가 총괄주관하는 기술개발사업 <br />참여기업 중 비회원사는 참여기간 동안 <br />주회원 자격을 가지며 특별회비 납부 및 <br />필요한 자료 제출 등 회원에 준하는 <br />책임과 의무 존재</p>
									</li>
								</ul>
							</dd>
						</dl>
					</div>
				</div>
			</div>
			<!--// mainCont -->

			<!-- mainCont -->
			<div class="mainCont v4">
				<div class="inner">
					<h2>KBIA 회원사</h2>
					<!-- memCompSwiper -->
					<div class="memCompSwiper">
						<div class="swiper-wrapper">
							<a href="https://www.samsungsdi.co.kr/index.html" class="swiper-slide" target="_blank" title="새창으로 열기">
								<img src="resouces/images/user/main/logo03.png" alt="삼성SDI">
							</a>
							<a href="https://www.lgensol.com/kr/index" class="swiper-slide" target="_blank" title="새창으로 열기">
								<img src="resouces/images/user/main/logo02.png" alt="LG에너지솔루션">
							</a>
							<a href="http://eng.skinnovation.com/main.asp" class="swiper-slide" target="_blank" title="새창으로 열기">
								<img src="resouces/images/user/main/logo04.png" alt="SK이노베이션">
							</a>
							<a href="https://w-scope.co.jp/en/" class="swiper-slide" target="_blank" title="새창으로 열기">
								<img src="resouces/images/user/main/logo06.png" alt="scope">
							</a>
							<a href="http://www.dongwhaelectrolyte.com/main/main.asp" class="swiper-slide" target="_blank" title="새창으로 열기">
								<img src="resouces/images/user/main/logo07.png" alt="동화일렉트로라이트">
							</a>
							<a href="http://powerlogics.co.kr/" class="swiper-slide" target="_blank" title="새창으로 열기">
								<img src="resouces/images/user/main/logo08.png" alt="파워로직스">
							</a>
							<a href="http://www.poscochemical.com/kr/main.do" class="swiper-slide" target="_blank" title="새창으로 열기">
								<img src="resouces/images/user/main/logo09.png" alt="포스코케미칼">
							</a>
							<a href="https://kokam.com/home-kor/" class="swiper-slide" target="_blank" title="새창으로 열기">
								<img src="resouces/images/user/main/logo10.png" alt="Kokam">
							</a>
							<a href="http://www.batteryenergy.org/" class="swiper-slide" target="_blank" title="새창으로 열기">
								<img src="resouces/images/user/main/logo11.png" alt="리튬이차전지">
							</a>
							<a href="http://interbattery.or.kr/en/" class="swiper-slide" target="_blank" title="새창으로 열기">
								<img src="resouces/images/user/main/logo12.png" alt="inter battery">
							</a>
						</div>
						<div class="swiper-button-next"></div>
						<div class="swiper-button-prev"></div>
					</div>
					<!--// memCompSwiper -->
				</div>
				<div class="siteMap">
					<div class="inner">
						<ul>
					<li><a href="/openIntroComment.do">협회/조합 소개</a>
						<ul>
							<li><a href="/openIntroComment.do">인사말</a></li>
							<li><a href="/openIntroHistroy.do">연혁</a></li>
							<li><a href="/openOrganization.do">조직도 및 연락처</a></li>
							<li><a href="/openExecutives.do">임원현황</a></li>
							<li><a href="/openMainTask.do">주요업무</a></li>
							<li><a href="/openCI.do">CI</a></li>
							<li><a href="/openComeRoot.do">오시는 길</a></li>
						</ul>
					</li>
					
					<li><a href="/openMemberGuide.do">회원사 안내</a>
						<ul>
							<li><a href="/openMemberGuide.do">회원사 가입안내</a></li>
							<li><a href="" onclick="alert('서비스 준비중입니다.'); return false;">회원사 안내</a></li>
						</ul>
					</li>
					<li><a href="/openNotice.do">사업안내</a></li>
					<li class="curr"><a href="">알림마당</a>
						<ul>
							<li class="curr"><a href="/openNotice.do">공지사항</a></li>
							<li><a href="" onclick="alert('서비스 준비중입니다.'); return false;">산업뉴스</a></li>
							<li><a href="/openEvent.do" >행사정보</a></li>
							<li><a href="" onclick="alert('서비스 준비중입니다.'); return false;">산업계(회원사) 동정</a></li>
						</ul>
					</li>
					<li><a href="" onclick="alert('서비스 준비중입니다.'); return false;">정보마당</a>
						<ul>
							<li><a href="" onclick="alert('서비스 준비중입니다.'); return false;">주간브리프</a></li>
							<li><a href="" onclick="alert('서비스 준비중입니다.'); return false;">The Battery</a></li>
							<li><a href="" onclick="alert('서비스 준비중입니다.'); return false;">기술자료실</a></li>
							<li><a href="" onclick="alert('서비스 준비중입니다.'); return false;">채용공고</a></li>
						</ul>
					</li>
					<li><a href="">산업/기술동향</a>
						<ul>
							<li><a href="/openTechKnow.do">전지의 이해</a></li>
							<li><a class="headerA" id="industryStat" href="/openIndustryStat.do">산업통계</a></li>
							<li><a href="" onclick="alert('서비스 준비중입니다.'); return false;">유관산업 동향</a></li>
                            <li><a href="" onclick="alert('서비스 준비중입니다.'); return false;">기술동향</a></li>
						</ul>
					</li>
				</ul>
					</div>
				</div>
			</div>
			<!--// mainCont -->
		</div>
	</div>
	<!--// container -->

	<!-- footer -->
	<jsp:include page="../user/footer.jsp" flush="false"></jsp:include>
	<!--// footer -->
