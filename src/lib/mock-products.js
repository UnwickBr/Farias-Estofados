import sofaImage from '@/assets/sofa.jpg'
import chairImage from '@/assets/chair.jpg'
import poufImage from '@/assets/pouf.jpg'
import pillowsImage from '@/assets/pillows.jpg'

export const mockProducts = [
  {
    id: 'sofa-linho-01',
    name: 'Sofa Linho Aurora',
    description: 'Sofa de linhas suaves com acabamento em linho e espuma de alta densidade.',
    price: 3890,
    category: 'Sofas',
    image: sofaImage,
    featured: true,
    in_stock: true,
    material: 'Linho e madeira macica',
    dimensions: '220 x 95 x 85 cm',
  },
  {
    id: 'cadeira-madeira-01',
    name: 'Cadeira Essence',
    description: 'Cadeira estofada com estrutura em madeira e visual contemporaneo.',
    price: 890,
    category: 'Cadeiras',
    image: chairImage,
    featured: true,
    in_stock: true,
    material: 'Madeira e tecido premium',
    dimensions: '52 x 58 x 82 cm',
  },
  {
    id: 'puff-boucle-01',
    name: 'Puff Boucle Alba',
    description: 'Puff compacto para compor salas, quartos e closets com textura sofisticada.',
    price: 590,
    category: 'Puffes',
    image: poufImage,
    featured: false,
    in_stock: true,
    material: 'Boucle e base reforcada',
    dimensions: '45 x 45 x 42 cm',
  },
  {
    id: 'almofada-terra-01',
    name: 'Almofada Terra',
    description: 'Almofada decorativa para compor ambientes aconchegantes.',
    price: 149,
    category: 'Almofadas',
    image: pillowsImage,
    featured: true,
    in_stock: true,
    material: 'Algodao e fibra siliconada',
    dimensions: '50 x 50 cm',
  },
]
