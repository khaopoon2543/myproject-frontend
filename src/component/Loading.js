import { Spinner, Modal } from 'react-bootstrap';
import useIsMobile from '../component/useIsMobile';
import { FaHome, FaSpotify } from 'react-icons/fa';

const spinner = {
    flex: 1,
    marginTop:100,
    justifyContent: 'center',
    alignItems:'center',
    textAlign: 'center',
}
const inSpinner = {
    flex: 1,
    alignSelf:'center'
}
const loadingImage = {
  width: '30%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 'auto',
    marginTop:200,
    marginBottom: 10
}
const loadingImageMB = {
  width: '80%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 'auto',
    marginTop:180,
    marginBottom: 10
}

const loadingImageSearch = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '50%',
  height: 'auto',
  marginBottom: 10
}

const TEXT = {
  color: 'var(--grayLight)',  
}

function NoMatch() {
  const screenSize = useIsMobile()
  return (
      <div style={spinner}>
        <div style={!screenSize ? loadingImage : loadingImageMB}>
          <img src={require(`../images/pien_girl.png`)}></img> 
        </div>
        <span lang="th">
          ไม่พบหน้าที่ต้องการคับ ขออภัยด้วยนะคับ
        </span>
        <br/>
        <span lang="th">
          <a href={process.env.REACT_APP_FRONTEND_URL}><FaHome /> กลับหน้าหลัก</a>
        </span>
      </div>
  )
}
function LoadingIMG() {
    const screenSize = useIsMobile()
    return (
        <div style={spinner}>
          <div style={!screenSize ? loadingImage : loadingImageMB}>
            <img src={require(`../images/pien_girl.png`)}></img> 
          </div>
          <Spinner animation="border" style={inSpinner}/>
          <span  lang="th" className="font-big font-bold"> กรุณารอสักครู่นะคับ </span>
          <br/>
          <span lang="th" className="font-big font-semi-bold gray-text">
              ตอนนี้กำลังโหลดเนื้อเพลงอยู่ค้าบ
          </span>
        </div>
    )
}
function Loading() {
    return (
        <div style={spinner}>
          <span lang="th">
            <Spinner animation="border" style={inSpinner}/>
            &nbsp;กรุณารอสักครู่นะค้าบ
          </span>
        </div>
    )
}

function LoadingIMGLevels(props) {
  const level = props.level
  return (
      <div style={spinner}>
        <div style={loadingImageSearch}>
          <img src={require(`../images/pien_man.png`)}></img> 
        </div>
        <span lang="th">
          <Spinner animation="border" style={inSpinner}/>
          &nbsp;กรุณารอสักครู่นะค้าบ
        </span>
        <br/>
        <span lang="th" style={TEXT}>
            กำลังค้นหาเพลงระดับ<strong> {level} </strong>อยู่คับ
        </span>
        <br/>
        <span lang="th" style={TEXT}>(แต่ถ้าไม่อยากรอสามารถพิมพ์คำค้นหาที่ต้องการได้เลยนะคับ)</span>
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
        <span lang="th" style={TEXT}>
          ไม่พบผลการค้นหาจากคำค้นหา<strong> {searchTerm} </strong>ขออภัยด้วยนะคับ
        </span>
      </div>
  )
}

const MARGIN_TOP = {
  marginTop: 80,
}
const MARGIN_TOP_MB = {
  marginTop: 0,
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

function PLSMoreThreeChars() {
  return (
    <div style={spinner}>
      <div style={loadingImageSearch}>
        <img src={require(`../images/pien_man.png`)}></img> 
      </div>
      <span lang="th">กรุณาพิมพ์คำค้นหา 
        <strong> มากกว่า 3 ตัวอักษร </strong>
        ขึ้นไปนะค้าบ
      </span>
    </div>
  )
}

const spotifyIcon = <FaSpotify/>

function SpotifyTokenExpired() {
  return (
    <div style={{ marginTop: 80, paddingLeft: 30, paddingRight: 30 }}>
        <span style={EMOJI}>
          {emojiSad}
        </span>
        <span lang="th">
          <br/><br/>
          กรุณา {spotifyIcon} Login Spotify ใหม่นะคับ
        </span>
    </div>
  )
}

function SpotifyTokenExpiredPopup(props) {
  return (
    <Modal  
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show} onHide={props.handleClose} 
    > 
      <Modal.Header closeButton>
        <Modal.Title lang="th">
          กรุณาเข้าสู่ระบบผ่าน&nbsp; {spotifyIcon} Spotify ใหม่อีกครั้งนะคับ {emojiSad}
        </Modal.Title>
      </Modal.Header>
    </Modal>
  )
}

const inSpinnerPopup = {
  flex: 1,
  alignSelf:'center',
  margin: '5px 15px',
}

function SpotifyLoadingPopup() {
  return (
    <div className="d-flex align-items-center" lang="th">
      <div className="banner">
        <Spinner animation="border" style={inSpinnerPopup}/>  
        <div className="d-block">
          <strong>กรุณารอสักครู่นะค้าบ</strong><br/>
          <span id="artist">ตอนนี้กำลังโหลดข้อมูลเพลงอยู่คับ</span>
        </div>
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
    PLSMoreThreeChars,
    LoadingIMGLevels,
    SpotifyTokenExpired,
    SpotifyTokenExpiredPopup,
    SpotifyLoadingPopup,
}