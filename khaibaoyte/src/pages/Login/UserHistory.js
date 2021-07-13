import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import { Table } from 'reactstrap';


class UserHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responses: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/khaibao/form/`)
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
            <>
                <div className='text-center'>
                    <h3 style={{ color: '#55befc' }}>Lịch sử khai báo</h3>
                    <div style={{ paddingTop: '1em' }} />
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Email</th>
                            <th>Question 4</th>
                            <th>Question 5</th>
                            <th>Question 6</th>
                            <th>Question 7</th>
                        </tr>
                    </thead>
                    <tbody >
                        {responses.map(response => (
                            <tr key={response._id}>
                                <th scope="row">{moment(response.createdAt).format('DD/MM/YYYY')}</th>
                                <td>{moment(response.createdAt).format('HH:mm:ss')}</td>
                                <td>{response.email}</td>
                                <td>{response.quest3}</td>
                                <td>{response.quest4}</td>
                                <td>{response.quest5}</td>
                                <td>{response.quest6}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        )
    }
}

export default UserHistory