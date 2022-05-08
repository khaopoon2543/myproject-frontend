import { Spinner, Modal, ListGroup } from 'react-bootstrap';
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
    marginTop:250,
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
          <img src={require(`../images/pien_girl.gif`)}></img> 
        </div>
        <br/>
        <span className="font-semi-bold">
          ไม่พบหน้าที่ต้องการ ขออภัยด้วยนะคับ
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
        <span className="font-semi-bold"> กรุณารอสักครู่นะค้าบ </span>
      </div>
  )
}

function LoadingIMG() {
    return (
        <div lang="th">
          <div style={loadingImage}>
            <img src={require(`../images/pien_girl.gif`)}></img> 
          </div>

          <div style={spinnerIMG}>
            <Spinner animation="border" style={inSpinner}/>
            <span className="font-big font-semi-bold"> กรุณารอสักครู่นะคับ </span>
          </div>

          <span className="font-semi-bold gray-text">
              ตอนนี้กำลังโหลดเนื้อเพลงอยู่ค้าบ
          </span>
        </div>
    )
}

function LoadingIMGLevels(props) {
  const level = props.level
  return (
      <div style={{marginTop:100}}>
        <div style={loadingImageSearch}>
          <img src={require(`../images/pien_girl.gif`)}></img> 
        </div>

        <div style={spinnerIMG}>
            <Spinner animation="border" style={inSpinner}/>
            <span className="font-big font-semi-bold"> กรุณารอสักครู่นะคับ </span>
        </div>

        <div className="d-block font-semi-bold gray-text">
          <span>
            กำลังค้นหาเพลงระดับ<strong> {level} </strong>อยู่คับ
            <br/>
            (แต่ถ้าไม่อยากรอสามารถพิมพ์คำค้นหาที่ต้องการได้เลยนะคับ)
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
          ไม่พบผลการค้นหาจากคำค้นหา<strong> {searchTerm} </strong>ขออภัยด้วยนะคับ
        </span>
      </div>
  )
}

// ---------------------------------- Emoji ---------------------------------- //

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

// ---------------------------------- Spotify ---------------------------------- //

const SPOTIFY = <span className="font-semi-bold"><FaSpotify/> Spotify </span>

function NoLoginSpotify() {
  return (
    <div style={loadingImage}>
        <span style={EMOJI}>
          {emojiSad}
        </span>
        <br/><br/>
        <h5 className="font-bold">
          กรุณาเข้าสู่ระบบผ่าน {SPOTIFY} ก่อนนะค้าบ
        </h5>
        <span>
              หรือระบบอาจเกิดข้อผิดพลาดขึ้น กรุณาโหลดหน้าเว็บไซต์ใหม่หรือเข้าสู่ระบบผ่าน {SPOTIFY}
              ใหม่อีกครั้งด้วยนะคับ
        </span>
    </div>
  )
}

const spotifyButton =
    <div id="spotify-btn" className="font-small">
      <a href={"https://open.spotify.com/"} target="_blank" rel="noopener nore">
        <button id="spotify-open">
          <FaSpotify className="spotify-icon"/>
          Open Spotify
        </button>
      </a>
    </div>
const TokenExpiredPopup = 
  <div className="d-block" style={{ paddingLeft: 15, paddingRight: 15 }}>
    <span>
      กรุณาเข้าสู่ระบบผ่าน&nbsp; {SPOTIFY} ใหม่อีกครั้งนะคับ 🙇‍♀️
    </span>
  </div>

const NoResultPopup = 
              <ListGroup variant="flush">
                <ListGroup.Item className="mb-3">
                  <span>
                    ตอนนี้ยังไม่ได้เปิดเพลงผ่าน {SPOTIFY} นะคับ
                  </span>
                  <br/>
                  <span className="open-spotify">
                    กรุณาเปิดเพลงฟังก่อนนะคับ กดเปิดได้ทางนี้เลย! &nbsp; {spotifyButton}
                  </span> 
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>
                    หรือระบบอาจเกิดข้อผิดพลาดขึ้น กรุณาโหลดหน้าเว็บไซต์ใหม่หรือเข้าสู่ระบบผ่าน {SPOTIFY}
                    ใหม่อีกครั้งด้วยนะคับ
                  </span>
                </ListGroup.Item>
              </ListGroup>

function SpotifyErrorPopup(props) {
  return (
    <Modal  
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show} onHide={props.handleClose}
      animation={false} 
    > 
      <Modal.Header closeButton>
        <Modal.Title>
          <div id="error-head">
            <span>
              ขออภัย พบข้อผิดพลาด
            </span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body id="error-body">
        { props.isTokenExpired ? TokenExpiredPopup :NoResultPopup }
      </Modal.Body>
    </Modal>
  )
}

const inSpinnerPopup = {
  margin: '5px 20px',
}
function SpotifyLoadingPopup() {
  return (
    <div className="d-flex align-items-center">
        <Spinner animation="border" style={inSpinnerPopup}/>  
        <div className="d-block">
          <span className="font-semi-bold">
            กรุณารอสักครู่นะค้าบ
          </span>
          <br/>
          <span className="font-big font-semi-bold gray-text">กำลังโหลดจาก {SPOTIFY} อยู่คับ</span>
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
    NoLoginSpotify,
    SpotifyErrorPopup,
    SpotifyLoadingPopup,
}