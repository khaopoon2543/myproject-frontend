import { Container, Col, Card, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { LevelsItems } from "../component/LevelsItems";
import SearchBar from "../component/SearchBar";

function SubLevels() {
    const { subLevels } = useParams() 

    return (
          <Container style={{ marginTop: 20, marginBottom: 50 }}>
            
            {LevelsItems.map((item, index) => {
              if (item.id === subLevels) {
                return (
                <Row key={index}>
                  <Col xl={3}>
                    <Card className="levelCard" id="sub-level">
                      <Card.Header id={item.id}> 
                        <Card.Title className="font-bold">{item.title}</Card.Title>
                        <Card.Subtitle>{item.subtitle}</Card.Subtitle>
                      </Card.Header> 

                      <Card.Body className="levelText" id="sub-level">
                        <Card.Text>
                          <span lang="en">{item.textEn}</span><br/>
                          <span lang="th">{item.textTh}</span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col> 
                  <Col xl={9}>
                    <SearchBar level={item.id} />
                  </Col>
                </Row>     
              )}
            })}     
              
          </Container>
    );
}
export default SubLevels;