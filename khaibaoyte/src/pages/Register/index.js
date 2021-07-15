import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../components/contexts/AuthContext'
import { Button, Col, Container, CustomInput, Form, FormGroup, Input, Label, Row } from 'reactstrap'

function Register() {
    const [businessForm, setBusinessForm] = useState({
        email: '',
        name: '',
        address: '',
        MST: '',
        document: 'không',
    });


    // const [businessForm, setBusinessForm] = useState({
    //     emailBusiness: '',
    //     nameBusiness: '',
    //     addressBusiness: '',
    //     MSTBusiness: '',
    //     documentBusiness: 'không',
    // });

    const history = useHistory();
    const data = JSON.stringify(businessForm)

    // const getMail = async data => {
    //     try {
    //         const response = await axios({
    //             method: 'POST',
    //             url: 'http://localhost:5000/enterprise/register',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             data: data,
    //         })
    //         if (response.data.success)
    //             localStorage.setItem('khaibaoyte', response.data.accessToken)

    //         return response.data
    //     } catch (e) {
    //         return { success: false, message: e.message }
    //     }
    // }

    // const OnSub = () => {
    //     alert(`Business Email: ${businessEmail}`);
    //     history.push({
    //         pathname: "/registerform",
    //     });
    //     getMail(data)
    // }

    // const onChangeConfirm = event => setBusinessEmail(event.target.value)

    const { registerEnterprise } = useContext(AuthContext)



    const register = async event => {
        event.preventDefault()

        try {
            const registerData = await registerEnterprise(data)
            console.log(registerData.accessToken)
            if (registerData.success) {
                history.push({
                    pathname: "/admindashboard",
                })
            }
            console.log(registerData)
        } catch (error) {
            console.log(error)
        }
    }

    const { email, name, address, MST, document } = businessForm



    const onChangeBusinessForm = event =>
        setBusinessForm({ ...businessForm, [event.target.name]: event.target.value })


    return (
        <Container>
            <Container>
                <div className='text-center'>
                    <h3 style={{ color: '#55befc' }}>Tài khoản doanh nghiệp</h3>
                    <div style={{ paddingTop: '1em' }} />
                    <Form onSubmit={register}>
                        <FormGroup>
                            <Label for="userEmail"><h4>Nhập Email để điền thông tin</h4></Label>
                            <Input
                                className="w-75 mx-auto"
                                type="email"
                                name="email"
                                id="userEmail"
                                placeholder="ex: yourmail@gmail.com, ..."
                                required
                                value={email}
                                onChange={onChangeBusinessForm} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="businessName">1. Tên doanh nghiệp <span className='text-danger'>*</span></Label>
                            <Input
                                type="text"
                                name="name"
                                id="businessName"
                                placeholder='ex: FPT Information System'
                                required
                                value={name}
                                onChange={onChangeBusinessForm} />
                        </FormGroup>
                        <Row form>
                            <Col md={8}>
                                <FormGroup>
                                    <Label for="businessAddress">4. Địa chỉ <span className='text-danger'>*</span></Label>
                                    <Input
                                        type="text"
                                        name="address"
                                        id="businessAddress"
                                        required
                                        value={address}
                                        onChange={onChangeBusinessForm} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="businessTaxNumber">5. Mã số thuế <span className='text-danger'>*</span></Label>
                                    <Input
                                        className="without_number"
                                        type="number"
                                        name="MST"
                                        id="businessTaxNumber"
                                        required
                                        value={MST}
                                        onChange={onChangeBusinessForm} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="file">6. Tài liệu</Label>
                            <CustomInput
                                type="file"
                                id="businessDocument"
                                name="document"
                                label="Upload tài liệu ở đây"
                            />
                        </FormGroup>

                        <Button outline color="primary">Gửi</Button>
                    </Form>
                    <div style={{ paddingTop: '10px' }} />
                    <p className="font-italic">Yêu cầu email bao gồm cả @ và tên miền phía sau</p>
                </div>
                <br /><br />
            </Container>
            <Container className="text-center"><h4 className='text-danger font-weight-bold'>LƯU Ý</h4></Container>
            <Container style={{ border: '1px solid' }}>
                <div style={{ paddingTop: '30px' }} />
                <p className='text-info'>1. Đối với doanh nghiệp Đăng ký mới: </p>
                <p>_ Nhập email vào ô bên trên và nhấn gửi</p>
                <p>_ Đăng nhập email và nhấn vào link xác nhận</p>
                <p>_ Điền các thông tin có liên quan trên đơn Đăng ký</p>
                <p>_ Bấm gửi và hệ thống sẽ trả về kết quả</p>
                <p>_ Nhập email nhân viên bằng dấu + và thông báo xác nhận sẽ được gửi tới từng người</p>
                <p>_ Nếu đã có tài khoản mời quay lại trang <a href="/login">Đăng Nhập</a></p>
                <br />
                <p className='text-primary font-italic'>Mọi thắc mắc xin vui lòng liên lạc để được <a href="tel:123-456-7890">hỗ trợ</a></p>
                <div style={{ paddingBottom: '20px' }} />
            </Container>
        </Container>
    )
}

export default Register
