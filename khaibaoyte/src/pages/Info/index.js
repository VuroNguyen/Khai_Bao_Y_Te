import React, { useState, useEffect } from 'react';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Footer from '../../components/Footer';
import EnterpriseNav from '../../components/Navbars/Enterprise/EnterpriseNav';
import SystemTime from '../../components/System';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {serverUrl} from '../../config/Route/server'

function EnterpriseInfo() {
    //get token from localStorage
    const usertoken = localStorage.getItem('khaibaoyte');
    const emailtoken = window.location.href.split('enterprise/')[1];

    const decoded = jwt_decode(emailtoken);

    const [response, setResponse] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `${serverUrl}/enterprise/getAllEnterprise?email=${decoded.email}`,
            );
            setResponse(result.data[0]);
            console.log(result.data);
        };
        fetchData();
    }, []);

    return (
        <div className='page-container'>
            <div className='content-wrap'>
                <EnterpriseNav token={emailtoken} />
                <div className='container-fluid'>
                    <div style={{ paddingTop: '2vh' }} />
                    <SystemTime />
                    <div style={{ paddingTop: '3vh' }} />
                    <div className='text-center'>
                        <h3 style={{ color: '#55befc' }}>Xem thông tin doanh nghiệp</h3>
                    </div>
                    <Form>
                        <FormGroup>
                            <Label for="businessName">1. Tên doanh nghiệp</Label>
                            <Input type="text" name="businessName" id="businessName" value={response.name} disabled />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userEmail">2. Email</Label>
                            <Input type="email" name="businessEmail" id="businessEmail" value={response.email} disabled />
                        </FormGroup>
                        <Row form>
                            <Col md={8}>
                                <FormGroup>
                                    <Label for="businessAddress">4. Địa chỉ</Label>
                                    <Input type="text" name="businessAddress" id="businessAddress" value={response.address} disabled />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="businessTaxNumber">5. Mã số thuế</Label>
                                    <Input className="without_number" type="number" name="businessTaxNumber" id="businessTaxNumber" value={response.MST} disabled />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="file">6. Tài liệu</Label>
                            <Input type="text" name="businessName" id="businessName" value={response.document} disabled />
                        </FormGroup>
                    </Form>
                </div>
                <div style={{ paddingBottom: '2vh' }} />
            </div>
            <Footer />
        </div>
    )
}

export default EnterpriseInfo
