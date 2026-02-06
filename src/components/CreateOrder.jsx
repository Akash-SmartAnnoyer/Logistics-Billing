import React, { useState, useRef, useMemo } from 'react';
import './auth/auth.css';
import ServiceTypeDropdown from './common/ServiceTypeDropdown';

const MEASUREMENT_TYPES = ['BOX', 'PALLET', 'CRATE', 'ENVELOPE', 'TUBE', 'DRUM', 'OTHER'];

/* Icons – stroke currentColor for light/dark theme */
const IconRef = () => <svg className="create-order-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>;
const IconAddress = () => <svg className="create-order-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconMeasure = () => <svg className="create-order-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>;
const IconDoc = () => <svg className="create-order-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const IconLegs = () => <svg className="create-order-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1h1m4-1V6a1 1 0 00-1-1h-1M4 17a1 1 0 001 1h1M4 17v-4m0 0h4m-4 0v4m8 0v-4m0 0h4m-4 0v4" /></svg>;
const IconStorage = () => <svg className="create-order-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const IconNotes = () => <svg className="create-order-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const IconHeader = () => <svg className="create-order-icon create-order-icon-title" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>;
const IconService = () => <svg className="create-order-icon create-order-icon-label" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>;
const IconShipper = () => <svg className="create-order-icon create-order-icon-label" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const IconDocSmall = () => <svg className="create-order-icon create-order-icon-label" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const IconLocation = () => <svg className="create-order-icon create-order-icon-label" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>;
const IconCalendar = () => <svg className="create-order-icon create-order-icon-label" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconClock = () => <svg className="create-order-icon create-order-icon-label" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconUser = () => <svg className="create-order-icon create-order-icon-label" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const IconPhone = () => <svg className="create-order-icon create-order-icon-label" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const IconBuilding = () => <svg className="create-order-icon create-order-icon-label" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const IconArchive = () => <svg className="create-order-icon create-order-icon-title" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const IconPencil = () => <svg className="create-order-icon create-order-icon-title" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;

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
    { key: 'references', label: 'References', Icon: IconRef },
    { key: 'addresses', label: 'Addresses', Icon: IconAddress },
    { key: 'measurements', label: 'Measurements', Icon: IconMeasure },
    { key: 'documents', label: 'Documents', Icon: IconDoc },
    { key: 'legs', label: 'Legs', Icon: IconLegs },
    { key: 'storage', label: 'Storage', Icon: IconStorage },
    { key: 'notes', label: 'Notes', Icon: IconNotes },
  ];

  return (
    <div className="create-order-page">
      {/* Timeline tabs */}
      <div className="create-order-timeline">
        {steps.map((step) => {
          const StepIcon = step.Icon;
          return (
            <button
              key={step.key}
              type="button"
              className={`create-order-tab ${activeStep === step.key ? 'active' : ''}`}
              onClick={() => scrollToSection(step.key)}
            >
              <StepIcon />
              <span>{step.label}</span>
            </button>
          );
        })}
      </div>

      <div className="create-order-content">
        {/* 1. Header + References – single section */}
        <section className={`create-order-card create-order-header-references-card ${activeStep === 'references' ? 'create-order-card-active' : ''}`} ref={(el) => (sectionRefs.current.references = el)}>
          <h3 className="create-order-card-title"><IconHeader /> Header &amp; References</h3>
          <div className="create-order-form-grid">
            <div className="form-group">
              <label className="form-label"><IconService /> Service type</label>
              <ServiceTypeDropdown
                value={serviceType}
                onChange={setServiceType}
                placeholder="Select service type"
              />
            </div>
            <div className="form-group">
              <label className="form-label"><IconShipper /> Shipper</label>
              <select className="form-input" value={shipper} onChange={(e) => setShipper(e.target.value)}>
                <option value="">Select shipper</option>
                <option value="shipper1">Shipper 1</option>
                <option value="shipper2">Shipper 2</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label"><IconDocSmall /> HAWB (House Airway Bill)</label>
              <input type="text" className="form-input" placeholder="HAWB" value={hawb} onChange={(e) => setHawb(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label"><IconDocSmall /> MAWB (Master Airway Bill)</label>
              <input type="text" className="form-input" placeholder="MAWB" value={mawb} onChange={(e) => setMawb(e.target.value)} />
            </div>
          </div>
          <div className="create-order-section-divider" />
          <h4 className="create-order-card-subtitle"><IconRef /> Reference numbers</h4>
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

        {/* 2a. From address – separate section */}
        <section className={`create-order-card ${activeStep === 'addresses' ? 'create-order-card-active' : ''}`} ref={(el) => (sectionRefs.current.addresses = el)}>
          <h3 className="create-order-card-title"><IconAddress /> From address</h3>
          {!serviceType && <p className="create-order-hint">Select a service type above to see address fields.</p>}
          {serviceType && (
            <div className="create-order-form-grid">
              {['companyName', 'address', 'city', 'state', 'zip', 'contact', 'phone'].map((f) => (
                <div key={f} className="form-group">
                  <label className="form-label">{f.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <input type="text" className="form-input" placeholder={f} value={fromAddress[f]} onChange={(e) => setFromAddress((a) => ({ ...a, [f]: e.target.value }))} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 2b. To address – separate section (when multi leg) */}
        {serviceType && isMultiLeg && (
          <section className={`create-order-card ${activeStep === 'addresses' ? 'create-order-card-active' : ''}`} ref={(el) => (sectionRefs.current.toAddress = el)}>
            <h3 className="create-order-card-title"><IconAddress /> To address</h3>
            {needsWarehouse && (
              <p className="create-order-msg create-order-msg-info">Multi-leg with linehaul: second address may be warehouse. Warehouse address is optional below.</p>
            )}
            <div className="create-order-form-grid">
              {['companyName', 'address', 'city', 'state', 'zip', 'contact', 'phone'].map((f) => (
                <div key={f} className="form-group">
                  <label className="form-label">{f.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <input type="text" className="form-input" value={toAddress[f]} onChange={(e) => setToAddress((a) => ({ ...a, [f]: e.target.value }))} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2c. Warehouse address – separate section (when linehaul) */}
        {serviceType && needsWarehouse && (
          <section className={`create-order-card ${activeStep === 'addresses' ? 'create-order-card-active' : ''}`} ref={(el) => (sectionRefs.current.warehouseAddress = el)}>
            <h3 className="create-order-card-title"><IconStorage /> Warehouse address (if linehaul)</h3>
            <div className="create-order-form-grid">
              {['companyName', 'address', 'city', 'state', 'zip', 'contact', 'phone'].map((f) => (
                <div key={f} className="form-group">
                  <label className="form-label">{f.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <input type="text" className="form-input" value={warehouseAddress[f]} onChange={(e) => setWarehouseAddress((a) => ({ ...a, [f]: e.target.value }))} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. Measurements */}
        <section className={`create-order-card ${activeStep === 'measurements' ? 'create-order-card-active' : ''}`} ref={(el) => (sectionRefs.current.measurements = el)}>
          <h3 className="create-order-card-title"><IconMeasure /> Measurements</h3>
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
        <section className={`create-order-card ${activeStep === 'documents' ? 'create-order-card-active' : ''}`} ref={(el) => (sectionRefs.current.documents = el)}>
          <h3 className="create-order-card-title"><IconDoc /> Documents</h3>
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
        <section className={`create-order-card ${activeStep === 'legs' ? 'create-order-card-active' : ''}`} ref={(el) => (sectionRefs.current.legs = el)}>
          <h3 className="create-order-card-title"><IconLegs /> Legs</h3>
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
        <section className={`create-order-card ${activeStep === 'storage' ? 'create-order-card-active' : ''}`} ref={(el) => (sectionRefs.current.storage = el)}>
          <h3 className="create-order-card-title"><IconArchive /> Storage</h3>
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
        <section className={`create-order-card ${activeStep === 'notes' ? 'create-order-card-active' : ''}`} ref={(el) => (sectionRefs.current.notes = el)}>
          <h3 className="create-order-card-title"><IconPencil /> Notes</h3>
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
