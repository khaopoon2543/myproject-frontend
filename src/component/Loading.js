import { Spinner } from 'react-bootstrap';
import useIsMobile from '../component/useIsMobile';

const spinner = {
    flex: 1,
    marginTop:100,
    justifyContent: 'center',
    alignItems:'center'
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

const EMOJI = {
  marginTop: 50,
  fontSize: 50,
  color: 'var(--grayLight)',  
}
const TEXT = {
  color: 'var(--grayLight)',  
}

function LoadingIMG() {
    const screenSize = useIsMobile()
    return (
        <div style={spinner}>
          <div style={!screenSize ? loadingImage : loadingImageMB}>
            <img src={require(`../images/pien_girl.png`)}></img> 
          </div>
          <span lang="th">
            <Spinner animation="border" style={inSpinner}/>
            &nbsp;กรุณารอสักครู่นะคับ
          </span>
          <br/>
          <span lang="th" style={{color:'var(--grayLight)'}}>
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
            กำลังค้นหาเพลงระดับ<strong> {level} </strong>ทั้งหมดอยู่คับ
        </span>
        <br/>
        <span lang="th" style={TEXT}>(แต่ถ้าไม่อยากรอสามารถพิมพ์คำค้นหาที่ต้องการได้เลยนะคับ)</span>
      </div>
  )
}

const emojiSadAll = ['( T^T )', '(╥_╥)', '(ノ_<、)', '(μ_μ)', '( ; ω ; )', '(ﾉД`)']
const emojiSad = emojiSadAll[Math.floor(Math.random()*emojiSadAll.length)];
function NoResult(props) {
  const searchTerm = props.searchTerm
  return (
      <div style={{ marginTop: 80, paddingLeft: 30, paddingRight: 30 }}>
        <span style={EMOJI}>
          {emojiSad}
        </span>
        <span lang="th" style={TEXT}>
          <br/><br/>
          ไม่พบผลการค้นหาจากคำค้นหา<strong> {searchTerm} </strong>ขออภัยด้วยนะคับ
        </span>
      </div>
  )
}

const emojiAll = ['( ◜◒◝ )♡', 'ʕっ• ᴥ • ʔっ', '♡ ´･ᴗ･ `♡', '( ๑>ᴗ<๑ )', '( つ´∀｀)つ', '( ♡ >ω< ♡)']
const emoji = emojiAll[Math.floor(Math.random()*emojiAll.length)];
function EmojiData() {
  return (
    <div style={{ marginTop: 80 }}>
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

export {
    LoadingIMG,
    Loading,
    NoResult,
    EmojiData,
    PLSMoreThreeChars,
    LoadingIMGLevels,
}