import axios from 'axios';
//nhớ cài npm i mới nhất lại nha
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import 'moment/locale/vi';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Container, CustomInput, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '../../../components/Footer';
import FormNav from '../../../components/Navbars/Enterprise/FormNav';
import SystemTime from '../../../components/System';
//Chuyển mail thành server, sau này vào config sửa là tất cả tự động đổi
import { serverUrl } from '../../../config/Route/server';

moment.locale('vi');
function LoginForm() {

    // Anh Lam làm thêm cái local
    //get token from localStorage
    const usertoken = localStorage.getItem('khaibaoyte');
    const emailtoken = window.location.href.split('form/')[1];
    //Decode token
    const decoded = jwt_decode(emailtoken);
    const useremail = decoded.email;
    const userID = decoded.userId;

    // const active = async () => {

    //     alert(activeData.data.message)
    //     console.log(activeData)
    // }

    // set location for react-router to parse data to
    const userData = useLocation();
    // useHistory
    const history = useHistory();

    const gettokenfromurl = () => {

        const today = new Date();
        if (emailtoken == null || emailtoken == '') {
            history.push('/')
            window.location.reload();
            alert('No token found');
        }
        if (jwt_decode(emailtoken).exp * 1000 < today.getTime()) {
            history.push('/');
            window.location.reload();
            alert('Token expired ahihihih');
        }
        else {
            localStorage.setItem('khaibaoyte', emailtoken);
        }
    }

    //Get data số lần khai báo trong ngày với lần khai báo gần nhất
    const [userInfoTotal, setUserInfoTotal] = useState('');
    const [userInfoLastest, setUserInfoLastest] = useState('');

    const [length, setLength] = useState('');

    const checkuserAuth = (e) => {
        if (localStorage.getItem('khaibaoyte') == null) {
            history.push({
                pathname: "/",
            });
            alert('Không có xác thực, vui lòng quay lại Trang khai báo')
            return false;
        } else return true;
    }

    //useEffect để a show 2 cái API số lần khai báo trong ngày, lần khai báo cuối lúc
    useEffect(() => {
        const fetchData = async () => {
            const total = await axios(
                `${serverUrl}/api/khaibao/form/getAllFormToday?email=${useremail}`,
            );
            const lastest = await axios(
                `${serverUrl}/api/khaibao/form/lastform?email=${useremail}`,
            );
            const test = await axios.put(`${serverUrl}/home/verification/${userID}`, {
                status: true
            });

            setUserInfoTotal(total.data);
            setUserInfoLastest(lastest.data[0] ? lastest.data[0].createdAt : 'Chua');
            setLength(lastest.data.length);
            console.log('Lastest: ', lastest.data);
            // console.log('Total: ', total.data);
            // console.log(lastest.data[0].createdAt);
            //In ra check
            // console.log(useremail);
            // console.log('Decoded: ', decoded);
            // console.log('lần cuối lúc: ', getCreatedAtdate);
        };

        gettokenfromurl();
        fetchData();
    }, [])

    // states of values
    const [userdepartment, setUserDepartment] = useState(null);
    const [usertelephone, setUserTelephone] = useState(null);
    const [answer4, setAnswer4] = useState([]);
    // answer4 options
    const [ans4Opt1, setAns4Opt1] = useState(false);
    const [ans4Opt2, setAns4Opt2] = useState(false);
    const [ans4Opt3, setAns4Opt3] = useState(false);
    const [ans4Opt4, setAns4Opt4] = useState(false);
    const [ans4Opt5, setAns4Opt5] = useState(false);

    const [answer5, setAnswer5] = useState("");
    const [answer6, setAnswer6] = useState("");
    const [answer7, setAnswer7] = useState("");

    // setting Answer4 into an array
    const chcklist = (e) => {

        switch (e.target.id) {
            case 'dauhieu1':
                {
                    setAns4Opt1(!ans4Opt1);
                    setAns4Opt5(false);
                    console.log(ans4Opt1);
                    break;
                }
            case 'dauhieu2':
                {
                    setAns4Opt2(!ans4Opt2);
                    setAns4Opt5(false);
                    console.log(ans4Opt2);
                    break;
                }
            case 'dauhieu3':
                {
                    setAns4Opt3(!ans4Opt3);
                    setAns4Opt5(false);
                    console.log(ans4Opt3);
                    break;
                }
            case 'dauhieu4':
                {
                    setAns4Opt4(!ans4Opt4);
                    setAns4Opt5(false);
                    console.log(ans4Opt4);
                    break;
                }
            case 'none4':
                {
                    setAns4Opt1(false);
                    setAns4Opt2(false);
                    setAns4Opt3(false);
                    setAns4Opt4(false);
                    setAns4Opt5(!ans4Opt5);
                    console.log(ans4Opt5);
                    break;
                }
        }

        // create an array to 'spread' every checked value to answer 4
        let tempArr = [...answer4, e.target.value];
        // check the answer 4 current value whether it includes any value equals to the value clicked
        if (answer4.includes(e.target.value)) {
            // filter those values <=> remove it from the temp array
            tempArr = tempArr.filter(opt => opt !== e.target.value);

        }
        // set the array to the answer4 value
        setAnswer4(tempArr);
    }

    // // set values on click/inputs
    // const handleuserDepartment = (e) => {
    //     setUserDepartment(e.target.value);
    // }
    // const handleuserTelephone = (e) => {
    //     setUserTelephone(e.target.value);
    // }

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

    // create an answer JSON file to save in the server
    let answer = JSON.stringify({
        email: useremail,
        department: decoded.department ? decoded.department : 'Không có',
        phone: decoded.phone ? decoded.phone : '0',
        quest4: answer4.join(', ').toString(),
        quest5: answer5,
        quest6: answer6,
        quest7: answer7,
    })

    // POST method to the backend
    const postReport = async (data) => {
        try {
            const res = await axios({
                method: 'POST',
                url: `${serverUrl}/api/khaibao`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${usertoken}`
                },
                data: data,
            })
            console.log(res.data);
            alert('Bạn đã khai báo thành công, bạn có thể xem lại lịch sử khai báo sau đây')
            history.push({
                pathname: `/history`,
                state: {useremail : useremail}
              });

            return res.data;
        } catch (e) {
            alert(e.message);
            return { success: false, message: e.message };
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let validated = false;
        if (answer4.length !== 0) {
            setUserDepartment(decoded.department ? decoded.department : 'Không có');
            setUserTelephone(decoded.phone ? decoded.phone : '0');
            // alert('deparment ' + userdepartment + ' tel ' + usertelephone + ' ans4 ' + JSON.stringify(answer4) + ' ans5 ' + answer5 + ' ans6 ' + answer6 + ' ans7 ' + answer7);
            validated = true;
            postReport(answer);
        }
        else {
            alert('Vui lòng chọn câu trả lời số 4');
            validated = false;
        }
        return validated;
    }

    const handleHistory = e => {
        history.push({
            pathname: `/history`,
            state: {useremail : useremail}
          });
    }

    return (
        <div className='page-container'>
            <div className='content-wrap'>
                <FormNav />
                <div className='container-fluid'>
                    <div style={{ paddingTop: '2vh' }} />
                    <Container>
                        <SystemTime />
                        <div style={{ paddingTop: '3vh' }} />
                        {window.onloadstart = checkuserAuth()}
                        <Form onSubmit={handleHistory}>
                            <div className='text-center'>
                                <h3 style={{ color: '#55befc' }}>Khai báo</h3>
                                <div style={{ paddingTop: '1em' }} />
                            </div>
                            <p className='font-weight-bold'>Số lần khai báo trong ngày: {userInfoTotal.length} </p>
                            {/* Xong */}
                            <p className='font-italic'><strong>Khai báo lần cuối lúc: </strong>{moment(userInfoLastest).format('LLL')}</p>
                            <Button outline color="info" type="submit">Lịch sử khai báo</Button>
                        </Form>
                        <div style={{ paddingTop: '2%' }} />
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="userEmail">1. Email</Label>
                                <Input type="email" name="userEmail" id="userEmail" placeholder={decoded.email} disabled />
                            </FormGroup>
                            <FormGroup>
                                <Label for="userDepartment">2. Phòng ban</Label>
                                <Input type="email" name="userDepartment" id="userDepartment" placeholder={decoded.department ? decoded.department : 'Không có'} disabled />
                            </FormGroup>
                            <FormGroup>
                                <Label for="userTel">3. Số điện thoại</Label>
                                <Input type="email" name="userTel" id="userTel" placeholder={decoded.phone ? decoded.phone : 'Không có'} disabled />
                            </FormGroup>
                            <FormGroup>
                                <Label for="question4">4. Anh/Chị có dấu hiệu lâm sàng nào dưới đây? <span className='text-danger'>*</span></Label>
                                <div>
                                    <CustomInput type="checkbox" id="dauhieu1" label="Ho khan hoặc đau họng" value="Ho khan hoặc đau họng" onChange={chcklist} checked={ans4Opt1} />
                                    <CustomInput type="checkbox" id="dauhieu2" label="Đau ngực hoặc khó thở" value="Đau ngực hoặc khó thở" onChange={chcklist} checked={ans4Opt2} />
                                    <CustomInput type="checkbox" id="dauhieu3" label="Sốt cao (trên 38 độ C)" value="Sốt cao (trên 38 độ C)" onChange={chcklist} checked={ans4Opt3} />
                                    <CustomInput type="checkbox" id="dauhieu4" label="Chảy nước mũi khó chịu" value="Chảy nước mũi khó chịu" onChange={chcklist} checked={ans4Opt4} />
                                    <CustomInput type="checkbox" id="none4" label="Không có tất cả dấu hiệu trên" value="Không có tất cả dấu hiệu trên" onChange={chcklist} checked={ans4Opt5} />
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
                </div>
                <div style={{ paddingBottom: '2vh' }} />
            </div>
            <Footer />
        </div>
    )
}

export default LoginForm;