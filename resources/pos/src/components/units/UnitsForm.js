import React, {useState, createRef} from 'react';
import {connect} from 'react-redux';
import {Form, Modal} from 'react-bootstrap-v5';
import {getFormattedMessage, getFormattedOptions, placeholderText} from "../../shared/sharedMethod";
import {editUnit, fetchUnits, fetchUnit} from '../../store/action/unitsAction';
import productUnit from '../../shared/option-lists/unit.json';
import ModelFooter from '../../shared/components/modelFooter';
import ReactSelect from '../../shared/select/reactSelect';
import {paymentStatusOptions, unitOptions} from "../../constants";

const UnitsForm = (props) => {
    const {handleClose, show, title, addProductData, editUnit, singleUnit} = props;
    const innerRef = createRef();
    const newUnit = singleUnit && productUnit.filter((da) => singleUnit.base_unit === da.value);
    const [unitValue, setUnitValue] = useState({
        name: singleUnit ? singleUnit.name : '',
        short_name: singleUnit ? singleUnit.short_name : '',
        base_unit: newUnit,
    });
    const [errors, setErrors] = useState({
        name: '',
        short_name: '',
        base_unit: ''
    });

    const disabled = singleUnit && singleUnit.name === unitValue.name.trim() && singleUnit.short_name === unitValue.short_name.trim() && unitValue.base_unit[0] && unitValue.base_unit[0].label === singleUnit.base_unit
    const [selectedBaseUnit] = useState(newUnit ? ([{label: newUnit[0].label, value: newUnit[0].value}]) : null);
    const productUnitOptions = getFormattedOptions(unitOptions)

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!unitValue['name'].trim()) {
            errorss['name'] = getFormattedMessage("globally.input.name.validate.label");
        } else if (!unitValue['short_name'].trim()) {
            errorss['short_name'] = getFormattedMessage("unit.modal.input.short-name.validate.label");
        } else if ((unitValue['short_name'] && unitValue['short_name'].length > 50)) {
            errorss['short_name'] = getFormattedMessage("unit.modal.input.short-name.valid.validate.label");
        } else if (!unitValue['base_unit']) {
            errorss['base_unit'] = getFormattedMessage("unit.modal.input.base-unit.validate.label");
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        setUnitValue(inputs => ({...inputs, [e.target.name]: e.target.value}))
        setErrors('');
    };

    const onBaseUnitChange = (obj) => {
        setUnitValue(unitValue => ({...unitValue, base_unit: obj}));
    };

    const prepareFormData = (data) => {
        const params = new URLSearchParams();
        params.append('name', data.name);
        params.append('short_name', data.short_name);
        if (data.base_unit[0]) {
            params.append('base_unit', data.base_unit[0].value);
        } else {
            params.append('base_unit', data.base_unit.value);
        }
        return params;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (singleUnit && valid) {
            if (!disabled) {
                editUnit(singleUnit.id, prepareFormData(unitValue), handleClose);
                clearField(false);
            }
        } else {
            if (valid) {
                setUnitValue(unitValue);
                addProductData(prepareFormData(unitValue));
                clearField(false);
            }
        }
    };

    const clearField = () => {
        setUnitValue({
            name: '',
            short_name: '',
            base_unit: ''
        });
        setErrors('');
        handleClose(false);
    };

    return (
        <Modal show={show}
               onHide={clearField}
               keyboard={true}
               onShow={() => setTimeout(() => {
                   innerRef.current.focus();
               }, 1)}
        >
            <Form onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    onSubmit(e)
                }
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-12 mb-3'>
                                <label
                                    className='form-label'>{getFormattedMessage("globally.input.name.label")}: </label>
                                <span className='required'/>
                                <input type='text' name='name' value={unitValue.name}
                                              placeholder={placeholderText("globally.input.name.placeholder.label")}
                                              className='form-control' ref={innerRef} autoComplete='off'
                                              onChange={(e) => onChangeInput(e)}/>
                                <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['name'] ? errors['name'] : null}</span>
                        </div>
                        <div className='col-md-12 mb-3'>
                                <label
                                    className='form-label'>{getFormattedMessage("unit.modal.input.short-name.label")}: </label>
                                <span className='required'/>
                                <input type='text' name='short_name' className='form-control'
                                              value={unitValue.short_name}
                                              placeholder={placeholderText("unit.modal.input.short-name.placeholder.label")}
                                              onChange={(e) => onChangeInput(e)}/>
                                <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['short_name'] ? errors['short_name'] : null}</span>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <ReactSelect title={getFormattedMessage("unit.modal.input.base-unit.label")}
                                         placeholder={placeholderText("unit.modal.input.base-unit.placeholder.label")}
                                         defaultValue={selectedBaseUnit}
                                         multiLanguageOption={productUnitOptions}
                                         onChange={onBaseUnitChange} errors={errors['base_unit']}/>
                        </div>
                    </div>
                </Modal.Body>
            </Form>
            <ModelFooter onEditRecord={singleUnit} onSubmit={onSubmit} editDisabled={disabled}
                         clearField={clearField} addDisabled={!unitValue.name.trim()}/>
        </Modal>
    )
};

export default connect(null, {fetchUnit, editUnit, fetchUnits})(UnitsForm);
