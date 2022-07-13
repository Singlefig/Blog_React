export const userReducer = (state: any, action: { type: String, payload: any }) => {
    switch (action.type) {
        case 'login':
            return { ...action.payload };
        case 'register':
            return { ...action.payload };
        case 'articles':
            return { ...action.payload };
        default:
            return state;
    }
};
