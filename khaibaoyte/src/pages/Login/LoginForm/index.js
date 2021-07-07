import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, CustomInput, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import './index.css'

function LoginForm() {
    return (
        <Container>
            <Container>
                <p className='font-weight-bold'>Số lần khai báo trong ngày: { } </p>
                <p className='font-italic'>Khai báo lần cuối lúc: { }</p>
                <Link to='#'>
                    <Button outline color="info">Lịch sử khai báo</Button>
                </Link>
            </Container>
            <div style={{ paddingTop: '2%' }} />
            <Container>
                <Form>
                    <FormGroup>
                        <Label for="userEmail">1. Email</Label>
                        <Input type="email" name="userEmail" id="userEmail" placeholder={{}} disabled />
                    </FormGroup>
                    <FormGroup>
                        <Label for="userDepartment">2. Phòng ban <span className='text-danger'>*</span></Label>
                        <CustomInput type="select" id="userDepartment" name="userDepartment" required>
                            <option value="">Vui lòng chọn phòng ban</option>
                            <option value='HR'>Nhân sự</option>
                            <option value='IT'>IT</option>
                            <option value='Marketing'>Marketing</option>
                            <option value='Manager'>Quản lí</option>
                            <option value='Accounting'>Kế toán</option>
                            <FormFeedback>Test Error</FormFeedback>
                        </CustomInput>
                    </FormGroup>
                    <FormGroup>
                        <Label for="userTel">3. Số điện thoại <span className='text-danger'>*</span></Label>
                        <Input className="without_number" type="number" name="userTel" id="userTel" placeholder="ex: 0845372112" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="question5">4. Anh/Chị có dấu hiệu lâm sàng nào dưới đây? <span className='text-danger'>*</span></Label>
                        <div>
                            <CustomInput type="checkbox" id="dauhieu1" label="Ho khan hoặc đau họng" />
                            <CustomInput type="checkbox" id="dauhieu2" label="Đau ngực hoặc khó thở" />
                            <CustomInput type="checkbox" id="dauhieu3" label="Sốt cao (trên 38 độ C)" />
                            <CustomInput type="checkbox" id="dauhieu4" label="Chảy nước mũi khó chịu" />
                            <CustomInput type="checkbox" id="none6" label="Không có tất cả dấu hiệu trên" required />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="question6">5. Anh/Chị hoặc người thân tiếp xúc gần có vừa di chuyển từ nơi khác về không? <span className='text-danger'>*</span></Label>
                        <div>
                            <CustomInput type="radio" id="none7" name="question6" label="Không" required />
                            <CustomInput type="radio" id="dichuyen1" name="question6" label="Có và đã khai báo trong 14 ngày" />
                            <CustomInput type="radio" id="dichuyen2" name="question6" label="Anh/Chị là người di chuyển" />
                            <CustomInput type="radio" id="dichuyen3" name="question6" label="Người thân tiếp xúc gần của Anh/Chị là người di chuyển" />
                            <CustomInput type="radio" id="dichuyen4" name="question6" label="Cả hai đều là người di chuyển" />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="question7">6. Anh/Chị hoặc người thân tiếp xúc gần có tiếp xúc gần với người từ nước ngoài/người từ vùng dịch về/người được xếp loại F không? <span className='text-danger'>*</span></Label>
                        <div>
                            <CustomInput type="radio" id="none8" name="question7" label="Không" required />
                            <CustomInput type="radio" id="tiepxuc1" name="question7" label="Có và đã khai báo trong 14 ngày" />
                            <CustomInput type="radio" id="tiepxuc2" name="question7" label="Anh/Chị là người tiếp xúc" />
                            <CustomInput type="radio" id="tiepxuc3" name="question7" label="Người thân tiếp xúc gần của Anh/Chị là người tiếp xúc" />
                            <CustomInput type="radio" id="tiepxuc4" name="question7" label="Cả hai đều là người tiếp xúc" />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="question8">7. Anh/Chị có đến hoặc lưu trú tại các địa điểm liên quan đến người nhiễm Covid được công bố hoặc có tiếp xúc với người nhiễm/nghi nhiễm Covid không? <span className='text-danger'>*</span></Label>
                        <div>
                            <CustomInput type="radio" id="none9" name="question8" label="Không" required />
                            <CustomInput type="radio" id="luutru1" name="question8" label="Có và đã khai báo trong 14 ngày" />
                            <CustomInput type="radio" id="luutru2" name="question8" label="Anh/Chị là người di chuyển/tiếp xúc" />
                            <CustomInput type="radio" id="luutru3" name="question8" label="Người thân tiếp xúc gần của Anh/Chị là người di chuyển/tiếp xúc" />
                            <CustomInput type="radio" id="luutru4" name="question8" label="Cả hai đều là người di chuyển/tiếp xúc" />
                        </div>
                    </FormGroup>
                    <Button outline color="info">Gửi</Button>
                </Form>
            </Container>
        </Container >
    )
}

export default LoginForm
