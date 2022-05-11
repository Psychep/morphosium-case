import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { producsRef } from "../config/firebase";
import { addDoc, deleteDoc, doc } from "firebase/firestore";

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (_, { getState }) => {
    await addDoc(producsRef, getState().products.draftProducts);
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await deleteDoc(doc(producsRef, id));
  }
);
const initialState = {
  draftProducts: {
    Id: 1,
    Contract: 2018,
    Offer: "asdasdas",
    Data: 123123,
  },
  products: [],
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeDrafProdutcsId: (state, action) => {
      state.draftProducts.Id = action.payload;
    },
    changeDrafProdutcsContract: (state, action) => {
      state.draftProducts.Contract = action.payload;
    },
    changeDrafProdutcsOffer: (state, action) => {
      state.draftProducts.Offer = action.payload;
    },
    changeDrafProdutcsData: (state, action) => {
      state.draftProducts.Data = action.payload;
    },

    clearDraftProducts: (state) => {
      state.draftProducts = initialState.draftProducts;
    },
    setDraftProdutcs: (state, action) => {
      state.draftProducts = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});
export const {
  changeDrafProdutcsId,
  changeDrafProdutcsContract,
  changeDrafProdutcsOffer,
  changeDrafProdutcsData,
  addDraftProductData,
  clearDraftProducts,
  setDraftProdutcs,
  setProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
