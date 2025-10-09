import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; //tivemos que abaixar e importa para  fazer o degrade de fundo
import { useNavigation } from '@react-navigation/native';

export default function TelaInicial() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#4da0b0', '#d39d38']} // Ajuste as cores do degradê
      start={{ x: 0, y: 0 }} // Ponto inicial do degradê
      end={{ x: 1, y: 1 }} // Ponto final do degradê
      style={styles.container}
    >
      {/* LOGO DE FUNDO */}
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      
      {/* Botões */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('jogo')}>
        <Text style={styles.buttonText}>INICIAR JOGO</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('regras')}
      >
        <Text style={styles.buttonText}>COMO JOGAR</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  logo: {
    width: 850, 
    height: 400, 
    marginLeft: 100, 
    marginBottom: 0, 
    resizeMode: 'contain', // Mantém a proporção da imagem
  },
  button: {
    width: 200,
    paddingVertical: 15,
    backgroundColor: '#EEDFC2', 
    borderRadius: 40, 
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#8B4513',
  },
  buttonText: {
    color: '#2E5825', 
    fontSize: 20,
    fontWeight: 'bold',
  },
});