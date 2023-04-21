import { AsyncStorage } from 'react-native'

const saveToken = async (token) => {
    console.log('Check token save:', token);
    await AsyncStorage.setItem('@token', token)
    let token1 = await AsyncStorage.getItem('@token')
    // let value = JSON.parse(token)
    console.log('token Phong va value ne: ', token1);
}

export default saveToken