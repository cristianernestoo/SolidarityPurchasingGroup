import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaAppleAlt, FaCarrot, FaSeedling, FaFish, FaProductHunt ,FaShoppingCart } from 'react-icons/fa';
import {GiMilkCarton, GiSheep} from 'react-icons/gi';
import { Link } from 'react-router-dom';


const SideBar = (props) => {
    const {collapsed, width, searchCategory, handleBasket, userRole} = props;
    return (
        <>

            <ProSidebar 
            collapsed={collapsed}
            width={width}
            {...props}>
                <SidebarHeader>
                    { userRole == 'farmer' ? 
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                        >
                        Your Products
                    </div>
                    : 
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaShoppingCart/>} onClick={handleBasket}>
                            <div
                            style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 12,
                                letterSpacing: '1px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                            >
                            Your Basket
                            </div>
                        </MenuItem> 
                    </Menu> } 
                </SidebarHeader>

                <SidebarContent>
                    { userRole == 'farmer' ?
                    ''
                    :
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                        >
                        Our Categories
                    </div> 
                    }
                    <Menu iconShape="circle">
                        <MenuItem value="All" onClick={() => { searchCategory("All") }} icon={<FaProductHunt />}>All products</MenuItem>
                        <MenuItem value="Dairies" onClick={() => { searchCategory("Dairies") }} icon={<GiMilkCarton />}>Dairies</MenuItem>
                        <MenuItem value="Fruits" onClick={() => { searchCategory("Fruits") }} icon={<FaAppleAlt />}>Fruits</MenuItem>
                        <MenuItem value="Vegetables" onClick={() => { searchCategory("Vegetables") }} icon={<FaCarrot />}>Vegetables</MenuItem>
                        <MenuItem value="Meat" onClick={() => { searchCategory("Meat") }} icon={<GiSheep />}>Meat</MenuItem>
                        <MenuItem value="Plants" onClick={() => { searchCategory("Plants") }} icon={<FaSeedling/>}>Plants</MenuItem>
                        <MenuItem value="Fish" onClick={() => { searchCategory("Fish") }} icon={<FaFish/>}>Fish</MenuItem>
                    </Menu>
                </SidebarContent>
                {userRole === "client" || userRole === "farmer" || userRole === "" ? <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                    >
                    <Link to={{ pathname: '/' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                         <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        Go back to Home
                        </span>
                    </Link>
                    </div>
                </SidebarFooter> : <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                    >
                    <Link to={{ pathname: '/clientlist' }} className="font-weight-light" style={{ color: "white", textDecoration: "none" }}>
                         <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        Go back to clients
                        </span>
                    </Link>
                    </div>
                </SidebarFooter>}
            </ProSidebar>
        </>

        );
  };
  export default SideBar;