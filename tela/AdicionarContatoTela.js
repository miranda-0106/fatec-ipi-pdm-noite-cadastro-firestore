import React, { useEffect, useState } from 'react';

import { 
  StyleSheet,
  Button,
  Text,
  TextInput,
  View, 
  FlatList,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';

//import ENV from './env';
import * as firebase from 'firebase';
import 'firebase/firestore';

//import { Picker } from '@react-native-picker/picker';
//import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';

const AdicionarContatoTela = (props) => {

  /*if (!firebase.apps.length)
  firebase.initializeApp(ENV);

  const db = firebase.firestore();*/

  const [nome, setNome] = useState ('');
  const [telefone, setTelefone] = useState ('');
  const [contatos, setContatos] = useState([]);
  const [fotoURI, setFotoURI] = useState();

  const tirarFoto = async () => {
    let foto = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      base64: true
    })
    console.log(foto);
    setFotoURI(foto.uri);
  }

  /*useEffect(() => {
    db.collection('contatos').onSnapshot((snapShot) => {
      let aux = [];
      snapShot.forEach (doc => {
        aux.push({
          nome: doc.data().nome,
		      telefone: doc.data().telefone,
          data: doc.data().data,
          chave: doc.id
        })
      })
      setContatos(aux);
    })
  }, [ ]);*/

  const capturarNome = (nome) => {
    setNome(nome);
  }

  const capturarTelefone = (telefone) => {
    setTelefone(telefone);
  }

  const adicionarContato = () => {
    db.collection('contatos').add({
      nome: nome,
	    telefone: telefone,
      data: new Date()
    })
    setNome('');
    setTelefone('');
  }

  /*const removerContato = (chave) => {
    Alert.alert(
      'Apagar?',
      'Quer mesmo apagar esse contato?',
      [
        {text: 'Cancelar'},
        {text: "Confirmar", onPress: () => db.collection('contatos').doc(chave).delete() }
      ]
    );
  }*/
  
 //A versão com alerta não funciona no navegador web. 

  /*const removerContato = (chave) => {
    db.collection('contatos').doc(chave).delete();
    }
  */
 
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.entrada}
        placeholder="Digite o nome do contato"
        onChangeText={capturarNome}
        value={nome}
      />
      <TextInput
        style={styles.entrada}
        placeholder="Digite o telefone do contato"
        onChangeText={capturarTelefone}
        value={telefone}
      />
      <View
        style={styles.botao}>
        <Button 
          title="Selecionar foto"
          onPress={()=>tirarFoto()}
        />
      </View>
      <View style={styles.botao}>
        <Button 
          title="Ok"
          onPress={adicionarContato}
        />
      </View>
      {/*<FlatList
        style={{ marginTop: 8 }}
        data={contatos}
        renderItem={contato => (
          <TouchableOpacity onLongPress={() => removerContato(contato.item.chave) }>
          <View style={styles.itemNaLista}>
            <Text>{contato.item.nome}</Text>
            <Text>{contato.item.telefone}</Text>
            <Text>{contato.item.data.toDate().toLocaleString()}</Text>
          </View>
          </TouchableOpacity>
        )}
        /> */}
    </View> 
  );
}

const styles = StyleSheet.create({
  itemNaLista: {
    margimBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12
  },
  container: {
    padding: 40,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  entrada: {
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    fontSize: 14,
    textAlign: 'center',
    width: '80%',
    margimBottom: 12,
    padding: 12
  },
  botao: {
    width: '80%',
    padding: 12
  }
});

export default AdicionarContatoTela;