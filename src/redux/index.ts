import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import pokemonsReducer from "./pokemonsSlice";
import { AppDispatch, RootState } from "../types/store";

const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
  },
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
