import React, {useState} from 'react';
import {Link, useLocation, useParams} from 'react-router-dom';
import {ProSidebar, SidebarHeader, SidebarContent, MenuItem, Menu} from 'react-pro-sidebar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faSearch} from '@fortawesome/free-solid-svg-icons';
import 'react-pro-sidebar/dist/css/styles.css';
import {getFormattedMessage, placeholderText} from "../../shared/sharedMethod";
import {useIntl} from "react-intl";

const AsideMenu = (props) => {
    const {asideConfig, frontSetting, isResponsiveMenu, menuClick, menuIconClick, isMenuCollapse} = props;
    const location = useLocation();
    const intl = useIntl();
    const {id} = useParams();
    const [searchTerm, setSearchTerm] = useState('')

    const filterMenu = (asideConfig, searchTerm) => {
        if (!searchTerm) {
            return asideConfig;
        }
        return asideConfig.filter((post) => {
            const postName = intl.formatMessage({id: `${post.title}`}).toLowerCase();
            return postName.includes(searchTerm.toLowerCase());
        });
    };

    const filteredMenu = filterMenu(asideConfig, searchTerm);

    return (
        <>
            <ProSidebar collapsed={isMenuCollapse}
                        className={`${isResponsiveMenu === true ? 'open-menu' : 'hide-menu'} aside-menu-container`}>
                <SidebarHeader className='aside-menu-container__aside-logo flex-column-auto pb-2 pt-3'>
                    <a href='/' className='text-decoration-none sidebar-logo text-gray-900 fs-4'>
                        <div className={`${isMenuCollapse ? 'd-none' : 'image image-mini me-3'}`}>
                            <img src={frontSetting.value && frontSetting.value.logo}
                                 className='img-fluid object-fit-contain'
                                 alt='profile image'/>
                        </div>
                        {isMenuCollapse ? null : frontSetting.value && frontSetting.value.company_name}
                    </a>
                    <button type='button' onClick={(e) => menuIconClick(e)}
                            className='btn p-0 fs-1 aside-menu-container__aside-menubar d-lg-block d-none sidebar-btn border-0'>
                        <FontAwesomeIcon icon={faBars} className="text-gray-600"/>
                    </button>
                </SidebarHeader>
                <SidebarContent className='sidebar-scrolling'>
                    <form
                        className={`d-flex position-relative aside-menu-container__aside-search search-control ${isMenuCollapse ? 'd-none' : ''} py-3 mt-1`}>
                        <div className='position-relative d-flex w-100'>
                            <input className={`form-control ps-8 ${isMenuCollapse ? 'd-none' : ''}`} type='search'
                                   id='search'
                                   placeholder={placeholderText('react-data-table.searchbar.placeholder')}
                                   aria-label='Search'
                                   onChange={(e) => setSearchTerm(e.target.value)}/>
                            <span
                                className='position-absolute d-flex align-items-center top-0 bottom-0 left-0 text-gray-600 ms-3'>
               <FontAwesomeIcon icon={faSearch}/>
            </span>
                        </div>
                    </form>
                    <Menu>
                        {filteredMenu.length ? filteredMenu.map((mainItems, index) => {
                            return (
                                <MenuItem key={index}
                                          icon={mainItems.fontIcon}
                                          className={`${isMenuCollapse === false ? mainItems.class : ''} flex-column`}
                                          active={location.pathname === mainItems.to || location.pathname === mainItems.path || location.pathname.includes(mainItems.to) || location.pathname === mainItems.stockPath || location.pathname === mainItems.productPath || location.pathname === mainItems.purchasePath || location.pathname === mainItems.topSellingPath || location.pathname === mainItems.productQuantityAlertPath || location.pathname === (mainItems.stockDetailPath + '/' + id)}
                                >
                                    <Link to={mainItems.to}>
                                        {intl.formatMessage({id: `${mainItems.title}`})}
                                    </Link>
                                </MenuItem>
                            )
                        }) : <div className="text-center">{getFormattedMessage("side-menu.empty.message")}</div>}
                    </Menu>
                </SidebarContent>
            </ProSidebar>
            <div className={`${isResponsiveMenu === true && 'bg-overlay d-block'}`} onClick={menuClick}/>
        </>
    )
};

export default AsideMenu;


