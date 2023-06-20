import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PokemonsState, PokemonsPagination, Pokemon } from "../types/pokemons";
import { RootState } from "../types/store";
import { getPagination, getPokemon, getTypes } from "../api";

const initialState: PokemonsState = {
  pagination: { pageSize: 10, current: 1 },
  pokemons: [],
  isLoading: false,
  types: [],
};

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchPagination",
  async ({
    url,
    pageSize = 10,
    offset = 0,
  }: {
    url?: string;
    pageSize?: number;
    offset?: number;
  }) => {
    const promiseArray: Array<Promise<{ data: Pokemon }>> = [];
    const {
      data,
      data: { results },
    }: { data: PokemonsPagination } = await getPagination(
      url,
      pageSize,
      offset
    );

    results.forEach(({ url }) => {
      promiseArray.push(getPokemon(url));
    });

    const pokemonsResponse = await Promise.all(promiseArray);

    return {
      pagination: data,
      pokemons: pokemonsResponse.map(({ data }) => data),
    };
  }
);

export const fetchTypes = createAsyncThunk("pokemons/fetchTypes", async () => {
  const {
    data: { results },
  } = await getTypes();
  return results;
});

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    changePaginationPage(state, { payload }) {
      state.pagination.current = payload;
    },
    changePageSize(state, { payload }) {
      state.pagination.pageSize = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemons.fulfilled,
      (
        state,
        {
          payload: { pagination, pokemons },
        }: { payload: { pagination: PokemonsPagination; pokemons: Pokemon[] } }
      ) => {
        state.pagination = { ...state.pagination, ...pagination };
        state.pokemons = pokemons;
        state.isLoading = false;
      }
    );
    builder.addCase(fetchPokemons.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTypes.fulfilled, (state, { payload }) => {
      state.types = payload;
    });
  },
});

export const { changePaginationPage, changePageSize } = pokemonsSlice.actions;

export const selectPagination = (state: RootState) => state.pokemons.pagination;

export const selectPokemons = (state: RootState) => state.pokemons.pokemons;

export const selectIsLoading = (state: RootState) => state.pokemons.isLoading;

export const selectTypes = (state: RootState) => state.pokemons.types;

export default pokemonsSlice.reducer;
