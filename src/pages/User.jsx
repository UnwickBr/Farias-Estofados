import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  UserRound,
  Package,
  MapPinned,
  LogOut,
  Mail,
  CalendarDays,
  CreditCard,
  BadgeCheck,
  Save,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/AuthContext'
import { getOrdersByUser } from '@/lib/orders'

const menuItems = [
  { id: 'perfil', label: 'Perfil', icon: UserRound },
  { id: 'pedidos', label: 'Meus Pedidos', icon: Package },
  { id: 'enderecos', label: 'Enderecos', icon: MapPinned },
]

const createEmptyAddress = () => ({
  rua: '',
  numero: '',
  bairro: '',
  cidade: '',
  estado: '',
  cep: '',
})

export default function User() {
  const { isAuthenticated, user, logout, updateUser, updateAddress } = useAuth()
  const [activeSection, setActiveSection] = useState('perfil')
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    email: '',
    age: '',
    cpf: '',
    birthDate: '',
    login: '',
  })
  const [addressForm, setAddressForm] = useState(createEmptyAddress())
  const [orders, setOrders] = useState([])
  const [profileSaved, setProfileSaved] = useState(false)
  const [addressSaved, setAddressSaved] = useState(false)

  useEffect(() => {
    if (!user) return

    setProfileForm({
      fullName: user.fullName || '',
      email: user.email || '',
      age: user.age || '',
      cpf: user.cpf || '',
      birthDate: user.birthDate || '',
      login: user.login || '',
    })

    setAddressForm(user.address || createEmptyAddress())
    setOrders(getOrdersByUser(user.login))
  }, [user])

  useEffect(() => {
    if (!user?.login) return

    const syncOrders = () => setOrders(getOrdersByUser(user.login))
    window.addEventListener('orders-updated', syncOrders)
    return () => window.removeEventListener('orders-updated', syncOrders)
  }, [user?.login])

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const handleProfileSubmit = (event) => {
    event.preventDefault()
    updateUser(profileForm)
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2000)
  }

  const handleAddressSubmit = (event) => {
    event.preventDefault()
    updateAddress(addressForm)
    setAddressSaved(true)
    setTimeout(() => setAddressSaved(false), 2000)
  }

  return (
    <div className="min-h-screen pt-24 lg:pt-28 px-6 pb-20 bg-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-white">
          <div className="bg-[linear-gradient(135deg,_#0f172a,_#1d4ed8)] px-8 py-10 text-white">
            <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-3">Area do usuario</p>
            <h1 className="font-display text-4xl mb-3">Minha conta</h1>
            <p className="text-white/80 max-w-2xl">
              Gerencie seus dados de perfil, acompanhe pedidos e consulte seu endereco.
            </p>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr]">
            <aside className="border-r border-slate-200 bg-slate-50 p-6">
              <div className="rounded-2xl bg-slate-900 text-white p-5 mb-6">
                <p className="text-sm text-white/60 mb-1">Usuario autenticado</p>
                <p className="text-xl font-semibold">{user?.fullName}</p>
                <p className="text-sm text-white/70 mt-1">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors ${
                        isActive ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  )
                })}
              </nav>

              <Button
                onClick={logout}
                className="w-full mt-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </aside>

            <section className="p-8">
              {activeSection === 'perfil' && (
                <form onSubmit={handleProfileSubmit}>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <h2 className="text-2xl font-semibold text-slate-900">Dados do perfil</h2>
                    <Button type="submit" className="rounded-full bg-blue-600 hover:bg-blue-500 text-white gap-2">
                      <Save className="h-4 w-4" />
                      Salvar perfil
                    </Button>
                  </div>

                  {profileSaved && <p className="text-sm text-green-600 mb-4">Perfil atualizado com sucesso.</p>}

                  <div className="grid md:grid-cols-2 gap-5">
                    <EditableField
                      icon={UserRound}
                      label="Nome completo"
                      value={profileForm.fullName}
                      onChange={(value) => setProfileForm((current) => ({ ...current, fullName: value }))}
                    />
                    <EditableField
                      icon={Mail}
                      label="Email"
                      value={profileForm.email}
                      onChange={(value) => setProfileForm((current) => ({ ...current, email: value }))}
                    />
                    <EditableField
                      icon={BadgeCheck}
                      label="Idade"
                      value={profileForm.age}
                      onChange={(value) => setProfileForm((current) => ({ ...current, age: value }))}
                    />
                    <EditableField
                      icon={CreditCard}
                      label="CPF"
                      value={profileForm.cpf}
                      onChange={(value) => setProfileForm((current) => ({ ...current, cpf: value }))}
                    />
                    <EditableField
                      icon={CalendarDays}
                      label="Data de nascimento"
                      value={profileForm.birthDate}
                      onChange={(value) => setProfileForm((current) => ({ ...current, birthDate: value }))}
                    />
                    <EditableField
                      icon={UserRound}
                      label="Login"
                      value={profileForm.login}
                      onChange={(value) => setProfileForm((current) => ({ ...current, login: value }))}
                    />
                  </div>
                </form>
              )}

              {activeSection === 'pedidos' && (
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-6">Meus Pedidos</h2>
                  {orders.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                      <p className="text-slate-600">Nenhum pedido criado ainda.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <OrderCard
                          key={order.id}
                          code={order.code}
                          status={order.status}
                          date={order.date}
                          total={order.total}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'enderecos' && (
                <form onSubmit={handleAddressSubmit}>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <h2 className="text-2xl font-semibold text-slate-900">Endereco</h2>
                    <Button type="submit" className="rounded-full bg-blue-600 hover:bg-blue-500 text-white gap-2">
                      <Save className="h-4 w-4" />
                      Salvar endereco
                    </Button>
                  </div>

                  {addressSaved && <p className="text-sm text-green-600 mb-4">Endereco atualizado com sucesso.</p>}

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <AddressInput
                        label="Rua"
                        value={addressForm.rua}
                        onChange={(value) => setAddressForm((current) => ({ ...current, rua: value }))}
                      />
                      <AddressInput
                        label="Numero"
                        value={addressForm.numero}
                        onChange={(value) => setAddressForm((current) => ({ ...current, numero: value }))}
                      />
                      <AddressInput
                        label="Bairro"
                        value={addressForm.bairro}
                        onChange={(value) => setAddressForm((current) => ({ ...current, bairro: value }))}
                      />
                      <AddressInput
                        label="Cidade"
                        value={addressForm.cidade}
                        onChange={(value) => setAddressForm((current) => ({ ...current, cidade: value }))}
                      />
                      <AddressInput
                        label="Estado"
                        value={addressForm.estado}
                        onChange={(value) => setAddressForm((current) => ({ ...current, estado: value }))}
                      />
                      <AddressInput
                        label="CEP"
                        value={addressForm.cep}
                        onChange={(value) => setAddressForm((current) => ({ ...current, cep: value }))}
                      />
                    </div>
                  </div>
                </form>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function EditableField({ icon: Icon, label, value, onChange }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <Icon className="h-5 w-5 text-blue-600 mb-4" />
      <Label className="text-sm text-slate-600 mb-2 block">{label}</Label>
      <Input value={value} onChange={(event) => onChange(event.target.value)} className="bg-white border-slate-300" />
    </div>
  )
}

function AddressInput({ label, value, onChange }) {
  return (
    <div>
      <Label className="text-sm text-slate-600 mb-2 block">{label}</Label>
      <Input value={value} onChange={(event) => onChange(event.target.value)} className="bg-white border-slate-300" />
    </div>
  )
}

function OrderCard({ code, status, date, total }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p className="text-sm text-slate-500 mb-1">Pedido</p>
        <p className="text-lg font-semibold text-slate-900">{code}</p>
      </div>
      <div>
        <p className="text-sm text-slate-500 mb-1">Status</p>
        <p className="text-base font-medium text-blue-700">{status}</p>
      </div>
      <div>
        <p className="text-sm text-slate-500 mb-1">Data</p>
        <p className="text-base font-medium text-slate-900">{date}</p>
      </div>
      <div>
        <p className="text-sm text-slate-500 mb-1">Total</p>
        <p className="text-base font-semibold text-slate-900">{total}</p>
      </div>
    </div>
  )
}
