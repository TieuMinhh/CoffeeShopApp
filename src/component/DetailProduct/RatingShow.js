import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

class RatingShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
        };
    }

    componentDidMount() {
        this.setState({
            rating: this.props.soSao
        })
    }
    handleRating = (value) => {
        this.props.danhGia(value)
        this.setState({ rating: value });
    };

    render() {
        const { rating } = this.state;
        return (
            <View style={{ flexDirection: 'row' }}>

                <AntDesign name={rating >= 1 ? 'star' : 'staro'} size={24} color="#fbbc04" />


                <AntDesign name={rating >= 2 ? 'star' : 'staro'} size={24} color="#fbbc04" />


                <AntDesign name={rating >= 3 ? 'star' : 'staro'} size={24} color="#fbbc04" />


                <AntDesign name={rating >= 4 ? 'star' : 'staro'} size={24} color="#fbbc04" />


                <AntDesign name={rating >= 5 ? 'star' : 'staro'} size={24} color="#fbbc04" />

                <Text style={{ marginLeft: 10 }}>{rating}/5</Text>
            </View>
        );
    }
}

export default RatingShow;
