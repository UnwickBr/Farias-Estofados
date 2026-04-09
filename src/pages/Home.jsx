import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { mockProducts } from '@/lib/mock-products'
import HeroSection from '../components/HeroSection'
import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'

const HERO_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Brochstein_House_WTCannady_1972.jpg/1280px-Brochstein_House_WTCannady_1972.jpg'
const ABOUT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/7/7f/In_the_sewing_workshop.jpg'

const categories = [
  {
    name: 'Sofas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Living_room_Germany_2006.jpg/800px-Living_room_Germany_2006.jpg',
  },
  {
    name: 'Cadeiras',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Armchair.jpg/1280px-Armchair.jpg',
  },
  {
    name: 'Puffes',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/HK_Ka_Wah_Centre_showflat_%E6%B7%B1%E7%81%A39_Marinella_T6-A_living_room_Sofa_Oct-2011.jpg/800px-HK_Ka_Wah_Centre_showflat_%E6%B7%B1%E7%81%A39_Marinella_T6-A_living_room_Sofa_Oct-2011.jpg',
  },
  {
    name: 'Almofadas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Pillows_%28307397568%29.jpg/800px-Pillows_%28307397568%29.jpg',
  },
]

export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    setFeatured(mockProducts.filter((product) => product.featured).slice(0, 4))
  }, [])

  return (
    <div>
      <HeroSection image={HERO_IMAGE} />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Explore</p>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground">Categorias</h2>
          </div>
          <Link
            to="/catalogo"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver tudo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.name} name={category.name} image={category.image} index={index} />
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 lg:pb-28">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Selecao</p>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground">Destaques</h2>
            </div>
            <Link
              to="/catalogo"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Ver catalogo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={ABOUT_IMAGE}
                alt="Detalhes de mobiliario artesanal"
                className="rounded-lg w-full aspect-[4/3] object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">Nossa historia</p>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-6">
                Feito com paixao e precisao
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A Farias Estofados nasce para unir conforto, acabamento cuidadoso e identidade visual em cada ambiente.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Esta base pode evoluir com seus produtos reais, imagens proprias e integracao com o backend que voce escolher.
              </p>
              <Button asChild variant="outline" className="rounded-full px-8 gap-2 group">
                <Link to="/contato">
                  Fale conosco
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
