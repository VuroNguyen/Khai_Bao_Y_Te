import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { AuthContext } from "../../components/contexts/AuthContext";
import Footer from "../../components/Footer";
import UserNav from "../../components/Navbars/User";
import SystemTime from "../../components/System";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [alert, setAlert] = useState(null);

  const history = useHistory();

  const data = JSON.stringify({
    email: userEmail,
  });

  const { loginUser, registerUser } = useContext(AuthContext);

  const onSubmitChange = (event) => setUserEmail(event.target.value);

  const login = async (event) => {
    // double try catch for both scenario whether
    // the email is registered or not
    event.preventDefault();
    // add variable to check if its registered
    let isRegistered = true;

    // run 1st
    // login try catch for registered emails
    try {
      const loginData = await loginUser(data);
      if (loginData.enterprise) {
        setAlert({
          type: "success",
          message: "Vui lòng kiểm tra email xác thực để quản lí doanh nghiệp",
        });
        setTimeout(() => setAlert(null), 5000);
      }
      if (loginData.user) {
        setAlert({
          type: "success",
          message: "Vui lòng kiểm tra email xác thực để bắt đầu khai báo",
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

    // if there is no email in the db
    // login try catch for unregistered emails
    if (isRegistered === false) {
      try {
        const createData = await registerUser(data);
        if (createData.success) {
          setAlert({
            type: "success",
            message:
              "Email xác thực đã được gửi. Vui lòng truy cập email để xác thực",
          });
          setTimeout(() => setAlert(null), 5000);
        }
        if (createData.success) {
          history.push({});
        }
        console.log("createData", createData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='page-container'>
      <div className='content-wrap'>
        <UserNav />
        <div className='container'>
          <div style={{ paddingTop: '2vh' }} />
          <SystemTime />
          <div style={{ paddingTop: '3vh' }} />
          <Container>
            <Container>
              <div className="text-center">
                <h3 style={{ color: "#55befc" }}>Khai Báo Y Tế Nhân Viên</h3>
                <div style={{ paddingTop: "1em" }} />
                <Form onSubmit={login}>
                  <FormGroup>
                    <Label for="userEmail">
                      <h4>Nhập email để xác thực</h4>
                    </Label>
                    <Input
                      className="w-75 mx-auto"
                      type="email"
                      name="userEmail"
                      id="userEmail"
                      placeholder="Ví dụ: emailcuaban@fpt.com.vn"
                      required
                      value={userEmail}
                      onChange={onSubmitChange}
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

                <AlertMessage info={alert} />

                {/* {<p className="text-danger font-italic">
            Lỗi báo chỗ này, thêm if các thứ để hiển thị
          </p>} */}
                <br />
                <br />
              </div>
            </Container>
            <Container className="text-center">
              <h4 className="text-danger font-weight-bold">THÔNG TIN CHUNG</h4>
            </Container>
            <Container>
              <div style={{ paddingTop: "30px" }} />
              {/* <h4>Thông tin chung</h4> */}
              <p>Hệ thống khai báo y tế là công cụ hỗ trợ các doanh nghiệp ghi nhận và tổng hợp các khai báo y tế của nhân viên. Với các chức năng khai báo, quản lý nhân viên, và các công cụ báo cáo, tổng hợp tờ khai, hệ thống sẽ đưa đến cho doanh nghiệp một góc nhìn tổng quan và trực diện hơn về tình hình dịch bệnh COVID19. Từ đó, hỗ trợ thúc đẩy các hoạt động sản xuất, kinh doanh trong bối cảnh dịch bệnh như hiện nay.</p>
              <p>Nhân viên trong doanh nghiệp, tổ chức thực hiện khai báo y tế qua hệ thống hằng ngày để báo cáo tình trạng sức khỏe, lịch trình di chuyển và lịch sử tiếp xúc với các trường hợp được cho là liên quan đến các trường hợp nhiễm bệnh COVID19. Các chủ doanh nghiệp có thể theo dõi các tờ khai được khai báo bởi nhân viên để theo dõi tình hình diễn biến của dịch bệnh và tạo ra các thống kê, báo cáo về các tình trạng của nhân viên trong doanh nghiệp.</p>
              <strong><ol><li>Đối với vai trò là nhân viên</li></ol></strong>
              <ul>
                <li>Nhập email vào ô bên trên và nhấn gửi.</li>
                <li>Hệ thống sẽ gửi email để xác thực người dùng</li>
                <li>Truy cập email và chọn xác nhận để tiến hành thực hiện khai báo</li>
              </ul>
              <strong><ol start='2'><li>Đối với vai trò là doanh nghiệp</li></ol></strong>
              <ul>
                <li>Vui lòng chọn <a href="/register">Dành cho chủ doanh nghiệp</a></li>
              </ul>
              <br />
              <p className="text-primary font-italic">
                Mọi thắc mắc xin vui lòng liên lạc để được{" "}
                <a href="tel:123-456-7890">hỗ trợ</a>
              </p>
            </Container>
          </Container>
        </div>
        <div style={{ paddingBottom: '2vh' }} />
      </div>
      <Footer />
    </div>
  );
}

export default Login;
