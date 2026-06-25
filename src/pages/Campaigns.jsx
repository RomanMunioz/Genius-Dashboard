import { useEffect, useState } from 'react'
import { getCampaigns } from '../services/budgetManagerApi'

const STATUS_BADGE = {
  activa:   'badge-active',
  pausada:  'badge-paused',
  cerrada:  'badge-closed',
  borrador: 'badge-draft',
  active:   'badge-active',
  paused:   'badge-paused',
  closed:   'badge-closed',
  draft:    'badge-draft',
}

export default function Campaigns() {
  const [campaigns, setCampaigns]       = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)
  const [clientFilter, setClientFilter] = useState('')

  useEffect(() => {
    getCampaigns()
      .then(setCampaigns)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const clients = [...new Set(campaigns.map(c => c.client).filter(Boolean))].sort()

  const filtered = clientFilter
    ? campaigns.filter(c => c.client === clientFilter)
    : campaigns

  if (loading) return <p className="state-msg">Cargando campañas...</p>
  if (error)   return <p className="state-msg error">Error: {error.message}</p>

  return (
    <main className="page">
      <div className="page-toolbar">
        <h1 style={{ margin: 0 }}>Campañas</h1>
        <div className="toolbar-actions">
          <select
            className="filter-input"
            value={clientFilter}
            onChange={e => setClientFilter(e.target.value)}
          >
            <option value="">Todos los clientes</option>
            {clients.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button className="btn-danger" onClick={() => alert('Función de crear campaña no implementada aún.')}>
            + Nueva campaña
          </button>
        </div>
      </div>

      <div className="item-list">
        {filtered.length === 0 && (
          <p className="state-msg">
            {clientFilter ? `Sin campañas para "${clientFilter}".` : 'No hay campañas registradas.'}
          </p>
        )}
        {filtered.map(c => (
          <div key={c.id} className="item-card">
            <div>
              <div className="item-name">{c.name}</div>
              <div className="item-meta">{c.client} · {c.type}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className={`badge ${STATUS_BADGE[c.status] ?? 'badge-draft'}`}>
                {c.status}
              </span>
              <div className="item-meta" style={{ marginTop: 6 }}>
                ${(c.budget ?? 0).toLocaleString()} presupuesto
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}