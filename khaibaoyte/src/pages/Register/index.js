import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

function Register() {
    return (
        <Container>
            <Container>
                <div className='text-center'>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail"><h4>Nhập Email để đăng kí</h4></Label>
                            <Input className="w-50 mx-auto" type="email" name="email" id="exampleEmail" placeholder="ex: yourmail@gmail.com, ..." required />
                        </FormGroup>
                        <Link to='/registerform'>
                            <Button outline color="primary">Gửi</Button>
                        </Link>
                    </Form>
                    <div style={{ paddingTop: '10px' }} />
                    <p class="font-italic">Yêu cầu email bao gồm cả @ và tên miền phía sau</p>
                </div>
                <br /><br />
            </Container>
            <Container className="text-center"><h4 className='text-danger font-weight-bold'>LƯU Ý</h4></Container>
            <Container style={{ border: '1px solid' }}>
            <div style={{ paddingTop: '30px' }} />
            <p className='text-info'>1. Đối với người dùng đăng kí mới: </p>
            <p>_ Nhập email vào ô bên trên và nhấn gửi</p>
            <p>_ Đăng nhập email và nhấn vào link xác nhận</p>
            <p>_ Điền các thông tin có liên quan trên đơn đăng kí</p>
            <p>_ Bấm gửi và hệ thống sẽ trả về kết quả</p>
            <p>_ Nếu không thành công thì do có người đã đăng kí email, mã số thuế này rồi</p>
            <p>_ Nếu đã có tài khoản mời quay lại trang <a href="/login">Đăng Nhập</a></p>
            <br/>
            <p className='text-primary font-italic'>Mọi thắc mắc xin vui lòng liên lạc để được <a href="tel:123-456-7890">hỗ trợ</a></p>
            <div style={{ paddingBottom: '20px' }} />
            </Container>
        </Container>
    )
}

export default Register
