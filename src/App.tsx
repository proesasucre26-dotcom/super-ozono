import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import type { TabId } from './components/Header';
import { TabBar } from './components/TabBar';
import { CatalogTab } from './components/CatalogTab';
import { PreparationTab } from './components/PreparationTab';
import { ConsultasTab } from './components/ConsultasTab';
import { ContactsTab } from './components/ContactsTab';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import type { CartItem, PriceTier, Product, ProductId } from './data/catalog';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('inicio');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [prepFocusedProductId, setPrepFocusedProductId] = useState<ProductId | null>(null);
  const [focusAiAssistant, setFocusAiAssistant] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSelectTab = (tab: TabId) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToPreparation = (productId?: ProductId) => {
    if (productId) {
      setPrepFocusedProductId(productId);
    }
    setSelectedProduct(null);
    setActiveTab('preparacion');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAiAssistant = () => {
    setSelectedProduct(null);
    setIsCartOpen(false);
    setActiveTab('consultas');
    setFocusAiAssistant(true);
  };

  const handleAddToCart = (
    product: Product,
    tier: PriceTier = 'publico',
    quantity = 1,
    openDrawer = false
  ) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                tier,
                quantity: Math.min(99, item.quantity + quantity),
              }
            : item
        );
      }
      return [...prev, { product, tier, quantity }];
    });
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const handleUpdateQuantity = (productId: ProductId, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, Math.min(99, quantity)) }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: ProductId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-black text-slate-800">
      <Header
        onSelectHome={() => handleSelectTab('inicio')}
        onOpenAiAssistant={handleOpenAiAssistant}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
      />

      <TabBar activeTab={activeTab} onSelectTab={handleSelectTab} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'inicio' && (
              <CatalogTab
                onSelectProduct={(product) => setSelectedProduct(product)}
                onAddToCart={(product) => handleAddToCart(product, 'publico', 1, false)}
              />
            )}
            {activeTab === 'preparacion' && (
              <PreparationTab
                focusedProductId={prepFocusedProductId}
                onAddToCart={(product) => handleAddToCart(product, 'publico', 1, true)}
              />
            )}
            {activeTab === 'consultas' && (
              <ConsultasTab
                focusAiAssistant={focusAiAssistant}
                onResetFocusAi={() => setFocusAiAssistant(false)}
              />
            )}
            {activeTab === 'contactos' && <ContactsTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onGoToPreparation={(productId) => handleGoToPreparation(productId)}
        onAddToCart={(product, tier, quantity) =>
          handleAddToCart(product, tier, quantity, true)
        }
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onAddProduct={(product, tier, quantity) =>
          handleAddToCart(product, tier ?? 'publico', quantity ?? 1, false)
        }
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
