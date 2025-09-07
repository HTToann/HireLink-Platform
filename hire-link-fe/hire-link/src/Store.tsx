import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import storageSession from 'redux-persist/lib/storage/session';
import userReducer from './Slices/UserSlice';
import profileReducer from './Slices/ProfileSlice';
import filterReducer from './Slices/FilterSlice';
import sortReducer from './Slices/SortSlice';
import tokenReducer from './Slices/JwtSlice';

// Cấu hình redux-persist
const persistConfig = {
    key: 'root',
    storage,
};

// ✅ Tách reducer gốc (chưa reset)
const appReducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    filter: filterReducer,
    sort: sortReducer,
    token: tokenReducer,
});

// ✅ Thêm logic reset toàn bộ state khi LOGOUT
const rootReducer = (state: any, action: any) => {
    if (action.type === 'LOGOUT') {
        return undefined;
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Tạo store với middleware mặc định
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // tắt warning khi dùng redux-persist
        }),
});

// ✅ Tạo persistor để sử dụng purge khi logout
export const persistor = persistStore(store);
