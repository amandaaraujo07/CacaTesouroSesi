import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; //tivemos que abaixar e importa para fazer o degrade de fundo
import { ScrollView } from 'react-native-gesture-handler';

export default function Regras() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#4da0b0', '#d39d38']} 
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }} 
      style={styles.container} 
    >
      <ScrollView>
        <TouchableOpacity style={styles.flecha} onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>←</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Garante que o LinearGradient ocupe toda a tela
  },
  flecha: {
    margin: 10,
    padding: 10,
  },
  voltar: {
    fontSize: 30,
    color: 'black',
  },
});