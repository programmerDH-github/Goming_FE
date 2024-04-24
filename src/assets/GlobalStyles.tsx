import { createGlobalStyle } from "styled-components";
import checkbox from "./images/icon_checkbox.png";
/**
 * @설명 전역 스타일
 * @작성자 김상훈
 * @생성일자 2023.03.30.
 * ----------------------------------------
 *  수정일자      수정자      내용
 * ---------------------------------------- (공백3회)
 * 2023.03.30.   김상훈   container 전역 추가
 */
const GlobalStyle = createGlobalStyle`
html, body, #root, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
}
button {
	outline: none;
	border: none;
}
* { box-sizing : border-box;}
ol, ul {	list-style: none; }
blockquote, q {	quotes: none; }
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

/* custom 내용입니다 */
/* 웹포함 기준 */
#root{
	width: 100%;
  min-height: 100vh;
	background-color: #FAF9F6;
	max-width: 480px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
  // filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.08));
	color: #3D3938;
}

// 모바일기준
@media (max-width:480px) {
	html, body,	.container {
		width: 100%;
	}
}
:root {
	--button-bg-color-1: #3D3938; /*로그인버튼배경색*/
	--caption-text-color-1: #7A7670; /* 캡션 글자 색 */
	--wgray13: #121212;					/* 타이틀에 주로 사용 */
	--wgray12: #3D3938;					/* 본문에 주로 사용 */
	--wgray11: #49484C;
	--wgray10: #5E5C5A;
	--wgray09: #7A7670;
	--wgray08: #96938C;
	--wgray07: #AEABA2;
	--wgray06: #C9C6C0;
	--wgray05: #E4E2DD;					/* Disabled 색 */
	--wgray04: #E9E7E2;					/* border-color1 */
	--wgray03: #F2F1ED;
	--wgray02: #FAF9F6;					/* background-color */
	--wgray01: #FFFFFF;					/* 흰색 */
	--error: #EA4343; 					/* error color */
	--info: #4D99DE;						/* info color */
	--success: #59B757; 				/* success color */
	--warning: #F09B4D; 				/* warning color */
}

/* custom font */
.headline1 {
	font-size: 28px;
	font-weight: 800;
	line-height: 40px;
	letter-spacing: 0em;
}
.headline2 {
	font-size: 24px;
	font-weight: 800;
	line-height: 36px;
	letter-spacing: 0em;
}
.headline3 {
	font-size: 20px;
	font-weight: 800;
	line-height: 32px;
	letter-spacing: 0em;
}
.body1-bold {
	font-size: 18px;
	font-weight: 700;
	line-height: 28px;
	letter-spacing: -0.025em;
}
.body1-regular {
	font-size: 18px;
	font-weight: 400;
	line-height: 28px;
	letter-spacing: -0.025em;
}
.body2-bold {
	font-size: 16px;
	font-weight: 700;
	line-height: 26px;
	letter-spacing: -0.025em;
}
.body2-regular {
	font-size: 16px;
	font-weight: 400;
	line-height: 26px;
	letter-spacing: -0.025em;
}
.body3-bold {
	font-size: 14px;
	font-weight: 700;
	line-height: 24px;
	letter-spacing: -0.025em;
}
.body3-regular {
	font-size: 14px;
	font-weight: 400;
	line-height: 24px;
	letter-spacing: -0.025em;
}
.caption1-bold {
	font-size: 12px;
	font-weight: 700;
	line-height: 16px;
	letter-spacing: -0.025em;
}
.caption1-regular {
	font-size: 12px;
	font-weight: 400;
	line-height: 16px;
	letter-spacing: -0.025em;
}
.caption2-bold {
	font-size: 10px;
	font-weight: 700;
	line-height: 12px;
	letter-spacing: -0.025em;
}
.caption2-regular {
	font-size: 10px;
	font-weight: 400;
	line-height: 12px;
	letter-spacing: -0.025em;
}

//textarea
.common-textarea {
	height: 240px;
	padding: 16px;
	resize: none;
	background-color: var(--wgray03);
	margin-bottom: 8px;	
  border: 1px solid var(--wgray04);
  border-radius: 8px;
	color: var(--wgray12);
}
.common-textarea::placeholder {
	color: var(--wgray09);
}
.common-textarea:foucs {
	color: var(--wgray12);
}

.primary-button {
	background: var(--wgray02);
	border: none;
}
.secondary-button {
	border: 1px solid var(--wgray02);
	background: var(--wgray01);
}

// primary-button-styles
.btn-p-xl {
	padding: 12px 16px;
	border-radius: 8px;
	height: 48px;
	background: var(--wgray12);
	color: var(--wgray01);
}
.btn-p-l {
	padding: 10px 16px;
	border-radius: 8px;
	height: 44px;
	background: var(--wgray12);
	color: var(--wgray01);
}
.btn-p-m {
	padding: 6px 16px;
	border-radius: 8px;
	height: 36px;
	background: var(--wgray12);
	color: var(--wgray01);
}
.btn-p-s {
	padding: 4px 8px;
	border-radius: 4px;
	height: 32px;
	background: var(--wgray12);
	color: var(--wgray01);
}
.btn-p-xs {
	padding: 6px 8px;
	border-radius: 4px;
	height: 28px;
	background: var(--wgray12);
	color: var(--wgray01);
}

// secondary-button-styles
.btn-s-xl {
	padding: 12px 16px;
	border-radius: 8px;
	height: 48px;
	background: var(--wgray01);
	color: var(--wgray12);
	border: 1px solid var(--wgray12);
}
.btn-s-l {
	padding: 10px 16px;
	border-radius: 8px;
	height: 44px;
	background: var(--wgray01);
	color: var(--wgray12);
	border: 1px solid var(--wgray12);
}
.btn-s-m {
	padding: 6px 16px;
	border-radius: 8px;
	height: 36px;
	background: var(--wgray01);
	color: var(--wgray12);
	border: 1px solid var(--wgray12);
}
.btn-s-s {
	padding: 4px 8px;
	border-radius: 8px;
	height: 32px;
	background: var(--wgray01);
	color: var(--wgray12);
	border: 1px solid var(--wgray12);
}
.btn-s-xs {
	padding: 6px 8px;
	border-radius: 8px;
	height: 28px;
	background: var(--wgray01);
	color: var(--wgray12);
	border: 1px solid var(--wgray12);
}

// button-hover-style
.button:hover {	
	box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.08);
}
//radio button
.radio-btn {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #ffffff;
  border: 2px solid #3d3938;
  width: 18px;
  height: 18px;
  border-radius: 10px;
  /* transition: 0.5s; */
  margin-right: 4px;
}


.radio-btn:checked {
  /* 체크박스가 체크됐을 때의 색상 */
  background-color: var(--wgray12); 
}1
.radio-btn:hover: {
  background-color: var(--wgray04);
}
.radio-btn:disabled:hover { 
	background: white; 
	pointer-events: none;
}
.radio-btn:disabled:checked{ 
	background: white; 
}
//checkbox
.check-btn {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #3d3938;
  border-radius: 4px;
  outline: none;
  transition: 0.5s;
}

.check-btn:disabled {
  background-color: var(--wgray06);
}
.check-btn:disabled:checked {
  background-color: var(--wgray06);
  border: 0px solid #3d3938;
}
.check-btn:disabled:hover { 
	
	pointer-events: none;
}
.check-btn:hover {
  background-color: var(--wgray04);
}

.check-btn:checked {
  /* 체크박스가 체크됐을 때의 색상 */
  background-color: var(--wgray12);
  background-image: url(${checkbox});
  background-repeat: no-repeat;
  background-size: 90%;
  background-position: center;
}

// primary-button-clicked-styles
.btn-p-xl:active, .btn-p-l:active, .btn-p-m:active, .btn-p-s:active, .btn-p-xs:active { 
	background: var(--wgray13); 
} 
// secondary-button-clicked-styles
.btn-s-xl:active, .btn-s-l:active, .btn-s-m:active, .btn-s-s:active, .btn-s-xs:active { 
	border: 1px solid var(--wgray13);
	color: var(--wgray13);
} 

// primary-button-disabled-styles
.radio-btn, .btn-p-xl:disabled, .btn-p-l:disabled, .btn-p-m:disabled, .btn-p-s:disabled, .btn-p-xs:disabled { background: var(--wgray06); 
}
// secondary-button-disabled-styles
.btn-s-xl:disabled, .btn-s-l:disabled, .btn-s-m:disabled, .btn-s-s:disabled, .btn-s-xs:disabled { 
	color: var(--wgray06);
	border: var(--wgray06);
}

//radio-style
input[type="radio"] {
	display: none;
	background: var(--wgray01);
}
input[type="radio"] {
	display: inline-block;
	padding: 3px;
	color: var(--wgray12);
	border: 2px solid var(--wgray12);
}
input[type="radio"]:hover {
	background: var(--wgray04);
}
input[type="radio"]:checked {
	background: none;
	border: 4px solid var(--wgray12);
}
input[type="radio"]:disabled {
	border-color: var(--wgray06);
}

//custom input
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
	-webkit-text-fill-color: #000;
	-webkit-box-shadow: 0 0 0px 1000px #fff inset;
	box-shadow: 0 0 0px 1000px #fff inset;
	transition: background-color 5000s ease-in-out 0s;
	border: 1px solid var(--wgray04);
}

input:autofill,
input:autofill:hover,
input:autofill:focus,
input:autofill:active {
	-webkit-text-fill-color: #000;
	-webkit-box-shadow: 0 0 0px 1000px #fff inset;
	box-shadow: 0 0 0px 1000px #fff inset;
	transition: background-color 5000s ease-in-out 0s;
	border: 1px solid var(--wgray04);
}
`;

export default GlobalStyle;
