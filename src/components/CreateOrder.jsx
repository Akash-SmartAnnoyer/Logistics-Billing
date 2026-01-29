import React, { useState, useRef, useMemo } from 'react';
import './auth/auth.css';

const SERVICE_TYPES = [
  { value: 'pickup_only', label: 'Pickup only' },
  { value: 'delivery_only', label: 'Delivery only' },
  { value: 'pickup_delivery', label: 'Pickup + Delivery' },
  { value: 'pickup_linehaul', label: 'Pickup + Linehaul (PU+LH)' },
  { value: 'linehaul_delivery', label: 'Linehaul + Delivery (LH+DL)' },
  { value: 'full_service', label: 'Full service (PU+LH+DL)' },
];

const MEASUREMENT_TYPES = ['BOX', 'PALLET', 'CRATE', 'ENVELOPE', 'TUBE', 'DRUM', 'OTHER'];

const CreateOrder = ({ onCancel, onSave }) => {
  const [activeStep, setActiveStep] = useState('references');
  const [serviceType, setServiceType] = useState('');
  const [shipper, setShipper] = useState('');
  const [hawb, setHawb] = useState('');
  const [mawb, setMawb] = useState('');
  const [references, setReferences] = useState(['']);
  const [hazmat, setHazmat] = useState(false);
  const [tsa, setTsa] = useState(false);
  const [fragile, setFragile] = useState(false);
  const [priority, setPriority] = useState(false);

  const [fromAddress, setFromAddress] = useState({ companyName: '', address: '', city: '', state: '', zip: '', contact: '', phone: '' });
  const [toAddress, setToAddress] = useState({ companyName: '', address: '', city: '', state: '', zip: '', contact: '', phone: '' });
  const [warehouseAddress, setWarehouseAddress] = useState({ companyName: '', address: '', city: '', state: '', zip: '', contact: '', phone: '' });

  const [legs, setLegs] = useState([
    { from: {}, to: {}, serviceDate: '', apptTime: '', driverName: '', timeIn: '', timeOut: '', phone: '' },
    { from: {}, to: {}, serviceDate: '', apptTime: '', driverName: '', timeIn: '', timeOut: '', phone: '' },
  ]);

  const [measurementLines, setMeasurementLines] = useState([
    { qty: 1, type: 'BOX', l: '', w: '', h: '', wt: '' },
  ]);

  const [documents, setDocuments] = useState([]);
  const [storage, setStorage] = useState({
    terminal: '', storageLocation: '', lastUpdate: '', updatedBy: '', source: '',
    startDate: '', startTime: '', endDate: '', endTime: '', storageDays: '', specialInstructions: '',
  });
  const [notes, setNotes] = useState('');

  const sectionRefs = useRef({});

  const isMultiLeg = useMemo(() => {
    return ['pickup_delivery', 'pickup_linehaul', 'linehaul_delivery', 'full_service'].includes(serviceType);
  }, [serviceType]);

  const needsWarehouse = useMemo(() => {
    return ['pickup_linehaul', 'linehaul_delivery', 'full_service'].includes(serviceType);
  }, [serviceType]);

  const legCount = useMemo(() => {
    if (serviceType === 'pickup_delivery') return 2;
    if (['pickup_linehaul', 'linehaul_delivery', 'full_service'].includes(serviceType)) return 2;
    return 1;
  }, [serviceType]);

  const scrollToSection = (key) => {
    setActiveStep(key);
    sectionRefs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const addReference = () => setReferences((r) => [...r, '']);
  const updateReference = (i, v) => setReferences((r) => r.map((x, j) => (j === i ? v : x)));
  const removeReference = (i) => setReferences((r) => r.filter((_, j) => j !== i));

  const addMeasurementLine = () => setMeasurementLines((m) => [...m, { qty: 1, type: 'BOX', l: '', w: '', h: '', wt: '' }]);
  const updateMeasurementLine = (i, field, value) => setMeasurementLines((m) => m.map((line, j) => (j === i ? { ...line, [field]: value } : line)));
  const removeMeasurementLine = (i) => setMeasurementLines((m) => m.filter((_, j) => j !== i));

  const totals = useMemo(() => {
    let pieces = 0, weight = 0, volume = 0;
    measurementLines.forEach((line) => {
      const q = Number(line.qty) || 0;
      const l = Number(line.l) || 0, w = Number(line.w) || 0, h = Number(line.h) || 0, wt = Number(line.wt) || 0;
      pieces += q;
      weight += q * wt;
      volume += (l * w * h * q) / 1728; // cu ft
    });
    return { pieces, weight, volume: volume.toFixed(2) };
  }, [measurementLines]);

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer?.files || e.target?.files || []);
    setDocuments((d) => [...d, ...files.map((f) => ({ file: f, name: f.name }))]);
  };

  const steps = [
    { key: 'references', label: 'References' },
    { key: 'addresses', label: 'Addresses' },
    { key: 'measurements', label: 'Measurements' },
    { key: 'documents', label: 'Documents' },
    { key: 'legs', label: 'Legs' },
    { key: 'storage', label: 'Storage' },
    { key: 'notes', label: 'Notes' },
  ];

  return (
    <div className="create-order-page">
      <div className="create-order-header">
        <button type="button" className="create-order-back" onClick={onCancel}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Orders
        </button>
        <h1 className="create-order-title">Create Order</h1>
      </div>

      {/* Timeline tabs */}
      <div className="create-order-timeline">
        {steps.map((step) => (
          <button
            key={step.key}
            type="button"
            className={`create-order-tab ${activeStep === step.key ? 'active' : ''}`}
            onClick={() => scrollToSection(step.key)}
          >
            {step.label}
          </button>
        ))}
      </div>

      <div className="create-order-content">
        {/* Header: Service type, Shipper, HAWB, MAWB */}
        <div className="create-order-card create-order-header-card">
          <h3 className="create-order-card-title">Order header</h3>
          <div className="create-order-form-grid">
            <div className="form-group">
              <label className="form-label">Service type</label>
              <select className="form-input" value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                <option value="">Select service type</option>
                {SERVICE_TYPES.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Shipper</label>
              <select className="form-input" value={shipper} onChange={(e) => setShipper(e.target.value)}>
                <option value="">Select shipper</option>
                <option value="shipper1">Shipper 1</option>
                <option value="shipper2">Shipper 2</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">HAWB (House Airway Bill)</label>
              <input type="text" className="form-input" placeholder="HAWB" value={hawb} onChange={(e) => setHawb(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">MAWB (Master Airway Bill)</label>
              <input type="text" className="form-input" placeholder="MAWB" value={mawb} onChange={(e) => setMawb(e.target.value)} />
            </div>
          </div>
        </div>

        {/* 1. References */}
        <section className="create-order-card" ref={(el) => (sectionRefs.current.references = el)}>
          <h3 className="create-order-card-title">1. References</h3>
          <div className="create-order-form-grid">
            {references.map((ref, i) => (
              <div key={i} className="form-group form-group-inline">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Reference number"
                  value={ref}
                  onChange={(e) => updateReference(i, e.target.value)}
                />
                <button type="button" className="create-order-btn-icon" onClick={() => removeReference(i)} title="Remove">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
            <div className="form-group">
              <button type="button" className="create-order-btn-secondary" onClick={addReference}>+ Add reference</button>
            </div>
          </div>
          <div className="create-order-toggles">
            <label className="create-order-toggle">
              <input type="checkbox" checked={hazmat} onChange={(e) => setHazmat(e.target.checked)} />
              <span>HAZMAT</span>
            </label>
            <label className="create-order-toggle">
              <input type="checkbox" checked={tsa} onChange={(e) => setTsa(e.target.checked)} />
              <span>TSA</span>
            </label>
            <label className="create-order-toggle">
              <input type="checkbox" checked={fragile} onChange={(e) => setFragile(e.target.checked)} />
              <span>FRAGILE</span>
            </label>
            <label className="create-order-toggle">
              <input type="checkbox" checked={priority} onChange={(e) => setPriority(e.target.checked)} />
              <span>PRIORITY</span>
            </label>
          </div>
        </section>

        {/* 2. Addresses */}
        <section className="create-order-card" ref={(el) => (sectionRefs.current.addresses = el)}>
          <h3 className="create-order-card-title">2. Addresses</h3>
          {!serviceType && <p className="create-order-hint">Select a service type above to see address fields.</p>}
          {serviceType && (
            <>
              {isMultiLeg && needsWarehouse && (
                <p className="create-order-msg create-order-msg-info">Multi-leg with linehaul: second address may be warehouse. Warehouse address is optional below.</p>
              )}
              <div className="create-order-form-grid">
                <h4 className="create-order-subtitle">From address</h4>
                {['companyName', 'address', 'city', 'state', 'zip', 'contact', 'phone'].map((f) => (
                  <div key={f} className="form-group">
                    <label className="form-label">{f.replace(/([A-Z])/g, ' $1').trim()}</label>
                    <input type="text" className="form-input" placeholder={f} value={fromAddress[f]} onChange={(e) => setFromAddress((a) => ({ ...a, [f]: e.target.value }))} />
                  </div>
                ))}
              </div>
              {isMultiLeg && (
                <div className="create-order-form-grid">
                  <h4 className="create-order-subtitle">To address</h4>
                  {['companyName', 'address', 'city', 'state', 'zip', 'contact', 'phone'].map((f) => (
                    <div key={f} className="form-group">
                      <label className="form-label">{f.replace(/([A-Z])/g, ' $1').trim()}</label>
                      <input type="text" className="form-input" value={toAddress[f]} onChange={(e) => setToAddress((a) => ({ ...a, [f]: e.target.value }))} />
                    </div>
                  ))}
                </div>
              )}
              {needsWarehouse && (
                <div className="create-order-form-grid">
                  <h4 className="create-order-subtitle">Warehouse address (if linehaul)</h4>
                  {['companyName', 'address', 'city', 'state', 'zip', 'contact', 'phone'].map((f) => (
                    <div key={f} className="form-group">
                      <label className="form-label">{f.replace(/([A-Z])/g, ' $1').trim()}</label>
                      <input type="text" className="form-input" value={warehouseAddress[f]} onChange={(e) => setWarehouseAddress((a) => ({ ...a, [f]: e.target.value }))} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        {/* 3. Measurements */}
        <section className="create-order-card" ref={(el) => (sectionRefs.current.measurements = el)}>
          <h3 className="create-order-card-title">3. Measurements</h3>
          <div className="create-order-table-wrap">
            <table className="create-order-table">
              <thead>
                <tr>
                  <th>QTY</th>
                  <th>Type</th>
                  <th>L (in)</th>
                  <th>W (in)</th>
                  <th>H (in)</th>
                  <th>Wt (lbs)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {measurementLines.map((line, i) => (
                  <tr key={i}>
                    <td><input type="number" min="1" className="form-input form-input-sm" value={line.qty} onChange={(e) => updateMeasurementLine(i, 'qty', e.target.value)} /></td>
                    <td>
                      <select className="form-input form-input-sm" value={line.type} onChange={(e) => updateMeasurementLine(i, 'type', e.target.value)}>
                        {MEASUREMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </td>
                    <td><input type="number" className="form-input form-input-sm" placeholder="L" value={line.l} onChange={(e) => updateMeasurementLine(i, 'l', e.target.value)} /></td>
                    <td><input type="number" className="form-input form-input-sm" placeholder="W" value={line.w} onChange={(e) => updateMeasurementLine(i, 'w', e.target.value)} /></td>
                    <td><input type="number" className="form-input form-input-sm" placeholder="H" value={line.h} onChange={(e) => updateMeasurementLine(i, 'h', e.target.value)} /></td>
                    <td><input type="number" className="form-input form-input-sm" placeholder="Wt" value={line.wt} onChange={(e) => updateMeasurementLine(i, 'wt', e.target.value)} /></td>
                    <td>
                      <button type="button" className="create-order-btn-icon" onClick={() => removeMeasurementLine(i)}><svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" className="create-order-btn-secondary" onClick={addMeasurementLine}>+ Add line</button>
          <div className="create-order-totals">
            <span>Total pieces: <strong>{totals.pieces}</strong></span>
            <span>Total weight: <strong>{totals.weight} lbs</strong></span>
            <span>Volume: <strong>{totals.volume} cu ft</strong></span>
          </div>
        </section>

        {/* 4. Documents */}
        <section className="create-order-card" ref={(el) => (sectionRefs.current.documents = el)}>
          <h3 className="create-order-card-title">4. Documents</h3>
          <div
            className="create-order-dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
          >
            <input type="file" multiple className="create-order-file-input" onChange={handleFileDrop} />
            <p>Drop PODs, BOLs, or other documents here, or click to browse</p>
          </div>
          {documents.length > 0 && (
            <ul className="create-order-doc-list">
              {documents.map((d, i) => (
                <li key={i}>{d.name || d.file?.name}</li>
              ))}
            </ul>
          )}
        </section>

        {/* 5. Legs */}
        <section className="create-order-card" ref={(el) => (sectionRefs.current.legs = el)}>
          <h3 className="create-order-card-title">5. Legs</h3>
          {!serviceType && <p className="create-order-hint">Select a service type to configure legs.</p>}
          {serviceType && legCount >= 1 && (
            <div className="create-order-legs">
              {legs.slice(0, legCount).map((leg, idx) => (
                <div key={idx} className="create-order-leg-card">
                  <h4>Leg {idx + 1}</h4>
                  <div className="create-order-form-grid">
                    <div className="form-group full-width">
                      <label className="form-label">From address</label>
                      <input type="text" className="form-input" placeholder="From" value={leg.from?.address} onChange={(e) => setLegs((l) => l.map((leg, j) => j === idx ? { ...leg, from: { ...leg.from, address: e.target.value } } : leg))} />
                    </div>
                    <div className="form-group full-width">
                      <label className="form-label">To address</label>
                      <input type="text" className="form-input" placeholder="To" value={leg.to?.address} onChange={(e) => setLegs((l) => l.map((leg, j) => j === idx ? { ...leg, to: { ...leg.to, address: e.target.value } } : leg))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Service date</label>
                      <input type="date" className="form-input" value={leg.serviceDate} onChange={(e) => setLegs((l) => l.map((leg, j) => j === idx ? { ...leg, serviceDate: e.target.value } : leg))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Appt time</label>
                      <input type="time" className="form-input" value={leg.apptTime} onChange={(e) => setLegs((l) => l.map((leg, j) => j === idx ? { ...leg, apptTime: e.target.value } : leg))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Driver name</label>
                      <input type="text" className="form-input" value={leg.driverName} onChange={(e) => setLegs((l) => l.map((leg, j) => j === idx ? { ...leg, driverName: e.target.value } : leg))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Time in</label>
                      <input type="time" className="form-input" value={leg.timeIn} onChange={(e) => setLegs((l) => l.map((leg, j) => j === idx ? { ...leg, timeIn: e.target.value } : leg))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Time out</label>
                      <input type="time" className="form-input" value={leg.timeOut} onChange={(e) => setLegs((l) => l.map((leg, j) => j === idx ? { ...leg, timeOut: e.target.value } : leg))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input type="tel" className="form-input" value={leg.phone} onChange={(e) => setLegs((l) => l.map((leg, j) => j === idx ? { ...leg, phone: e.target.value } : leg))} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 6. Storage */}
        <section className="create-order-card" ref={(el) => (sectionRefs.current.storage = el)}>
          <h3 className="create-order-card-title">6. Storage</h3>
          <div className="create-order-form-grid">
            <div className="form-group">
              <label className="form-label">Terminal</label>
              <select className="form-input" value={storage.terminal} onChange={(e) => setStorage((s) => ({ ...s, terminal: e.target.value }))}>
                <option value="">Select terminal</option>
                <option value="T1">Terminal 1</option>
                <option value="T2">Terminal 2</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Storage location</label>
              <select className="form-input" value={storage.storageLocation} onChange={(e) => setStorage((s) => ({ ...s, storageLocation: e.target.value }))}>
                <option value="">Select location</option>
                <option value="A1">Location A1</option>
                <option value="A2">Location A2</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Last storage update</label>
              <input type="datetime-local" className="form-input" value={storage.lastUpdate} onChange={(e) => setStorage((s) => ({ ...s, lastUpdate: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Updated by</label>
              <input type="text" className="form-input" value={storage.updatedBy} onChange={(e) => setStorage((s) => ({ ...s, updatedBy: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Source</label>
              <input type="text" className="form-input" value={storage.source} onChange={(e) => setStorage((s) => ({ ...s, source: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Start date</label>
              <input type="date" className="form-input" value={storage.startDate} onChange={(e) => setStorage((s) => ({ ...s, startDate: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Start time</label>
              <input type="time" className="form-input" value={storage.startTime} onChange={(e) => setStorage((s) => ({ ...s, startTime: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">End date</label>
              <input type="date" className="form-input" value={storage.endDate} onChange={(e) => setStorage((s) => ({ ...s, endDate: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">End time</label>
              <input type="time" className="form-input" value={storage.endTime} onChange={(e) => setStorage((s) => ({ ...s, endTime: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Storage days</label>
              <input type="number" className="form-input" value={storage.storageDays} onChange={(e) => setStorage((s) => ({ ...s, storageDays: e.target.value }))} placeholder="Days" />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Special instructions</label>
              <textarea className="form-input" rows={2} value={storage.specialInstructions} onChange={(e) => setStorage((s) => ({ ...s, specialInstructions: e.target.value }))} placeholder="Storage notes" />
            </div>
          </div>
        </section>

        {/* 7. Notes */}
        <section className="create-order-card" ref={(el) => (sectionRefs.current.notes = el)}>
          <h3 className="create-order-card-title">7. Notes</h3>
          <div className="form-group">
            <label className="form-label">Special handling instructions, access codes, delivery notes</label>
            <textarea className="form-input create-order-notes-input" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Enter any special handling instructions, access codes, delivery notes, etc." />
          </div>
        </section>

        <div className="create-order-actions">
          <button type="button" className="create-order-btn-cancel" onClick={onCancel}>Cancel</button>
          <button type="button" className="create-order-btn-save" onClick={() => onSave?.()}>Save Order</button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
