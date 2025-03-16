import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthGuard from '../../components/auth/AuthGuard';

// Mock product data - in a real app, you would fetch this from an API
const products = {
  '1': {
    id: '1',
    name: 'Wireless Headphones',
    price: '$129.99',
    image: 'https://via.placeholder.com/400',
    description: 'High-quality wireless headphones with noise cancellation, long battery life, and premium sound quality. Perfect for music lovers and professionals alike.',
    rating: 4.5,
    reviews: 128,
    colors: ['Black', 'White', 'Blue'],
    inStock: true,
  },
  '2': {
    id: '2',
    name: 'Smart Watch',
    price: '$249.99',
    image: 'https://via.placeholder.com/400',
    description: 'Feature-rich smartwatch with health tracking, notifications, and a beautiful display. Water-resistant and perfect for an active lifestyle.',
    rating: 4.7,
    reviews: 95,
    colors: ['Silver', 'Black', 'Rose Gold'],
    inStock: true,
  },
  '3': {
    id: '3',
    name: 'Bluetooth Speaker',
    price: '$79.99',
    image: 'https://via.placeholder.com/400',
    description: 'Portable Bluetooth speaker with amazing sound quality and 20-hour battery life. Water-resistant and perfect for outdoor activities.',
    rating: 4.2,
    reviews: 64,
    colors: ['Black', 'Blue', 'Red'],
    inStock: true,
  },
  '4': {
    id: '4',
    name: 'Laptop Backpack',
    price: '$59.99',
    image: 'https://via.placeholder.com/400',
    description: 'Durable and comfortable laptop backpack with multiple compartments and water-resistant material. Perfect for commuters and travelers.',
    rating: 4.8,
    reviews: 42,
    colors: ['Grey', 'Black', 'Navy'],
    inStock: false,
  },
};

function ProductDetailContent() {
  const { id } = useLocalSearchParams();
  const productId = typeof id === 'string' ? id : '1';
  const product = products[productId] || products['1'];

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= Math.floor(product.rating) ? 'star' : star <= product.rating ? 'star-half' : 'star-outline'}
                size={18}
                color="#FFD700"
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
          <Text style={styles.reviews}>{product.rating} ({product.reviews} reviews)</Text>
        </View>
        
        <Text style={styles.price}>{product.price}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Colors</Text>
        <View style={styles.colorsContainer}>
          {product.colors.map((color) => (
            <TouchableOpacity key={color} style={styles.colorOption}>
              <Text style={styles.colorText}>{color}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.stockContainer}>
          <Ionicons
            name={product.inStock ? 'checkmark-circle' : 'close-circle'}
            size={20}
            color={product.inStock ? '#4CAF50' : '#F44336'}
          />
          <Text style={[styles.stockText, { color: product.inStock ? '#4CAF50' : '#F44336' }]}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>
        
        <TouchableOpacity
          style={[styles.button, !product.inStock && styles.disabledButton]}
          disabled={!product.inStock}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default function ProductDetailScreen() {
  return (
    <AuthGuard requireAuth={true} redirectTo="/(auth)/login">
      <ProductDetailContent />
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 10,
  },
  reviews: {
    color: '#666',
    fontSize: 14,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorOption: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  colorText: {
    fontSize: 14,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stockText: {
    fontSize: 16,
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 