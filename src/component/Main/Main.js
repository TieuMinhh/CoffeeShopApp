import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import Menu from './Menu';
import Shop from './Shop/Shop';
import Drawer from 'react-native-drawer';
import global from '../../global/global';
import getToken from '../../global/getToken'
import { checkToken } from '../api/userServices'
export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        console.log('Props component:', this.props);
        let token = await getToken()
        console.log('token Phong va value: ', token);
        let res = await checkToken(token)
        console.log('File MAin', res);
        global.onSignIn(res)
    }

    closeControlPanel = () => {
        this.drawer.close()
    };
    openControlPanel = () => {
        this.drawer.open()
    };

    render() {
        let { navigation } = this.props

        return (
            <Drawer
                ref={(ref) => this.drawer = ref}
                content={<Menu navigation={navigation} />}
                openDrawerOffset={0.5}//mở menu 0.4 màn hình
                tapToClose={true}//bấm để ẩn menu
            >
                {/* Home
                Cart
                Search
                Contact */}
                <Shop open={this.openControlPanel} navigation={navigation} />
            </Drawer>
        );
    }

}