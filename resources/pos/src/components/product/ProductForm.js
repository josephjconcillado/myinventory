import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import {InputGroup} from 'react-bootstrap-v5';
import MultipleImage from './MultipleImage';
import {fetchUnits} from '../../store/action/unitsAction';
import {fetchAllProductCategories} from '../../store/action/productCategoryAction';
import {fetchAllBrands} from '../../store/action/brandsAction';
import {editProduct, fetchProduct} from '../../store/action/productAction';
import {productUnitDropdown} from '../../store/action/productUnitAction';
import {decimalValidate, getFormattedMessage, placeholderText, getFormattedOptions} from '../../shared/sharedMethod';
import productUnit from '../../shared/option-lists/unit.json';
import taxes from '../../shared/option-lists/taxType.json';
import barcodes from '../../shared/option-lists/barcode.json';
import ModelFooter from '../../shared/components/modelFooter';
import ReactSelect from '../../shared/select/reactSelect';
import { taxMethodOptions } from '../../constants';

const ProductForm = (props) => {
    const {
        addProductData,
        id,
        editProduct,
        singleProduct,
        brands,
        fetchAllBrands,
        fetchAllProductCategories,
        productCategories,
        fetchUnits,
        productUnits,
        productUnitDropdown,
        frontSetting
    } = props;
    const navigate = useNavigate();
    const [productValue, setProductValue] = useState({
        name: '',
        code: '',
        product_category_id: '',
        brand_id: '',
        barcode_symbol: '',
        product_cost: '',
        product_price: '',
        product_unit: '',
        sale_unit: '',
        purchase_unit: '',
        stock_alert: 0,
        order_tax: 0,
        tax_type: '',
        notes: '',
        images: [],
    });

    const [optionList, setOptionList] = useState(productUnit);
    const [removedImage, setRemovedImage] = useState([])
    const [isClearDropdown, setIsClearDropdown] = useState(true);
    const [isDropdown, setIsDropdown] = useState(true);
    const [multipleFiles, setMultipleFiles] = useState([]);
    const [errors, setErrors] = useState({
        name: '',
        code: '',
        product_category_id: '',
        brand_id: '',
        barcode_symbol: '',
        product_cost: '',
        product_price: '',
        product_unit: '',
        sale_unit: '',
        purchase_unit: '',
        stock_alert: '',
        order_tax: '',
        tax_type: '',
        notes: '',
        images: [],
    });

    const editProductUnit = singleProduct && optionList.filter((fill) => fill.value === singleProduct[0].product_unit)
    const newTax = singleProduct && taxes.filter((tax) => singleProduct[0].tax_type === tax.value);

    const newBarcode = singleProduct && barcodes.filter((barcode) => singleProduct[0].barcode_symbol.toString() === barcode.value);
    const disabled = multipleFiles.length !== 0 ? false : singleProduct && productValue.product_unit[0] && productValue.product_unit[0].value === singleProduct[0].product_unit && productValue.barcode_symbol[0] && productValue.barcode_symbol[0].value === singleProduct[0].barcode_symbol.toString() && singleProduct[0].name === productValue.name && singleProduct[0].notes === productValue.notes && singleProduct[0].product_price === productValue.product_price && singleProduct[0]?.stock_alert?.toString() === productValue.stock_alert && singleProduct[0].product_cost === productValue.product_cost && singleProduct[0].code === productValue.code && JSON.stringify(singleProduct[0].order_tax) === productValue.order_tax && singleProduct[0].brand_id.value === productValue.brand_id.value && newTax.length === productValue.tax_type.length && singleProduct[0].product_category_id.value === productValue.product_category_id.value && JSON.stringify(singleProduct[0].images.imageUrls) === JSON.stringify(removedImage)
    const [selectedBrand] = useState(singleProduct && singleProduct[0] ? ([{
        label: singleProduct[0].brand_id.label, value: singleProduct[0].brand_id.value
    }]) : null);

    const [selectedBarcode] = useState(newBarcode && newBarcode[0] ? ([{
        label: newBarcode[0].label,
        value: newBarcode[0].value
    }]) : null);

    const [selectedProductCategory] = useState(singleProduct && singleProduct[0] ? ([{
        label: singleProduct[0].product_category_id.label, value: singleProduct[0].product_category_id.value
    }]) : null);

    const [selectedTax] = useState(newTax && newTax[0] ? ([{label: newTax[0].label, value: newTax[0].value}]) : null);

    const saleUnitOption = productUnits && productUnits.length && productUnits.map((productUnit) => {
        return {value: productUnit.id, label: productUnit.attributes.name}
    });

    useEffect(() => {
        fetchAllBrands();
        fetchAllProductCategories();
        fetchUnits();
        setOptionList(optionList);
    }, []);

    useEffect(() => {
        if (singleProduct) {
            setProductValue({
                name: singleProduct ? singleProduct[0].name : '',
                code: singleProduct ? singleProduct[0].code : '',
                product_category_id: singleProduct ? singleProduct[0].product_category_id : '',
                brand_id: singleProduct ? singleProduct[0].brand_id : '',
                barcode_symbol: selectedBarcode,
                product_cost: singleProduct ? singleProduct[0].product_cost : '',
                product_price: singleProduct ? singleProduct[0].product_price : '',
                product_unit: singleProduct ? editProductUnit : '',
                sale_unit: singleProduct ? singleProduct[0].sale_unit && singleProduct[0].sale_unit : '',
                purchase_unit: singleProduct ? singleProduct[0].purchase_unit && singleProduct[0].purchase_unit : '',
                stock_alert: singleProduct ? singleProduct[0].stock_alert ? singleProduct[0].stock_alert : 0 : 0,
                order_tax: singleProduct ? singleProduct[0].order_tax ? JSON.stringify(singleProduct[0].order_tax) : 0 : 0,
                tax_type: newTax,
                notes: singleProduct ? singleProduct[0].notes : '',
                images: singleProduct ? singleProduct[0].images : ''
            })
        }
    }, []);

    const onChangeFiles = (file) => {
        setMultipleFiles(file);
    };

    const handleProductUnitChange = (obj) => {
        productUnitDropdown(obj.value);
        setIsClearDropdown(false);
        setIsDropdown(false);
        setProductValue({...productValue, product_unit: obj});
        setErrors('');
    };

    const handleSaleUnitChange = (obj) => {
        setIsClearDropdown(true);
        setProductValue({...productValue, sale_unit: obj});
        setErrors('');
    };

    const handlePurchaseUnitChange = (obj) => {
        setIsDropdown(true);
        setProductValue({...productValue, purchase_unit: obj});
        setErrors('');
    };

    const onBrandChange = (obj) => {
        setProductValue(productValue => ({...productValue, brand_id: obj}));
        setErrors('');
    };

    const onBarcodeChange = (obj) => {
        setProductValue(productValue => ({...productValue, barcode_symbol: obj}));
        setErrors('');
    };

    const onProductCategoryChange = (obj) => {
        setProductValue(productValue => ({...productValue, product_category_id: obj}));
        setErrors('');
    };

    // tax type dropdown functionality
    const taxTypeFilterOptions = getFormattedOptions(taxMethodOptions)
    const [taxType, setTaxType] = useState(singleProduct ? singleProduct[0].tax_type === '1' ? {
        value: 1, label: getFormattedMessage("tax-type.filter.exclusive.label")
    } : {
        value: 2, label: getFormattedMessage("tax-type.filter.inclusive.label")
    } || singleProduct[0].tax_type === '2' ? {
        value: 2, label: getFormattedMessage("tax-type.filter.inclusive.label")
    } : {
        value: 1, label: getFormattedMessage("tax-type.filter.exclusive.label")
    }: '');

    const defaultTaxType = singleProduct ? singleProduct[0].tax_type === '1' ? {
        value: 1, label: getFormattedMessage("tax-type.filter.exclusive.label")
    } : {
        value: 2, label: getFormattedMessage("tax-type.filter.inclusive.label")
    } || singleProduct[0].tax_type === '2' ? {
        value: 2, label: getFormattedMessage("tax-type.filter.inclusive.label")
    } : {
        value: 1, label: getFormattedMessage("tax-type.filter.exclusive.label")
    }: {
        value: 1, label: getFormattedMessage("tax-type.filter.exclusive.label")
    }

    const onTaxTypeChange = (obj) => {
        setProductValue(productValue => ({...productValue, tax_type: obj}));
        setErrors('');
    };

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!productValue['name']) {
            errorss['name'] = getFormattedMessage('globally.input.name.validate.label');
        } else if (!productValue['code']) {
            errorss['code'] = getFormattedMessage('product.input.code.validate.label');
        } else if (!productValue['product_category_id']) {
            errorss['product_category_id'] = getFormattedMessage('product.input.product-category.validate.label');
        } else if (!productValue['brand_id']) {
            errorss['brand_id'] = getFormattedMessage('product.input.brand.validate.label');
        } else if (!productValue['barcode_symbol']) {
            errorss['barcode_symbol'] = getFormattedMessage('product.input.barcode-symbology.validate.label');
        } else if (!productValue['product_cost']) {
            errorss['product_cost'] = getFormattedMessage('product.input.product-cost.validate.label');
        } else if (!productValue['product_price']) {
            errorss['product_price'] = getFormattedMessage('product.input.product-price.validate.label');
        } else if (!productValue['product_unit']) {
            errorss['product_unit'] = getFormattedMessage('product.input.product-unit.validate.label');
        } else if (!productValue['sale_unit']) {
            errorss['sale_unit'] = getFormattedMessage('product.input.sale-unit.validate.label');
        } else if (isClearDropdown === false) {
            errorss['sale_unit'] = getFormattedMessage('product.input.sale-unit.validate.label');
        } else if (!productValue['purchase_unit']) {
            errorss['purchase_unit'] = getFormattedMessage('product.input.purchase-unit.validate.label');
        } else if (isDropdown === false) {
            errorss['purchase_unit'] = getFormattedMessage('product.input.purchase-unit.validate.label');
        } else if (productValue['order_tax'] > 100) {
            errorss['order_tax'] = getFormattedMessage('product.input.order-tax.valid.validate.label');
        } else if (productValue['notes'] && productValue['notes'].length > 100) {
            errorss['notes'] = getFormattedMessage('globally.input.notes.validate.label');
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        const {value} = e.target;
        // check if value includes a decimal point
        if (value.match(/\./g)) {
            const [, decimal] = value.split('.');
            // restrict value to only 2 decimal places
            if (decimal?.length > 2) {
                // do nothing
                return;
            }
        }
        setProductValue(inputs => ({...inputs, [e.target.name]: value}))
        setErrors('');
    };

    const transferImage = (item) => {
        setRemovedImage(item);
    };

    const prepareFormData = (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('code', data.code);
        formData.append('product_category_id', data.product_category_id.value);
        formData.append('brand_id', data.brand_id.value);
        if (data.barcode_symbol[0]) {
            formData.append('barcode_symbol', data.barcode_symbol[0].value);
        } else {
            formData.append('barcode_symbol', data.barcode_symbol.value);
        }
        formData.append('product_cost', data.product_cost);
        formData.append('product_price', data.product_price);
        formData.append('product_unit', data.product_unit && data.product_unit[0] ? data.product_unit[0].value : data.product_unit.value);
        formData.append('sale_unit', data.sale_unit && data.sale_unit[0] ? data.sale_unit[0].value : data.sale_unit.value);
        formData.append('purchase_unit', data.purchase_unit && data.purchase_unit[0] ? data.purchase_unit[0].value : data.purchase_unit.value);
        formData.append('stock_alert', data.stock_alert ? data.stock_alert : "");
        formData.append('order_tax', data.order_tax ? data.order_tax : "");
        if (data.tax_type[0]) {
            formData.append('tax_type', data.tax_type[0].value ? data.tax_type[0].value : 1);
        } else {
            formData.append('tax_type', data.tax_type.value ? data.tax_type.value : 1);
        }
        formData.append('notes', data.notes);
        if (multipleFiles) {
            multipleFiles.forEach((image, index) => {
                formData.append(`images[${index}]`, image);
            })
        }
        return formData;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        productValue.images = multipleFiles;
        if (singleProduct && valid && isClearDropdown === true && isDropdown === true) {
            if (!disabled) {
                editProduct(id, prepareFormData(productValue), navigate);
            }
        } else {
            if (valid) {
                productValue.images = multipleFiles;
                setProductValue(productValue);
                addProductData(prepareFormData(productValue));
            }
        }
    };

    return (
        <div className='card'>
            <div className='card-body'>
                <Form>
                    <div className='row'>
                        <div className='col-xl-8'>
                            <div className='card'>
                                <div className='row'>
                                    <div className='col-md-6 mb-3'>
                                        <label
                                            className='form-label'>{getFormattedMessage('globally.input.name.label')}: </label>
                                        <span className='required'/>
                                        <input type='text' name='name' value={productValue.name}
                                               placeholder={placeholderText('globally.input.name.placeholder.label')}
                                               className='form-control' autoFocus={true}
                                               onChange={(e) => onChangeInput(e)}/>
                                        <span
                                            className='text-danger d-block fw-400 fs-small mt-2'>{errors['name'] ? errors['name'] : null}</span>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label
                                            className='form-label'>{getFormattedMessage('product.input.code.label')}: </label>
                                        <span className='required'/>
                                        <input type='text' name='code' className=' form-control'
                                               placeholder={placeholderText('product.input.code.placeholder.label')}
                                               onChange={(e) => onChangeInput(e)}
                                               value={productValue.code}/>
                                        <span
                                            className='text-danger d-block fw-400 fs-small mt-2'>{errors['code'] ? errors['code'] : null}</span>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <ReactSelect title={getFormattedMessage('product.input.product-category.label')}
                                                     placeholder={placeholderText('product.input.product-category.placeholder.label')}
                                                     defaultValue={selectedProductCategory}
                                                     value={productValue.product_category_id}
                                                     data={productCategories} onChange={onProductCategoryChange}
                                                     errors={errors['product_category_id']}/>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <ReactSelect title={getFormattedMessage('product.input.brand.label')}
                                                     placeholder={placeholderText('product.input.brand.placeholder.label')}
                                                     defaultValue={selectedBrand} errors={errors['brand_id']}
                                                     data={brands} onChange={onBrandChange}
                                                     value={productValue.brand_id}/>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <ReactSelect
                                            title={getFormattedMessage('product.input.barcode-symbology.label')}
                                            placeholder={placeholderText('product.input.barcode-symbology.placeholder.label')}
                                            defaultValue={selectedBarcode} errors={errors['barcode_symbol']}
                                            data={barcodes} onChange={onBarcodeChange}
                                            value={productValue.barcode_symbol}/>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label
                                            className='form-label'>{getFormattedMessage('product.input.product-cost.label')}: </label>
                                        <span className='required'/>
                                        <InputGroup>
                                            <input type='text' name='product_cost'
                                                   min={0} className='form-control'
                                                   placeholder={placeholderText('product.input.product-cost.placeholder.label')}
                                                   onKeyPress={(event) => decimalValidate(event)}
                                                   onChange={(e) => onChangeInput(e)}
                                                   value={productValue.product_cost}/>
                                            <InputGroup.Text>{frontSetting.value && frontSetting.value.currency_symbol}</InputGroup.Text>
                                        </InputGroup>
                                        <span
                                            className='text-danger d-block fw-400 fs-small mt-2'>{errors['product_cost'] ? errors['product_cost'] : null}</span>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label
                                            className='form-label'>{getFormattedMessage('product.input.product-price.label')}: </label>
                                        <span className='required'/>
                                        <InputGroup>
                                            <input type='text' name='product_price' min={0}
                                                   className='form-control'
                                                   placeholder={placeholderText('product.input.product-price.placeholder.label')}
                                                   onKeyPress={(event) => decimalValidate(event)}
                                                   onChange={(e) => onChangeInput(e)}
                                                   value={productValue.product_price}/>
                                            <InputGroup.Text>{frontSetting.value && frontSetting.value.currency_symbol}</InputGroup.Text>
                                        </InputGroup>
                                        <span
                                            className='text-danger d-block fw-400 fs-small mt-2'>{errors['product_price'] ? errors['product_price'] : null}</span>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label
                                            className='form-label'>{getFormattedMessage('product.input.product-unit.label')}: </label>
                                        <span className='required'/>
                                        <Select
                                            placeholder={placeholderText('product.input.product-unit.placeholder.label')}
                                            value={productValue.product_unit}
                                            name='product_unit' options={optionList}
                                            onChange={handleProductUnitChange}
                                            getOptionLabel={(x) => x.label} getOptionValue={(x) => x.value}
                                        />
                                        <span
                                            className='text-danger d-block fw-400 fs-small mt-2'>{errors['product_unit'] ? errors['product_unit'] : null}</span>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label
                                            className='form-label'>{getFormattedMessage('product.input.sale-unit.label')}: </label>
                                        <span className='required'/>
                                        <Select
                                            placeholder={placeholderText('product.input.sale-unit.placeholder.label')}
                                            value={isClearDropdown === false ? '' : productValue.sale_unit}
                                            onChange={handleSaleUnitChange} options={saleUnitOption}
                                            noOptionsMessage={() => getFormattedMessage('no-option.label')}
                                        />
                                        <span
                                            className='text-danger d-block fw-400 fs-small mt-2'>{errors['sale_unit'] ? errors['sale_unit'] : null}</span>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label
                                            className='form-label'>{getFormattedMessage('product.input.purchase-unit.label')}: </label>
                                        <span className='required'/>
                                        <Select
                                            placeholder={placeholderText('product.input.purchase-unit.placeholder.label')}
                                            value={isDropdown === false ? '' : productValue.purchase_unit}
                                            name='purchase_unit' options={saleUnitOption}
                                            onChange={handlePurchaseUnitChange} noOptionsMessage={() => getFormattedMessage('no-option.label')}
                                        />
                                        <span
                                            className='text-danger d-block fw-400 fs-small mt-2'>{errors['purchase_unit'] ? errors['purchase_unit'] : null}</span>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label
                                            className='form-label'>{getFormattedMessage('product.input.stock-alert.label')}: </label>
                                        <input type='number' name='stock_alert'
                                               className='form-control'
                                               placeholder={placeholderText('product.input.stock-alert.placeholder.label')}
                                               onKeyPress={(event) => decimalValidate(event)}
                                               onChange={(e) => onChangeInput(e)}
                                               value={productValue.stock_alert} min={0}/>
                                        <span
                                            className='text-danger d-block fw-400 fs-small mt-2'>{errors['stock_alert'] ? errors['stock_alert'] : null}</span>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <label
                                            className='form-label'>{getFormattedMessage('product.input.order-tax.label')}: </label>
                                        <InputGroup>
                                            <input type='text' name='order_tax' className='form-control'
                                                   placeholder={placeholderText('product.input.order-tax.placeholder.label')}
                                                   onKeyPress={(event) => decimalValidate(event)}
                                                   onChange={(e) => onChangeInput(e)}
                                                   min={0} pattern='[0-9]*' value={productValue.order_tax}/>
                                            <InputGroup.Text>%</InputGroup.Text>
                                        </InputGroup>
                                        <span
                                            className='text-danger d-block fw-400 fs-small mt-2'>{errors['order_tax'] ? errors['order_tax'] : null}</span>
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <ReactSelect  title={getFormattedMessage('product.input.tax-type.label')}
                                                      multiLanguageOption={taxTypeFilterOptions} onChange={onTaxTypeChange} errors={errors['tax_type']}
                                                      defaultValue={defaultTaxType}
                                                      placeholder={placeholderText("product.input.tax-type.placeholder.label")}
                                        />
                                    </div>
                                    <div className='col-md-12'>
                                        <label
                                            className='form-label'>{getFormattedMessage('globally.input.notes.label')}: </label>
                                        <textarea className='form-control' name='notes' rows={3}
                                                  placeholder={placeholderText('globally.input.notes.placeholder.label')}
                                                  onChange={(e) => onChangeInput(e)}
                                                  value={productValue.notes ? productValue.notes === "null" ? '' : productValue.notes : ''}/>
                                        <span
                                            className='text-danger d-block fw-400 fs-small mt-2'>{errors['notes'] ? errors['notes'] : null}</span>
                                    </div>
                                    <ModelFooter onEditRecord={singleProduct} onSubmit={onSubmit}
                                                 editDisabled={disabled}
                                                 link='/app/products' addDisabled={!productValue.name}/>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-4'>
                            <div className='card'>
                                <label className='form-label'>
                                    {getFormattedMessage('product.input.multiple-image.label')}: </label>
                                <MultipleImage product={singleProduct} fetchFiles={onChangeFiles}
                                               transferImage={transferImage}/>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    const {brands, productCategories, units, totalRecord, warehouses, productUnits, frontSetting} = state;
    return {brands, productCategories, units, totalRecord, warehouses, productUnits, frontSetting};
};

export default connect(mapStateToProps, {
    fetchProduct,
    editProduct,
    fetchAllBrands,
    fetchAllProductCategories,
    fetchUnits,
    productUnitDropdown,
})(ProductForm);
