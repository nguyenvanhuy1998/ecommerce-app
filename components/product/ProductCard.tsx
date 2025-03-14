import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ViewStyle } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface ProductCardProps {
  id: string;
  name: string;
  price: string | number;
  image: string;
  rating?: number;
  discount?: number;
  isNew?: boolean;
  onAddToCart?: () => void;
  style?: ViewStyle;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  rating,
  discount,
  isNew = false,
  onAddToCart,
  style,
}: ProductCardProps) {
  // Format price if it's a number
  const formattedPrice = typeof price === 'number' ? `$${price.toFixed(2)}` : price;
  
  // Calculate discounted price if there's a discount
  const discountedPrice = typeof price === 'number' && discount 
    ? `$${(price - (price * discount / 100)).toFixed(2)}` 
    : null;

  return (
    <Link href={`/product/${id}`} asChild>
      <TouchableOpacity style={[styles.container, style]}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          
          {/* Badges */}
          <View style={styles.badgeContainer}>
            {isNew && (
              <View style={[styles.badge, styles.newBadge]}>
                <Text style={styles.badgeText}>NEW</Text>
              </View>
            )}
            
            {discount && discount > 0 && (
              <View style={[styles.badge, styles.discountBadge]}>
                <Text style={styles.badgeText}>{discount}% OFF</Text>
              </View>
            )}
          </View>
          
          {/* Add to cart button */}
          {onAddToCart && (
            <TouchableOpacity 
              style={styles.addToCartButton}
              onPress={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
            >
              <Ionicons name="cart-outline" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2}>{name}</Text>
          
          {/* Rating */}
          {rating && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.rating}>{rating.toFixed(1)}</Text>
            </View>
          )}
          
          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={[styles.price, discountedPrice ? styles.strikethrough : {}]}>
              {formattedPrice}
            </Text>
            
            {discountedPrice && (
              <Text style={styles.discountedPrice}>{discountedPrice}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: 160,
    margin: 8,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  newBadge: {
    backgroundColor: '#4CAF50',
  },
  discountBadge: {
    backgroundColor: '#FF3B30',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    height: 40,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#999',
    fontSize: 12,
  },
  discountedPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginLeft: 6,
  },
}); 