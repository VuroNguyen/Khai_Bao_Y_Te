import axios from "axios";
//decode
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "reactstrap";
import Footer from "../../components/Footer";
import HistoryNav from "../../components/Navbars/Enterprise/HistoryNav";
import SystemTime from "../../components/System";
import { serverUrl } from "../../config/Route/server";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import moment from "moment";
import { format } from "date-fns";
import { ExportToExcel } from "../../components/Excel";

registerLocale("vi", vi);

const Report = (props) => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  let formatDate = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + (startDate.getDate())

  console.log(formatDate);
  //Khai bao
  const token = localStorage.getItem("khaibaoyte");
  //Decode
  const decoded = jwt_decode(token);

  //2021-07-19

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${serverUrl}/enterprise/getSpecificDay/${formatDate}`
      );
      console.log('im here: ', formatDate)
      setData(result.data);
      console.log(result.data);
      // console.log(count);
      // In ra check
      // console.log(decoded);
    };
    fetchData();
  }, [formatDate]);

  const fileName = formatDate + ' khaibaoytedoanhnghiep'

  return (
    <div className="page-container">
      <div className="content-wrap">
        <HistoryNav />
        <div className="container-fluid">
          <div style={{ paddingTop: "2vh" }} />
          <Container>
            <SystemTime />
            <div style={{ paddingTop: "3vh" }} />
            <div className="text-center">
              <h3 style={{ color: "#55befc" }}>Báo cáo</h3>
              <h4>{decoded.name}</h4>
            </div>
            <br />
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <div className="float-left">
                    <DatePicker
                      todayButton="Hôm nay"
                      locale="vi"
                      placeholderText="Vui lòng chọn ngày"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      // dataFormat="dd-MM-yyyy"
                      dateFormat="MM/dd/yyyy"
                      className="text-center"
                      style={{ width: "500px" }} />
                  </div>
                </div>
                <div className="col">
                  <div className="float-right">
                    <ExportToExcel apiData={data} fileName={fileName} />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ paddingTop: "3vh" }} />
            <Table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Phòng ban</th>
                  <th>SĐT</th>
                  <th>Các dấu hiệu</th>
                  <th>Di chuyển</th>
                  <th>Tiếp xúc</th>
                  <th>Cư trú</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data) => (
                  <tr key={data._id}>
                    <td>{data.email}</td>
                    <td>{data.department}</td>
                    <td>{data.phone}</td>
                    <td>{data.quest4}</td>
                    <td>{data.quest5}</td>
                    <td>{data.quest6}</td>
                    <td>{data.quest7}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </div>
        <div style={{ paddingBottom: "2vh" }} />
      </div>
      <Footer />
    </div>
  );
};

export default Report;
