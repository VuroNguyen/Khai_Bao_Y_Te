import React, { Component } from 'react'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import './index.css'

export default class a extends Component {
    constructor(props) {
        super(props)
        this.state = {
            businessName: '',
            businessEmail: '',
            businessAddress: '',
            businessTaxNumber: '',
            businessZipCode: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        const { businessName, businessEmail, businessAddress, businessTaxNumber, businessZipCode} = this.state
        const data = { businessName, businessEmail, businessAddress, businessTaxNumber, businessZipCode }
        const result = JSON.stringify(data);
        console.log(this.state)
        alert(result)
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
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="businessAddress">4. Địa chỉ <span className='text-danger'>*</span></Label>
                                    <Input type="text" name="businessAddress" id="businessAddress" required value={this.state.businessAddress} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="businessTaxNumber">5. Mã số thuế <span className='text-danger'>*</span></Label>
                                    <Input className="without_number" type="number" name="businessTaxNumber" id="businessTaxNumber" required value={this.state.businessTaxNumber} onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="businessZipCode">6. Mã bưu chính <span className='text-danger'>*</span></Label>
                                    <Input className="without_number" type="number" name="businessZipCode" id="businessZipCode" required value={this.state.businessZipCode} onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Button type="submit" outline color="info">Gửi</Button>
                    </Form>
                </Container>
            </Container >
        )
    }
}
