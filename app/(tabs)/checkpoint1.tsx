import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from "expo-location";
import { Accelerometer } from "expo-sensors";
import { Audio } from 'expo-av';

const App = () => {
  const destino = { lat: -21.800478, lng: -50.884116 };
  const proximidadeAlerta = 25; // em metros

  const [distancia, setDistancia] = useState(null);
  const [alerta, setAlerta] = useState(false);
  const contadorDentroZona = useRef(0);

  const [data, setData] = useState({});
  const [subscription, setSubscription] = useState(null);

  // Controle do áudio
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function playPauseSound() {
    if (sound && isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else if (sound && !isPlaying) {
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../../assets/audios/audio 1.mp3')
      );
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Ative a localização para usar o app.");
        return;
      }

      const subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 2000,
          distanceInterval: 1,
        },
        (position) => {
          const { latitude, longitude } = position.coords;
          const d = calcularDistancia(latitude, longitude, destino.lat, destino.lng);

          setDistancia(d.toFixed(2));

          if (d <= proximidadeAlerta) {
            contadorDentroZona.current += 1;
          } else {
            contadorDentroZona.current = 0;
          }

          if (contadorDentroZona.current >= 3) {
            setAlerta(true);
          } else {
            setAlerta(false);
          }
        }
      );

      return () => subscriber.remove();
    })();
  }, []);

  const subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  const { x, y, z } = data;

  const [waveHeights, setWaveHeights] = useState(Array(18).fill(20));

useEffect(() => {
  let interval: NodeJS.Timeout | null = null;
  if (isPlaying) {
    interval = setInterval(() => {
      setWaveHeights(Array.from({ length: 18 }, () => Math.random() * 20 + 10));
    }, 150); // velocidade da animação
  } else {
    setWaveHeights(Array(18).fill(20)); // barras paradas
  }
  return () => {
    if (interval) clearInterval(interval);
  };
}, [isPlaying]);

  return (
    <LinearGradient
      colors={['#4da0b0', '#d39d38']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.container}>
        {/* Imagem no topo */}
        <Image
          source={require('../../assets/images/imageInicial.png')}
          style={styles.topImage}
          resizeMode="contain"
        />

        {/* Botão de áudio */}
        <TouchableOpacity style={styles.audioButton} onPress={playPauseSound}>
  <View style={styles.audioContent}>
    <Text style={styles.audioIcon}>{isPlaying ? "⏸️" : "▶️"}</Text>
    <View style={styles.waveContainer}>
      {waveHeights.map((height, i) => (
        <View
          key={i}
          style={[
            styles.waveBar,
            { height }
          ]}
        />
      ))}
    </View>
  </View>
</TouchableOpacity>

        {/* Monitor de Proximidade */}
   <View style={styles.dicaCard}>
  <View style={styles.dicaIcon}>
    <Text style={styles.dicaIconText}>🧭</Text>
  </View>
  <View style={styles.dicaTextContainer}>
    <Text style={styles.dicaText}>
      {distancia
        ? `Você está a ${distancia} metros do seu checkpoint`
        : "Aguardando localização..."}
    </Text>
  </View>
</View>

        {alerta && <Text style={styles.alert}>🎯 Você chegou ao destino!</Text>}

        {/* Acelerômetro */}
        <Text style={styles.title}>Dados do Acelerômetro</Text>
        <View style={styles.card}>
          <Text style={styles.text}>x: {x && x.toFixed(2)}</Text>
          <Text style={styles.text}>y: {y && y.toFixed(2)}</Text>
          <Text style={styles.text}>z: {z && z.toFixed(2)}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 25,
  },
  topImage: {
    width: 370,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#222",
    marginTop: 0,
  },
  audioButton: {
    backgroundColor: "#bfcfc0",
    borderRadius: 25,
    padding: 6,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    width: 280,
    height: 55,
  },
  audioContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  audioIcon: {
    fontSize: 28,
    marginRight: 8,
    color: "#222",
  },
  waveContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  waveBar: {
    width: 5,
    backgroundColor: "#222",
    borderRadius: 2,
    marginHorizontal: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  alert: {
    color: "#e74c3c",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 25,
  },
  dicaCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#222",
    width: 350,
  },
  dicaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#a44",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderWidth: 3,
    borderColor: "#fff",
  },
  dicaIconText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  dicaTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  dicaText: {
    fontSize: 16,
    color: "#222",
    fontWeight: "bold",
    textAlign: "center",
  }
});

export default App;
