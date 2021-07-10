import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Col,
    Row
} from 'reactstrap';
import axios from 'axios';
import { Table } from 'reactstrap';
import ControllableStates from '../../components/Searchbar';


class Report extends Component {
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
                            <tr>
                                <th scope="row">{response.createdAt}</th>
                                <td>{response.quest1}</td>
                                <td>{response.quest2}</td>
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

export default Report