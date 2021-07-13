import React, { Component } from 'react'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row, CustomInput } from 'reactstrap'
import './index.css'

export default class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            businessName: '',
            businessEmail: '',
            businessAddress: '',
            businessTaxNumber: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        const { businessName, businessEmail, businessAddress, businessTaxNumber } = this.state
        const data = { businessName, businessEmail, businessAddress, businessTaxNumber }
        const result = JSON.stringify(data);
        console.log(this.state)
        alert(this.state)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <Container>
                <Container>
                    <div className='text-center'>
                        <h3 style={{ color: '#55befc' }}>Đăng ký thông tin doanh nghiệp</h3>
                        <div style={{ paddingTop: '1em' }} />
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="businessName">1. Tên doanh nghiệp <span className='text-danger'>*</span></Label>
                            <Input type="text" name="businessName" id="businessName" placeholder='ex: FPT Information System' required value={this.state.businessName} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userEmail">2. Email</Label>
                            <Input type="email" name="userEmail" id="userEmail" placeholder={{}} disabled />
                        </FormGroup>
                        <Row form>
                            <Col md={8}>
                                <FormGroup>
                                    <Label for="businessAddress">4. Địa chỉ <span className='text-danger'>*</span></Label>
                                    <Input type="text" name="businessAddress" id="businessAddress" required value={this.state.businessAddress} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="businessTaxNumber">5. Mã số thuế <span className='text-danger'>*</span></Label>
                                    <Input className="without_number" type="number" name="businessTaxNumber" id="businessTaxNumber" required value={this.state.businessTaxNumber} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="file">6. Tài liệu</Label>
                            <CustomInput type="file" id="businessDocument" name="businessDocument" label="Upload tài liệu ở đây" />
                        </FormGroup>
                        <Button type="submit" outline color="info">Gửi</Button>
                    </Form>
                </Container>
            </Container >
        )
    }
}
