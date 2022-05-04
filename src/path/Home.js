import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { MdMusicNote } from 'react-icons/md';
import { IoMusicalNotes, IoMusicalNotesOutline, IoLanguage } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { LoginButton } from "../component/Navbar/NavbarButton";
import { FaSpotify } from 'react-icons/fa';

const KASHIFY = <span> Kashify </span>
const SPOTIFY = <span> <FaSpotify /> Spotify </span>

function searchButton() { 
    return (
        <Link to={"/search"}>
            <button id="search-btn">
                <FiSearch className="kashify-icon"/> 
                <span lang="th">ค้นหาเพลง</span>
            </button>
        </Link>
    )
}

function Home() {

  return (
    <Container className="pages" id="home">
        <Row>
            <Col xl={6} id="home-title">
        
            <h1 className="font-bold" lang="th">
                เรียนรู้คำศัพท์
                <br/>
                <span className="font-semi-light">ไปพร้อมกับ</span>
                เสียงเพลง<MdMusicNote/> 
            </h1>

            <div id="home-btn">
                {searchButton()} <LoginButton/>
            </div>

            <div id="description-title">
                <h4 lang="th" className="font-bold" id="title">
                    Kashify คืออะไร ?
                </h4>
                <span lang="th" id="description">
                    {KASHIFY} เป็นเว็บไซต์สำหรับเรียนรู้คำศัพท์ภาษาญี่ปุ่น ผ่านเนื้อเพลงภาษาญี่ปุ่น 
                    ผู้ใช้สามารถเรียนรู้ความหมายของคำศัพท์ต่าง ๆ ในเนื้อเพลงได้อย่างสะดวก รวดเร็ว
                    และสามารถเลือกเนื้อเพลงได้ตามความเหมาะสมกับตัวเองได้ตามระดับความยากง่ายของเนื้อเพลง
                    นอกจากนี้แล้วผู้ใช้สามารถเข้าสู่ระบบผ่าน {SPOTIFY} เพื่อเพิ่มความสะดวกในการใช้งาน {KASHIFY} ได้อีกด้วย
                </span> 
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