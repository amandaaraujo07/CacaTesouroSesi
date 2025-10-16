import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function Instrucao1() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#4da0b0', '#d39d38']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Caixa de texto */}
      <View style={styles.textBox}>
        <Text style={styles.text}>
          Vamos começar nossa jornada no portão da escola. Ouça com atenção as pistas, elas irão revelar o caminho secreto para o próximo destino. Mantenha os olhos atentos às coordenadas — um verdadeiro aventureiro nunca se perde! Use sua câmera para marcar o checkpoint mágico e, assim, desbloquear as próximas instruções da missão.
        </Text>
      </View>

      {/* Botões */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.arrowButton} disabled>
          <Text style={styles.arrow}
          onPress={() => navigation.navigate('1next')}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('checkpoint1')}
        >
          <Text style={styles.nextText}>NEXT</Text>
        </TouchableOpacity>
      </View>

      {/* Personagem */}
      <Image
        source={require('../../assets/images/menina.png')} 
        style={styles.image}
        resizeMode="contain"
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },

  textBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
    elevation: 5,
  },

  text: {
    fontSize: 16,
    color: 'black',
    lineHeight: 22,
  },

  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    justifyContent: 'flex-start', // alinha à esquerda
    gap: 10,
    paddingLeft: 10, // adiciona um pouco de espaço à esquerda
  },

  arrowButton: {
    marginRight: 0,
  },

  arrow: {
    fontSize: 32,
    color: '#444',
  },

  nextButton: {
    backgroundColor: '#EEDFC2',
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#8B4513',
    paddingHorizontal: 35,
    paddingVertical: 8,
    marginLeft: 0,
  },
  
  nextText: {
    color: '#2E5825',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  image: {
    width: 600,
    height: 600,
    bottom: 0,
    marginLeft: 90,
  },
});
