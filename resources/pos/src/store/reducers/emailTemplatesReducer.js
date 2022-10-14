import {emailTemplatesActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case emailTemplatesActionType.FETCH_EMAIL_TEMPLATES:
            return action.payload;
        case emailTemplatesActionType.FETCH_EMAIL_TEMPLATE:
            return [action.payload];
        // case brandsActionType.ADD_BRANDS:
        //     return [...state, action.payload];
        // case brandsActionType.EDIT_BRANDS:
        //     return state.map(item => item.id === +action.payload.id ? action.payload : item);
        // case brandsActionType.DELETE_BRANDS:
        //     return state.filter(item => item.id !== action.payload);
        // case brandsActionType.FETCH_ALL_BRANDS:
        //     return action.payload;
        default:
            return state;
    }
};
