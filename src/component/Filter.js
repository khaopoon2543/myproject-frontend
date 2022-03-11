import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';

function Filter() {

    return (
            <Container style={{ marginTop: 10 }}>
                <ol className="filters">
                  <li>
                    <label>All</label>
                  </li>
                  <li>
                    <label>Lyric</label>
                  </li>
                  <li>
                    <label>Song</label>
                  </li>
                </ol>
            </Container>
    );
}
export default Filter;
