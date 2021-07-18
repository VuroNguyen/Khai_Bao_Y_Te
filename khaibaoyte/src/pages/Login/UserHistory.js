import axios from 'axios';
//decode
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import Footer from '../../components/Footer';
import EnterpriseNav from '../../components/Navbars/Enterprise';
import HistoryNav from '../../components/Navbars/Enterprise/HistoryNav';
import UserNav from '../../components/Navbars/User';
import SystemTime from '../../components/System';

const UserHistory = (props) => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState('');

    //Khai bao
    const token = localStorage.getItem('khaibaoyte');
    //Decode
    const decoded = jwt_decode(token);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://localhost:5000/api/khaibao/form?email=${decoded.email}`,
            );
            const response = await axios(
                `http://localhost:5000/api/khaibao/form/count?email=${decoded.email}`,
            );
            setData(result.data);
            setCount(response.data);
            // console.log(data);
            // console.log(count);
            // In ra check
            // console.log(decoded);
        };

        fetchData();
    }, []);

    return (
        <div className='page-container'>
            <div className='content-wrap'>
                <HistoryNav />
                <div className='container'>
                    <div style={{ paddingTop: '2vh' }} />
                    <SystemTime />
                    <div style={{ paddingTop: '3vh' }} />
                    <div className='text-center'>
                        <h3 style={{ color: '#55befc' }}>Lịch sử khai báo</h3>
                        <div style={{ paddingTop: '1em' }} />
                    </div>
                    <p className='font-weight-bold'>Tổng số khai báo: {count.count}
                    </p>
                    <br />
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
                </div>
                <div style={{ paddingBottom: '2vh' }} />
            </div>
            <Footer />
        </div>
    )
}

export default UserHistory
