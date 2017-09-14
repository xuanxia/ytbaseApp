import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    Modal,
    Dimensions,
    ToastAndroid,
    PixelRatio,
    Platform
} from 'react-native'
const { width, height } = Dimensions.get('window');
import {mockData} from '../../../base/utils';
const global = mockData.global;
let mwidth = 140;
let mheight = 200;
const bgColor = global.titleBackgroundColor;
const top = (Platform.OS == 'ios'?70:50); // ios 70 安卓50

export default class MenuModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: this.props.show,
        };
        mwidth = this.props.width;
        mheight = this.props.height;

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isVisible: nextProps.show });
    }

    closeModal() {
        this.setState({
            isVisible: false
        });
        this.props.closeModal(false);
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    visible={this.state.isVisible}
                    animationType={'fade'}
                    onRequestClose={() => this.closeModal()}>
                    <TouchableOpacity style={styles.container} onPress={() => this.closeModal()}>
                        <View style={styles.modal}>
                            {
                                this.props.menuData &&
                                this.props.menuData.map((item,index)=>{
                                    return(
                                        <TouchableOpacity key={index} activeOpacity={0.3} onPress={this.handlePopMenuItemClick.bind(this,item)} style={styles.itemView}>
                                            <Image style={styles.imgStyle} source={item.icon} />
                                            <Text style={styles.textStyle}>{item.text}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }

    handlePopMenuItemClick (item) {
      item.handleClick && item.handleClick();
      this.closeModal();
    }
}
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
    },
    modal: {
        backgroundColor: bgColor,
        width: mwidth,
        height: mheight,
        position: 'absolute',
        left: width - mwidth - 10,
        top: top,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        width: mwidth,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 8,
    },
    textStyle: {
        color: '#fff',
        fontSize: 15,
        marginLeft: 5,
    },
    imgStyle: {
        width: 30,
        height: 30,
    }
});
