import axios from "axios";
//decode
import jwt_decode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button, CustomInput,
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
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { AuthContext } from "../../components/contexts/AuthContext";
import Footer from "../../components/Footer";
import CustomNav from "../../components/Navbars/Enterprise/CustomNav";
import SystemTime from "../../components/System";
import { serverUrl } from "../../config/Route/server";
import "./index.css";

export default function AdminDashboard() {
  const [responses, setResponses] = useState([]);
  const [modalFormAdd, setModalFormAdd] = useState(false);
  const [modalFormEdit, setModalFormEdit] = useState(false);
  const [alert, setAlert] = useState(null);
  const { registerUserEnterprise, getUserEnterprise, updateUserEnterprise } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);

  const emailtoken = window.location.href.split('admindashboard/')[1];
  //Decode token 
  const decoded = jwt_decode(emailtoken);
  const useremail = decoded.email;
  const enterpriseName = decoded.name;
  const history = useHistory();

  const toHistoryClick = (useremail) => {
    history.push({
      pathname: "/history",
      state: { useremail: useremail },
    });
  };

  const gettokenfromurl = () => {
    setLoading(true);
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
    setModalFormAdd(!modalFormAdd);
  }

  const toggleFormEdit = () => {
    setModalFormEdit(!modalFormEdit);
  };

  const [editEnterpriseUser, setEditEnterpriseUser] = useState({
    editEmail: "",
    editDept: "",
    editTel: "",
  });
  const { editEmail, editDept, editTel } = editEnterpriseUser;

  const [flagEdit, setFlagEdit] = useState({
    flagEditEmail: true,
    flagEditDepartment: true,
    flagEditPhone: true,
  });

  const { flagEditEmail, flagEditDepartment, flagEditPhone } = flagEdit;

  const parseFormEdit = (email, department, telephone) => {
    // toggle editform
    toggleFormEdit();
    // parse data to form
    setEditEnterpriseUser({
      editEmail: email,
      editDept: department,
      editTel: telephone,
    });
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

  // TODO: add useEffect whenever addnew or edit
  // refresh the table with new data
  // WTF nhân viên méo ai có sdt vs phòng ban bro ???

  const [enterpriseUser, setEnterpriseUser] = useState({
    userEmail: "",
    userDepartment: "",
    userPhone: "",
  });

  const [flagAdd, setFlagAdd] = useState({
    flagAddEmail: false,
    flagAddDepartment: false,
    flagAddPhone: false,
  });

  const { flagAddEmail, flagAddDepartment, flagAddPhone } = flagAdd;

  // declare from enterpriseUser
  const { userEmail, userDepartment, userPhone } = enterpriseUser;

  // const onSubmitChange = (event) => {
  //   setEnterpriseUser({
  //     ...enterpriseUser,
  //     [event.target.name]: event.target.value,
  //   });
  //   toggleFormAddOK();
  // };

  const data = JSON.stringify({
    email: userEmail,
    department: userDepartment,
    phone: userPhone,
  });

  const addUser = async (event) => {
    event.preventDefault();
    try {
      const addUserEnterprise = await registerUserEnterprise(data, emailtoken);
      console.log(addUserEnterprise);
      if (!addUserEnterprise.success) {
        setAlert({
          type: "danger",
          message: "Email đã tồn tại hoặc không đúng",
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
        // setFlagAdd({ ...flagAdd, flagAddEmail: false });
        // setModalFormAdd(true);
        setFlagAdd({ ...flagAdd, flagAddEmail: false });
      }
      if (addUserEnterprise.success) {
        // setFlagAdd({ ...flagAdd, flagAddEmail: false });
        // setModalFormAdd(true);
        setFlagAdd({ ...flagAdd, flagAddEmail: true });
      }

      flagAddEmail && flagAddDepartment && flagAddPhone
        ? setModalFormAdd(false)
        : setModalFormAdd(true);
      console.log(
        ",im here flagAddEmail: ",
        flagAddEmail,
        "im here flagAddDepartment: ",
        flagAddDepartment,
        " im here flagAddPhone: ",
        flagAddPhone
      );

      // if (addUserEnterprise.success) {
      //   setFlagAdd({ ...flagAdd, flagAddEmail: true });
      //   setModalFormAdd(false);
      // }
      setFetch(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const res = await axios(
      `${serverUrl}/home/getAllEmail?enterpriseName=${enterpriseName}`
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
        <CustomNav token={emailtoken}/>
        <div className="container-fluid">
          <div style={{ paddingTop: "2vh" }} />
          <SystemTime />
          <div style={{ paddingTop: "3vh" }} />
          <div className="text-center">
            <h3 style={{ color: "#55befc" }}>Quản lý nhân viên</h3>
            <h4>{enterpriseName}</h4>
          </div>
          <br />
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
                      1. Email nhân viên{" "}
                      <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="userEmail"
                      id="userEmail"
                      placeholder="Ví dụ: emailcuaban@fpt.com.vn"
                      value={userEmail}
                      onChange={(event) => {
                        const re =
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                        setEnterpriseUser({
                          ...enterpriseUser,
                          [event.target.name]: event.target.value,
                        });
                        if (re.test(userEmail)) {
                          setFlagAdd({ ...flagAdd, flagAddEmail: true });
                        } else {
                          setFlagAdd({ ...flagAdd, flagAddEmail: false });
                        }
                        // console.log(
                        //   ",im here flagAddEmail: ",
                        //   flagAddEmail,
                        //   "im here flagAddDepartment: ",
                        //   flagAddDepartment,
                        //   " im here flagAddPhone: ",
                        //   flagAddPhone
                        // );
                      }}
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
                      onChange={(event) => {
                        setEnterpriseUser({
                          ...enterpriseUser,
                          [event.target.name]: event.target.value,
                        });
                        if (event.target.value) {
                          setFlagAdd({ ...flagAdd, flagAddDepartment: true });
                        } else {
                          setFlagAdd({
                            ...flagAdd,
                            flagAddDepartment: false,
                          });
                        }
                      }}
                    >
                      <option value="">Vui lòng chọn phòng ban</option>
                      <option value="Nhân sự">Nhân sự</option>
                      <option value="IT">IT</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Quản lý">Quản lý</option>
                      <option value="Kế toàn">Kế toán</option>
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
                      placeholder="Ví dụ: 0845372112"
                      value={userPhone}
                      onChange={(event) => {
                        setEnterpriseUser({
                          ...enterpriseUser,
                          [event.target.name]: event.target.value,
                        });
                        if (event.target.value) {
                          setFlagAdd({ ...flagAdd, flagAddPhone: true });
                        } else {
                          setFlagAdd({ ...flagAdd, flagAddPhone: false });
                        }
                      }}
                      required
                    />
                  </FormGroup>
                </ModalBody>
                <AlertMessage info={alert} />
                <ModalFooter>
                  <Button type="submit" outline color="info">
                    OK
                  </Button>{" "}
                </ModalFooter>
              </Form>
            </Modal>
          </div>
          <br />
          <br />
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
                              placeholder="Ví dụ: mailcuaban@fpt.com.vn"
                              required
                              disabled
                              value={editEmail}
                              onChange={(event) => {
                                setEditEnterpriseUser({
                                  ...editEnterpriseUser,
                                  [event.target.name]: event.target.value,
                                });
                                setFlagEdit({
                                  ...flagEdit,
                                  flagEditEmail: true,
                                });
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
                              name="editDept"
                              required
                              value={editDept}
                              onChange={(event) => {
                                setEditEnterpriseUser({
                                  ...editEnterpriseUser,
                                  [event.target.name]: event.target.value,
                                });
                                if (event.target.value) {
                                  setFlagEdit({
                                    ...flagEdit,
                                    flagEditEmail: true,
                                    flagEditDepartment: true,
                                  });
                                } else {
                                  setFlagEdit({
                                    ...flagEdit,
                                    flagEditEmail: true,
                                    flagEditDepartment: false,
                                  });
                                }
                              }}
                            >
                              <option value="">
                                Vui lòng chọn phòng ban
                              </option>
                              <option value="Nhân sự">Nhân sự</option>
                              <option value="IT">IT</option>
                              <option value="Marketing">Marketing</option>
                              <option value="Quản lý">Quản lý</option>
                              <option value="Kế toàn">Kế toán</option>
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
                              name="editTel"
                              id="userPhone"
                              placeholder="Ví dụ: 0845372112"
                              required
                              value={editTel}
                              onChange={(event) => {
                                setEditEnterpriseUser({
                                  ...editEnterpriseUser,
                                  [event.target.name]: event.target.value,
                                });
                                if (event.target.value) {
                                  setFlagEdit({
                                    ...flagEdit,
                                    flagEditEmail: true,
                                    flagEditPhone: true,
                                  });
                                } else {
                                  setFlagEdit({
                                    ...flagEdit,
                                    flagEditEmail: true,
                                    flagEditPhone: false,
                                  });
                                }
                                // console.log(
                                //   event.target.value,
                                //   "++",
                                //   "im here flagAddDepartment: ",
                                //   flagEditDepartment,
                                //   ",im here flagAddEmail: ",
                                //   flagEditEmail,
                                //   " im here flagAddPhone: ",
                                //   flagEditPhone
                                // );
                              }}
                            />
                          </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            onClick={
                              flagEditEmail &&
                                flagEditDepartment &&
                                flagEditPhone
                                ? toggleFormEdit
                                : null
                            }
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
        <div style={{ paddingBottom: "2vh" }} />
      </div>
      <Footer />
    </div>
  );
}
