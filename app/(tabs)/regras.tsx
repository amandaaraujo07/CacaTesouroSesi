import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function Regras() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#4da0b0', '#d39d38']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Botão de voltar */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

      
        <View style={styles.textBox}>
          {/* Instruções numeradas */}
          <View style={styles.item}>
            <Text style={styles.number}>1.</Text>
            <Text style={styles.text}>
              Após a leitura das instruções aperte NEXT para iniciar o jogo;            
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.number}>2.</Text>
            <Text style={styles.text}>
              A tela seguinte mostrará o local de início, com uma determinada distância a ser seguida, que é o ponto de partida para o primeiro checkpoint;
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.number}>3.</Text>
            <Text style={styles.text}>
              O jogador deverá escutar o áudio que apresentará as dicas e usar as informações de distância para se guiar até o local;
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.number}>4.</Text>
            <Text style={styles.text}>
              Ao chegar ao checkpoint, o jogador irá receber uma mensagem “Você chegou ao seu destino”, após essa validação o usuário poderá apertar no botão “Next” e seguir para a próxima fase;
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.number}>5.</Text>
            <Text style={styles.text}>
            Após a validação, novas coordenadas serão sugeridas, até o jogador chegar ao destino final;
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.number}>5.</Text>
            <Text style={styles.text}>
            No último checkpoint, o jogador deverá interpretar a dica e inserir o nome do última pista deseja. Após isso, o usuário receberá um uma tela de validação, confirmando que chegou ao final do jogo;            </Text>
          </View>

          {/* Observação */}
          <Text style={styles.obs}>
            Observação: caso o jogador saia do jogo antes de finalizá-lo, o progresso realizado não será salvo.
          </Text>

          {/* Título ELEMENTOS */}
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionText}>ELEMENTOS</Text>
          </View>

          {/* Lista de elementos */}
          <View style={styles.list}>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Áudio:</Text> Em cada etapa, haverá um áudio com a dica para descobrir a localização do
              próximo local. O jogador deve ouvir com atenção;
            </Text>

            <Text style={styles.listItem}>
              <Text style={styles.bold}>Distância:</Text> Distância:
              Será mostrada a distância em metros que o jogador está do Checkpoint atual;
            </Text>

            <Text style={styles.listItem}>
              <Text style={styles.bold}>Coordenadas:</Text> A latitude e a longitude será usado para ajudar o jogador a seguir no caminho certo, indicando a direção a ser seguida – melhorando a experiencia do jogador com a temática do jogo;
            </Text>

            <Text style={styles.listItem}>
              <Text style={styles.bold}>Checkpoint:</Text> Ponto físico no mapa real que o jogador precisa encontrar para validar a
              etapa;
            </Text>

            <Text style={styles.listItem}>
              <Text style={styles.bold}>Botão Next:</Text> Ao chegar no local, o jogador irá usar o botão para seguir para as próximas
              dicas e direção;
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backButton: {
    marginTop: 15,
    marginLeft: 15,
  },

  backText: {
    fontSize: 28,
    color: 'black',
  },

  scrollContainer: {
    flex: 1,
    marginTop: 10,
  },

  textBox: {
    backgroundColor: '#E7E7E7',
    margin: 20,
    borderRadius: 20,
    padding: 15,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },

  number: {
    backgroundColor: '#F9A825', // amarelo/laranja dos números
    color: 'black',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 8,
    fontSize: 16,
  },
  
  text: {
    flex: 1,
    color: 'black',
    fontSize: 15,
    lineHeight: 22,
  },

  obs: {
    fontSize: 15,
    color: 'black',
    marginTop: 5,
    marginBottom: 15,
    fontStyle: 'italic',
  },

  sectionTitle: {
    backgroundColor: '#F9A825',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    marginBottom: 8,
  },

  sectionText: {
    color: 'black',
    fontWeight: 'bold',
  },

  list: {
    marginLeft: 10,
  },

  listItem: {
    fontSize: 15,
    color: 'black',
    marginBottom: 8,
    lineHeight: 22,
  },

  bold: {
    fontWeight: 'bold',
  },
});
