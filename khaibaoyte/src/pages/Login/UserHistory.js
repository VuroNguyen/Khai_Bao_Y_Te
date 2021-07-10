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
import ControllableStates from '../../components/Searchbar/index'


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
                            <th>Date/Time</th>
                            <th>Email</th>
                            <th>Question 1</th>
                            <th>Question 2</th>
                            <th>Question 3</th>
                            <th>Question 4</th>
                            <th>Question 5</th>
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

export default UserHistory