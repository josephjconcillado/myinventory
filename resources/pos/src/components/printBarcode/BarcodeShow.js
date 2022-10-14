import React from 'react';
import {Image} from 'react-bootstrap-v5';

const BarcodeShow = (props) => {
    const {product, index, paperSize, updated} = props;

    const loopBarcode = () => {
        let indents = [];
        for (let i = 0; i < product.quantity; i++) {
            indents.push(
                <div
                    className={`${paperSize.value === 1 ? 'col-md-3' : '' || paperSize.value === 2 ? 'col-md-4 barcode-main__box-height2' : '' || paperSize.value === 3 ? 'col-md-4 barcode-main__box-height3' : '' || paperSize.value === 4 || paperSize.value === 6 ? 'col-md-6 barcode-main__box-height2 px-20' : '' || paperSize.value === 5 ? 'col-md-4 barcode-main__box-height3 px-13' : '' || paperSize.value === 7 ? 'col-md-4 barcode-main__box-height7 px-20' : '' || paperSize.value === 8 ? 'col-md-6 barcode-main__box-height7 px-20' : ''} barcode-main__barcode-item barcode-main__barcode-style`}>
                    <div className='mb-2'>{product && product.name}</div>
                    <Image
                        src={product && product.barcode_url}
                        alt={product && product.name}
                        className='w-100'/>
                    <div
                        className='fw-bolder mt-2'>{product && product.code}</div>
                </div>);
        }
        return indents;
    };

    return (
        <div className='col-md-12 d-flex d-wrap justify-content-between overflow-auto' key={index}>
            {updated ?
                <div className='barcode-main' id='demo'>
                    {loopBarcode()}
                </div> : ''}
        </div>
    )
}
export default BarcodeShow;
