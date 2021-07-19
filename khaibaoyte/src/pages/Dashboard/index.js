import axios from "axios";
//decode
import jwt_decode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table
} from "reactstrap";
import { AuthContext } from "../../components/contexts/AuthContext";
import Footer from "../../components/Footer";
import CustomNav from "../../components/Navbars/Enterprise/CustomNav";
import SystemTime from "../../components/System";
import "./index.css";

export default function AdminDashboard() {
  const [responses, setResponses] = useState([]);
  const [modalFormAdd, setModalFormAdd] = useState(false);
  const [modalFormEdit, setModalFormEdit] = useState(false);

  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);

  const [editEmail, setEditEmail] = useState("");
  const [editDept, setEditDept] = useState("");
  const [editTel, setEditTel] = useState("");

  const { registerUserEnterprise, getUserEnterprise, updateUserEnterprise } = useContext(AuthContext);
  const token = localStorage.getItem('khaibaoyte');
  //Decode token
  const decoded = jwt_decode(token);
  const useremail = decoded.email;
  const history = useHistory();

  const toHistoryClick = (useremail) => {
    history.push({
      pathname: "/history",
      state: { useremail: useremail },
    });
  };

  const gettokenfromurl = () => {
    setLoading(true);
    const emailtoken = window.location.href.split('admindashboard/')[1];
    const today = new Date();
    if (emailtoken == null || emailtoken === '') {
      history.push('/')
      alert('No token found');
      setLoading(false)
    }
    if (jwt_decode(emailtoken).exp * 1000 < today.getTime()) {
      history.push('/');
      alert('Token expired');
      setLoading(false)
    }
    else {
      localStorage.setItem('khaibaoyte', emailtoken);
      setLoading(false)
    }
  }


  const toggleFormAdd = () => {
    console.log("add");
    setModalFormAdd(!modalFormAdd);
    console.log("after setState: ", modalFormAdd);
  };

  const parseFormEdit = (email, deparment, telephone) => {
    // toggle editform
    toggleFormEdit();
    // parse data to form
    setEditEmail(email);
    setEditDept(deparment);
    setEditTel(telephone);
    console.log('thong tin ', editDept)
  };

  const toggleFormEdit = () => {
    console.log("edit");
    setModalFormEdit(!modalFormEdit);
    console.log("after setState: ", modalFormEdit);
  };

  const dataUpdate = JSON.stringify({
    email: editEmail,
    department: editDept,
    phone: editTel,
  });

  const updateUser = async (event) => {
    event.preventDefault();
    let userId;

    try {
      const getUser = await getUserEnterprise(editEmail);
      userId = getUser[0]._id;
      console.log(getUser[0]._id);
    } catch (error) {
      console.log(error);
    }

    try {
      const updateUser = await updateUserEnterprise(dataUpdate, userId);
      console.log(updateUser);
      setFetch(true);
    } catch (error) {
      console.log(error);
    }
  };

  const [enterpriseUser, setEnterpriseUser] = useState({
    userEmail: "",
    userDepartment: "",
    userPhone: "",
  });

  // declare from enterpriseUser
  const { userEmail, userDepartment, userPhone } = enterpriseUser;

  const onSubmitChange = (event) =>
    setEnterpriseUser({
      ...enterpriseUser,
      [event.target.name]: event.target.value,
    });

  const data = JSON.stringify({
    email: userEmail,
    department: userDepartment,
    phone: userPhone,
  });

  const addUser = async (event) => {
    event.preventDefault();
    try {
      const addUserEnterprise = await registerUserEnterprise(data, token);
      console.log(addUserEnterprise);
      setFetch(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const res = await axios(
      `http://localhost:5000/home/getAllEmail?enterpriseName=${decoded.name}`
    );
    setResponses(res.data);
    console.log(res.data);
    console.log(decoded);
  };

  // Chạy không điều kiện
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    try {
      gettokenfromurl();
    } catch (error) {
      alert(error);
    }
    return setLoading(false);
  }, [loading])

  // Chạy có điều kiện
  useEffect(() => {
    fetchData();
    setFetch(false);
  }, [fetch]);

  return (
    <div className="page-container">
      <div className="content-wrap">
        <CustomNav />
        <div className="container">
          <div style={{ paddingTop: "2vh" }} />
          <SystemTime />
          <div style={{ paddingTop: "3vh" }} />
          <div className="text-center">
            <h3 style={{ color: "#55befc" }}>Quản lý nhân viên</h3>
          </div>
          <div style={{ paddingTop: "2vh" }}>
            {/* Pass data onClick */}
            <Button
              className="float-right"
              outline
              color="info"
              onClick={toggleFormAdd}
            >
              Thêm tài khoản nhân viên
            </Button>
            <Modal isOpen={modalFormAdd} toggle={toggleFormAdd}>
              <ModalHeader toggle={toggleFormAdd}>
                Đăng ký email nhân viên
              </ModalHeader>
              <Form onSubmit={addUser}>
                <ModalBody>
                  <FormGroup>
                    <Label for="userEmail">
                      1. Email nhân viên <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="userEmail"
                      id="userEmail"
                      placeholder="ex: 0845372112"
                      value={userEmail}
                      onChange={onSubmitChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="userDepartment">
                      2. Phòng ban <span className="text-danger">*</span>
                    </Label>
                    <CustomInput
                      type="select"
                      id="userDepartment"
                      name="userDepartment"
                      required
                      value={userDepartment}
                      onChange={onSubmitChange}
                    >
                      <option value="">Vui lòng chọn phòng ban</option>
                      <option value="HR">Nhân sự</option>
                      <option value="IT">IT</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Manager">Quản lí</option>
                      <option value="Accounting">Kế toán</option>
                    </CustomInput>
                  </FormGroup>
                  <FormGroup>
                    <Label for="userPhone">
                      3. Số điện thoại nhân viên{" "}
                      <span className="text-danger">*</span>
                    </Label>
                    <Input
                      className="without_number"
                      type="number"
                      name="userPhone"
                      id="userPhone"
                      placeholder="ex: 0845372112"
                      value={userPhone}
                      onChange={onSubmitChange}
                      required
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={toggleFormAdd}
                    type="submit"
                    outline
                    color="info"
                  >
                    OK
                  </Button>{" "}
                </ModalFooter>
              </Form>
            </Modal>
          </div>
          <br />
          <br />
          <div>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Email nhân viên</th>
                  <th>Tình trạng</th>
                  <th>Phòng ban</th>
                  <th>SĐT</th>
                  <th className="text-center">Sửa thông tin</th>
                  <th className="text-center">Lịch sử khai báo</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response) => (
                  <tr key={response._id}>
                    <td col="w-50">{response.email}</td>
                    <td>
                      {response.status === false
                        ? "Chưa xác nhận"
                        : "Đã xác nhận"}
                    </td>
                    <td>{response.department}</td>
                    <td>{response.phone}</td>
                    <td className="text-center">
                      {/* Pass data onClick */}
                      <Button
                        outline
                        color="info"
                        onClick={() =>
                          parseFormEdit(
                            response.email,
                            response.department,
                            response.phone
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Modal isOpen={modalFormEdit} toggle={toggleFormEdit}>
                        <ModalHeader toggle={toggleFormEdit}>
                          Sửa thông tin nhân viên
                        </ModalHeader>
                        <Form onSubmit={updateUser}>
                          <ModalBody>
                            <FormGroup>
                              <Label for="userEmail">
                                1. Email nhân viên{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                type="text"
                                name="editEmail"
                                id="userEmail"
                                placeholder="ex: 0845372112"
                                required
                                value={editEmail}
                                onChange={(event) => {
                                  setEditEmail(event.target.value);
                                }}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="userDepartment">
                                2. Phòng ban{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <CustomInput
                                type="select"
                                id="userDepartment"
                                name="editDepartment"
                                required
                                value={editDept}
                                onChange={(event) => {
                                  setEditDept(event.target.value);
                                }}
                              >
                                <option value="">
                                  Vui lòng chọn phòng ban
                                </option>
                                <option value="HR">Nhân sự</option>
                                <option value="IT">IT</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Manager">Quản lí</option>
                                <option value="Accounting">Kế toán</option>
                              </CustomInput>
                            </FormGroup>
                            <FormGroup>
                              <Label for="userPhone">
                                3. Số điện thoại nhân viên{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                className="without_number"
                                type="number"
                                name="editPhone"
                                id="userPhone"
                                placeholder="ex: 0845372112"
                                required
                                value={editTel}
                                onChange={(event) => {
                                  setEditTel(event.target.value);
                                }}
                              />
                            </FormGroup>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              onClick={toggleFormEdit}
                              type="submit"
                              outline
                              color="info"
                            >
                              OK
                            </Button>{" "}
                          </ModalFooter>
                        </Form>
                      </Modal>
                    </td>
                    <td className="text-center">
                      <Button
                        outline
                        color="info"
                        onClick={() => toHistoryClick(response.email)}
                      >
                        Tới lịch sử{" "}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div style={{ paddingBottom: "2vh" }} />
      </div>
      <Footer />
    </div>
  );
}
