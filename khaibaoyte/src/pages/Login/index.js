import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

function Login() {
    const [userEmail, setUserEmail] = useState('');
    const history = useHistory();
    const data = JSON.stringify({
        email: userEmail
    })

    const getMail = async data => {
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/home/login',
                headers: {
                    'Content-Type': 'application/json',
                        },
                data: data,
            })
            if (response.data.success)
            localStorage.setItem('khaibaoyte', response.data.accessToken)

            return response.data
        } catch (e) {
            return {success: false, message: e.message}
        }
    }

    const onSub = () => {
        alert(`User Email: ${userEmail}`);
        history.push({
            pathname: "/form",
            state: {usermail: userEmail }
        });
        getMail(data);
    }
    
    return (
        <Container>
            <Container>
                <div className='text-center'>
                    <h3 style={{color: '#55befc'}}>Đăng nhập tài khoản</h3>
                    <div style={{ paddingTop:'1em'}} />
                    <Form onSubmit={onSub}>
                        <FormGroup>
                            <Label for="userEmail"><h4>Nhập Email để đăng nhập</h4></Label>
                            <Input className="w-75 mx-auto" type="email" name="userEmail" id="userEmail" placeholder="ex: yourmail@gmail.com, ..." required value={userEmail} onChange={ event => setUserEmail(event.target.value) } />
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
                <p className='text-info'>1. Đối với người dùng mới: </p>
                <p>_ Nhập email vào ô bên trên và nhấn gửi</p>
                <p>_ Đăng nhập email và nhấn vào link xác nhận</p>
                <p className='text-info'>2. Đối với người dùng đã xác nhận email: </p>
                <p>_ Nhập email vào ô bên trên và nhấn gửi sẽ tiến hành khai báo</p>
                <p className='text-info'>3. Đối với người dùng muốn Đăng ký doanh nghiệp: </p>
                <p>_ Nhấp vào link <a href="/register">Đăng ký</a></p>
                <br />
                <p className='text-primary font-italic'>Mọi thắc mắc xin vui lòng liên lạc để được <a href="tel:123-456-7890">hỗ trợ</a></p>
                <div style={{ paddingBottom: '20px' }} />
            </Container>
        </Container>
    )
}

export default Login
