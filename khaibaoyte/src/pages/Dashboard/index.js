import axios from 'axios';
import React, { Component } from 'react';
import { Button, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import './index.css';


class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responses: [],
            modalFormAdd: false,
            modalFormEdit: false,
        }
        this.toggleFormAdd = this.toggleFormAdd.bind(this);
        this.toggleFormEdit = this.toggleFormEdit.bind(this);
    }

    toggleFormEdit() {
        console.log("edit");
        this.setState({
            modalFormEdit: !this.state.modalFormEdit
        });
        console.log('after setState: ', this.state)
    }

    toggleFormAdd() {
        console.log("add");
        this.setState({
            modalFormAdd: !this.state.modalFormAdd
        });
        console.log('after setState: ', this.state);
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/home/getAllEmail`)
            .then(res => {
                const responses = res.data;
                this.setState({ responses });
                console.log(responses)
            })

            .catch(error => console.log(error));
    }

    render() {
        const { responses } = this.state;
        return (
            <div>
                <div className='text-center'>
                    <h3 style={{ color: '#55befc' }}>Quản lý nhân viên</h3>
                    <div style={{ paddingTop: '1em' }} />
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Email nhân viên</th>
                            <th>Tình trạng</th>
                            <th>Phòng ban</th>
                            <th>SĐT</th>
                            <th>Function</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody >
                        {responses.map(response => (
                            <tr key={response._id}>
                                <td>{response.email}</td>
                                <td>{response.status === false ? "Chưa xác nhận" : "Đã xác nhận"}</td>
                                <td>{response.department}</td>
                                <td>{response.phone}</td>
                                <td><Button outline color="info">Lịch sử khai báo</Button></td>
                                <td>
                                    <Button outline color="info" onClick={this.toggleFormEdit}>Edit</Button>
                                    <Modal isOpen={this.state.modalFormEdit} toggle={this.toggleFormEdit}>
                                        <ModalHeader toggle={this.toggleFormEdit}>Đăng ký email nhân viên</ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                <FormGroup>
                                                    <Label for="userEmail">1. Email nhân viên <span className='text-danger'>*</span></Label>
                                                    <Input type="text" name="userEmail" id="userEmail" placeholder="ex: 0845372112" required />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="userDepartment">2. Phòng ban <span className='text-danger'>*</span></Label>
                                                    <CustomInput
                                                        type="select"
                                                        id="userDepartment"
                                                        name="userDepartment"
                                                        required>
                                                        <option value="">Vui lòng chọn phòng ban</option>
                                                        <option value='HR'>Nhân sự</option>
                                                        <option value='IT'>IT</option>
                                                        <option value='Marketing'>Marketing</option>
                                                        <option value='Manager'>Quản lí</option>
                                                        <option value='Accounting'>Kế toán</option>
                                                    </CustomInput>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="userPhone">3. Số điện thoại nhân viên <span className='text-danger'>*</span></Label>
                                                    <Input className="without_number" type="number" name="userPhone" id="userPhone" placeholder="ex: 0845372112" required />
                                                </FormGroup>
                                            </Form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onClick={this.toggleFormEdit} outline color="info">OK</Button>{' '}
                                        </ModalFooter>
                                    </Modal>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div style={{ paddingTop: '2em' }} />
                <Button outline color="info" onClick={this.toggleFormAdd} >Thêm tài khoản nhân viên</Button>
                <Modal isOpen={this.state.modalFormAdd} toggle={this.toggleFormAdd}>
                    <ModalHeader toggle={this.toggleFormAdd}>Đăng ký email nhân viên</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="userEmail">1. Email nhân viên <span className='text-danger'>*</span></Label>
                                <Input type="text" name="userEmail" id="userEmail" placeholder="ex: 0845372112" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="userDepartment">2. Phòng ban <span className='text-danger'>*</span></Label>
                                <CustomInput
                                    type="select"
                                    id="userDepartment"
                                    name="userDepartment"
                                    required>
                                    <option value="">Vui lòng chọn phòng ban</option>
                                    <option value='HR'>Nhân sự</option>
                                    <option value='IT'>IT</option>
                                    <option value='Marketing'>Marketing</option>
                                    <option value='Manager'>Quản lí</option>
                                    <option value='Accounting'>Kế toán</option>
                                </CustomInput>
                            </FormGroup>
                            <FormGroup>
                                <Label for="userPhone">3. Số điện thoại nhân viên <span className='text-danger'>*</span></Label>
                                <Input className="without_number" type="number" name="userPhone" id="userPhone" placeholder="ex: 0845372112" required />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggleFormAdd} outline color="info">OK</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default AdminDashboard