import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

class Rating extends React.Component {
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
                <TouchableOpacity onPress={() => this.handleRating(1)}>
                    <AntDesign name={rating >= 1 ? 'star' : 'staro'} size={24} color="#fbbc04" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleRating(2)}>
                    <AntDesign name={rating >= 2 ? 'star' : 'staro'} size={24} color="#fbbc04" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleRating(3)}>
                    <AntDesign name={rating >= 3 ? 'star' : 'staro'} size={24} color="#fbbc04" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleRating(4)}>
                    <AntDesign name={rating >= 4 ? 'star' : 'staro'} size={24} color="#fbbc04" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleRating(5)}>
                    <AntDesign name={rating >= 5 ? 'star' : 'staro'} size={24} color="#fbbc04" />
                </TouchableOpacity>
                <Text style={{ marginLeft: 10 }}>{rating}/5</Text>
            </View>
        );
    }
}

export default Rating;
