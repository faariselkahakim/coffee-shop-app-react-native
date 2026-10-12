import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const API_URL =
  'https://raw.githubusercontent.com/faariselkahakim/coffe-shop-api/main/coffee_list_data.json';

const coffeeImages = {
  1: {
    thumbnail: require('./assets/caffe_latte_thumbnail.png'),
    poster: require('./assets/caffe_latte_poster.jpg'),
  },

  2: {
    thumbnail: require('./assets/cappuccino_thumbnail.png'),
    poster: require('./assets/cappuccino_poster.jpg'),
  },

  3: {
    thumbnail: require('./assets/caffe_mocha_thumbnail.png'),
    poster: require('./assets/caffe_mocha_poster.jpg'),
  },

  4: {
    thumbnail: require('./assets/caramel_macchiato_thumbnail.png'),
    poster: require('./assets/caramel_macchiato_poster.jpg'),
  },

  5: {
    thumbnail: require('./assets/vanilla_sweet_cream_cold_brew_thumbnail.png'),
    poster: require('./assets/vanilla_sweet_cream_cold_brew_poster.jpg'),
  },

  6: {
    thumbnail: require('./assets/cold_brew_thumbnail.png'),
    poster: require('./assets/cold_brew_poster.jpg'),
  },

  7: {
    thumbnail: require('./assets/mango_passion_frappuccino_thumbnail.png'),
    poster: require('./assets/mango_passion_frappuccino_poster.jpg'),
  },

  8: {
    thumbnail: require('./assets/raspberry_currant_frappuccino_thumbnail.png'),
    poster: require('./assets/raspberry_currant_frappuccino_poster.jpg'),
  },

  9: {
    thumbnail: require('./assets/coffee_frappuccino_thumbnail.png'),
    poster: require('./assets/coffee_frappuccino_poster.jpg'),
  },

  10: {
    thumbnail: require('./assets/mocha_frappuccino_thumbnail.png'),
    poster: require('./assets/mocha_frappuccino_poster.jpg'),
  },
};

export default function App() {
  const [coffeeList, setCoffeeList] = useState([]);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gagal mengambil data API');
        }

        return response.json();
      })
      .then((data) => {
        setCoffeeList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          Memuat data coffee...
        </Text>
      </View>
    );
  }


  if (selectedCoffee) {
    const images = coffeeImages[selectedCoffee.coffee_id];

    return (
      <View style={styles.container}>

        <ScrollView>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedCoffee(null)}
          >
            <Text style={styles.backText}>
              ← Kembali
            </Text>
          </TouchableOpacity>

          {images && (
            <Image
              source={images.poster}
              style={styles.poster}
              resizeMode="cover"
            />
          )}

          <View style={styles.detailContent}>

            <Text style={styles.detailTitle}>
              {selectedCoffee.coffee_title}
            </Text>

            <Text style={styles.detailDescription}>
              {selectedCoffee.coffee_detail}
            </Text>

          </View>

        </ScrollView>

      </View>
    );
  }


  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          My Coffee Drink List Faaris
        </Text>
      </View>

      <FlatList
        data={coffeeList}
        keyExtractor={(item) =>
          String(item.coffee_id)
        }
        contentContainerStyle={styles.list}

        renderItem={({ item }) => {

          const images =
            coffeeImages[item.coffee_id];

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                setSelectedCoffee(item)
              }
            >

              {images && (
                <Image
                  source={images.thumbnail}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
              )}

              <View style={styles.cardContent}>

                <Text style={styles.title}>
                  {item.coffee_title}
                </Text>

                <Text
                  style={styles.description}
                  numberOfLines={3}
                >
                  {item.coffee_detail}
                </Text>

                <Text style={styles.detailButton}>
                  Lihat Detail →
                </Text>

              </View>

            </TouchableOpacity>
          );
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  header: {
    backgroundColor: '#A96800',
    paddingTop: 45,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },

  list: {
    padding: 15,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
  },

  thumbnail: {
    width: '100%',
    height: 180,
    backgroundColor: '#DDDDDD',
  },

  cardContent: {
    padding: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222222',
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#555555',
  },

  detailButton: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#A96800',
  },

  backButton: {
    padding: 15,
  },

  backText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A96800',
  },

  poster: {
    width: '100%',
    height: 350,
    backgroundColor: '#DDDDDD',
  },

  detailContent: {
    padding: 18,
  },

  detailTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 12,
  },

  detailDescription: {
    fontSize: 16,
    lineHeight: 25,
    color: '#444444',
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 15,
  },

});