import React from "react";
import { TextField, Button } from "@mui/material";

import { SelectChangeEvent } from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProduct } from "../redux/productsSlice";
import { useProdutcListener } from "../config/firebase";
import {
  changeDrafProdutcsId,
  changeDrafProdutcsContract,
  changeDrafProdutcsOffer,
  changeDrafProdutcsData,
} from "../redux/productsSlice";

export default function FieldTable() {
  const id = useSelector((state) => state.auth.id);
  const contract = useSelector((state) => state.auth.contract);
  const offer = useSelector((state) => state.auth.offer);
  const data = useSelector((state) => state.auth.data);

  const handleIdChange = (e) => {
    dispatch(changeDrafProdutcsId(e.target.value));
  };
  const handleContractChange = (e) => {
    dispatch(changeDrafProdutcsContract(e.target.value));
  };
  const handleOfferChange = (e) => {
    dispatch(changeDrafProdutcsOffer(e.target.value));
  };
  const handleDataChange = (e) => {
    dispatch(changeDrafProdutcsData(e.target.value));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({ id, contract, offer, data }));
    console.log(id, contract, offer, data);
  };
  useProdutcListener();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <TextField
                id="outlined-basic"
                label="Id"
                variant="outlined"
                value={id}
                onChange={handleIdChange}
              />
            </td>
            <td>
              <TextField
                id="outlined-basic"
                label="Contract"
                variant="outlined"
                value={contract}
                onChange={handleContractChange}
              />
            </td>
            <td>
              <TextField
                id="outlined-basic"
                label="Offer"
                variant="outlined"
                value={offer}
                onChange={handleOfferChange}
              />
            </td>
            <td>
              <TextField
                id="outlined-basic"
                label="Data"
                variant="outlined"
                value={data}
                onChange={handleDataChange}
              />
            </td>
            <td>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Add
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
