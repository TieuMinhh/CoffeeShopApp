import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import Menu from './Menu';
import Shop from './Shop/Shop';
import Drawer from 'react-native-drawer';
import global from '../../global/global';
import getToken from '../../global/getToken'
import { checkToken } from '../api/userServices'
import SignUp from '../Authentication/SignUp';
import { connect } from 'react-redux';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.props.history(this.props.navigation)
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
            // ref={(ref) => this.drawer = ref}
            // content={<Menu navigation={navigation} />}
            // openDrawerOffset={0.5}//mở menu 0.4 màn hình
            // tapToClose={true}//bấm để ẩn menu
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

const mapStateToProps = (state) => {
    return {
        reduxState: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        product: (id_product) =>
            dispatch({ type: "id_product", payload: id_product }),
        history: (history) =>
            dispatch({ type: "history", payload: history }),
        arrGioHang: (arrGioHang) =>
            dispatch({ type: "arrCart", payload: arrGioHang })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);