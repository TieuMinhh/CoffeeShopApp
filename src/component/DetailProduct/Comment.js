import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

class CommentSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            comment: '',
        };
    }

    handleNewComment = () => {
        const { comment } = this.state;
        this.props.binhLuan(comment)
        this.props.handleThemComment()
    };

    render() {
        const { comment } = this.state;
        return (
            <View>
                {/* {comments.map((comment, index) => (
                    <Text key={index}>{comment}</Text>
                ))} */}
                <TextInput
                    value={comment}
                    onChangeText={(text) => this.setState({ comment: text })}
                    placeholder="Type your comment here"
                    style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }}
                />
                <Button title="Gui" onPress={() => this.handleNewComment()} />
            </View>
        );
    }
}

export default CommentSection;