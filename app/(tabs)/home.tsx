import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

// Mock data for featured products
const featuredProducts = [
  { id: '1', name: 'Wireless Headphones', price: '$129.99', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Smart Watch', price: '$249.99', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Bluetooth Speaker', price: '$79.99', image: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Laptop Backpack', price: '$59.99', image: 'https://via.placeholder.com/150' },
];

// Mock data for categories
const categories = [
  { id: '1', name: 'Electronics', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Clothing', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Home & Kitchen', image: 'https://via.placeholder.com/100' },
  { id: '4', name: 'Beauty', image: 'https://via.placeholder.com/100' },
  { id: '5', name: 'Sports', image: 'https://via.placeholder.com/100' },
  { id: '6', name: 'Books', image: 'https://via.placeholder.com/100' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Summer Sale</Text>
        <Text style={styles.bannerSubtext}>Up to 50% off</Text>
        <TouchableOpacity style={styles.bannerButton}>
          <Text style={styles.bannerButtonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScroll}>
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} asChild>
              <TouchableOpacity style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* New Arrivals */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productScroll}>
          {featuredProducts.slice().reverse().map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} asChild>
              <TouchableOpacity style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  banner: {
    backgroundColor: '#007AFF',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    margin: 15,
    alignItems: 'flex-start',
  },
  bannerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bannerSubtext: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  bannerButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  bannerButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#007AFF',
  },
  productScroll: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 130,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
}); 