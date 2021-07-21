import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Col, CustomInput, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Footer from '../../../components/Footer';
import BlankNav from '../../../components/Navbars/Enterprise/BlankNav';
import SystemTime from '../../../components/System';
import './index.css';


export default function RegisterForm() {

    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [businessTaxNumber, setBusinessTaxNumber] = useState('');
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
    const [businessDocument, setBusinessDocument] = useState('');

    const token = window.location.href.split('registerform/')[1];
    const decoded = jwtDecode(token);
    const history = useHistory();

    console.log(decoded.email);

    // POST method to the backend
    const postRegisterForm = async (data) => {
        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:5000/enterprise/register',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            })
            console.log(res.data);
            alert('Thành Công. Chuyển hướng đến trang Quản Lý Nhân Viên')
            history.push(`/admindashboard/${res.data.accessToken}`);
            return res.data;
        } catch (e) {
            alert(e.message);
            return { success: false, message: e.message };
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = JSON.stringify({
            name: businessName,
            email: decoded.email,
            address: businessAddress,
            MST: businessTaxNumber,
            document: businessDocument
        })
        postRegisterForm(data);
    }


    const handleChange = (e) => {
        // console.log(e.target.name);
        switch (e.target.name) {
            case 'businessName': {
                setBusinessName(e.target.value);
                break;
            }
            case 'businessAddress': {
                setBusinessAddress(e.target.value);
                break;
            }
            case 'businessTaxNumber': {
                setBusinessTaxNumber(e.target.value);
                break;
            }
        }
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('document', file);
        setLoadingUpload(true);
        try {
            const { data } = await axios.post('http://localhost:5000/enterprise/uploaddoc', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setBusinessDocument(data);
            alert(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            alert(error.message);
            setLoadingUpload(false);
        }
    }

    return (
        <div className='page-container'>
            <div className='content-wrap'>
                <BlankNav />
                <div className='container'>
                    <div style={{ paddingTop: '2vh' }} />
                    <SystemTime />
                    <div style={{ paddingTop: '3vh' }} />
                    <div className='text-center'>
                        <h3 style={{ color: '#55befc' }}>Đăng ký thông tin doanh nghiệp</h3>
                        <div style={{ paddingTop: '1em' }} />
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="businessName">1. Tên doanh nghiệp <span className='text-danger'>*</span></Label>
                            <Input type="text" name="businessName" id="businessName" placeholder='ex: FPT Information System' required value={businessName} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userEmail">2. Email</Label>
                            <Input type="email" name="businessEmail" id="businessEmail" placeholder={decoded.email} disabled={true} />
                        </FormGroup>
                        <Row form>
                            <Col md={8}>
                                <FormGroup>
                                    <Label for="businessAddress">3. Địa chỉ <span className='text-danger'>*</span></Label>
                                    <Input type="text" name="businessAddress" id="businessAddress" required value={businessAddress} onChange={handleChange} />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="businessTaxNumber">4. Mã số thuế <span className='text-danger'>*</span></Label>
                                    <Input className="without_number" type="number" name="businessTaxNumber" id="businessTaxNumber" required value={businessTaxNumber} onChange={handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="file">5. Tài liệu</Label>
                            <CustomInput type="file" id="businessDocument" name="businessDocument" label="Upload tài liệu ở đây" onChange={uploadFileHandler} />
                        </FormGroup>
                        <Button type="submit" outline color="info">Gửi</Button>
                    </Form>
                </div>
                <div style={{ paddingBottom: '2vh' }} />
            </div>
            <Footer />
        </div>
    )
}

