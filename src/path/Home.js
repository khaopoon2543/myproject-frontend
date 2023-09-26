import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { MdQueueMusic } from 'react-icons/md';
import { IoMusicalNotes, IoLanguage, IoMail } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { PiMusicNoteFill } from 'react-icons/pi';
import { FaSpotify, FaFacebook } from 'react-icons/fa';
import { VscCircleFilled } from 'react-icons/vsc';

const KASHIFY = <span className="font-semi-bold"> Kashify </span>
const SPOTIFY =     <Link to={"/playlist/37i9dQZEVXbKXQ4mDTEBXq"}  className="pink-link font-semi-bold">
                        <FaSpotify /> Spotify Playlists
                    </Link>
const INPUT_LINK =  <Link to={"/input"}  className="pink-link font-semi-bold">
                        แปลงเนื้อเพลงเอง
                    </Link>


function searchButton() { 
    return (
        <Link to={"/search"}>
            <button id="pink-btn">
                <FiSearch className="icon-btn"/> 
                <span>ค้นหาเพลง</span>
            </button>
        </Link>
    )
}

function inputButton() { 
    return (
        <Link to={"/input"}>
            <button id="black-btn">
                <MdQueueMusic className="icon-btn"/> 
                <span>แปลงเนื้อเพลงเอง</span>
            </button>
        </Link>
    )
}

const PLS_HELP_ME = 
    <div className="description">
        <h5 className="underline"> รายงานปัญหา・ข้อเสนอแนะ </h5>
        <p id="pls-help-me">
        <span>
            ลองใช้งาน {KASHIFY} กันแล้ว ถ้าพบปัญหาหรือมีข้อเสนอแนะเพิ่มเติม สามารถกรอก
            <a href='https://airtable.com/shrQF9cQwkt3UJzIO' target='blank' rel='noopener noreferrer' className="pink-link"> 
                <span className="pink-link font-semi-bold"> แบบฟอร์มนี้ </span>
            </a>
            ได้เลยค่า และหากมีข้อผิดพลาดใด ๆ ต้องขออภัยล่วงหน้าด้วยนะคะ ขอบคุณทุกคนมากเลยค่า 🙏💗
        </span>
        </p>
    </div>

function Home() {

  return (
    <>
    <Container className="pages" id="home">
        <Row>
            <Col xl={6} id="home-title">   
                <h2 className="font-bold">
                    เรียนรู้คำศัพท์
                    <br/>
                    <span className="font-semi-light">ไปพร้อมกับ</span>
                    เสียงเพลง<PiMusicNoteFill style={{marginTop:'-5px'}}/> 
                </h2>

                <div id="home-btn">
                    {searchButton()} {inputButton()}
                </div>

                <div id="description-title">
                    <div className="description">
                        <h5 className="underline">
                            Kashify คืออะไร ?
                        </h5>
                        <p>
                            {KASHIFY} เป็นเว็บไซต์สำหรับเรียนรู้คำศัพท์ภาษาญี่ปุ่น ผ่านเนื้อเพลงภาษาญี่ปุ่น 
                            ผู้ใช้สามารถเรียนรู้ความหมายของคำศัพท์ต่าง ๆ ในเนื้อเพลงได้อย่างสะดวก รวดเร็ว
                            และสามารถเลือกเนื้อเพลงได้ตามความเหมาะสมกับตัวเองได้ตามระดับความยากง่ายของเนื้อเพลง
                            หรือถ้าหากไม่มีเพลงที่ชอบในเว็บก็สามารถนำเนื้อเพลงมาใส่แล้ว {INPUT_LINK} ได้อีกด้วย
                            นอกจากนี้ถ้าไม่รู้จะฟังเพลงภาษาญี่ปุ่นอะไรดี {KASHIFY} ก็ได้เตรียม {SPOTIFY} ที่มีเพลงภาษาญี่ปุ่นให้พร้อมแล้ว กดไปฟังเพลงและเรียนรู้คำศัพท์ภาษาญี่ปุ่นกันได้เลย!
                        </p> 
                        <p className="radius">
                            <Link to="/playlist/37i9dQZEVXbKXQ4mDTEBXq" className="pink-link font-semi-bold">
                                <VscCircleFilled/> เลือกเพลงใน  {SPOTIFY} 
                            </Link>
                            <br/>
                            <Link to="/levels" className="pink-link font-semi-bold">
                                <VscCircleFilled/> ระดับความยากง่ายของเนื้อเพลง
                            </Link>
                            <br/>
                            <Link to="/about" className="pink-link font-semi-bold">
                                <VscCircleFilled/> เกี่ยวกับ Kashify และแหล่งข้อมูลที่ใช้
                            </Link>                            
                        </p>
                                                
                        {PLS_HELP_ME}
                    </div>
                </div>

                
            </Col>
            <Col xl={6}>
                <div id="home-note-icon">
                    <IoMusicalNotes id="bold"/>
                    <IoLanguage id="light"/>
                </div>
            </Col>
        </Row>  
    </Container>
    <Container className="footer" fluid>
        <Container id="left">
            <Row>
                <Col lg={6} id="first">
                    เว็บแอพลิเคชัน {KASHIFY} นี้เป็นส่วนหนึ่งของรายวิชา 2209491 โครงการเทคโนโลยีภาษา 1 และ 2209492 โครงการเทคโนโลยีภาษา 2 ภาควิชาภาษาศาสตร์ คณะอักษรศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                </Col>
                <Col lg={6}>
                    พัฒนาโดย <span className="font-semi-bold"> ญาธิป เจริญวราวุฒิ </span>
                    จบจากสาขาวิชาเทคโนโลยีภาษาและสารสนเทศ คณะอักษรศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                    <br/>
                    <div style={{paddingTop: 10}}>
                        <a href="mailto: kaopun.yathip@gmail.com" id="fb">
                            <IoMail /> kaopun.yathip@gmail.com 
                        </a>
                        &nbsp;&nbsp;
                        <a href="https://www.facebook.com/111873184863262" id="fb" target="_blank">
                            <FaFacebook /> Kashify เว็บเรียนคำศัพท์ญี่ปุ่นผ่านเนื้อเพลง
                        </a>
                    </div>
                </Col>
            </Row>
        </Container>
    </Container>
    </>

    );
}
export default Home;