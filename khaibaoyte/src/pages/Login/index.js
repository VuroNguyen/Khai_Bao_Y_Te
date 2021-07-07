import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, } from 'reactstrap';
import { Link } from 'react-router-dom'

function Login() {
    return (
        <Container>
            <Container>
                <div className='text-center'>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail"><h4>Nhập Email để đăng nhập</h4></Label>
                            <Input className="w-50 mx-auto" type="email" name="email" id="exampleEmail" placeholder="ex: yourmail@gmail.com, ..." required />
                        </FormGroup>
                        <Link to='/form'>
                            <Button outline color="primary">Gửi</Button>
                        </Link>
                    </Form>
                    <div style={{ paddingTop: '10px' }} />
                    <p class="font-italic">Yêu cầu email bao gồm cả @ và tên miền phía sau</p>
                </div>
                <br /><br />
            </Container>
            <Container className="text-center"><h4 className='text-danger font-weight-bold'>LƯU Ý</h4></Container>
            <p className='text-info'>1. Đối với người dùng mới: </p>
            <p>_ Nhập email vào ô bên trên và nhấn gửi</p>
            <p>_ Đăng nhập email và nhấn vào link xác nhận</p>
            <p className='text-info'>2. Đối với người dùng đã xác nhận email: </p>
            <p>_ Nhập email vào ô bên trên và nhấn gửi sẽ tiến hành khai báo</p>
            <p className='text-info'>3. Đối với người dùng muốn đăng kí doanh nghiệp: </p>
            <p>_ Nhấp vào link <a href="/register">Đăng Kí</a></p>
            <p>_ Nhập thông tin vào đơn đăng kí gồm mã số thuế, tên doanh nghiệp và xác nhận qua email</p>
            <p className='text-info'>4. Mọi thắc mắc xin vui lòng liên lạc để được <a href="tel:123-456-7890">hỗ trợ</a> </p>
        </Container>
    )
}

export default Login
