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
              A tela seguinte mostrará o local de início, que é o ponto de partida para o primeiro checkpoint;
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.number}>3.</Text>
            <Text style={styles.text}>
              O jogador escuta o áudio que apresentará a dica e usa a informação da distância e da bússola para se guiar;
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.number}>4.</Text>
            <Text style={styles.text}>
              Ao chegar ao checkpoint, o jogador deverá validá-lo por meio de uma fotografia. Caso a foto esteja correta,
              o sistema permitirá o avanço para a próxima tela. Caso contrário, a captura e o envio da imagem não serão
              concluídos, impossibilitando a progressão e indicando que o jogador não se encontra no local correto;
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.number}>5.</Text>
            <Text style={styles.text}>
              Após a validação bem-sucedida, será exibida uma tela de confirmação. Nessa etapa, o jogador deverá
              selecionar a opção NEXT para receber a próxima instrução referente ao novo checkpoint e, em seguida,
              repetir o processo.
            </Text>
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
              <Text style={styles.bold}>Áudio:</Text> Em cada etapa, haverá um áudio com a dica para descobrir a
              localização do próximo Checkpoint. O jogador deve ouvir com atenção;
            </Text>

            <Text style={styles.listItem}>
              <Text style={styles.bold}>Distância:</Text> Será mostrada a distância em metros que o jogador está do
              Checkpoint atual;
            </Text>

            <Text style={styles.listItem}>
              <Text style={styles.bold}>Bússola:</Text> A bússola será usada para ajudar o jogador a seguir no caminho
              certo, indicando a direção a ser seguida – onde a flecha exibida indicará a direção norte;
            </Text>

            <Text style={styles.listItem}>
              <Text style={styles.bold}>Checkpoint:</Text> Ponto físico no mapa real que o jogador precisa encontrar para
              validar a etapa;
            </Text>

            <Text style={styles.listItem}>
              <Text style={styles.bold}>Foto:</Text> Ao chegar no local que o jogador acredita ser o Checkpoint, ele deve
              tirar uma foto para validar a resposta.
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
