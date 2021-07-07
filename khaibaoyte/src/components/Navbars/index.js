import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Col,
} from 'reactstrap';
import addImage from '../../assets/images/add1.png'
import './index.css'

const Navbars = (props) => {
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
                    Khai Báo Y Tế
                </div>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <Col xs="auto">
                        <NavItem>
                            <NavLink href="/">Đăng kí</NavLink>
                        </NavItem>
                    </Col>
                    <Col xs="auto">
                        <NavItem>
                            <NavLink href="/dashboard">Dashboard</NavLink>
                        </NavItem>
                    </Col>
                </Nav>
            </Collapse>
        </Navbar>
    )
};

export default Navbars
