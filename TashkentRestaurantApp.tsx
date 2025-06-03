import { useState } from 'react'
import { Phone, Mail, MapPin, ShoppingCart, Plus, Minus, X } from 'lucide-react'

type MenuItem = {
  id: number
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
}

type OrderItem = {
  item: MenuItem
  quantity: number
}

export default function TashkentRestaurantApp() {
  const [activeTab, setActiveTab] = useState<'menu' | 'about' | 'order'>('menu')
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    notes: ''
  })
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: ''
  })
  const [orderSuccess, setOrderSuccess] = useState(false)

  // Расширенное меню ресторана в Ташкенте
  const menuItems: MenuItem[] = [
    // Национальные блюда
    {
      id: 1,
      name: 'Плов',
      description: 'Традиционный узбекский плов с бараниной, морковью и луком',
      price: 45000,
      category: 'Национальные блюда',
      imageUrl: 'https://images.unsplash.com/photo-1630911383060-6008e826f4d9'
    },
    {
      id: 2,
      name: 'Шашлык',
      description: 'Нежное мясо на углях (баранина, говядина или курица)',
      price: 35000,
      category: 'Национальные блюда',
      imageUrl: 'https://images.unsplash.com/photo-1603360946949-755d8a46077e'
    },
    {
      id: 3,
      name: 'Манты',
      description: 'Парные пельмени с мясом и луком',
      price: 30000,
      category: 'Национальные блюда',
      imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950'
    },
    {
      id: 4,
      name: 'Лагман',
      description: 'Густой суп с домашней лапшой и овощами',
      price: 40000,
      category: 'Национальные блюда',
      imageUrl: 'https://images.unsplash.com/photo-1544025168-d0e3b3d6d9b0'
    },
    {
      id: 5,
      name: 'Самса',
      description: 'Пирожки с мясом из тандыра',
      price: 15000,
      category: 'Национальные блюда',
      imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950'
    },

    // Супы
    {
      id: 6,
      name: 'Шурпа',
      description: 'Наваристый суп из баранины с овощами',
      price: 35000,
      category: 'Супы',
      imageUrl: 'https://images.unsplash.com/photo-1544025168-d0e3b3d6d9b0'
    },
    {
      id: 7,
      name: 'Матбуха',
      description: 'Овощной суп с зеленью и специями',
      price: 30000,
      category: 'Супы',
      imageUrl: 'https://images.unsplash.com/photo-1544025168-d0e3b3d6d9b0'
    },

    // Салаты
    {
      id: 8,
      name: 'Ачик-чучук',
      description: 'Салат из помидоров, огурцов и лука',
      price: 25000,
      category: 'Салаты',
      imageUrl: 'https://images.unsplash.com/photo-1544025168-d0e3b3d6d9b0'
    },
    {
      id: 9,
      name: 'Салат Чабанский',
      description: 'Овощной салат с зеленью и сметаной',
      price: 28000,
      category: 'Салаты',
      imageUrl: 'https://images.unsplash.com/photo-1544025168-d0e3b3d6d9b0'
    },

    // Напитки
    {
      id: 10,
      name: 'Чай зеленый',
      description: 'Ароматный зеленый чай',
      price: 10000,
      category: 'Напит��и',
      imageUrl: 'https://images.unsplash.com/photo-1544025168-d0e3b3d6d9b0'
    },
    {
      id: 11,
      name: 'Компот',
      description: 'Домашний компот из сухофруктов',
      price: 15000,
      category: 'Напитки',
      imageUrl: 'https://images.unsplash.com/photo-1544025168-d0e3b3d6d9b0'
    },
    {
      id: 12,
      name: 'Айран',
      description: 'Освежающий кисломолочный напиток',
      price: 12000,
      category: 'Напитки',
      imageUrl: 'https://images.unsplash.com/photo-1544025168-d0e3b3d6d9b0'
    },

    // Десерты
    {
      id: 13,
      name: 'Халва',
      description: 'Традиционная восточная сладость',
      price: 20000,
      category: 'Десерты',
      imageUrl: 'https://images.unsplash.com/photo-1544025168-d0e3b3d6d9b0'
    },
    {
      id: 14,
      name: 'Чак-чак',
      description: 'Восточная сладость из теста с медом',
      price: 25000,
      category: 'Десерты',
      imageUrl: 'https://images.unsplash.com/photo-1544025168-d0e3b3d6d9b0'
    }
  ]

  const categories = [...new Set(menuItems.map(item => item.category))]
  const total = orderItems.reduce((sum, i) => sum + (i.item.price * i.quantity), 0)

  const addToOrder = (item: MenuItem) => {
    setOrderItems(prev => {
      const existing = prev.find(i => i.item.id === item.id)
      if (existing) {
        return prev.map(i => 
          i.item.id === item.id 
            ? {...i, quantity: i.quantity + 1} 
            : i
        )
      }
      return [...prev, {item, quantity: 1}]
    })
    setOrderSuccess(false)
  }

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromOrder(itemId)
      return
    }
    setOrderItems(prev =>
      prev.map(item =>
        item.item.id === itemId ? {...item, quantity: newQuantity} : item
      )
    )
  }

  const removeFromOrder = (itemId: number) => {
    setOrderItems(prev => prev.filter(item => item.item.id !== itemId))
  }

  const validateForm = () => {
    let isValid = true
    const errors = { name: '', phone: '' }

    if (!orderForm.name.trim()) {
      errors.name = 'Введите ваше имя'
      isValid = false
    }

    if (!orderForm.phone.trim()) {
      errors.phone = 'Введите номер телефона'
      isValid = false
    } else if (!/^[\d\s+\-()]{7,}$/.test(orderForm.phone)) {
      errors.phone = 'Введите корректный номер'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmitOrder = () => {
    if (!validateForm()) return

    // В реальном приложении здесь будет отправка на сервер
    setOrderSuccess(true)
    setOrderItems([])
    setOrderForm({ name: '', phone: '', notes: '' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setOrderForm(prev => ({ ...prev, [name]: value }))
    setOrderSuccess(false)
    
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="max-w-screen-lg mx-auto bg-white text-gray-800 min-h-screen">
      {/* Шапка */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" 
          alt="Tashkent Restaurant" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl font-bold mb-2 text-white">TASHKENT RESTAURANT</h1>
          <p className="text-xl text-white">Настоящий вкус Узбеки��тана</p>
        </div>
      </div>

      {/* Навигация */}
      <div className="flex justify-center border-b">
        <button 
          className={`py-4 px-8 font-medium ${activeTab === 'menu' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('menu')}
        >
          Меню
        </button>
        <button 
          className={`py-4 px-8 font-medium ${activeTab === 'about' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('about')}
        >
          О нас
        </button>
        <button 
          className={`py-4 px-8 font-medium flex items-center ${activeTab === 'order' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('order')}
        >
          <ShoppingCart className="mr-2" />
          Корзина ({orderItems.reduce((sum, i) => sum + i.quantity, 0)})
        </button>
      </div>

      {/* Контент */}
      <div className="p-4 md:p-8">
        {activeTab === 'menu' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Наше меню</h2>
            
            {categories.map(category => (
              <div key={category} className="mb-12">
                <h3 className="text-xl font-semibold mb-4 border-b pb-2">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menuItems
                    .filter(item => item.category === category)
                    .map(item => (
                      <div key={item.id} className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="w-32 h-32 flex-shrink-0">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex-1">
                            <h4 className="font-bold">{item.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          </div>
                          <div className="flex justify-between items-center mt-3">
                            <span className="font-bold text-orange-600">{item.price.toLocaleString()} сум</span>
                            <button 
                              onClick={() => addToOrder(item)}
                              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              В корзину
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">О нашем ресторане</h2>
            
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1555390113-0cb36ef10e6e" 
                alt="Наш ресторан в Ташкенте"
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-4"
              />
              <p className="text-lg mb-4">
                Добро пожаловать в ресторан "Tashkent" - место, где вы можете ощутить настоящий вкус узбекской кухни в сердце Ташкента.
              </p>
              <p className="text-lg mb-4">
                Наш ресторан расположен в историческом центре города и предлагает гостям уютную атмосферу, прекрасное обслуживание и, конечно же, изысканные блюда, приготовленные по традиционным рецептам.
              </p>
              <p className="text-lg">
                Мы используем только свежие местные продукты и готовим с душой, чтобы каждый наш гость почувствовал тепло узбекского гостеприимства.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Контактная информация</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="mr-3 text-orange-600" />
                  <span>г. Ташкент, ул. Навои, 15</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-3 text-orange-600" />
                  <span>+998 71 123 45 67</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-3 text-orange-600" />
                  <span>info@tashkentrestaurant.uz</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'order' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Ваш заказ</h2>
            
            {orderSuccess ? (
              <div className="text-center py-12">
                <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Check className="text-green-600" size={40} />
                </div>
                <h3 className="text-xl font-medium mb-4">Спасибо за заказ!</h3>
                <p className="text-gray-600 mb-6">
                  Ваш заказ принят в обработку. Мы свяжемся с вами в ближайшее время для подтверждения.
                </p>
                <button 
                  onClick={() => setActiveTab('menu')}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Вернуться в меню
                </button>
              </div>
            ) : orderItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-lg text-gray-600">Ваша корзина пуста</p>
                <button 
                  onClick={() => setActiveTab('menu')}
                  className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Посмотреть меню
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  {orderItems.map(({item, quantity}) => (
                    <div key={item.id} className="flex justify-between items-center border p-4 rounded-lg">
                      <div className="flex items-center">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.price.toLocaleString()} сум</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.id, quantity - 1)}
                          className="px-2 py-1 border rounded-l hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-1 border-t border-b">{quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, quantity + 1)}
                          className="px-2 py-1 border rounded-r hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                        <button 
                          onClick={() => removeFromOrder(item.id)}
                          className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border p-6 rounded-lg mb-8">
                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Итого:</span>
                    <span className="text-orange-600">{total.toLocaleString()} сум</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Ваше имя *</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Иван Иванов"
                        value={orderForm.name}
                        onChange={handleInputChange}
                        className={`w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                      />
                      {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Телефон *</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+998 90 123 45 67"
                        value={orderForm.phone}
                        onChange={handleInputChange}
                        className={`w-full border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                      />
                      {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Примечания к заказу</label>
                      <textarea
                        name="notes"
                        placeholder="Особые пожелания, время доставки и т.д."
                        value={orderForm.notes}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
                  onClick={handleSubmitOrder}
                >
                  Оформить заказ
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
