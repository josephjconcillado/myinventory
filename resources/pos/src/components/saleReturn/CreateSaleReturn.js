import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import SaleReturnForm from './SaleReturnForm';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import {fetchAllCustomer} from '../../store/action/customerAction';
import {fetchAllWarehouses} from '../../store/action/warehouseAction';
import {addSaleReturn} from '../../store/action/salesReturnAction';
import {getFormattedMessage} from '../../shared/sharedMethod';

const CreateSaleReturn = (props) => {
    const {addSaleReturn, customers, fetchAllCustomer, warehouses, fetchAllWarehouses} = props;
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllCustomer();
        fetchAllWarehouses();
    }, []);

    const addSaleData = (formValue) => {
        addSaleReturn(formValue, navigate);
    };

    return (
        <MasterLayout>
            <HeaderTitle title={getFormattedMessage('sale-return.create.title')} to='/app/sale-return'/>
            <SaleReturnForm addSaleData={addSaleData} customers={customers} warehouses={warehouses}/>
        </MasterLayout>
    )
}

const mapStateToProps = (state) => {
    const {customers, warehouses, totalRecord} = state;
    return {customers, warehouses, totalRecord}
};

export default connect(mapStateToProps, {addSaleReturn, fetchAllCustomer, fetchAllWarehouses})(CreateSaleReturn);
