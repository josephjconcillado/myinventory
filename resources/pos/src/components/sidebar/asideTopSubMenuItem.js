import React from 'react';
import {Link, useLocation, useParams} from 'react-router-dom';
import {getFormattedMessage} from '../../shared/sharedMethod';

const AsideTopSubMenuItem = (props) => {
    const {asideConfig} = props;
    const location = useLocation();
    const id = useParams();

    return (
        <nav className='navbar navbar-expand-xl navbar-light top-navbar d-xl-flex align-items-stretch d-block px-3 px-xl-0 py-4 py-xl-0'>
            <div className="navbar-collapse">
                <div className="navbar-nav me-auto mb-2 mb-lg-0">
                    {location.pathname === '/profile/edit' ?
                        <div className="nav-item position-relative mx-xl-3 mb-3 mb-xl-0">
                            <Link to='/profile/edit'
                                  className={`${location.pathname === '/profile/edit' ? 'active': ''} nav-link p-0`}>
                                <span>{getFormattedMessage('update-profile.title')}</span>
                            </Link>
                        </div>
                        :
                        asideConfig && asideConfig.map((mainItems, index) => {
                            return (
                                <div key={index}
                                    className={`${location.pathname === mainItems.to || location.pathname === mainItems.path || location.pathname === mainItems.stockPath || location.pathname === mainItems.productPath || location.pathname === mainItems.purchasePath || location.pathname === mainItems.topSellingPath || location.pathname === mainItems.productQuantityAlertPath ||  location.pathname === mainItems.prefixesPath || location.pathname === mainItems.supplierReportPath || location.pathname.includes(mainItems.to)
                                    || location.pathname === (mainItems.stockDetailPath + '/' + id.id) || location.pathname === (mainItems.supplierReportDetailsPath + '/' + id.id) ? 'd-flex' : 'd-none'}`}>
                                    {mainItems.items && mainItems.items.map((item, index) => {
                                        return (
                                            <div key={index} className="nav-item position-relative mx-xl-3 mb-3 mb-xl-0">
                                                  <Link to={item.to}
                                                        className={`nav-link p-0 ${location.pathname === item.to || (mainItems.isSamePrefix ? null : location.pathname.includes(mainItems.to)) || location.pathname === item.detail + '/' + id.id || location.pathname === '/profile/edit' ? ' active' : ''}`}>
                                                        {location.pathname === '/profile/edit' ?
                                                            <span>{getFormattedMessage('update-profile.title')}</span> :
                                                            <span>{item.title}</span>
                                                        }
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </nav>
    )
};

export default AsideTopSubMenuItem;
