import { Container, Col, Row, Card} from 'react-bootstrap';
import { FaSpotify } from 'react-icons/fa';
import { MdSource } from 'react-icons/md';

const PINK = {
  color: "var(--pink)"
}
const KASHIFY_PINK = <strong style={PINK}> Kashify </strong>
const KASHIFY = <span className="font-semi-bold"> Kashify </span>
const SPOTIFY = <span className="font-semi-bold"><FaSpotify/> Spotify </span>

const SOURCES_ITEMS = [
  {
    title: 'LYRICAL NONSENSE',
    url: 'https://www.lyrical-nonsense.com',
    description: `Lyrical Nonsense เป็นเว็บไซต์ค้นหาเนื้อเพลงหลากหลายภาษา โดยมีเนื้อเพลงภาษาญี่ปุ่นเป็นส่วนใหญ่ 
                  และมีการอัปเดตเนื้อเพลงใหม่ ๆ อยู่ตลอด
                  โดยข้อมูลเพลงและเนื้อเพลงบน Kashify นั้นนำมาจากเว็บไซต์นี้ทั้งหมด`
  },
  {
    title: 'JTDIC',
    url: 'http://www.jtdic.com',
    description: `JTDIC (Japanese Thai Dictionary) เป็นพจนานุกรมภาษาญี่ปุ่น-ไทย พัฒนาโดยคุณไพฑูรย์ แซ่ตั้ง
                  โดย JTDIC เป็นพจนานุกรมที่ใช้แสดงความหมายของคำศัพท์ภาษาญี่ปุ่นที่ปรากฎบนเนื้อเพลงใน Kashify
                  `
  },
  {
    title: 'JReadability',
    url: 'https://jreadability.net/sys/en',
    description: `JReadability (Japanese Text Readability Measurement System) 
                  เป็นระบบประเมินความสามารถในการอ่านบทความภาษาญี่ปุ่นสำหรับผู้เรียนภาษาญี่ปุ่น 
                  เมื่อใส่บทความภาษาญี่ปุ่นเข้าไปในระบบ ระบบจะแสดงค่าและระดับความยากง่ายในการอ่าน (Readability Score)
                  Kashify ได้ใช้ระบบของ JReadability ในการวัดค่าและระดับความยากง่ายของเนื้อเพลงภาษาญี่ปุ่น
                  `
  },
  {
    title: 'Spotify API',
    url: 'https://developer.spotify.com/documentation/web-api',
    description: `Spotify นั้นเป็นบริการสตรีมมิ่งเพลงดิจิทัล พอดแคสต์และวิดีโอ 
                  ซึ่งเปิดให้ผู้ใช้เข้าถึงบทเพลงจำนวนมากและเนื้อหาอื่นๆ จากศิลปินทั่วทุกมุมโลก 
                  ซึ่ง Spotify เองนั้นก็มี Spotify API ที่เปิดให้นักพัฒนาสามารถเข้าถึงข้อมูลบางส่วนเกี่ยวกับ
                  ผู้ใช้ เพลย์ลิสต์ และศิลปินผ่าน Web API
                  โดย Kashify ได้นำ Spotify API มาใช้ในส่วนของการดึงข้อมูลเพลงที่ผู้ใช้กำลังฟังอยู่ ข้อมูล Playlists 
                  และการค้นหาเพลงบน Spotify
                  `
  },
  {
    title: 'SudachiPy',
    url: 'https://github.com/WorksApplications/SudachiPy',
    description: `SudachiPy คือ Japanese morphological analyzer (Python version) 
                  โดยสามารถนำไปใช้ในการประมวลผลภาษาธรรมชาติ (Natural language processing) 
                  สำหรับภาษาญี่ปุ่นได้อย่างง่าย โดยใน Kashify ใช้ SudachiPy ในการตัดคำ (Tokenization) และการแปะป้ายชนิดของคํา (Part of speech tagging) เนื้อเพลงภาษาญี่ปุ่น
                  `
  }
]

const ABOUT = {
  detail:   `เกิดขึ้นมาจากเรื่องปัญหาการเรียนภาษาญีปุ่นของผู้เรียนชาวไทย ที่เมื่อผู้เรียนได้เรียนภาษาญี่ปุ่นไปสักพักแล้ว ก็อาจเริ่มรู้สึกขาดแรงจูงใจในการเรียนขึ้นมา
            เนื่องจากภาษาญี่ปุ่นและภาษาไทยนั้นมีความแตกต่างกันทั้งในเรื่องของโครงสร้างประโยคและตัวอักษร ดังนั้นผู้พัฒนาจึงคิดว่าการนำเพลงมาเป็นส่วนหนึ่งของการเรียนรู้ภาษาญี่ปุ่นก็จะเป็นตัวช่วยที่ดีอย่างหนึ่งได้
            `
}

function About() {

    return (
        <Container className="pages"> 
          <Row>
            <Col xl={5} xxl={4} >
              <div className="header-left">
                <h1 className="font-bold">
                  เกี่ยวกับ {KASHIFY_PINK}
                </h1>

                <div className="description">
                  <h5 className="underline">ที่มาของ Kashify</h5>
                  <p> {KASHIFY} {ABOUT.detail} </p>

                  <h5 className="underline">Kashify คืออะไร ?</h5>
                  <p>
                    เป็นเว็บไซต์สำหรับเรียนรู้คำศัพท์ภาษาญี่ปุ่นผ่านเนื้อเพลงภาษาญี่ปุ่น
                    โดยมีการแบ่งระดับความยากง่ายของเนื้อเพลง เพื่อให้ผู้เรียนสามารถเลือกเพลงที่อยากเรียนรู้ได้เหมาะสมกับตัวเองได้
                  </p>
                  <p className="radius">
                    นอกจากนี้แล้ว ผู้ใช้สามารถเชื่อมต่อกับ {SPOTIFY} 
                    เพื่อเพิ่มความสะดวกในการใช้งาน 
                    {KASHIFY}
                    ได้ด้วย โดยผู้ใช้สามารถค้นหาเนื้อเพลงของเพลงที่กำลังเล่นผ่าน {SPOTIFY} ได้ทันที หรือค้นหาเพลงผ่าน {SPOTIFY} ก็ทำได้เช่นเดียวกัน
                  </p>
                </div>
              </div>
            </Col>

            <Col xl={7} xxl={8}>
              <div className="text-left result-right">
                <div className="content">
                  <h5 className="underline" id="about">
                    <MdSource id="icon-title"/> 
                    แหล่งข้อมูล
                  </h5>
                </div>
                {SOURCES_ITEMS.map((item, index) => {
                    return (
                      <Card key={index}>
                        <Card.Link href={item.url} target='blank'>
                          <h4 className="title-sources pink-link">
                            {item.title}
                          </h4>
                        </Card.Link>
                        <Card.Body>
                          <p className="black-text">
                            {item.description}
                          </p>
                        </Card.Body>
                      </Card>
                    )
                })}  
              </div>
            </Col>

          </Row>
        </Container>
    );
}

export default About;
