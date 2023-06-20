import { useEffect } from "react";
import { useAppDispatch } from "./redux";
import { fetchPokemons, fetchTypes } from "./redux/pokemonsSlice";
import { Container, Pokemons } from "./components";

import "./App.css";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPokemons({}));
    dispatch(fetchTypes());
  }, [dispatch]);

  return (
    <Container>
      <Pokemons />
    </Container>
  );
}

export default App;
