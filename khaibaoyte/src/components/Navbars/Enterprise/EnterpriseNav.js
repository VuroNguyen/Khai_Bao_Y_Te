import React, { useState } from 'react';
import {
    Col, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem,
    NavLink
} from 'reactstrap';
import addImage from '../../../assets/images/add1.png';
import jwt_decode from 'jwt-decode';
import '../index.css';
import checkToken from '../../utils/seturl';

const EnterpriseNav = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const today = new Date();

    const alertnotoken = () => {
        if (props.token == null || props.token === '' || jwt_decode(props.token).exp * 1000 < today.getTime()) {
            alert('Không tìm thấy token. Đang đưa người dùng về trang đăng nhập... (send from EnterpriseNav alertnotoken)')
        }
        else return;
    }

    return (
        <Navbar light expand="md">
            <NavbarBrand href="/" >
                <div className='d-flex align-items-center'>
                    <div className='col-sm'>
                        <img
                            src={addImage}
                            alt='icon' />
                    </div>
                    Khai Báo Y Tế Doanh Nghiệp
                </div>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <Col xs="auto">
                        <NavItem>
                            <NavLink href={checkToken(props.token, 'report')} onClick={() => alertnotoken()}>Báo cáo</NavLink>
                        </NavItem>
                    </Col>
                    <Col xs="auto">
                        <NavItem>
                            <NavLink href={checkToken(props.token, 'admindashboard')} onClick={() => alertnotoken()}>Quản lý nhân viên</NavLink>
                        </NavItem>
                    </Col>
                    <Col xs="auto">
                        <NavItem>
                            <NavLink href={checkToken(props.token, 'enterprise')} onClick={() => alertnotoken()}>Thoát</NavLink>
                        </NavItem>
                    </Col>
                </Nav>
            </Collapse>
        </Navbar>
    )
};

export default EnterpriseNav
