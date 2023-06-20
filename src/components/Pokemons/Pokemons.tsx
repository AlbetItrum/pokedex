import { ChangeEvent, useState } from "react";
import { Input, Pagination, Tag } from "antd";
import { useAppSelector, useAppDispatch } from "../../redux";
import {
  changePageSize,
  changePaginationPage,
  fetchPokemons,
  selectIsLoading,
  selectPagination,
  selectPokemons,
  selectTypes,
} from "../../redux/pokemonsSlice";
import { Pokemon as PokemonI, PokemonsPagination } from "../../types/pokemons";
import { Pokemon } from "../Pokemon/Pokemon";
const { CheckableTag } = Tag;

import styles from "./Pokemons.module.scss";

export const Pokemons = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { count, pageSize, current } = useAppSelector(
    selectPagination
  ) as PokemonsPagination;
  const pokemons = useAppSelector(selectPokemons);
  const types = useAppSelector(selectTypes);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const onPaginationChange = (page: number, size: number) => {
    dispatch(changePaginationPage(page));
    dispatch(changePageSize(size));
    dispatch(fetchPokemons({ offset: page * 10 - 10, pageSize: size }));
  };

  const onSearchChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setSearchValue(value);

  const searchPokemons = ({ name, types }: PokemonI) => {
    const nestedTypes = types.map(({ type: { name } }) => name);

    if (!selectedTags.length) {
      return name.includes(searchValue);
    }

    return (
      name.includes(searchValue) &&
      selectedTags.some((tag) => nestedTypes.includes(tag))
    );
  };

  const handleSelectTag = (tag: string, checked: boolean) => {
    setSelectedTags((prevState) =>
      checked ? [...prevState, tag] : prevState.filter((t) => t !== tag)
    );
  };

  return (
    <>
      <Input
        className={styles.search}
        placeholder="Search pokemons"
        onChange={onSearchChange}
        value={searchValue}
      />
      <div className={styles.tags}>
        {types.map(({ name }) => (
          <CheckableTag
            key={name}
            checked={selectedTags.includes(name)}
            onChange={(checked) => handleSelectTag(name, checked)}
          >
            {name}
          </CheckableTag>
        ))}
      </div>
      <div className={styles.wrapper}>
        {isLoading
          ? "...loading"
          : pokemons
              .filter(searchPokemons)
              .map((pokemon) => <Pokemon key={pokemon.id} {...pokemon} />)}
      </div>
      <Pagination
        className={styles.pagination}
        total={count}
        pageSize={pageSize}
        current={current}
        pageSizeOptions={[10, 20, 50]}
        onChange={onPaginationChange}
      />
    </>
  );
};
