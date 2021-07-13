import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { Button, Container, CustomInput, Form, FormGroup, Input, Label } from 'reactstrap'

function LoginForm() {
    const postReport = async (data) => {
        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:5000/'
            })
        } catch (e) {
            return {}
        }
    }
    const history = useHistory();
    const userEmail = useLocation();
    const [userdepartment, setUserDepartment] = useState(null);
    const [usertelephone, setUserTelephone] = useState(null);

    const [answer4, setAnswer4] = useState([]);

    const [answer5, setAnswer5] = useState("");
    const [answer6, setAnswer6] = useState("");
    const [answer7, setAnswer7] = useState("");

    const chcklist = (e) => {
        let tempArr = [...answer4, e.target.value];
        if (answer4.includes(e.target.value)) {
            tempArr = tempArr.filter(opt => opt !== e.target.value);
        }
        setAnswer4(tempArr);
    }

    const handleuserDepartment = (e) => {
        setUserDepartment(e.target.value);
    }
    const handleuserTelephone = (e) => {
        setUserTelephone(e.target.value);
    }

    const onValueChange = (e) => {
        if (e.target.name === "question5") {
            setAnswer5(e.target.value);
        }
        else if (e.target.name === "question6") {
            setAnswer6(e.target.value);
        }
        else if (e.target.name === "question7") {
            setAnswer7(e.target.value);
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let validated = true;
        if (answer4.length !== 0) {
            alert('deparment ' + userdepartment + ' tel ' + usertelephone + ' ans4 ' + JSON.stringify(answer4) + ' ans5 ' + answer5 + ' ans6 ' + answer6 + ' ans7 ' + answer7);
            validated = true;
            window.location.reload();
        }
        else {
            alert('Vui lòng chọn câu trả lời số 4');
            validated = false;
        }
        return validated;
    }

    const handleHistory = e => {
        history.push({
            pathname: "/history",
            state: { mail: userEmail.state.usermail }
        });
    }

    const [data, setData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios(
    //             `http://localhost:5000/api/khaibao/form/count?email=${userEmail.state.usermail}`,
    //         );

    //         setData(result.data);
    //         console.log(result.data);
    //     };

    //     fetchData();
    // }, []);

    return (
        <Container>
            <Container>
                <Form onSubmit={handleHistory}>
                    <div className='text-center'>
                        <h3 style={{ color: '#55befc' }}>Khai báo</h3>
                        <div style={{ paddingTop: '1em' }} />
                    </div>
                    <p className='font-weight-bold'>Số lần khai báo trong ngày: {data.count} </p>
                    <p className='font-italic'>Khai báo lần cuối lúc: { }</p>
                    <Button outline color="info">Lịch sử khai báo</Button>
                </Form>
            </Container>
            <div style={{ paddingTop: '2%' }} />
            <Container>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="userEmail">1. Email</Label>
                        <Input type="email" name="userEmail" id="userEmail" placeholder={userEmail.state.usermail} disabled />
                    </FormGroup>
                    <FormGroup>
                        <Label for="userDepartment">2. Phòng ban <span className='text-danger'>*</span></Label>
                        <Input
                            type="select"
                            id="userDepartment"
                            name="userDepartment"
                            required
                            onChange={handleuserDepartment}>
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
                        <Input className="without_number" type="number" name="userTel" id="userTel" placeholder="ex: 0845372112" onChange={handleuserTelephone} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="question4">4. Anh/Chị có dấu hiệu lâm sàng nào dưới đây? <span className='text-danger'>*</span></Label>
                        <div>
                            <CustomInput type="checkbox" id="dauhieu1" label="Ho khan hoặc đau họng" value="Ho khan hoặc đau họng" onChange={chcklist} />
                            <CustomInput type="checkbox" id="dauhieu2" label="Đau ngực hoặc khó thở" value="Đau ngực hoặc khó thở" onChange={chcklist} />
                            <CustomInput type="checkbox" id="dauhieu3" label="Sốt cao (trên 38 độ C)" value="Sốt cao (trên 38 độ C)" onChange={chcklist} />
                            <CustomInput type="checkbox" id="dauhieu4" label="Chảy nước mũi khó chịu" value="Chảy nước mũi khó chịu" onChange={chcklist} />
                            <CustomInput type="checkbox" id="none4" label="Không có tất cả dấu hiệu trên" value="Không có tất cả dấu hiệu trên" onChange={chcklist} />
                        </div>
                    </FormGroup>
                    <FormGroup name='question5'>
                        <Label for="question5">5. Anh/Chị hoặc người thân tiếp xúc gần có vừa di chuyển từ nơi khác về không? <span className='text-danger'>*</span></Label>
                        <div>
                            <CustomInput type="radio" id="none5" name="question5" value="Không" label="Không" required onChange={onValueChange} />
                            <CustomInput type="radio" id="dichuyen1" name="question5" value="Có và đã khai báo trong 14 ngày" label="Có và đã khai báo trong 14 ngày" onChange={onValueChange} />
                            <CustomInput type="radio" id="dichuyen2" name="question5" value="Anh/Chị là người di chuyển" label="Anh/Chị là người di chuyển" onChange={onValueChange} />
                            <CustomInput type="radio" id="dichuyen3" name="question5" value="Người thân tiếp xúc gần của Anh/Chị là người di chuyển" label="Người thân tiếp xúc gần của Anh/Chị là người di chuyển" onChange={onValueChange} />
                            <CustomInput type="radio" id="dichuyen4" name="question5" value="Cả hai đều là người di chuyển" label="Cả hai đều là người di chuyển" onChange={onValueChange} />
                        </div>
                    </FormGroup>
                    <FormGroup name="question6">
                        <Label for="question6">6. Anh/Chị hoặc người thân tiếp xúc gần có tiếp xúc gần với người từ nước ngoài/người từ vùng dịch về/người được xếp loại F không? <span className='text-danger'>*</span></Label>
                        <div>
                            <CustomInput type="radio" id="none6" name="question6" value="Không" label="Không" required onChange={onValueChange} />
                            <CustomInput type="radio" id="tiepxuc1" name="question6" value="Có và đã khai báo trong 14 ngày" label="Có và đã khai báo trong 14 ngày" onChange={onValueChange} />
                            <CustomInput type="radio" id="tiepxuc2" name="question6" value="Anh/Chị là người tiếp xúc" label="Anh/Chị là người tiếp xúc" onChange={onValueChange} />
                            <CustomInput type="radio" id="tiepxuc3" name="question6" value="Người thân tiếp xúc gần của Anh/Chị là người tiếp xúc" label="Người thân tiếp xúc gần của Anh/Chị là người tiếp xúc" onChange={onValueChange} />
                            <CustomInput type="radio" id="tiepxuc4" name="question6" value="Cả hai đều là người tiếp xúc" label="Cả hai đều là người tiếp xúc" onChange={onValueChange} />
                        </div>
                    </FormGroup>
                    <FormGroup name="question7">
                        <Label for="question7">7. Anh/Chị có đến hoặc lưu trú tại các địa điểm liên quan đến người nhiễm Covid được công bố hoặc có tiếp xúc với người nhiễm/nghi nhiễm Covid không? <span className='text-danger'>*</span></Label>
                        <div>
                            <CustomInput type="radio" id="none7" name="question7" value="Không" label="Không" required onChange={onValueChange} />
                            <CustomInput type="radio" id="luutru1" name="question7" value="Có và đã khai báo trong 14 ngày" label="Có và đã khai báo trong 14 ngày" onChange={onValueChange} />
                            <CustomInput type="radio" id="luutru2" name="question7" value="Anh/Chị là người di chuyển/tiếp xúc" label="Anh/Chị là người di chuyển/tiếp xúc" onChange={onValueChange} />
                            <CustomInput type="radio" id="luutru3" name="question7" value="Người thân tiếp xúc gần của Anh/Chị là người di chuyển/tiếp xúc" label="Người thân tiếp xúc gần của Anh/Chị là người di chuyển/tiếp xúc" onChange={onValueChange} />
                            <CustomInput type="radio" id="luutru4" name="question7" value="Cả hai đều là người di chuyển/tiếp xúc" label="Cả hai đều là người di chuyển/tiếp xúc" onChange={onValueChange} />
                        </div>
                    </FormGroup>
                    <Button outline color="info" type="submit">Gửi</Button>
                </Form>
            </Container>
        </Container >
    )
}

export default LoginForm;