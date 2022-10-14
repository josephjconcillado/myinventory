import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';
import MasterLayout from '../MasterLayout';
import {fetchWarehouses} from '../../store/action/warehouseAction';
import ReactDataTable from '../../shared/table/ReactDataTable';
import TabTitle from '../../shared/tab-title/TabTitle';
import {getFormattedMessage, placeholderText} from '../../shared/sharedMethod';
import ActionButton from '../../shared/action-buttons/ActionButton';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import {fetchEmailTemplates} from "../../store/action/emailTemplatesAction";

const EmailTemplates = (props) => {
    const {fetchWarehouses, warehouses, totalRecord, isLoading,emailTemplates, fetchEmailTemplates} = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const navigate = useNavigate();

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        fetchEmailTemplates(filter, true);
    };

    const goToEditProduct = (item) => {
        const id = item.id
        navigate(`/app/email-templates/${id}`)
    };


    const itemsValue = emailTemplates.length >= 0 && emailTemplates.map(emailTemplate => ({
        name: emailTemplate.attributes.template_name,
        content: emailTemplate.attributes.content,
        id: emailTemplate.id
    }));

    const columns = [
        {
            name: getFormattedMessage('supplier.table.name.column.title'),
            selector: row => row.name,
            sortField: 'name',
            sortable: true,
        },
        {
            name: getFormattedMessage("globally.input.content.label"),
            // selector: row => row.content,
            sortField: 'content',
            cell : row => {
                const  content = row.content
                const item = content.replace(/<\/?.+?>/ig, '');
                return (
                    <div>{item}</div>
                )
            },
            sortable: true,
        },
        {
            name: getFormattedMessage('react-data-table.action.column.label'),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => <ActionButton  item={row} isDeleteMode={false} goToEditProduct={goToEditProduct} isEditMode={true}/>
        }
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText('email-template.title')}/>
            <ReactDataTable columns={columns} items={itemsValue} onChange={onChange} isLoading={isLoading} totalRows={totalRecord}
                            to='#/app/email-templates/create'/>
        </MasterLayout>
    )
};

const mapStateToProps = (state) => {
    const {totalRecord, isLoading, emailTemplates} = state;
    return {totalRecord, isLoading, emailTemplates}
};

export default connect(mapStateToProps, {fetchWarehouses, fetchEmailTemplates})(EmailTemplates);


