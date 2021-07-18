import axios from 'axios';
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Footer from '../../components/Footer';
import UserNav from '../../components/Navbars/User';
import SystemTime from '../../components/System';


class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responses: []
        }
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
            <div className='page-container'>
                <div className='content-wrap'>
                    <UserNav />
                    <div className='container'>
                        <div style={{ paddingTop: '2vh' }} />
                        <SystemTime />
                        <div style={{ paddingTop: '2vh' }} />
                        <div className='text-center'>
                            <h3 style={{ color: '#55befc' }}>Báo cáo</h3>
                            <div style={{ paddingTop: '1em' }} />
                        </div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Tên doanh nghiệp</th>
                                    <th>Địa chỉ</th>
                                    <th>Mã số thuế</th>
                                    <th>Tài liệu</th>
                                </tr>
                            </thead>
                            <tbody >
                                {responses.map(response => (
                                    <tr key={response._id}>
                                        <td>{response.email}</td>
                                        <td>{response.enterpriseName}</td>
                                        <td>{response.address}</td>
                                        <td>{response.quest3}</td>
                                        <td>{response.quest4}</td>
                                        <td>{response.docs}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div style={{ paddingBottom: '2vh' }} />
                </div>
                <Footer />
            </div>


        )
    }
}

export default Report