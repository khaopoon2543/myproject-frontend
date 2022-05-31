import { Spinner } from 'react-bootstrap';
import useIsMobile from '../component/useIsMobile';
import { FaHome, FaSpotify } from 'react-icons/fa';

const spinner = {
    display: 'flex',
    marginTop:100,
    justifyContent: 'center',
    alignItems:'center',
    textAlign: 'center',
}
const spinnerIMG = {
  display: 'flex',
  marginTop:10,
  justifyContent: 'center',
  alignItems:'center',
  textAlign: 'center',
}
const inSpinner = {
    marginRight: 10,
}
const loadingImage = {
  width: '300px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 'auto',
    marginTop:200,
}
const loadingImageSearch = {
  width: '300px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 'auto',
    marginBottom: 10
}

const TEXT = {
  color: 'var(--grayLight)',  
}

// ---------------------------------- NoMatch ---------------------------------- //

function NoMatch() {
  return (
      <>
        <div style={loadingImage}>
          <img src={require(`../images/icon.png`)}></img> 
        </div>
        <br/>
        <span className="font-semi-bold">
          ไม่พบหน้าที่ต้องการ ขออภัยด้วยนะคะ
        </span>
        <br/>
        <span className="font-semi-bold gray-text">
          <a href={process.env.REACT_APP_FRONTEND_URL}  className="pink-link">
            <FaHome /> กลับหน้าหลัก
          </a>
        </span>
      </>
  )
}

// ---------------------------------- Loading ---------------------------------- //

function Loading() {
  return (
      <div style={spinner}>
        <Spinner animation="border" style={inSpinner}/>
        <span className="font-semi-bold"> กรุณารอสักครู่... </span>
      </div>
  )
}

function LoadingIMG() {
    return (
        <div lang="th">
          <div style={loadingImage}>
            <img src={require(`../images/icon.png`)}></img> 
          </div>

          <div style={spinnerIMG}>
            <Spinner animation="border" style={inSpinner}/>
            <span className="font-big font-semi-bold"> กรุณารอสักครู่... </span>
          </div>

          <span className="font-semi-bold gray-text">
              ตอนนี้กำลังโหลดเนื้อเพลงอยู่ค่า
          </span>
        </div>
    )
}

function LoadingIMGLevels(props) {
  const level = props.level
  return (
      <div style={{marginTop:100}}>
        <div style={loadingImageSearch}>
          <Spinner animation="border" style={inSpinner}/>
        </div>

        <div style={spinnerIMG}>
            <span className="font-big font-semi-bold"> กรุณารอสักครู่... </span>
        </div>

        <div className="d-block font-semi-bold gray-text" style={{paddingLeft:20, paddingRight:20}}>
          <span>
            กำลังค้นหาเพลงระดับ<strong> {level} </strong>อยู่ค่า
          </span>
          <br/>
          <span>
            (แต่ถ้าไม่อยากรอสามารถพิมพ์คำค้นหาที่ต้องการได้เลยนะคะ)
          </span>
        </div>
      </div>
  )
}

const EMOJI = {
  fontSize: 50,
  color: 'var(--grayLight)',  
}

const emojiSadAll = ['( T^T )', '(╥_╥)', '(ノ_<、)', '(μ_μ)', '( ; ω ; )', '(ﾉД`)']
const emojiSad = emojiSadAll[Math.floor(Math.random()*emojiSadAll.length)];
function NoResult(props) {
  const searchTerm = props.searchTerm
  return (
      <div style={{ textAlign:'center', marginTop: 80, paddingLeft: 30, paddingRight: 30 }}>
        <span style={EMOJI}>
          {emojiSad}
        </span>
        <br/>
        <span style={TEXT}>
          ไม่พบผลการค้นหาจากคำค้นหา<strong> {searchTerm} </strong>ขออภัยด้วยนะคะ
        </span>
      </div>
  )
}

// ---------------------------------- Emoji ---------------------------------- //

const MARGIN_TOP = {
  marginTop: 80,
}
const MARGIN_TOP_MB = {
  marginTop: 20,
}
const emojiAll = ['( ◜◒◝ )♡', 'ʕっ• ᴥ • ʔっ', '♡ ´･ᴗ･ `♡', '( ๑>ᴗ<๑ )', '( つ´∀｀)つ', '( ♡ >ω< ♡)','(≥o≤)','\(^Д^)/']
const emoji = emojiAll[Math.floor(Math.random()*emojiAll.length)];
function EmojiData() {
  const screenSize = useIsMobile()
  return (
    <div style={!screenSize ? MARGIN_TOP : MARGIN_TOP_MB}>
      <span style={EMOJI}>
        {emoji}
      </span>
    </div>
  )
}

// ---------------------------------- ModalLoading ---------------------------------- //

const SPOTIFY = <span className="font-semi-bold"><FaSpotify/> Spotify </span>
const inSpinnerPopup = {
  margin: '5px 20px',
}
function ModalLoading() {
  return (
    <div className="d-flex align-items-center">
        <Spinner animation="border" style={inSpinnerPopup}/>  
        <div className="d-block">
          <span className="font-semi-bold">
            กรุณารอสักครู่...
          </span>
          <br/>
          <span className="font-big font-semi-bold gray-text">กำลังโหลดข้อมูล</span>
        </div>
    </div>
  )
}

export {
    NoMatch,
    LoadingIMG,
    Loading,
    NoResult,
    EmojiData,
    LoadingIMGLevels,
    ModalLoading,
}