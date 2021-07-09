import React from 'react'
import 'react-bootstrap'
import { Row } from 'react-bootstrap'
import Chart from 'react-google-charts'
import './index.css'

export default function Report() {
    const enterprise = '';
    return (
        <div>
           <Row>
               <h1>Dashboard of {enterprise}</h1>
           </Row>

           <>
            <ul className=" row summary">
                <li>
                    <div className="summary-title color1">
                        <span>REPORTS</span>
                    </div>
                    <div className="summary-body">{}NUMBER HERE</div>
                </li>

                <li>
                    <div className="summary-title color2">
                        <span>USERS</span>
                    </div>
                    <div className="summary-body">{}NUMBER HERE</div>
                </li>
            </ul>

            <div>
                <div>
                    <h2>Departments</h2>
                    <Chart
                        width="100%"
                        height="33vh"
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Department','employees'],
                        ]}
                    />
                </div>
            </div>

            <div>
                <div>
                    <h2>Reports</h2>
                    <Chart
                        width="100%"
                        height="33vh"
                        chartType='LineChart'
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Date','reports'],
                        ]}
                    />
                </div>
            </div>

            <div>
                <h1>Questions</h1>
                <div>
                    <h2>Q1: Anh/Chị có dấu hiệu lâm sàng nào dưới đây? </h2>
                    <Chart
                        width="100%"
                        height="33vh"
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Answer','count'],
                        ]}
                    />
                </div>

                <div>
                    <h2>Q2: Anh/Chị hoặc người thân tiếp xúc gần có vừa di chuyển từ nơi khác về không? </h2>
                    <Chart
                        width="100%"
                        height="33vh"
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Answer','count'],
                        ]}
                    />
                </div>

                <div>
                    <h2>Q3: Anh/Chị hoặc người thân tiếp xúc gần có tiếp xúc gần với người từ nước ngoài/người từ vùng dịch về/người được xếp loại F không? </h2>
                    <Chart
                        width="100%"
                        height="33vh"
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Answer','count'],
                        ]}
                    />
                </div>

                <div>
                    <h2>Q4: Anh/Chị có đến hoặc lưu trú tại các địa điểm liên quan đến người nhiễm Covid được công bố hoặc có tiếp xúc với người nhiễm/nghi nhiễm Covid không? </h2>
                    <Chart
                        width="100%"
                        height="33vh"
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Answer','count'],
                        ]}
                    />
                </div>
            </div>
           </>
        </div>
    )
}
