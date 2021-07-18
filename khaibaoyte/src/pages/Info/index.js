import React from 'react';
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Footer from '../../components/Footer';
import ManageNav from '../../components/Navbars/Enterprise/ManageNav';
import SystemTime from '../../components/System';

function EnterpriseInfo() {
    return (
        <div className='page-container'>
            <div className='content-wrap'>
                <ManageNav />
                <div className='container'>
                    <div style={{ paddingTop: '2vh' }} />
                    <SystemTime />
                    <div style={{ paddingTop: '3vh' }} />
                    <Container>
                        <Container>
                            <div className='text-center'>
                                <h3 style={{ color: '#55befc' }}>Xem thông tin doanh nghiệp</h3>
                                <div style={{ paddingTop: '1em' }} />
                            </div>
                            <Form>
                                <FormGroup>
                                    <Label for="businessName">1. Tên doanh nghiệp</Label>
                                    <Input type="text" name="businessName" id="businessName" placeholder='ex: FPT Information System' value={{}} disabled />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="userEmail">2. Email</Label>
                                    <Input type="email" name="businessEmail" id="businessEmail" placeholder={{}} disabled />
                                </FormGroup>
                                <Row form>
                                    <Col md={8}>
                                        <FormGroup>
                                            <Label for="businessAddress">4. Địa chỉ</Label>
                                            <Input type="text" name="businessAddress" id="businessAddress" value={{}} disabled />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="businessTaxNumber">5. Mã số thuế</Label>
                                            <Input className="without_number" type="number" name="businessTaxNumber" id="businessTaxNumber" value={{}} disabled />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Label for="file">6. Tài liệu</Label>
                                    <Input type="text" name="businessName" id="businessName" placeholder='ex: FPT Information System' value={{}} disabled />
                                </FormGroup>
                            </Form>
                        </Container>
                    </Container >
                </div>
                <div style={{ paddingBottom: '2vh' }} />
            </div>
            <Footer />
        </div>
    )
}

export default EnterpriseInfo
