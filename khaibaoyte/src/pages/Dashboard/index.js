import axios from 'axios';
import React, { Component } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import ControllableStates from '../../components/Searchbar';


class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responses: [],
            modal: false,
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        console.log("hello");
        this.setState({
            modal: !this.state.modal
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
                        </tr>
                    </thead>
                    <tbody >
                        {responses.map(response => (
                            <tr key={response._id}>
                                <td>{response.email}</td>
                                <td>{response.status===false?"Chưa kích hoạt":"Đã kích hoạt"}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div style={{ paddingTop: '2em' }} />
                <Button outline color="info" onClick={this.toggle} >Thêm tài khoản nhân viên</Button>
                <Modal isOpen={this.state.modal} fade={this.state.fade} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Đăng ký email nhân viên</ModalHeader>
                    <Input type="text" placeholder="Nhập email nhân viên" ></Input>
                    <ModalFooter>
                        <Button onClick={this.toggle} outline color="info">OK</Button>{' '}
                        <Button onClick={this.toggle} outline color="info">Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default AdminDashboard