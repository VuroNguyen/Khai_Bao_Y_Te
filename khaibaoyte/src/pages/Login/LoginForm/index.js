import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, CustomInput, Form, FormGroup, Input, Label } from 'reactstrap'
import './index.css'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = { userDepartment: '', userTel: '', userAnswer4: [], userAnswer5: '', userAnswer6: '', userAnswer7: '' }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onValueChange5 = this.onValueChange5.bind(this)
        this.onValueChange6 = this.onValueChange6.bind(this)
        this.onValueChange7 = this.onValueChange7.bind(this)
        this.onCheck = this.onCheck.bind(this);
    }

    onCheck(e) {
        this.setState({ [e.target.name]: e.target.checked });
    }

    handleSubmit(event) {
        event.preventDefault()
        const { userDepartment, userTel, userAnswer4, userAnswer5, userAnswer6, userAnswer7 } = this.state
        const data = { userDepartment, userTel, userAnswer4, userAnswer5, userAnswer6, userAnswer7 }
        const result = JSON.stringify(data);
        console.log(this.state)
        alert(result)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onValueChange5(e) {
        this.setState({
            userAnswer5: e.target.value
        });
    }

    onValueChange6(e) {
        this.setState({
            userAnswer6: e.target.value
        });
    }

    onValueChange7(e) {
        this.setState({
            userAnswer7: e.target.value
        });
    }

    render() {
        return (
            <Container>
                <Container>
                    <p className='font-weight-bold'>Số lần khai báo trong ngày: { } </p>
                    <p className='font-italic'>Khai báo lần cuối lúc: { }</p>
                    <Link to='/history'>
                        <Button outline color="info">Lịch sử khai báo</Button>
                    </Link>
                </Container>
                <div style={{ paddingTop: '2%' }} />
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="userEmail">1. Email</Label>
                            <Input type="email" name="userEmail" id="userEmail" placeholder={{}} disabled />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userDepartment">2. Phòng ban <span className='text-danger'>*</span></Label>
                            <Input type="select" id="userDepartment" name="userDepartment" required value={this.state.userDepartment} onChange={this.handleChange}>
                                <option value="">Vui lòng chọn phòng ban</option>
                                <option value='HR'>Nhân sự</option>
                                <option value='IT'>IT</option>
                                <option value='Marketing'>Marketing</option>
                                <option value='Manager'>Quản lí</option>
                                <option value='Accounting'>Kế toán</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="userTel">3. Số điện thoại <span className='text-danger'>*</span></Label>
                            <Input className="without_number" type="number" name="userTel" id="userTel" placeholder="ex: 0845372112" value={this.state.userTel} onChange={this.handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="question5">4. Anh/Chị có dấu hiệu lâm sàng nào dưới đây? <span className='text-danger'>*</span></Label>
                            <div>
                                <CustomInput type="checkbox" name="Ho khan hoặc đau họng" id="Ho khan hoặc đau họng" label="Ho khan hoặc đau họng" onChange={this.onCheck} value={this.state.name} />
                                <CustomInput type="checkbox" name="Đau ngực hoặc khó thở" id="Đau ngực hoặc khó thở" label="Đau ngực hoặc khó thở" onChange={this.onCheck} value={this.state.name} />
                                <CustomInput type="checkbox" name="Sốt cao (trên 38 độ C)" id="Sốt cao (trên 38 độ C)" label="Sốt cao (trên 38 độ C)" onChange={this.onCheck} value={this.state.name} />
                                <CustomInput type="checkbox" name="Chảy nước mũi khó chịu" id="Chảy nước mũi khó chịu" label="Chảy nước mũi khó chịu" onChange={this.onCheck} value={this.state.name} />
                                <CustomInput type="checkbox" name="Không có tất cả dấu hiệu trên" id="Không có tất cả dấu hiệu trên" label="Không có tất cả dấu hiệu trên" onChange={this.onCheck} value={this.state.name} />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="question5">5. Anh/Chị hoặc người thân tiếp xúc gần có vừa di chuyển từ nơi khác về không? <span className='text-danger'>*</span></Label>
                            <div>
                                <CustomInput type="radio" id="none5" name="question5" value="Không" label="Không" required checked={this.state.userAnswer5 === "Không"} onChange={this.onValueChange5} />
                                <CustomInput type="radio" id="dichuyen1" name="question5" value="Có và đã khai báo trong 14 ngày" label="Có và đã khai báo trong 14 ngày" checked={this.state.userAnswer5 === "Có và đã khai báo trong 14 ngày"} onChange={this.onValueChange5} />
                                <CustomInput type="radio" id="dichuyen2" name="question5" value="Anh/Chị là người di chuyển" label="Anh/Chị là người di chuyển" checked={this.state.userAnswer5 === "Anh/Chị là người di chuyển"} onChange={this.onValueChange5} />
                                <CustomInput type="radio" id="dichuyen3" name="question5" value="Người thân tiếp xúc gần của Anh/Chị là người di chuyển" label="Người thân tiếp xúc gần của Anh/Chị là người di chuyển" checked={this.state.userAnswer5 === "Người thân tiếp xúc gần của Anh/Chị là người di chuyển"} onChange={this.onValueChange5} />
                                <CustomInput type="radio" id="dichuyen4" name="question5" value="Cả hai đều là người di chuyển" label="Cả hai đều là người di chuyển" checked={this.state.userAnswer5 === "Cả hai đều là người di chuyển"} onChange={this.onValueChange5} />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="question6">6. Anh/Chị hoặc người thân tiếp xúc gần có tiếp xúc gần với người từ nước ngoài/người từ vùng dịch về/người được xếp loại F không? <span className='text-danger'>*</span></Label>
                            <div>
                                <CustomInput type="radio" id="none6" name="question6" value="Không" label="Không" required checked={this.state.userAnswer6 === "Không"} onChange={this.onValueChange6} />
                                <CustomInput type="radio" id="tiepxuc1" name="question6" value="Có và đã khai báo trong 14 ngày" label="Có và đã khai báo trong 14 ngày" checked={this.state.userAnswer6 === "Có và đã khai báo trong 14 ngày"} onChange={this.onValueChange6} />
                                <CustomInput type="radio" id="tiepxuc2" name="question6" value="Anh/Chị là người tiếp xúc" label="Anh/Chị là người tiếp xúc" checked={this.state.userAnswer6 === "Anh/Chị là người tiếp xúc"} onChange={this.onValueChange6} />
                                <CustomInput type="radio" id="tiepxuc3" name="question6" value="Người thân tiếp xúc gần của Anh/Chị là người tiếp xúc" label="Người thân tiếp xúc gần của Anh/Chị là người tiếp xúc" checked={this.state.userAnswer6 === "Người thân tiếp xúc gần của Anh/Chị là người tiếp xúc"} onChange={this.onValueChange6} />
                                <CustomInput type="radio" id="tiepxuc4" name="question6" value="Cả hai đều là người tiếp xúc" label="Cả hai đều là người tiếp xúc" checked={this.state.userAnswer6 === "Cả hai đều là người tiếp xúc"} onChange={this.onValueChange6} />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="question7">7. Anh/Chị có đến hoặc lưu trú tại các địa điểm liên quan đến người nhiễm Covid được công bố hoặc có tiếp xúc với người nhiễm/nghi nhiễm Covid không? <span className='text-danger'>*</span></Label>
                            <div>
                                <CustomInput type="radio" id="none7" name="question7" value="Không" label="Không" required checked={this.state.userAnswer7 === "Không"} onChange={this.onValueChange7} />
                                <CustomInput type="radio" id="luutru1" name="question7" value="Có và đã khai báo trong 14 ngày" label="Có và đã khai báo trong 14 ngày" checked={this.state.userAnswer7 === "Có và đã khai báo trong 14 ngày"} onChange={this.onValueChange7} />
                                <CustomInput type="radio" id="luutru2" name="question7" value="Anh/Chị là người di chuyển/tiếp xúc" label="Anh/Chị là người di chuyển/tiếp xúc" checked={this.state.userAnswer7 === "Anh/Chị là người di chuyển/tiếp xúc"} onChange={this.onValueChange7} />
                                <CustomInput type="radio" id="luutru3" name="question7" value="Người thân tiếp xúc gần của Anh/Chị là người di chuyển/tiếp xúc" label="Người thân tiếp xúc gần của Anh/Chị là người di chuyển/tiếp xúc" checked={this.state.userAnswer7 === "Người thân tiếp xúc gần của Anh/Chị là người di chuyển/tiếp xúc"} onChange={this.onValueChange7} />
                                <CustomInput type="radio" id="luutru4" name="question7" value="Cả hai đều là người di chuyển/tiếp xúc" label="Cả hai đều là người di chuyển/tiếp xúc" checked={this.state.userAnswer7 === "Cả hai đều là người di chuyển/tiếp xúc"} onChange={this.onValueChange7} />
                            </div>
                        </FormGroup>
                        <Button outline color="info">Gửi</Button>
                    </Form>
                </Container>
            </Container >
        )
    }
}
