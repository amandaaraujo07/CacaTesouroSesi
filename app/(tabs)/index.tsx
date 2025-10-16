import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useAudio } from '../AudioProvider';

export default function TelaInicial() {
  const navigation = useNavigation();
  const { play, stop } = useAudio();

  useEffect(() => {
    play();
    return () => {
      stop();
    };
  }, []);

  return (
    <LinearGradient
      colors={['#4da0b0', '#d39d38']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('1next')}>
        <Text style={styles.buttonText}>INICIAR JOGO</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('regras')}>
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
    resizeMode: 'contain',
  },
  button: {
    width: 200,
    paddingVertical: 15,
    backgroundColor: '#EEDFC2',
    borderRadius: 40,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#8B4513',
  },
  buttonText: {
    color: '#2E5825',
    fontSize: 20,
    fontWeight: 'bold',
  },
});