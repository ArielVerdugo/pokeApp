import { pokeApi } from "../../config/api/pokeApi";
import { Pokemon } from "../../domain/entities/pokemon";
import { PokeAPIPaginatedResponse, PokeAPIPokemon } from "../../infrastructure/interfaces/pokeApi.interface";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";


export const getPokemons = async (page: number, limit: number = 20): Promise<Pokemon[]> => {

    console.log(page* 20);
    try{
        // offset cantidad de pokemones que quiero, por eso hago la pagina * 20. EJ: primero 1*20, después 2*20, despues 3*20.
        const url = `pokemon?offset=${ page * 20 }`;
        const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

        const pokePromises = data.results.map( (info) => {
            return  pokeApi.get<PokeAPIPokemon>(info.url);
        });

        const pokeApiPokemons = await Promise.all(pokePromises);
        
        const pokemonsPromises = pokeApiPokemons.map( (item) => PokemonMapper.pokeApiPokemonToEntity(item.data));

        return await Promise.all(pokemonsPromises);
        
    } catch (error) {
        throw new Error('Error getting pokemons');
    }
}