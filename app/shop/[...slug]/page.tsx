'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { products, Product } from '@/lib/products';
import { Heart, ShoppingCart, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/app/context/CartContext';
import { useFavorites } from '@/app/context/FavoriteContext';

export default function ProductPage() {
  const { slug } = useParams();
  const productSlug = Array.isArray(slug) ? slug[0] : slug || '';
  const product: Product | undefined = products.find(p => p.slug === productSlug);

  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.image || '');
  const [comments, setComments] = useState<{ name: string; text: string }[]>([]);
  const [newComment, setNewComment] = useState('');
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');

  const addToCart = (prod: Product) => {
    const price = prod.hotDeal ? prod.price * 0.8 : prod.price;
    cartDispatch({ type: 'ADD_ITEM', payload: { ...prod, price, quantity } });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments(prev => [...prev, { name: 'Anonymous', text: newComment }]);
    setNewComment('');
  };

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Product not found</h1>
        <Link href="/shop" className="text-orange-500 hover:underline">
          ← Back to Shop
        </Link>
      </div>
    );
  }

  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      <Link href="/shop" className="text-orange-500 hover:underline font-medium">
        ← Back to Shop
      </Link>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Image Gallery */}
        <div className="flex-1 space-y-4">
          <div className="w-full h-[500px] rounded-xl shadow-2xl overflow-hidden border border-gray-100">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="flex gap-4">
            {[product.image, product.image, product.image].map((img, idx) => (
              <div
                key={idx}
                className="flex-1 h-24 rounded-lg overflow-hidden cursor-pointer border hover:border-orange-500 transition shadow-sm"
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-5xl font-bold leading-tight">{product.title}</h1>

          {/* Ratings */}
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={i < (product.rating || 0) ? 'w-5 h-5 text-yellow-400' : 'w-5 h-5 text-gray-300'}
              />
            ))}
            <span className="text-gray-500 text-sm">({product.reviews || 0} reviews)</span>
          </div>

          {/* Price */}
          <p className="text-3xl font-semibold text-orange-500">${product.price.toFixed(2)}</p>

          {/* Quantity & Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-gray-100 transition"
              >
                -
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-2 hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white rounded-full font-semibold shadow-lg transition"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>

            <button
              onClick={() => toggleFavorite(product.id)}
              className={cn(
                'p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition',
                favorites.includes(product.id) ? 'text-red-500' : 'text-gray-500'
              )}
            >
              <Heart className="w-6 h-6" />
            </button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-orange-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-700 text-sm">Crafted with the finest materials for reliability and longevity.</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-700 text-sm">Get it delivered to your door quickly and safely.</p>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-8 border rounded-lg overflow-hidden shadow-sm">
            <div className="flex border-b bg-gray-50">
              <button
                onClick={() => setActiveTab('description')}
                className={cn('px-6 py-3 font-semibold transition', activeTab === 'description' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500')}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={cn('px-6 py-3 font-semibold transition', activeTab === 'details' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500')}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={cn('px-6 py-3 font-semibold transition', activeTab === 'reviews' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500')}
              >
                Reviews
              </button>
            </div>
            <div className="p-6 bg-white">
              {activeTab === 'description' && <p className="text-gray-700">{product.description}</p>}
              {activeTab === 'details' && (
                <ul className="space-y-2 text-gray-700 list-disc pl-5">
                  <li><strong>Brand:</strong> {product.brand || 'Generic'}</li>
                  <li><strong>Category:</strong> {product.category}</li>
                  <li><strong>Subcategory:</strong> {product.subcategory || 'N/A'}</li>
                  <li><strong>Weight:</strong> {product.weight || 'N/A'}</li>
                  <li><strong>Dimensions:</strong> {product.dimensions || 'N/A'}</li>
                  <li><strong>Hot Deal:</strong> {product.hotDeal ? 'Yes' : 'No'}</li>
                  <li><strong>Best Seller:</strong> {product.bestSeller ? 'Yes' : 'No'}</li>
                </ul>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {comments.length === 0 ? (
                    <p className="text-gray-500">No reviews yet.</p>
                  ) : (
                    comments.map((c, idx) => (
                      <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-gray-700">{c.text}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <Link
                key={p.id}
                href={`/shop/${p.slug}`}
                className="border rounded-lg overflow-hidden hover:shadow-xl transition-transform hover:scale-105"
              >
                <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
                <div className="p-2 space-y-1">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-orange-500 font-bold">${p.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="mt-12 space-y-4">
        <h2 className="text-3xl font-bold">Customer Comments</h2>
        <form onSubmit={handleCommentSubmit} className="flex flex-col gap-2">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            className="border p-3 rounded-lg w-full resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Leave a comment..."
            rows={3}
          />
          <button
            type="submit"
            className="self-end px-6 py-2 bg-orange-500 hover:bg-orange-400 text-white rounded-lg font-semibold"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}
