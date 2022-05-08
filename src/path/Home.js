import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { MdMusicNote } from 'react-icons/md';
import { IoMusicalNotes, IoLanguage } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { LoginButton } from "../component/Navbar/NavbarButton";
import { FaSpotify } from 'react-icons/fa';
import { VscCircleFilled } from 'react-icons/vsc';

const KASHIFY = <span className="font-semi-bold"> Kashify </span>
const SPOTIFY = <span className="font-semi-bold"> <FaSpotify /> Spotify </span>

function searchButton() { 
    return (
        <Link to={"/search"}>
            <button id="search-btn">
                <FiSearch className="kashify-icon"/> 
                <span>ค้นหาเพลง</span>
            </button>
        </Link>
    )
}

const PLS_HELP_ME = 
    <div className="description">
        <h5 className="underline"> แบบประเมินความพึงพอใจ</h5>
        <p id="pls-help-me">
        <span>
            ลองใช้งาน {KASHIFY} กันแล้ว รบกวนทุกคนช่วยทำ
            <a href='https://forms.gle/r3kVyMy8KH5hazBB9' target='blank' rel='noopener noreferrer' className="pink-link"> 
            <span className="pink-link font-semi-bold"> แบบประเมินความพึงพอใจในการใช้งาน {KASHIFY} </span>
            </a>
            กันด้วยน้า หากมีข้อผิดพลาดใด ๆ ต้องขออภัยล่วงหน้าด้วยนะคะ ขอบคุณทุกคนมากเลยค่า 🙏💗
        </span>
        </p>
    </div>

function Home() {

  return (
    <Container className="pages" id="home">
        <Row>
            <Col xl={6} id="home-title">   
                <h2 className="font-bold">
                    เรียนรู้คำศัพท์
                    <br/>
                    <span className="font-semi-light">ไปพร้อมกับ</span>
                    เสียงเพลง<MdMusicNote/> 
                </h2>

                <div id="home-btn">
                    {searchButton()} <LoginButton/>
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
                            นอกจากนี้แล้วผู้ใช้สามารถเข้าสู่ระบบผ่าน {SPOTIFY} เพื่อเพิ่มความสะดวกในการใช้งาน {KASHIFY} ได้อีกด้วย
                        </p> 
                        <p className="radius">
                            <Link to="/spotify" className="pink-link font-semi-bold">
                                <VscCircleFilled/> เข้าสู่ระบบผ่าน {SPOTIFY} แล้วทำอะไรได้บ้าง ?
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
    );
}
export default Home;