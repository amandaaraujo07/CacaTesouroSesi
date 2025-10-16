import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from "expo-location";
import { Accelerometer } from "expo-sensors";

const App = () => {
  const destino = { lat: -21.800478, lng: -50.884116 };
  const proximidadeAlerta = 25; // em metros

  const [distancia, setDistancia] = useState(null);
  const [alerta, setAlerta] = useState(false);
  const contadorDentroZona = useRef(0);

  const [data, setData] = useState({});
  const [subscription, setSubscription] = useState(null);

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

  return (
    <LinearGradient
          colors={['#4da0b0', '#d39d38']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
    <View style={styles.container}>
      {/* Monitor de Proximidade */}

      <View style={styles.card}>
        <Text style={styles.text}>
          {distancia
            ? `Você está à ${distancia} metros do destino`
            : "Aguardando localização..."}
        </Text>
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
    justifyContent: "center",
    padding: 20,
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
});
export default App;