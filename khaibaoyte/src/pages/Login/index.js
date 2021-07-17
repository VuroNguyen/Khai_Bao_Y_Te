import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { AuthContext } from '../../components/contexts/AuthContext'

function Login() {
    const [userEmail, setUserEmail] = useState('');
    const history = useHistory();

    const data = JSON.stringify({
        email: userEmail
    })

    const { loginUser, registerUser } = useContext(AuthContext)

    const onSubmitChange = event => setUserEmail(event.target.value)

    const login = async event => {
        // double try catch for both scenario whether
        // the email is registered or not
        event.preventDefault()
        // add variable to check if its registered
        let isRegistered = true;

        // run 1st
        // login try catch for registered emails
        try {
            const loginData = await loginUser(data)
            if (loginData.enterprise) {
                alert('Đăng nhập với mail doanh nghiệp');
                history.push({
                    pathname: "/admindashboard",
                })
            }
            if (loginData.user) {
                alert('Đăng nhập với mail nhân viên');
                history.push({
                    pathname: "/form"
                })
            }
            // if login failed == no email in db
            if (!loginData.success) {
                isRegistered = false;
            }
            console.log(loginData);
        } catch (error) {
            console.log(error)
        }

        // if there is no email in the db
        // login try catch for unregistered emails
        if (!isRegistered) {
            try {
                const createData = await registerUser(data);
                if (createData.success) {
                    alert(`Email xác thực đã được gửi. Vui lòng truy cập email để xác nhận`);
                }
                if (createData.success) {
                    history.push({
                        pathname: "/form"
                    })
                }
                console.log(createData);
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Container>
            <Container>
                <div className='text-center'>
                    <h3 style={{ color: '#55befc' }}>Khai Báo Y Tế Nhân Viên</h3>
                    <div style={{ paddingTop: '1em' }} />
                    <Form onSubmit={login}>
                        <FormGroup>
                            <Label for="userEmail"><h4>Nhập email để xác thực</h4></Label>
                            <Input className="w-75 mx-auto"
                                type="email"
                                name="userEmail"
                                id="userEmail"
                                placeholder="Ví dụ: emailcuaban@fpt.com.vn"
                                required
                                value={userEmail}
                                onChange={onSubmitChange} />
                        </FormGroup>
                        <Button style={{ height: '5vh', width: '15vh' }} outline color="primary">Gửi email</Button>
                    </Form>
                    <br />
                    {/* Mẫn */}
                    <p className="text-danger font-italic">Lỗi báo chỗ này, thêm if các thứ để hiển thị</p>
                    <br /><br />
                </div>
            </Container>
            <Container className="text-center"><h4 className='text-danger font-weight-bold'>HƯỚNG DẪN SỬ DỤNG</h4></Container>
            <Container>
                <div style={{ paddingTop: '30px' }} />
                <p className='text-info'>1. Đối với người dùng mới: </p>
                <p>_ Nhập email vào ô bên trên và nhấn gửi</p>
                <p>_ Đăng nhập email và nhấn vào link xác nhận</p>
                <p className='text-info'>2. Đối với người dùng đã xác nhận email: </p>
                <p>_ Nhập email vào ô bên trên và nhấn gửi sẽ tiến hành khai báo</p>
                <p className='text-info'>3. Đối với người dùng muốn Đăng ký doanh nghiệp: </p>
                <p>_ Nhấp vào trang <a href="/register">Dành cho chủ doanh nghiệp</a> để thêm thông tin </p>
                <br />
                <p className='text-primary font-italic'>Mọi thắc mắc xin vui lòng liên lạc để được <a href="tel:123-456-7890">hỗ trợ</a></p>
                <div style={{ paddingBottom: '20px' }} />
            </Container>
        </Container>
    )
}

export default Login
