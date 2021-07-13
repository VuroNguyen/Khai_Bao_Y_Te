import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { useHistory } from "react-router-dom";
import axios from 'axios';

function Register() {
    const [businessEmail, setBusinessEmail] = useState('');
    const history = useHistory();
    const data = JSON.stringify({
        email: businessEmail
    })

    const getMail = async data => {
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/home/register',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            })
            if (response.data.success)
                localStorage.setItem('khaibaoyte', response.data.accessToken)

            return response.data
        } catch (e) {
            return { success: false, message: e.message }
        }
    }

    const OnSub = () => {
        alert(`Business Email: ${businessEmail}`);
        history.push({
            pathname: "/registerform",
        });
        getMail(data)
    }
    return (
        <Container>
            <Container>
                <div className='text-center'>
                    <h3 style={{ color: '#55befc' }}>Đăng ký tài khoản</h3>
                    <div style={{ paddingTop: '1em' }} />
                    <Form onSubmit={OnSub}>
                        <FormGroup>
                            <Label for="userEmail"><h4>Nhập Email để đăng ký</h4></Label>
                            <Input className="w-75 mx-auto" type="email" name="userEmail" id="userEmail" placeholder="ex: yourmail@gmail.com, ..." required value={businessEmail} onChange={event => setBusinessEmail(event.target.value)} />
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
