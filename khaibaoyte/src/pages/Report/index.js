import axios from 'axios';
//decode
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'reactstrap';
import Footer from '../../components/Footer';
import HistoryNav from '../../components/Navbars/Enterprise/HistoryNav';
import SystemTime from '../../components/System';
import { serverUrl } from '../../config/Route/server';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';
registerLocale('vi', vi);

const Report = (props) => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());

    //Khai bao
    const token = localStorage.getItem('khaibaoyte');
    //Decode
    const decoded = jwt_decode(token);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `${serverUrl}/home/getAllEmail?enterpriseName=${decoded.name}`,
            );
            setData(result.data);
            console.log(result.data);
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
                <div className='container-fluid'>
                    <div style={{ paddingTop: '2vh' }} />
                    <Container>
                        <SystemTime />
                        <div style={{ paddingTop: '3vh' }} />
                        <div className="text-center">
                            <h3 style={{ color: "#55befc" }}>{decoded.name}</h3>
                            <h4>Báo cáo</h4>
                        </div>
                        <br />
                        <div>
                            <DatePicker
                            todayButton="Hôm nay"s
                            locale="vi"
                            placeholderText="Vui lòng chọn ngày"
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="text-center"
                            style={{width: '500px'}}
                            />
                        </div>
                        <div style={{ paddingTop: '3vh' }} />
                        <Table>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Tình trạng</th>
                                    <th>Phòng ban</th>
                                    <th>SĐT</th>
                                    <th>Các dấu hiệu</th>
                                    <th>Di chuyển</th>
                                    <th>Tiếp xúc</th>
                                    <th>Cư trú</th>
                                </tr>
                            </thead>
                            <tbody >
                                {data.map(data => (
                                    <tr key={data._id}>
                                        <td>{data.quest4}</td>
                                        <td>{data.quest5}</td>
                                        <td>{data.quest6}</td>
                                        <td>{data.quest7}</td>
                                        <td>{data.quest7}</td>
                                        <td>{data.quest7}</td>
                                        <td>{data.quest7}</td>
                                        <td>{data.quest7}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </div>
                <div style={{ paddingBottom: '2vh' }} />
            </div>
            <Footer />
        </div>
    )
}

export default Report
