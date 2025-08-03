import React, { useState } from 'react';
import {
  ShoppingCart,
  Search,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Heart,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  Tag,
} from '`lucide-react`';
import Banner from './Banner';
import Category from './Category';
import Products from './Products';

const Home = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Growers cider', price: 12, description: 'Brief description' },
    { id: 2, name: 'Fresh grapes', price: 8, description: 'Brief description' },
    { id: 3, name: 'Heinz tomato ketchup', price: 5, description: 'Brief description' },
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const products = [
    { id: 1, name: 'Sunstar Fresh Melon Juice', price: 18, rating: 4.5, unit: '1 Unit', image: '🍈', discount: 30 },
    { id: 2, name: 'Organic Bananas', price: 12, rating: 4.2, unit: '1 kg', image: '🍌' },
    { id: 3, name: 'Fresh Cucumber', price: 8, rating: 4.0, unit: '500g', image: '🥒' },
    { id: 4, name: 'Fresh Milk', price: 15, rating: 4.8, unit: '1L', image: '🥛' },
    { id: 5, name: 'Orange Juice', price: 20, rating: 4.3, unit: '1L', image: '🍊', discount: 15 },
    { id: 6, name: 'Fresh Raspberries', price: 25, rating: 4.6, unit: '250g', image: '🫐' },
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 casual look ideas to dress up your kids',
      date: '22 Aug 2021',
      category: 'tips & tricks',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam...',
      image: '📸',
    },
    {
      id: 2,
      title: 'Latest trends of wearing street wears supremely',
      date: '25 Aug 2021',
      category: 'trending',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam...',
      image: '📸',
    },
  ];

  return (
    <>
      <div id='home' className='container'>
        <div className='flex flex-col w-full h-full gap_global'>
          <Banner />
          <Category />
          <Products />
        </div>
      </div>
    </>
  );
};

export default Home;
