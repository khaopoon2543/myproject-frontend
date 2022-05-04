import { Container, Col, Row, Card} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaSpotify } from 'react-icons/fa';
import { MdSource } from 'react-icons/md';

const PINK = {
  color: "var(--pink)"
}
const PINK_LINK = {
  color: "var(--pink)",
}
const KASHIFY = <strong> Kashify </strong>
const KASHIFY_PINK = <strong style={PINK}> Kashify </strong>

const SOURCES_ITEMS = [
  {
    title: 'LYRICAL NONSENSE',
    url: 'https://www.lyrical-nonsense.com',
    description: `Lyrical Nonsense เป็นเว็บไซต์ค้นหาเนื้อเพลงหลากหลายภาษา โดยมีเนื้อเพลงภาษาญี่ปุ่นเป็นส่วนใหญ่ 
                  และมีการอัปเดตเนื้อเพลงใหม่ ๆ อยู่ตลอด
                  โดยข้อมูลเพลงและเนื้อเพลงบน Kashify นั้นนำมาจากเว็บไซต์นี้ทั้งหมด`
  },
  {
    title: 'JT DIC',
    url: 'http://www.jtdic.com',
    description: `JT DIC เป็นพจนานุกรมภาษาญี่ปุ่น-ไทย พัฒนาโดยคุณไพฑูรย์ แซ่ตั้ง
                  โดย JT DIC เป็นพจนานุกรมที่ใช้แสดงความหมายของคำศัพท์ภาษาญี่ปุ่นที่ปรากฎบนเนื้อเพลงใน Kashify`
  },
  {
    title: 'JReadability',
    url: 'https://jreadability.net/sys/en',
    description: `JReadability (Japanese Text Readability Measurement System) 
                  เป็นระบบประเมินความสามารถในการอ่านบทความภาษาญี่ปุ่นสำหรับผู้เรียนภาษาญี่ปุ่น 
                  เมื่อใส่บทความภาษาญี่ปุ่นเข้าไปในระบบ ระบบจะแสดงค่าและระดับความยากง่ายในการอ่าน (Readability Score)`
  },
  {
    title: 'Spotify API',
    url: 'https://developer.spotify.com/documentation/web-api',
    description: `Spotify นั้นเป็นบริการสตรีมมิ่งเพลงดิจิทัล พอดแคสต์และวิดีโอ 
                  ซึ่งเปิดให้ผู้ใช้เข้าถึงบทเพลงจำนวนมากและเนื้อหาอื่นๆ จากศิลปินทั่วทุกมุมโลก 
                  ซึ่ง Spotify เองนั้นก็มี Spotify API ที่เปิดให้นักพัฒนาสามารถเข้าถึงข้อมูลบางส่วนเกี่ยวกับ
                  ผู้ใช้ เพลย์ลิสต์ และศิลปินผ่าน Web API (การเชื่อมต่อ API ผ่านเว็บไซต์)`
  },
  {
    title: 'SudachiPy',
    url: 'https://github.com/WorksApplications/SudachiPy',
    description: `SudachiPy คือ Japanese morphological analyzer (Python version) 
                  โดยสามารถนำไปใช้ในการประมวลผลภาษาธรรมชาติ (Natural language processing) 
                  สำหรับภาษาญี่ปุ่นได้อย่างง่าย โดยใน Kashify ใช้ SudachiPy ในการ Tokenization และ Part of speech tagging เนื้อเพลงภาษาญี่ปุ่น`
  }
]

function About() {

    return (
        <Container className="pages" lang="th"> 
          <Row>
            <Col xl={4} >
              <div className="header-left">
                <h1 className="font-bold">
                  เกี่ยวกับ {KASHIFY_PINK}
                </h1>

                <div className="description">
                  <p>
                    {KASHIFY} 
                    เป็นเว็บไซต์สำหรับเรียนรู้คำศัพท์ภาษาญี่ปุ่นผ่านเนื้อเพลงภาษาญี่ปุ่น
                    โดยมีการแบ่งระดับความยากง่ายของเนื้อเพลง เพื่อให้ผู้เรียนสามารถเลือกเพลงที่อยากเรียนรู้ได้เหมาะสมกับตัวเองได้
                  </p>
                  <p>
                    นอกจากนี้แล้ว ผู้ใช้สามารถเชื่อมต่อกับ <FaSpotify /> Spotify 
                    เพื่อเพิ่มความสะดวกในการใช้งาน 
                    {KASHIFY}
                    ได้ด้วย โดยผู้ใช้สามารถค้นหาเนื้อเพลงของเพลงที่กำลังเล่นผ่าน Spotify ได้ทันที หรือค้นหาเพลงผ่าน Spotify ก็ทำได้เช่นเดียวกัน
                    กดไปดูรายละเอียดเพิ่มเติมได้
                    <Link to={"/spotify"} style={PINK_LINK}><strong> ที่นี่เลย!</strong></Link>
                  </p>
                </div>
              </div>
            </Col>

            <Col xl={8} className="text-left">
              <h1 className="font-bold">
                <MdSource id="icon-title"/> 
                <span lang="th" className="font-bold"> แหล่งข้อมูล</span>
              </h1>
              {SOURCES_ITEMS.map((item, index) => {
                  return (
                    <Card key={index}>
                      <Card.Link href={item.url} target='blank'>
                        <h4 className="title-sources">
                          {item.title}
                        </h4>
                      </Card.Link>
                      <Card.Body>
                        <p lang="th" className="text-sources">
                          {item.description}
                        </p>
                      </Card.Body>
                    </Card>
                  )
              })}  
            </Col>

          </Row>
        </Container>
    );
}

export default About;
