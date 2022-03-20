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
                  <Col md={6}>
                    <Card className={item.cName} id="sub-level">
                      <div className="tagLevel" style={{ width:'100%' }}>
                        <Card.Header className="header" id={item.id}> 
                          <Card.Title className="font-bold">{item.title}</Card.Title>
                          <Card.Subtitle>{item.subtitle}</Card.Subtitle>
                        </Card.Header>                      
                      </div>
                    </Card>
                  </Col> 

                  <Col md={6}>
                    <Card className={item.cName} id="sub-level">
                      <p lang="en">
                          {item.textEn}
                      </p>
                      <p lang="th">
                        {item.textTh}
                      </p>
                    </Card>
                  </Col> 

                  <Container style={{ marginTop: 30 }}>
                    <SearchBar level={item.id} />
                  </Container>

                </Row>     
              )}
            })}     
              
          </Container>
    );
}
export default SubLevels;