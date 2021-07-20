import axios from "axios";
//decode
import jwt_decode from "jwt-decode";
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Container,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import Footer from "../../components/Footer";
import CustomNav from "../../components/Navbars/Enterprise/CustomNav";
import SystemTime from "../../components/System";
import "./index.css";
import { AuthContext } from "../../components/contexts/AuthContext";
import { serverUrl } from "../../config/Route/server";

// class AdminDashboard extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             responses: [],
//             modalFormAdd: false,
//             modalFormEdit: false,
//         }
//         this.toggleFormAdd = this.toggleFormAdd.bind(this);
//         this.toggleFormEdit = this.toggleFormEdit.bind(this);
//     }

//     toggleFormEdit() {
//         console.log("edit");
//         this.setState({
//             modalFormEdit: !this.state.modalFormEdit
//         });
//         console.log('after setState: ', this.state)
//     }

//     toggleFormAdd() {
//         console.log("add");
//         this.setState({
//             modalFormAdd: !this.state.modalFormAdd
//         });
//         console.log('after setState: ', this.state);
//     }

//     componentDidMount() {
//         axios.get(`${serverUrl}/home/getAllEmail`)
//             .then(res => {
//                 const responses = res.data;
//                 this.setState({ responses });
//                 console.log(responses)
//             })

//             .catch(error => console.log(error));
//     }

//     render() {
//         const { responses } = this.state;
//         const history = useHistory();

//         const toHistoryClick = (e, useremail) => {
//             history.push({
//                 pathname : "/history",
//                 state : { userEmail: useremail}
//             })
//         }
//         return (
//             <div>
//                 <div className='text-center'>
//                     <h3 style={{ color: '#55befc' }}>Quản lý nhân viên</h3>
//                     <div style={{ paddingTop: '1em' }} />
//                 </div>
//                 <Table>
//                     <thead>
//                         <tr>
//                             <th>Email nhân viên</th>
//                             <th>Tình trạng</th>
//                             <th>Phòng ban</th>
//                             <th>SĐT</th>
//                             <th>Function</th>
//                             <th>Edit</th>
//                             <th>Lịch sử khai báo</th>
//                         </tr>
//                     </thead>
//                     <tbody >
//                         {responses.map(response => (
//                             <tr key={response._id}>
//                                 <td>{response.email}</td>
//                                 <td>{response.status === false ? "Chưa xác nhận" : "Đã xác nhận"}</td>
//                                 <td>{response.department}</td>
//                                 <td>{response.phone}</td>
//                                 <td><Button outline color="info">Lịch sử khai báo</Button></td>
//                                 <td>
//                                     <Button outline color="info" onClick={this.toggleFormEdit}>Edit</Button>
//                                     <Modal isOpen={this.state.modalFormEdit} toggle={this.toggleFormEdit}>
//                                         <ModalHeader toggle={this.toggleFormEdit}>Sửa thông tin nhân viên</ModalHeader>
//                                         <ModalBody>
//                                             <Form>
//                                                 <FormGroup>
//                                                     <Label for="userEmail">1. Email nhân viên <span className='text-danger'>*</span></Label>
//                                                     <Input type="text" name="userEmail" id="userEmail" placeholder="ex: 0845372112" required />
//                                                 </FormGroup>
//                                                 <FormGroup>
//                                                     <Label for="userDepartment">2. Phòng ban <span className='text-danger'>*</span></Label>
//                                                     <CustomInput
//                                                         type="select"
//                                                         id="userDepartment"
//                                                         name="userDepartment"
//                                                         required>
//                                                         <option value="">Vui lòng chọn phòng ban</option>
//                                                         <option value='HR'>Nhân sự</option>
//                                                         <option value='IT'>IT</option>
//                                                         <option value='Marketing'>Marketing</option>
//                                                         <option value='Manager'>Quản lí</option>
//                                                         <option value='Accounting'>Kế toán</option>
//                                                     </CustomInput>
//                                                 </FormGroup>
//                                                 <FormGroup>
//                                                     <Label for="userPhone">3. Số điện thoại nhân viên <span className='text-danger'>*</span></Label>
//                                                     <Input className="without_number" type="number" name="userPhone" id="userPhone" placeholder="ex: 0845372112" required />
//                                                 </FormGroup>
//                                             </Form>
//                                         </ModalBody>
//                                         <ModalFooter>
//                                             <Button onClick={this.toggleFormEdit} outline color="info">OK</Button>{' '}
//                                         </ModalFooter>
//                                     </Modal>
//                                 </td>
//                                 <td><Button outline color="info" onClick={toHistoryClick} >Tới lịch sử</Button></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//                 <div style={{ paddingTop: '2em' }} />
//                 <Button outline color="info" onClick={this.toggleFormAdd} >Thêm tài khoản nhân viên</Button>
//                 <Modal isOpen={this.state.modalFormAdd} toggle={this.toggleFormAdd}>
//                     <ModalHeader toggle={this.toggleFormAdd}>Đăng ký email nhân viên</ModalHeader>
//                     <ModalBody>
//                         <Form>
//                             <FormGroup>
//                                 <Label for="userEmail">1. Email nhân viên <span className='text-danger'>*</span></Label>
//                                 <Input type="text" name="userEmail" id="userEmail" placeholder="ex: 0845372112" required />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label for="userDepartment">2. Phòng ban <span className='text-danger'>*</span></Label>
//                                 <CustomInput
//                                     type="select"
//                                     id="userDepartment"
//                                     name="userDepartment"
//                                     required>
//                                     <option value="">Vui lòng chọn phòng ban</option>
//                                     <option value='HR'>Nhân sự</option>
//                                     <option value='IT'>IT</option>
//                                     <option value='Marketing'>Marketing</option>
//                                     <option value='Manager'>Quản lí</option>
//                                     <option value='Accounting'>Kế toán</option>
//                                 </CustomInput>
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label for="userPhone">3. Số điện thoại nhân viên <span className='text-danger'>*</span></Label>
//                                 <Input className="without_number" type="number" name="userPhone" id="userPhone" placeholder="ex: 0845372112" required />
//                             </FormGroup>
//                         </Form>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button onClick={this.toggleFormAdd} outline color="info">OK</Button>{' '}
//                     </ModalFooter>
//                 </Modal>
//             </div>
//         )
//     }
// }

