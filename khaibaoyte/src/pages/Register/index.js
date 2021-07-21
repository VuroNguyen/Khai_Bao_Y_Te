import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button, Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { AuthContext } from "../../components/contexts/AuthContext";
import Footer from "../../components/Footer";
import EnterpriseNavBar from "../../components/Navbars/Enterprise";
import SystemTime from "../../components/System";

function Register() {
  const [businessForm, setBusinessForm] = useState({
    email: "",
  });

  const [isEmailVisible, setEmailVisible] = useState(true);

  const toggle = () => {
    setEmailVisible(!isEmailVisible);
  }

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
  //             url: '${serverUrl}/enterprise/register',
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

  const { preRegisterEnterprise, loginEnterprise } = useContext(AuthContext);

  const register = async (event) => {
    event.preventDefault();

    toggle();

    let isRegistered = true;

    try {
      const loginData = await loginEnterprise(data);
      if (loginData.enterprise) {
        setAlert({
          type: "success",
          message: "Vui lòng kiểm tra email xác thực để quản lí doanh nghiệp",
        });
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
        const createData = await preRegisterEnterprise(data);
        if (createData.success) {
          setAlert({
            type: "success",
            message:
              "Email xác thực đăng ký đã được gửi. Vui lòng truy cập email xác nhận và bắt đầu",
          });
        } else {
          setAlert({
            type: "danger",
            message: "Email đã tồn tại",
          });
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
    <div className='page-container'>
      <div className='content-wrap'>
        <EnterpriseNavBar />
        <div className='container'>
          <div style={{ paddingTop: '2vh' }} />
          <SystemTime />
          <div style={{ paddingTop: '3vh' }} />
          <div className="text-center">
            <h3 style={{ color: "#55befc" }}>Tài khoản doanh nghiệp</h3>
            <div style={{ paddingTop: "1em" }} />
            <Form onSubmit={register}>
              <FormGroup>
                <Label for="userEmail">
                  <h4>Nhập email để điền thông tin</h4>
                </Label>
                {isEmailVisible ? <Input
                  className="w-75 mx-auto"
                  type="email"
                  name="email"
                  id="userEmail"
                  placeholder="Ví dụ: emailcuaban@fpt.com.vn"
                  required
                  value={email}
                  onChange={onChangeBusinessForm} />
                  :
                  <AlertMessage info={alert} />
                }
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
            <br />
            <br />
          </div>
          <div className="text-center">
            <h4 className="text-danger font-weight-bold">THÔNG TIN CHUNG</h4>
          </div>
          <div style={{ paddingTop: "30px" }} />
          {/* <h4>Thông tin chung</h4> */}
          <p>Hệ thống khai báo y tế là công cụ hỗ trợ các doanh nghiệp ghi nhận và tổng hợp các khai báo y tế của nhân viên. Với các chức năng khai báo, quản lý nhân viên, và các công cụ báo cáo, tổng hợp tờ khai, hệ thống sẽ đưa đến cho doanh nghiệp một góc nhìn tổng quan và trực diện hơn về tình hình dịch bệnh COVID19. Từ đó, hỗ trợ thúc đẩy các hoạt động sản xuất, kinh doanh trong bối cảnh dịch bệnh như hiện nay.</p>
          <p>Nhân viên trong doanh nghiệp, tổ chức thực hiện khai báo y tế qua hệ thống hằng ngày để báo cáo tình trạng sức khỏe, lịch trình di chuyển và lịch sử tiếp xúc với các trường hợp được cho là liên quan đến các trường hợp nhiễm bệnh COVID19. Các chủ doanh nghiệp có thể theo dõi các tờ khai được khai báo bởi nhân viên để theo dõi tình hình diễn biến của dịch bệnh và tạo ra các thống kê, báo cáo về các tình trạng của nhân viên trong doanh nghiệp.</p>
          <strong><ol><li>Đối với doanh nghiệp đã đăng ký</li></ol></strong>
          <ul>
            <li>Nhập email vào ô bên trên và nhấn gửi.</li>
            <li>Hệ thống sẽ gửi email để xác thực người dùng.</li>
            <li>Truy cập email và chọn xác nhận để truy cập hệ thống quản lý Khai báo y tế Doanh nghiệp</li>
          </ul>
          <strong><ol start='2'><li><strong></strong>Đối với doanh nghiệp mới</li></ol></strong>
          <ul>
            <li>Nhập email vào ô bên trên và nhấn gửi.</li>
            <li>Hệ thống sẽ gửi email để xác thực người dùng.</li>
            <li>Truy cập email và chọn xác nhận để tiến hành đăng ký thông tin doanh nghiệp.</li>
            <li>Nhập thông tin doanh nghiệp để đăng ký và truy cập hệ thống.</li>
            <li>Bổ sung danh sách nhân viên thông qua email để tổng hợp khai báo y tế.</li>
          </ul>
          <br />
          <p className="text-primary font-italic">
            Mọi thắc mắc xin vui lòng liên lạc để được{" "}
            <a href="tel:123-456-7890">hỗ trợ</a>
          </p>
        </div>
        <div style={{ paddingBottom: '2vh' }} />
      </div>
      <Footer />
    </div>
  );
}

export default Register;
