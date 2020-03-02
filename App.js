import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Button,
  Alert,
  Image,
  Text,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-picker';
import RNTesseractOcr from 'react-native-tesseract-ocr';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.launchCamera = this.launchCamera.bind(this);
    this.launchImageLibrary = this.launchImageLibrary.bind(this);
    this.serializeImage = this.serializeImage.bind(this);
  }

  state = {
    sourceImage: '',
    sourceImageToRenderize: '',
    renderizeImageButton: false,
    ocrResult: '',
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        //.log('response', JSON.stringify(response));
        /*this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });*/
        //this.serializeImage(source.uri);
        this.setState({
          sourceImage: response.uri,
          renderizeImageButton: true,
          sourceImageToRenderize: source.uri,
        });
      }
    });
  };

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        //console.log('response', JSON.stringify(response));
        /*this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });*/
        //this.serializeImage(response.path);
        this.setState({
          sourceImage: response.uri,
          renderizeImageButton: true,
          sourceImageToRenderize: response.path,
        });
      }
    });
  };

  serializeImage(imgPath) {
    const tessOptions = {
      whitelist: null,
      blacklist: null,
    };

    imgPath = this.state.sourceImageToRenderize;

    console.log('antes converter', imgPath);
    imgPath = imgPath.replace('content://com.ocrrn.provider/root/', '');
    console.log('depois converter', imgPath);

    const lang = 'LANG_PORTUGUESE';
    RNTesseractOcr.recognize(imgPath, lang, tessOptions)
      .then(result => {
        this.setState({ocrResult: result});
        console.log('OCR Result: ', result, 'fim result');
        this.setState({
          ocrResult: result,
        });
      })
      .catch(err => {
        Alert.alert(
          'Ocorreu um erro ao processar sua imagem. Por favor, verifique sua imagem e tente novamente',
        );
      })
      .done();
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <View style={styles.viewButton}>
            <Button title="Carregar Foto" onPress={this.showActionSheet} />
            <View style={{backgroundColor: 'white', flex: 0.02}} />
            <Button
              disabled={!this.state.renderizeImageButton}
              title="Renderizar Imagem"
              onPress={this.serializeImage}
            />
            {!this.state.base64 && (
              <Image
                style={{width: 300, height: 300, alignSelf: 'center'}}
                source={{
                  uri: this.state.sourceImage,
                }}
              />
            )}

            {!this.state.base64 && (
              <>
                <View style={{backgroundColor: 'white', flex: 0.02}} />
                <Text>Text extraido</Text>
                <Text>{this.state.ocrResult}</Text>
              </>
            )}
          </View>

          <View>
            <ActionSheet
              ref={o => (this.ActionSheet = o)}
              title={'Escolha a fonte da foto'}
              options={['Câmera', 'Biblioteca', 'Cancel']}
              cancelButtonIndex={2}
              destructiveButtonIndex={4}
              onPress={index => {
                if (index === 0) this.launchCamera();
                else if (index === 1) this.launchImageLibrary();
              }}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  viewButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
});

export default App;
