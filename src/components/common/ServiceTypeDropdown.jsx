import React, { useState, useRef, useEffect } from 'react';
import { SERVICE_TYPES, getServiceType } from '../../constants/serviceTypes';
import './ServiceTypeDropdown.css';

/**
 * Stylish service type dropdown – letter badge + code + label.
 * Use this across the app for consistent service type selection.
 */
const ServiceTypeDropdown = ({ value, onChange, placeholder = 'Select service type', className = '', disabled = false }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const selected = getServiceType(value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  const handleSelect = (opt) => {
    onChange?.(opt.value);
    setOpen(false);
  };

  return (
    <div className={`service-type-dropdown ${open ? 'open' : ''} ${className}`} ref={containerRef}>
      <button
        type="button"
        className="service-type-dropdown-trigger"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={selected ? selected.label : placeholder}
      >
        {selected ? (
          <>
            <span
              className="service-type-badge service-type-badge-trigger"
              style={{ backgroundColor: selected.bgColor, color: selected.textColor }}
            >
              {selected.letter}
            </span>
            <span className="service-type-trigger-label">
              <span className="service-type-trigger-code">{selected.code}</span>
              <span className="service-type-trigger-text">{selected.label}</span>
            </span>
          </>
        ) : (
          <span className="service-type-placeholder">{placeholder}</span>
        )}
        <span className="service-type-dropdown-chevron" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="service-type-dropdown-list" role="listbox">
          {SERVICE_TYPES.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={value === opt.value}
              className={`service-type-option ${value === opt.value ? 'selected' : ''}`}
              onClick={() => handleSelect(opt)}
            >
              <span
                className="service-type-badge"
                style={{ backgroundColor: opt.bgColor, color: opt.textColor }}
              >
                {opt.letter}
              </span>
              <span className="service-type-option-content">
                <span className="service-type-option-code">{opt.code}</span>
                <span className="service-type-option-label">{opt.label}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceTypeDropdown;
