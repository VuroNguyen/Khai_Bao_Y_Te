import React, { useState } from 'react';
import {
    Col, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem,
    NavLink
} from 'reactstrap';
import addImage from '../../../assets/images/add1.png';
import '../index.css';

const ManageNav = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


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
                            <NavLink href="/admindashboard">Quản lý nhân viên</NavLink>
                        </NavItem>
                    </Col>
                    <Col xs="auto">
                        <NavItem>
                            <NavLink href="/enterprise">Thông tin doanh nghiệp</NavLink>
                        </NavItem>
                    </Col>
                </Nav>
            </Collapse>
        </Navbar>
    )
};

export default ManageNav
