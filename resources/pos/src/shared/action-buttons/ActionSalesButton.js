import React from "react";
import {
    faEye,
    faFilePdf,
    faDollarSign,
    faTrash,
    faAngleDown,
    faCartShopping,
    faPenToSquare,
    faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { placeholderText } from "../sharedMethod";

const ActionSalesButton = (props) => {
    const {
        goToEditProduct,
        item,
        onClickDeleteModel = true,
        goToDetailScreen,
        isViewIcon = false,
        isPdfIcon = false,
        isCreatePayment = false,
        onPdfClick,
        title,
        isPaymentShow = false,
        onShowPaymentClick,
        onCreatePaymentClick,
        onCreateSaleClick,
        isCreatesSales,
    } = props;

    return (
        <>
            {isViewIcon ? (
                <button
                    title={placeholderText("globally.view.tooltip.label")}
                    className="btn text-success px-2 fs-3 ps-0 border-0"
                    onClick={(e) => {
                        e.stopPropagation();
                        goToDetailScreen(item.id);
                    }}
                >
                    <FontAwesomeIcon icon={faEye} />
                </button>
            ) : null}
            {isPdfIcon ? (
                <button
                    title={placeholderText("globally.pdf.download.label")}
                    className="btn text-primary px-2 fs-3 ps-0 border-0"
                    onClick={(e) => {
                        e.stopPropagation();
                        onPdfClick(item.id);
                    }}
                >
                    <FontAwesomeIcon icon={faFilePdf} />
                </button>
            ) : null}
            {item.payment_status !== 2 && isPaymentShow ? (
                <button
                    title={placeholderText("globally.show.payment.label")}
                    className="btn text-info px-2 fs-3 ps-0 border-0"
                    onClick={(e) => {
                        e.stopPropagation();
                        onShowPaymentClick(item);
                    }}
                >
                    <FontAwesomeIcon icon={faDollarSign} />
                </button>
            ) : null}
            {isCreatePayment && item.payment_status !== 1 ? (
                <button
                    title={placeholderText("globally.show.payment.label")}
                    className="btn text-info px-2 fs-3 ps-0 border-0"
                    onClick={(e) => {
                        e.stopPropagation();
                        onCreatePaymentClick(item);
                    }}
                >
                    <FontAwesomeIcon icon={faDollarSign} />
                </button>
            ) : null}
            {isCreatesSales && !item.is_sale_created ? (
                <button
                    title={placeholderText("sale.create.title")}
                    className="btn text-info px-2 fs-3 ps-0 border-0"
                    onClick={(e) => {
                        e.stopPropagation();
                        onCreateSaleClick(item);
                    }}
                >
                    <FontAwesomeIcon icon={faDollarSign} />
                </button>
            ) : null}
            {goToEditProduct && !item.is_sale_created && (
                <button
                    title={placeholderText("globally.edit.tooltip.label")}
                    className="btn text-primary px-2 fs-3 ps-0 border-0"
                    onClick={(e) => {
                        e.stopPropagation();
                        goToEditProduct(item);
                    }}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            )}
            <button
                title={placeholderText("globally.delete.tooltip.label")}
                className="btn text-danger px-2 fs-3 ps-0 border-0"
                onClick={(e) => {
                    e.stopPropagation();
                    onClickDeleteModel(item);
                }}
            >
                <FontAwesomeIcon icon={faTrash} className="me-2" />{" "}
            </button>
        </>
    );
};

export default ActionSalesButton;
