export const userReducer = (state: any, action: { type: String, payload: any }) => {
    switch (action.type) {
        case 'login':
            console.log(state, action);
            return { ...state, ...action.payload };
        case 'register':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
