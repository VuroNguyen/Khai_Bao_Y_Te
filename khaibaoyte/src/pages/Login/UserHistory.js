import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios'
import moment from 'moment';
import { Table } from 'reactstrap';

const UserHistory = (props) => {
    const [data, setData] = useState([]);
    const email = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://localhost:5000/api/khaibao/form?email=${email.state.mail}`,
            );
            console.log(email.state.usermail)

            setData(result.data);
            console.log(result.data);
        };

        fetchData();
    }, []);

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
                        <th>Các dấu hiệu</th>
                        <th>Di chuyển</th>
                        <th>Tiếp xúc</th>
                        <th>Cư trú</th>
                    </tr>
                </thead>
                <tbody >
                    {data.map(data => (
                        <tr key={data._id}>
                            <th scope="row">{moment(data.createdAt).format('DD/MM/YYYY')}</th>
                            <td>{moment(data.createdAt).format('HH:mm:ss')}</td>
                            <td>{data.quest4}</td>
                            <td>{data.quest5}</td>
                            <td>{data.quest6}</td>
                            <td>{data.quest7}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default UserHistory
