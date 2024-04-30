import { FAB, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { getPokemons } from "../../../actions/pokemon/get-pokemons";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { PokeballBg } from "../../components/ui/PokeballBg";
import { FlatList } from "react-native-gesture-handler";
import { globalTheme } from "../../../config/theme/global-theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pokemon } from "../../../domain/entities/pokemon";
import { PokemonCard } from "../../components/pokemons/PokemonCard";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../routes/StackNavigator";


interface Porps extends StackScreenProps<RootStackParams, 'HomeScreen'>{};


export const HomeScreen = ({ navigation } : Porps) => {

    const { top } = useSafeAreaInsets();

    const { colors } = useTheme();

    /*const { isError, isLoading, data: pokemons } = useQuery({
        queryKey: ['pokemons'],
        queryFn: () => getPokemons(0),
        staleTime: 1000 * 60 * 60, // fresca por 60 min
    })*/

    const { isError, isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['pokemons','infinite'],
        initialPageParam: 0,
        queryFn: ( params ) => getPokemons(params.pageParam),
        getNextPageParam: (lastPage, pages) => pages.length ,
        staleTime: 1000 * 60 * 60, // fresca por 60 min
    })


    return (
        <View style={globalTheme.globalMargin}>
            <PokeballBg style={ styles.imgPosition }/>

            <FlatList
                data={ data?.pages.flat() ?? [] } 
                keyExtractor={ (pokemon,index) => `${pokemon.id}-${index}`}
                numColumns={ 2 }
                ListHeaderComponent={ () => (
                    <Text variant="displayMedium">Pokedex</Text>
                )}
                style= {{ paddingTop: top + 20 }}
                renderItem={ ({ item }) => (
                    <PokemonCard pokemon={item} />
                ) }
                onEndReachedThreshold={ 0.6 }
                onEndReached={ () => fetchNextPage() }
                showsVerticalScrollIndicator={ false }
            />
            <FAB
                label="Buscar"
                style={[ globalTheme.fab, { backgroundColor: colors.primary } ]}
                mode="elevated"
                color={ colors.background }
                onPress={ () => navigation.push('SearchScreen')}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100
    }
})