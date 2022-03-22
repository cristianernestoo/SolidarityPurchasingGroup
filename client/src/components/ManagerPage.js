import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import API from "../API";

function ManagerPage(props) {
    const {userid} = props;
    const [manager, setManager] = useState('');
    useEffect(() => {
        if (userid) {
            API.getUserInfo(userid).then((user) => {
                setManager(user.name[0].toUpperCase() + user.name.substring(1)  + ' ' + user.surname[0].toUpperCase() + user.surname.substring(1));
            });
        }

    }, [manager, userid]);
    return (
            <Container style={{ marginTop: "3rem" }}>
                <Row align='center'>
                    <Col>
                        <h3 style={{ fontSize: '35px', color: '#1d1d1d' }}> Welcome, {manager}! </h3>
                    </Col>
                </Row>
                <hr style={{ marginTop: 5 }} />
                <Row align='center' >

                    <Col xs={12} sm={12} md={6} >
                        <Link to={{ pathname: '/weeklyReports' }}>
                            <div className="farmer-button">
                                <button data-testid="button_weekly_reports">
                                    Get weekly reports
                                </button>
                            </div>
                        </Link>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Link to={{ pathname: '/monthlyReports' }}>
                            <div className="farmer-button">
                                <button data-testid="button_monthly_reports">
                                    Get monthly reports
                                </button>
                            </div>
                        </Link>
                    </Col>
                </Row>
                <hr />
            </Container>
        );
}

export default ManagerPage;
