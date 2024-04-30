import { useContext } from "react";
import { Image, ImageStyle, StyleProp } from "react-native"
import { ThemeContext } from "../../context/ThemeContext";


interface Props {
    style?: StyleProp<ImageStyle>;
}

export const PokeballBg = ( { style } : Props ) => {
    
    const { isDark } = useContext( ThemeContext );
    
    const pokeballImg = isDark
    ? require('../../../assests/pokeball-light.png')
    : require('../../../assests/pokeball-dark.png')

    return (
        <Image
            source={ pokeballImg }
            style={[
                style,
                {
                    width: 300,
                    height: 300,
                    opacity: 0.3
                }
            ]}
        />
    )
}