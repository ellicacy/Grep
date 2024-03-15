import {configureStore} from '@reduxjs/toolkit';

import prestationReducer from './prestationSlice';
import {prestationsFetch} from './prestationSlice';
import prestataireReducer from './prestataireSlice';
import {prestatairesFetch} from './prestataireSlice';
import categoriesReducer from './categorieSlice';
import { categoriesFetch } from './categorieSlice';
import panierReducer from './panierSlice';
import packReducer from './packSlice';

import storage from 'redux-persist/lib/storage';
// import storage from 'redux-persist/es/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, panierReducer)

export const store = configureStore({
    reducer: {
        panier: persistedReducer,
        prestations: prestationReducer,
        prestataires: prestataireReducer,
        categories: categoriesReducer,
        pack: packReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

async function fetchInitialData() {
    await store.dispatch(categoriesFetch());
    await store.dispatch(prestationsFetch());
    await store.dispatch(prestatairesFetch());
}

fetchInitialData();

export const persistor = persistStore(store);