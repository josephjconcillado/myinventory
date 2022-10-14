import React from 'react';
import {Permissions} from '../constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faPieChart, faUser, faTruck, faUserGroup, faHome, faBoxes, faPrint, faBookmark, faBoxOpen,
    faMoneyCheckDollar, faMoneyBills, faQuoteRight, faDollarSign, faReceipt, faArrowRight, faArrowLeft,
    faEnvelope, faCartShopping, faChartColumn, faGear, faMapLocation, faBasketShopping
} from '@fortawesome/free-solid-svg-icons';
import {getFormattedMessage} from '../shared/sharedMethod';
import {ShieldLock} from "react-bootstrap-icons";

export default [
    {
        title: 'dashboard.title',
        name: "dashboard",
        fontIcon: <FontAwesomeIcon icon={faPieChart}/>,
        to: '/app/dashboard',
        class: 'd-flex',
        permission: '',
        items: [
            {
                title: getFormattedMessage('dashboard.title'),
                to: '/app/dashboard',
            },
        ],
    },
    {
        title: 'users.title',
        name: "users",
        fontIcon: <FontAwesomeIcon icon={faUser}/>,
        to: '/app/users',
        class: 'd-flex',
        permission: Permissions.MANAGE_USER,
        items: [
            {
                title: getFormattedMessage('users.title'),
                to: '/app/users'
            },
        ],
    },
    {
        title: 'suppliers.title',
        name: "suppliers",
        fontIcon: <FontAwesomeIcon icon={faTruck}/>,
        to: '/app/suppliers',
        class: 'd-flex',
        permission: Permissions.MANAGE_SUPPLIERS,
        items: [
            {
                title: getFormattedMessage('suppliers.title'),
                to: '/app/suppliers'
            },
        ],
    },
    {
        title: 'customers.title',
        name: "customers",
        fontIcon: <FontAwesomeIcon icon={faUserGroup}/>,
        to: '/app/customers',
        class: 'd-flex',
        permission: Permissions.MANAGE_CUSTOMERS,
        items: [
            {
                title: getFormattedMessage('customers.title'),
                to: '/app/customers'
            },
        ],
    },
    {
        title: 'warehouse.title',
        name: "warehouse",
        fontIcon: <FontAwesomeIcon icon={faHome}/>,
        to: '/app/warehouse',
        class: 'd-flex',
        permission: Permissions.MANAGE_WAREHOUSES,
        items: [
            {
                title: getFormattedMessage('warehouse.title'),
                to: '/app/warehouse'
            },
        ],
    },
    {
        title: 'products.title',
        name: "products",
        fontIcon: <FontAwesomeIcon icon={faBoxes}/>,
        to: '/app/products',
        class: 'd-flex',
        permission: Permissions.MANAGE_PRODUCTS,
        items: [
            {
                title: getFormattedMessage('products.title'),
                to: '/app/products'
            }
        ],
    },
    {
        title: "adjustments.title",
        name: "adjustments",
        fontIcon: <FontAwesomeIcon icon={faMapLocation}/>,
        to: '/app/adjustments',
        class: 'd-flex',
        permission: Permissions.MANAGE_ADJUSTMENTS,
        items: [
            {
                title: getFormattedMessage("adjustments.title"),
                to: '/app/adjustments'
            }
        ],
    },
    {
        title: 'quotations.title',
        name: "quotations.title",
        fontIcon: <FontAwesomeIcon icon={faBasketShopping}/>,
        to: '/app/quotations',
        class: 'd-flex',
        permission: Permissions.MANAGE_QUOTATION,
        items: [
            {
                title: getFormattedMessage("quotations.title"),
                to: '/app/quotations'
            }
        ],
    },
    {
        title: 'print.barcode.title',
        name: "print barcode",
        fontIcon: <FontAwesomeIcon icon={faPrint}/>,
        to: '/app/print/barcode',
        class: 'd-flex',
        permission: Permissions.MANAGE_PRODUCTS,
        items: [
            {
                title: getFormattedMessage('print.barcode.title'),
                to: '/app/print/barcode'
            },
        ],
    },
    {
        title: 'brands.title',
        name: "brands",
        fontIcon: <FontAwesomeIcon icon={faBookmark}/>,
        to: '/app/brands',
        path: '/app/create-brand',
        class: 'd-flex',
        permission: Permissions.MANAGE_BRANDS,
        items: [
            {
                title: getFormattedMessage('brands.title'),
                to: '/app/brands'
            },
        ],
    },
    {
        title: 'product.categories.title',
        name: "product categories",
        fontIcon: <FontAwesomeIcon icon={faBoxOpen}/>,
        to: '/app/product-categories',
        class: 'd-flex',
        permission: Permissions.MANAGE_PRODUCT_CATEGORIES,
        items: [
            {
                title: getFormattedMessage('product.categories.title'),
                to: '/app/product-categories'
            }
        ],
    },
    {
        title: 'expense.categories.title',
        name: "expense categories",
        fontIcon: <FontAwesomeIcon icon={faMoneyCheckDollar}/>,
        class: 'd-flex',
        permission: Permissions.MANAGE_EXPENSES_CATEGORIES,
        to: '/app/expense-categories',
        items: [
            {
                title: getFormattedMessage('expense.categories.title'),
                to: '/app/expense-categories',
            }
        ]
    },
    {
        title: 'expenses.title',
        name: "expenses",
        fontIcon: <FontAwesomeIcon icon={faMoneyBills}/>,
        to: '/app/expenses',
        class: 'd-flex',
        permission: Permissions.MANAGE_EXPENSES,
        items: [
            {
                title: getFormattedMessage('expenses.title'),
                to: '/app/expenses'
            }
        ]
    },
    {
        title: 'roles.permissions.title',
        name: "roles",
        fontIcon: <ShieldLock/>,
        to: '/app/roles',
        class: 'd-flex',
        permission: Permissions.MANAGE_ROLES,
        items: [
            {
                title: getFormattedMessage('roles.title'),
                to: '/app/roles'
            }
        ],
    },
    {
        title: 'units.title',
        name: "units",
        fontIcon: <FontAwesomeIcon icon={faQuoteRight}/>,
        to: '/app/units',
        class: 'd-flex',
        permission: Permissions.MANAGE_UNITS,
        items: [
            {
                title: getFormattedMessage('units.title'),
                to: '/app/units'
            }
        ],
    },
    {
        title: 'currencies.title',
        name: "currencies",
        fontIcon: <FontAwesomeIcon icon={faDollarSign}/>,
        to: '/app/currencies',
        class: 'd-flex',
        permission: Permissions.MANAGE_CURRENCY,
        items: [
            {
                title: getFormattedMessage('currencies.title'),
                to: '/app/currencies'
            },
        ],
    },
    {
        title: "transfers.title",
        name: "transfers",
        fontIcon: <FontAwesomeIcon icon={faMapLocation}/>,
        to: '/app/transfers',
        class: 'd-flex',
        permission: Permissions.MANAGE_TRANSFERS,
        items: [
            {
                title: getFormattedMessage("transfers.title"),
                to: '/app/transfers'
            }
        ],
    },
    {
        title: 'purchases.title',
        name: "purchases",
        fontIcon: <FontAwesomeIcon icon={faReceipt}/>,
        to: '/app/purchases',
        class: 'd-flex',
        permission: Permissions.MANAGE_PURCHASE,
        items: [
            {
                title: getFormattedMessage('purchases.title'),
                to: '/app/purchases'
            },
        ],
    },
    {
        title: 'purchases.return.title',
        name: "purchases return",
        fontIcon: <FontAwesomeIcon icon={faArrowLeft}/>,
        to: '/app/purchase-return',
        class: 'd-flex',
        permission: Permissions.MANAGE_PURCHASE_RETURN,
        items: [
            {
                title: getFormattedMessage('purchases.return.title'),
                to: '/app/purchase-return'
            },
        ],
    },
    {
        title: 'sales.title',
        name: "sales",
        fontIcon: <FontAwesomeIcon icon={faCartShopping}/>,
        to: '/app/sales',
        class: 'd-flex',
        permission: Permissions.MANAGE_SALE,
        items: [
            {
                title: getFormattedMessage('sales.title'),
                to: '/app/sales'
            },
        ],
    },
    {
        title: 'sales-return.title',
        name: "sales return",
        fontIcon: <FontAwesomeIcon icon={faArrowRight}/>,
        to: '/app/sale-return',
        class: 'd-flex',
        permission: Permissions.MANAGE_SALE_RETURN,
        items: [
            {
                title: getFormattedMessage('sales-return.title'),
                to: '/app/sale-return'
            },
        ],
    },
    {
        title: "reports.title",
        name: "reports",
        fontIcon: <FontAwesomeIcon icon={faChartColumn}/>,
        to: '/app/report/report-warehouse',
        path: '/app/report/report-sale',
        stockPath: '/app/report/report-stock',
        purchasePath: '/app/report/report-purchase',
        topSellingPath: '/app/report/report-top-selling-products',
        stockDetailPath: '/app/report/report-detail-stock',
        productQuantityAlertPath: '/app/report/report-product-quantity',
        supplierReportPath: '/app/report/suppliers',
        supplierReportDetailsPath: '/app/report/suppliers/details',
        class: 'd-flex',
        isSamePrefix: 'true',
        permission: Permissions.MANAGE_REPORTS,
        items: [
            {
                title: getFormattedMessage('warehouse.reports.title'),
                to: '/app/report/report-warehouse'
            },
            {
                title: getFormattedMessage('sale.reports.title'),
                to: '/app/report/report-sale'
            },
            {
                title: getFormattedMessage('stock.reports.title'),
                to: '/app/report/report-stock',
                detail: '/app/report/report-detail-stock'
            },
            {
                title: getFormattedMessage('purchase.reports.title'),
                to: '/app/report/report-purchase'
            },
            {
                title: getFormattedMessage('top-selling-product.reports.title'),
                to: '/app/report/report-top-selling-products'
            },
            {
                title: getFormattedMessage("product.quantity.alert.reports.title"),
                to: '/app/report/report-product-quantity',
            },
            // {
            //     title: "Supplier Report",
            //     to: '/app/report/suppliers',
            // },
            {
                title: getFormattedMessage("supplier.report.title"),
                to: '/app/report/suppliers',
                detail: '/app/report/suppliers/details'
            },
        ],
    },
    {
        to: '/app/pos',
        class: 'd-none',
        name:"pos",
        title: "header.pos.title",
        permission: Permissions.MANAGE_POS_SCREEN,
    },
    {
        title: "email-template.title",
        name: "email-templates",
        fontIcon: <FontAwesomeIcon icon={faEnvelope}/>,
        to: '/app/email-templates',
        class: 'd-flex',
        permission: Permissions.MANAGE_EMAIL_TEMPLATES,
        items: [
            {
                title: getFormattedMessage('email-template.title'),
                to: '/app/email-templates'
            },
        ],
    },
    {
        title: 'settings.title',
        name: "settings",
        fontIcon: <FontAwesomeIcon icon={faGear}/>,
        to: '/app/settings',
        prefixesPath: '/app/prefixes',
        class: 'd-flex',
        isSamePrefix: 'true',
        permission: Permissions.MANAGE_SETTING,
        items: [
            {
                title: getFormattedMessage('settings.title'),
                to: '/app/settings'
            },
            {
                title: 'Prefixes',
                to: '/app/prefixes'
            },
        ],
    },
];
