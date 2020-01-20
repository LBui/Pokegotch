import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./App.css";

const GET_POKEMON_INFO = gql`
  {
    pokemons(first: 150) {
      id
      number
      name
      image
      evolutions {
        id
        number
        name
        image
      }
    }
  }
`;
//have to create functionality for user via oAuth and then add that on line 33
function App() {
  const { data, loading, error } = useQuery(GET_POKEMON_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>You messed up!</p>;

  return (
    <React.Fragment>
      <h1>Poke-Gotchi</h1>
      <h2>Pokemon meets Tomugotchi!</h2>
      <h2>Kenny's Poke-Gotchis:</h2>
      <div className='container'>
        {data &&
          data.pokemons &&
          data.pokemons.map((pokemon, index) => (
            <div key={index} className='card'>
              <img src={pokemon.image} />
              <div class='card-body'>
                <h3>{pokemon.name}</h3>
                <p>
                  {pokemon.evolutions && pokemon.evolutions.length !== 0 && (
                    <p>
                      {" "}
                      Evolutions:
                      {pokemon.evolutions.map((e, indx) => {
                        return <p key={indx}> {e.name} </p>;
                      })}
                    </p>
                  )}
                </p>
              </div>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
}

export default App;
