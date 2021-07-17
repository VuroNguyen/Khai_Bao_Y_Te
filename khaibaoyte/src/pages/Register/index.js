import axios from "axios";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../components/contexts/AuthContext";
import {
  Button,
  Col,
  Container,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import AlertMessage from "../../components/AlertMessage/AlertMessage";

function Register() {
  const [businessForm, setBusinessForm] = useState({
    email: "",
  });
  const [alert, setAlert] = useState(null);

  // const [businessForm, setBusinessForm] = useState({
  //     emailBusiness: '',
  //     nameBusiness: '',
  //     addressBusiness: '',
  //     MSTBusiness: '',
  //     documentBusiness: 'không',
  // });

  const history = useHistory();
  const data = JSON.stringify(businessForm);

  // const getMail = async data => {
  //     try {
  //         const response = await axios({
  //             method: 'POST',
  //             url: 'http://localhost:5000/enterprise/register',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //             data: data,
  //         })
  //         if (response.data.success)
  //             localStorage.setItem('khaibaoyte', response.data.accessToken)

  //         return response.data
  //     } catch (e) {
  //         return { success: false, message: e.message }
  //     }
  // }

  // const OnSub = () => {
  //     alert(`Business Email: ${businessEmail}`);
  //     history.push({
  //         pathname: "/registerform",
  //     });
  //     getMail(data)
  // }

  // const onChangeConfirm = event => setBusinessEmail(event.target.value)

  const { registerEnterprise, loginUser } = useContext(AuthContext);

  const register = async (event) => {
    event.preventDefault();

    let isRegistered = true;

    try {
      const loginData = await loginUser(data);
      if (loginData.enterprise) {
        setAlert({
          type: "danger",
          message: "vui lòng kiểm tra email xác thực để đăng nhập",
        });
        setTimeout(() => setAlert(null), 5000);
      }
      // if login failed == no email in db
      if (!loginData.success) {
        isRegistered = false;
      }
      console.log("login", loginData);
    } catch (error) {
      console.log(error);
    }

    if (isRegistered === false) {
      try {
        const createData = await registerEnterprise(data);
        if (createData.success) {
          setAlert({
            type: "danger",
            message:
              "Email xác thực đăng ký đã được gửi. Vui lòng truy cập email để điền thông tin và xác nhận",
          });
          setTimeout(() => setAlert(null), 5000);
        }
        console.log("createData", createData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const { email } = businessForm;

  const onChangeBusinessForm = (event) =>
    setBusinessForm({
      ...businessForm,
      [event.target.name]: event.target.value,
    });

  return (
    <Container>
      <Container>
        <div className="text-center">
          <h3 style={{ color: "#55befc" }}>Tài khoản doanh nghiệp</h3>
          <div style={{ paddingTop: "1em" }} />
          <Form onSubmit={register}>
            <FormGroup>
              <Label for="userEmail">
                <h4>Nhập email để điền thông tin</h4>
              </Label>
              <Input
                className="w-75 mx-auto"
                type="email"
                name="email"
                id="userEmail"
                placeholder="Ví dụ: emailcuaban@fpt.com.vn"
                required
                value={email}
                onChange={onChangeBusinessForm}
              />
            </FormGroup>
            <Button
              style={{ height: "5vh", width: "15vh" }}
              outline
              color="primary"
            >
              Gửi email
            </Button>
          </Form>
          <br />
          {/* Mẫn */}
          <AlertMessage info={alert} />
          <br />
          <br />
        </div>
      </Container>
      <Container className="text-center">
        <h4 className="text-danger font-weight-bold">HƯỚNG DẪN SỬ DỤNG</h4>
      </Container>
      <Container>
        <div style={{ paddingTop: "30px" }} />
        <p className="text-info">1. Đối với doanh nghiệp Đăng ký mới: </p>
        <p>_ Nhập email vào ô bên trên và nhấn gửi</p>
        <p>_ Đăng nhập email và nhấn vào link xác nhận</p>
        <p>_ Điền các thông tin có liên quan trên đơn Đăng ký</p>
        <p>_ Bấm gửi và hệ thống sẽ trả về kết quả</p>
        <p>
          _ Nhập email nhân viên bằng dấu + và thông báo xác nhận sẽ được gửi
          tới từng người
        </p>
        <p>
          _ Nếu đã có tài khoản mời quay lại trang{" "}
          <a href="/login">Đăng Nhập</a>
        </p>
        <br />
        <p className="text-primary font-italic">
          Mọi thắc mắc xin vui lòng liên lạc để được{" "}
          <a href="tel:123-456-7890">hỗ trợ</a>
        </p>
        <div style={{ paddingBottom: "20px" }} />
      </Container>
    </Container>
  );
}

export default Register;
