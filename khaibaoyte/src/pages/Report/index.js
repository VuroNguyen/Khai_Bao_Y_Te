import axios from "axios";
import vi from "date-fns/locale/vi";
//decode
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table } from "reactstrap";
import { ExportToExcel } from "../../components/Excel";
import { ExportToExcelDay } from "../../components/Excel/dayExport";
import Footer from "../../components/Footer";
import ManageNav from "../../components/Navbars/Enterprise/ManageNav";
import SystemTime from "../../components/System";
import { serverUrl } from "../../config/Route/server";

registerLocale("vi", vi);

const Report = (props) => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [excelData, setExcelData] = useState([]);

  // let formatDate = 

  // console.log(formatDate);
  //Khai bao
  const token = localStorage.getItem("khaibaoyte");
  //Decode
  const decoded = jwt_decode(token);

  //2021-07-19

  useEffect(() => {
    const fetchData = async () => {
      let result = [];
      {
        startDate ? result = await axios(
          `${serverUrl}/enterprise/getSpecificDay/${startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + (startDate.getDate())}?enterpriseName=${decoded.name}`
        )
          :
          result = await axios(
            `${serverUrl}/enterprise/getReport?enterpriseName=${decoded.name}`)
      }

      const response = await axios(
        `${serverUrl}/enterprise/getReportForExcel?enterpriseName=${decoded.name}`
      );
      // console.log('im here: ', formatDate)
      setData(result.data);
      setExcelData(result.data);
      console.log(result.data);
      // console.log(count);
      // In ra check
      // console.log(decoded);
    };
    fetchData();
  }, [startDate]);

  let fileName = '';

  {
    startDate ?
      fileName = `${decoded.name}_${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}_khaibaoytedoanhnghiep` : fileName = `${decoded.name}_tonghop_khaibaoytedoanhnghiep`
  }

  return (
    <div className="page-container">
      <div className="content-wrap">
        <ManageNav token={token}/>
        <div className="container-fluid">
          <div style={{ paddingTop: "2vh" }} />
          <SystemTime />
          <div style={{ paddingTop: "3vh" }} />
          <div className="text-center">
            <h3 style={{ color: "#55befc" }}>Báo cáo</h3>
            <h4>{decoded.name}</h4>
          </div>
          <br />
          <div className="row align-items-center" >
            <div className="col">
              <div className="float-left">
                Xem theo ngày:ㅤ
                <DatePicker
                  todayButton="Hôm nay"
                  locale="vi"
                  isClearable
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
                <ExportToExcel apiData={excelData} fileName={fileName} />
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
        </div>
        <div style={{ paddingBottom: "2vh" }} />
      </div>
      <Footer />
    </div>
  );
};

export default Report;
