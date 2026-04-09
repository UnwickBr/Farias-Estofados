import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserRound, Package, MapPinned, LogOut, Mail, CalendarDays, CreditCard, BadgeCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/AuthContext'

const menuItems = [
  { id: 'perfil', label: 'Perfil', icon: UserRound },
  { id: 'pedidos', label: 'Meus Pedidos', icon: Package },
  { id: 'enderecos', label: 'Enderecos', icon: MapPinned },
]

export default function User() {
  const { isAuthenticated, user, logout } = useAuth()
  const [activeSection, setActiveSection] = useState('perfil')

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen pt-24 lg:pt-28 px-6 pb-20 bg-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-white">
          <div className="bg-[linear-gradient(135deg,_#0f172a,_#1d4ed8)] px-8 py-10 text-white">
            <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-3">Area do usuario</p>
            <h1 className="font-display text-4xl mb-3">Minha conta</h1>
            <p className="text-white/80 max-w-2xl">
              Gerencie seus dados de perfil, acompanhe pedidos e consulte seus enderecos.
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
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-6">Dados do perfil</h2>
                  <div className="grid md:grid-cols-2 gap-5">
                    <InfoCard icon={UserRound} label="Nome completo" value={user?.fullName} />
                    <InfoCard icon={Mail} label="Email" value={user?.email} />
                    <InfoCard icon={BadgeCheck} label="Idade" value={`${user?.age} anos`} />
                    <InfoCard icon={CreditCard} label="CPF" value={user?.cpf} />
                    <InfoCard icon={CalendarDays} label="Data de nascimento" value={user?.birthDate} />
                    <InfoCard icon={UserRound} label="Login" value={user?.login} />
                  </div>
                </div>
              )}

              {activeSection === 'pedidos' && (
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-6">Meus Pedidos</h2>
                  <div className="space-y-4">
                    <OrderCard
                      code="#FE-1048"
                      status="Em preparo"
                      date="09/04/2026"
                      total="R$ 3.890,00"
                    />
                    <OrderCard
                      code="#FE-1027"
                      status="Entregue"
                      date="27/03/2026"
                      total="R$ 1.039,00"
                    />
                  </div>
                </div>
              )}

              {activeSection === 'enderecos' && (
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-6">Enderecos</h2>
                  <div className="grid md:grid-cols-2 gap-5">
                    <AddressCard
                      title="Casa"
                      lines={['Rua das Palmeiras, 245', 'Apto 42 - Centro', 'Sao Paulo - SP', 'CEP 01010-100']}
                    />
                    <AddressCard
                      title="Entrega"
                      lines={['Av. Paulista, 1500', 'Conjunto 8', 'Sao Paulo - SP', 'CEP 01310-200']}
                    />
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <Icon className="h-5 w-5 text-blue-600 mb-4" />
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <p className="text-lg font-semibold text-slate-900 break-words">{value}</p>
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

function AddressCard({ title, lines }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-lg font-semibold text-slate-900 mb-3">{title}</p>
      <div className="space-y-1 text-slate-600">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  )
}
