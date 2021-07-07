import React from 'react'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import './index.css'

function RegisterForm() {
    return (
        <Container>

            <Container>
                <Form>
                    <FormGroup>
                        <Label for="businessName">1. Tên doanh nghiệp <span className='text-danger'>*</span></Label>
                        <Input type="text" name="businessName" id="businessName" placeholder='ex: FPT Information System' required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="userEmail">2. Email</Label>
                        <Input type="email" name="userEmail" id="userEmail" placeholder={{}} disabled />
                    </FormGroup>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="businessAddress">4. Địa chỉ <span className='text-danger'>*</span></Label>
                                <Input type="text" name="businessTaxNumber" id="businessAddress" required />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="businessTaxNumber">5. Mã số thuế <span className='text-danger'>*</span></Label>
                                <Input className="without_number" type="number" name="businessTaxNumber" id="businessTaxNumber" required />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="businessZipCode">6. Mã bưu chính <span className='text-danger'>*</span></Label>
                                <Input className="without_number" type="number" name="businessZipCode" id="businessZipCode" required />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Button outline color="info">Gửi</Button>
                </Form>
            </Container>
        </Container >
    )
}

export default RegisterForm
