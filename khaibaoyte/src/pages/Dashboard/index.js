import axios from 'axios';
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import ControllableStates from '../../components/Searchbar';


class AdminDashboard extends Component {
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
            <div>
               <ControllableStates></ControllableStates>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên doanh nghiệp</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Mã số thuế</th>
                        </tr>
                    </thead>
                    <tbody >
                        {responses.map(response => (
                            <tr key={response._id}>
                                <th scope="row">{response._id}</th>
                                <td>{}</td>
                                <td>{response.email}</td>
                                <td>{response.quest3}</td>
                                <td>{response.quest4}</td>
                                <td>{response.quest5}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default AdminDashboard