// export default AdminDashboard

export default function AdminDashboard() {
  const [responses, setResponses] = useState([]);
  const [modalFormAdd, setModalFormAdd] = useState(false);
  const [modalFormEdit, setModalFormEdit] = useState(false);
  const { registerUserEnterprise, getUserEnterprise, updateUserEnterprise } =
    useContext(AuthContext);

  const history = useHistory();

  const token = localStorage.getItem("khaibaoyte");
  //Decode token
  const decoded = jwt_decode(token);
  const enterpriseName = decoded.name;
  const [fetch, setFetch] = useState(false);

  const toHistoryClick = (useremail) => {
    history.push({
      pathname: "/history",
      state: { mail: useremail },
    });
  };

  const [flag, setFlag] = useState(false);

  const toggleFormAddOK = () => {
    if (!userEmail || !userDepartment || !userPhone) {
      setFlag(false);
    } else {
      setFlag(true);
    }
    console.log("im flag: ", flag);
  };

  const toggleFormAdd = () => {
    setModalFormAdd(!modalFormAdd);
  };

  const toggleFormEditOK = () => {
    if (!editEmail || !editDept || !editTel) {
      setFlagEdit(false);
    } else {
      setFlagEdit(true);
    }
    console.log("im flag edit: ", flagEdit);
  };

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

  const onEditChange = (event) => {
    toggleFormEditOK();
    setEditEnterpriseUser({
      ...editEnterpriseUser,
      [event.target.name]: event.target.value,
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

  const onSubmitChange = (event) => {
    setEnterpriseUser({
      ...enterpriseUser,
      [event.target.name]: event.target.value,
    });
    toggleFormAddOK();
  };

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

  let checkEmail = (email) => {
    // don't remember from where i copied this code, but this works.
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      setFlagAdd({ ...flagAdd, flagAddDepartment: true });
    } else {
      setFlagAdd({ ...flagAdd, flagAddEmail: false });
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
    setFetch(false);
  }, [fetch]);

  return (
    <div className="page-container">
      <div className="content-wrap">
        <CustomNav />
        <div className="container-fluid">
          <div style={{ paddingTop: "2vh" }} />
          <Container>
            <SystemTime />
            <div style={{ paddingTop: "3vh" }} />
            <div className="text-center">
              <h3 style={{ color: "#55befc" }}>Báo cáo</h3>
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
                            console.log("im userEmail: ", userEmail);
                            setFlagAdd({ ...flagAdd, flagAddEmail: true });
                          } else {
                            console.log("im userEmail: ", userEmail);
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
                  <ModalFooter>
                    <Button
                      onClick={
                        flagAddEmail && flagAddDepartment && flagAddPhone
                          ? toggleFormAdd
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
                                      flagEditDepartment:true,
                                    });
                                  } else {
                                    setFlagEdit({
                                      ...flagEdit,
                                      flagEditEmail: true,
                                      flagEditDepartment:false,
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
                                      flagEditPhone:true,
                                    });
                                  } else {
                                    setFlagEdit({
                                      ...flagEdit,
                                      flagEditEmail: true,
                                      flagEditPhone:false,
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
          </Container>
        </div>
        <div style={{ paddingBottom: "2vh" }} />
      </div>
      <Footer />
    </div>
  );
}
