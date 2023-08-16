import React from 'react'
import { View,Text,SafeAreaView, TouchableOpacity,Image, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import Colors from '../theme/Colors'

const propTypes = {
    main: PropTypes.bool
}

const defaultProps = {
    main: false
}

class Navbar extends React.PureComponent {
    render() {
        const {navigation,main} = this.props
        return (
            <SafeAreaView>
                {main ? (
                <View style={styles.mainNav}>
                    <Image 
                        source={require('../assets/images/movies.png')}
                        style={styles.logo}
                    />
                    <TouchableOpacity onPress={() => {navigation.navigate('Search')}}>
                        <Icon name={'search-outline'} size={30} color={Colors.white} />
                    </TouchableOpacity>
                </View>
                
                ) : (

                <View>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Icon name={'chevron-back'} size={40} color={Colors.white} />
                    </TouchableOpacity>
                </View>
                )}
                
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50
    },
    mainNav: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    }
})

Navbar.propTypes = propTypes
Navbar.defaultProps = defaultProps

export default Navbar;