import { FlatList, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { globalTheme } from "../../../config/theme/global-theme";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { Pokemon } from "../../../domain/entities/pokemon";
import { PokemonCard } from "../../components/pokemons/PokemonCard";


export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();

    return (
        <View style={ [globalTheme.globalMargin, { paddingTop: top + 10 } ] }>
            <TextInput
                placeholder="Buscar Pokemon"
                mode="flat"
                autoFocus
                autoCorrect={false}
                onChangeText={ value => console.log(value) }
                value={''}
            />

            <ActivityIndicator style={{ paddingTop:20 }} />

            <FlatList
                data={ [] as Pokemon[] } 
                keyExtractor={ (pokemon,index) => `${pokemon.id}-${index}`}
                numColumns={ 2 }
                style= {{ paddingTop: top + 20 }}
                renderItem={ ({ item }) => (
                    <PokemonCard pokemon={item} />
                ) }
                onEndReachedThreshold={ 0.6 }
                showsVerticalScrollIndicator={ false }
            />
        </View>
    )
}