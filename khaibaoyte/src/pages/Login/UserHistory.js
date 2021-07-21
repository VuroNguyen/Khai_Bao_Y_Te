import axios from 'axios';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Table } from 'reactstrap';
import Footer from '../../components/Footer';
import HistoryNav from '../../components/Navbars/Enterprise/HistoryNav';
import SystemTime from '../../components/System';
import {serverUrl} from '../../config/Route/server'

const UserHistory = (props) => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState('');
    const statetoken = useLocation();
    const [email, setEmail] = useState('');
    const today = new Date();
    const history = useHistory();

    // Làn riêng function cho Navbar vì không pass state qua history.push đc
    const gettokenfromurl = async () => {
        let urltoken = window.location.href.split('history/')[1];
        // ko có trong url => dùng state
        if (urltoken == null || urltoken === '') {
            setEmail(statetoken.state.useremail);
            console.log(email);
            return;
        }
        if (jwt_decode(urltoken).exp * 1000 < today.getTime()) {
            setEmail(statetoken.state.useremail);
            history.push('/');
            window.location.reload();
            alert('Token expired ahihihih');
            return;
        }
        else return setEmail(jwt_decode(urltoken).email);
    }

    //Khai bao
    // let email = statetoken.state.useremail;
    // console.log(email);
    useEffect(() => {
        gettokenfromurl();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `${serverUrl}/api/khaibao/form?email=${email}`,
            );
            const response = await axios(
                `${serverUrl}/api/khaibao/form/count?email=${email}`,
            );
            setData(result.data);
            setCount(response.data);
            console.log(data);
            console.log(response);
            // In ra check
            // console.log(decoded);
        };
        fetchData();
    }, []);

    return (
        <div className='page-container'>
            <div className='content-wrap'>
                <HistoryNav token={localStorage.getItem('khaibaoyte')}/>
                <div className='container-fluid'>
                    <div style={{ paddingTop: '2vh' }} />
                    <SystemTime />
                    <div style={{ paddingTop: '3vh' }} />
                    <div className='text-center'>
                        <h3 style={{ color: '#55befc' }}>Lịch sử khai báo</h3>
                        <div style={{ paddingTop: '1em' }} />
                    </div>
                    <p className='font-weight-bold'>Tổng số khai báo: {count.count}</p>
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
