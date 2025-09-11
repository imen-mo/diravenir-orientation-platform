import React, { useState, useMemo } from 'react';
import './ModernCountrySelector.css';

const countries = [
  { code: 'MA', name: 'Morocco', flag: 'https://flagcdn.com/w40/ma.png' },
  { code: 'CN', name: 'China', flag: 'https://flagcdn.com/w40/cn.png' },
  { code: 'US', name: 'United States', flag: 'https://flagcdn.com/w40/us.png' },
  { code: 'CA', name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png' },
  { code: 'GB', name: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'FR', name: 'France', flag: 'https://flagcdn.com/w40/fr.png' },
  { code: 'DE', name: 'Germany', flag: 'https://flagcdn.com/w40/de.png' },
  { code: 'ES', name: 'Spain', flag: 'https://flagcdn.com/w40/es.png' },
  { code: 'IT', name: 'Italy', flag: 'https://flagcdn.com/w40/it.png' },
  { code: 'NL', name: 'Netherlands', flag: 'https://flagcdn.com/w40/nl.png' },
  { code: 'BE', name: 'Belgium', flag: 'https://flagcdn.com/w40/be.png' },
  { code: 'CH', name: 'Switzerland', flag: 'https://flagcdn.com/w40/ch.png' },
  { code: 'AT', name: 'Austria', flag: 'https://flagcdn.com/w40/at.png' },
  { code: 'SE', name: 'Sweden', flag: 'https://flagcdn.com/w40/se.png' },
  { code: 'NO', name: 'Norway', flag: 'https://flagcdn.com/w40/no.png' },
  { code: 'DK', name: 'Denmark', flag: 'https://flagcdn.com/w40/dk.png' },
  { code: 'FI', name: 'Finland', flag: 'https://flagcdn.com/w40/fi.png' },
  { code: 'PL', name: 'Poland', flag: 'https://flagcdn.com/w40/pl.png' },
  { code: 'CZ', name: 'Czech Republic', flag: 'https://flagcdn.com/w40/cz.png' },
  { code: 'HU', name: 'Hungary', flag: 'https://flagcdn.com/w40/hu.png' },
  { code: 'RO', name: 'Romania', flag: 'https://flagcdn.com/w40/ro.png' },
  { code: 'BG', name: 'Bulgaria', flag: 'https://flagcdn.com/w40/bg.png' },
  { code: 'HR', name: 'Croatia', flag: 'https://flagcdn.com/w40/hr.png' },
  { code: 'SI', name: 'Slovenia', flag: 'https://flagcdn.com/w40/si.png' },
  { code: 'SK', name: 'Slovakia', flag: 'https://flagcdn.com/w40/sk.png' },
  { code: 'LT', name: 'Lithuania', flag: 'https://flagcdn.com/w40/lt.png' },
  { code: 'LV', name: 'Latvia', flag: 'https://flagcdn.com/w40/lv.png' },
  { code: 'EE', name: 'Estonia', flag: 'https://flagcdn.com/w40/ee.png' },
  { code: 'IE', name: 'Ireland', flag: 'https://flagcdn.com/w40/ie.png' },
  { code: 'PT', name: 'Portugal', flag: 'https://flagcdn.com/w40/pt.png' },
  { code: 'GR', name: 'Greece', flag: 'https://flagcdn.com/w40/gr.png' },
  { code: 'CY', name: 'Cyprus', flag: 'https://flagcdn.com/w40/cy.png' },
  { code: 'MT', name: 'Malta', flag: 'https://flagcdn.com/w40/mt.png' },
  { code: 'LU', name: 'Luxembourg', flag: 'https://flagcdn.com/w40/lu.png' },
  { code: 'JP', name: 'Japan', flag: 'https://flagcdn.com/w40/jp.png' },
  { code: 'KR', name: 'South Korea', flag: 'https://flagcdn.com/w40/kr.png' },
  { code: 'SG', name: 'Singapore', flag: 'https://flagcdn.com/w40/sg.png' },
  { code: 'AU', name: 'Australia', flag: 'https://flagcdn.com/w40/au.png' },
  { code: 'NZ', name: 'New Zealand', flag: 'https://flagcdn.com/w40/nz.png' },
  { code: 'BR', name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png' },
  { code: 'AR', name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png' },
  { code: 'MX', name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png' },
  { code: 'CL', name: 'Chile', flag: 'https://flagcdn.com/w40/cl.png' },
  { code: 'CO', name: 'Colombia', flag: 'https://flagcdn.com/w40/co.png' },
  { code: 'PE', name: 'Peru', flag: 'https://flagcdn.com/w40/pe.png' },
  { code: 'VE', name: 'Venezuela', flag: 'https://flagcdn.com/w40/ve.png' },
  { code: 'UY', name: 'Uruguay', flag: 'https://flagcdn.com/w40/uy.png' },
  { code: 'PY', name: 'Paraguay', flag: 'https://flagcdn.com/w40/py.png' },
  { code: 'BO', name: 'Bolivia', flag: 'https://flagcdn.com/w40/bo.png' },
  { code: 'EC', name: 'Ecuador', flag: 'https://flagcdn.com/w40/ec.png' },
  { code: 'IN', name: 'India', flag: 'https://flagcdn.com/w40/in.png' },
  { code: 'PK', name: 'Pakistan', flag: 'https://flagcdn.com/w40/pk.png' },
  { code: 'BD', name: 'Bangladesh', flag: 'https://flagcdn.com/w40/bd.png' },
  { code: 'LK', name: 'Sri Lanka', flag: 'https://flagcdn.com/w40/lk.png' },
  { code: 'NP', name: 'Nepal', flag: 'https://flagcdn.com/w40/np.png' },
  { code: 'BT', name: 'Bhutan', flag: 'https://flagcdn.com/w40/bt.png' },
  { code: 'MV', name: 'Maldives', flag: 'https://flagcdn.com/w40/mv.png' },
  { code: 'TH', name: 'Thailand', flag: 'https://flagcdn.com/w40/th.png' },
  { code: 'VN', name: 'Vietnam', flag: 'https://flagcdn.com/w40/vn.png' },
  { code: 'MY', name: 'Malaysia', flag: 'https://flagcdn.com/w40/my.png' },
  { code: 'ID', name: 'Indonesia', flag: 'https://flagcdn.com/w40/id.png' },
  { code: 'PH', name: 'Philippines', flag: 'https://flagcdn.com/w40/ph.png' },
  { code: 'MM', name: 'Myanmar', flag: 'https://flagcdn.com/w40/mm.png' },
  { code: 'KH', name: 'Cambodia', flag: 'https://flagcdn.com/w40/kh.png' },
  { code: 'LA', name: 'Laos', flag: 'https://flagcdn.com/w40/la.png' },
  { code: 'BN', name: 'Brunei', flag: 'https://flagcdn.com/w40/bn.png' },
  { code: 'SA', name: 'Saudi Arabia', flag: 'https://flagcdn.com/w40/sa.png' },
  { code: 'AE', name: 'United Arab Emirates', flag: 'https://flagcdn.com/w40/ae.png' },
  { code: 'QA', name: 'Qatar', flag: 'https://flagcdn.com/w40/qa.png' },
  { code: 'KW', name: 'Kuwait', flag: 'https://flagcdn.com/w40/kw.png' },
  { code: 'BH', name: 'Bahrain', flag: 'https://flagcdn.com/w40/bh.png' },
  { code: 'OM', name: 'Oman', flag: 'https://flagcdn.com/w40/om.png' },
  { code: 'YE', name: 'Yemen', flag: 'https://flagcdn.com/w40/ye.png' },
  { code: 'IQ', name: 'Iraq', flag: 'https://flagcdn.com/w40/iq.png' },
  { code: 'IR', name: 'Iran', flag: 'https://flagcdn.com/w40/ir.png' },
  { code: 'TR', name: 'Turkey', flag: 'https://flagcdn.com/w40/tr.png' },
  { code: 'IL', name: 'Israel', flag: 'https://flagcdn.com/w40/il.png' },
  { code: 'JO', name: 'Jordan', flag: 'https://flagcdn.com/w40/jo.png' },
  { code: 'LB', name: 'Lebanon', flag: 'https://flagcdn.com/w40/lb.png' },
  { code: 'SY', name: 'Syria', flag: 'https://flagcdn.com/w40/sy.png' },
  { code: 'EG', name: 'Egypt', flag: 'https://flagcdn.com/w40/eg.png' },
  { code: 'LY', name: 'Libya', flag: 'https://flagcdn.com/w40/ly.png' },
  { code: 'TN', name: 'Tunisia', flag: 'https://flagcdn.com/w40/tn.png' },
  { code: 'DZ', name: 'Algeria', flag: 'https://flagcdn.com/w40/dz.png' },
  { code: 'SD', name: 'Sudan', flag: 'https://flagcdn.com/w40/sd.png' },
  { code: 'ET', name: 'Ethiopia', flag: 'https://flagcdn.com/w40/et.png' },
  { code: 'KE', name: 'Kenya', flag: 'https://flagcdn.com/w40/ke.png' },
  { code: 'UG', name: 'Uganda', flag: 'https://flagcdn.com/w40/ug.png' },
  { code: 'TZ', name: 'Tanzania', flag: 'https://flagcdn.com/w40/tz.png' },
  { code: 'RW', name: 'Rwanda', flag: 'https://flagcdn.com/w40/rw.png' },
  { code: 'GH', name: 'Ghana', flag: 'https://flagcdn.com/w40/gh.png' },
  { code: 'NG', name: 'Nigeria', flag: 'https://flagcdn.com/w40/ng.png' },
  { code: 'ZA', name: 'South Africa', flag: 'https://flagcdn.com/w40/za.png' },
  { code: 'ZW', name: 'Zimbabwe', flag: 'https://flagcdn.com/w40/zw.png' },
  { code: 'BW', name: 'Botswana', flag: 'https://flagcdn.com/w40/bw.png' },
  { code: 'NA', name: 'Namibia', flag: 'https://flagcdn.com/w40/na.png' },
  { code: 'ZM', name: 'Zambia', flag: 'https://flagcdn.com/w40/zm.png' },
  { code: 'MW', name: 'Malawi', flag: 'https://flagcdn.com/w40/mw.png' },
  { code: 'MZ', name: 'Mozambique', flag: 'https://flagcdn.com/w40/mz.png' },
  { code: 'MG', name: 'Madagascar', flag: 'https://flagcdn.com/w40/mg.png' },
  { code: 'MU', name: 'Mauritius', flag: 'https://flagcdn.com/w40/mu.png' },
  { code: 'SC', name: 'Seychelles', flag: 'https://flagcdn.com/w40/sc.png' },
  { code: 'RU', name: 'Russia', flag: 'https://flagcdn.com/w40/ru.png' },
  { code: 'UA', name: 'Ukraine', flag: 'https://flagcdn.com/w40/ua.png' },
  { code: 'BY', name: 'Belarus', flag: 'https://flagcdn.com/w40/by.png' },
  { code: 'MD', name: 'Moldova', flag: 'https://flagcdn.com/w40/md.png' },
  { code: 'GE', name: 'Georgia', flag: 'https://flagcdn.com/w40/ge.png' },
  { code: 'AM', name: 'Armenia', flag: 'https://flagcdn.com/w40/am.png' },
  { code: 'AZ', name: 'Azerbaijan', flag: 'https://flagcdn.com/w40/az.png' },
  { code: 'KZ', name: 'Kazakhstan', flag: 'https://flagcdn.com/w40/kz.png' },
  { code: 'UZ', name: 'Uzbekistan', flag: 'https://flagcdn.com/w40/uz.png' },
  { code: 'TM', name: 'Turkmenistan', flag: 'https://flagcdn.com/w40/tm.png' },
  { code: 'TJ', name: 'Tajikistan', flag: 'https://flagcdn.com/w40/tj.png' },
  { code: 'KG', name: 'Kyrgyzstan', flag: 'https://flagcdn.com/w40/kg.png' },
  { code: 'MN', name: 'Mongolia', flag: 'https://flagcdn.com/w40/mn.png' },
  { code: 'AF', name: 'Afghanistan', flag: 'https://flagcdn.com/w40/af.png' }
];

const ModernCountrySelector = ({ value, onChange, placeholder = "Select a country", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries;
    return countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const selectedCountry = countries.find(country => country.name === value);

  const handleSelect = (country) => {
    onChange(country.name);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  return (
    <div className={`modern-country-selector ${className}`}>
      <div 
        className={`selector-trigger ${isOpen ? 'open' : ''}`}
        onClick={handleToggle}
      >
        <div className="selected-content">
          {selectedCountry ? (
            <>
              <img 
                src={selectedCountry.flag} 
                alt={selectedCountry.name}
                className="flag-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="flag-fallback" style={{ display: 'none' }}>
                {selectedCountry.code}
              </span>
              <span className="country-name">{selectedCountry.name}</span>
            </>
          ) : (
            <span className="placeholder">{placeholder}</span>
          )}
        </div>
        <div className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              autoFocus
            />
            <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          
          <div className="countries-list">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <div
                  key={country.code}
                  className={`country-option ${selectedCountry?.code === country.code ? 'selected' : ''}`}
                  onClick={() => handleSelect(country)}
                >
                  <img 
                    src={country.flag} 
                    alt={country.name}
                    className="flag-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="flag-fallback" style={{ display: 'none' }}>
                    {country.code}
                  </span>
                  <span className="country-name">{country.name}</span>
                  {selectedCountry?.code === country.code && (
                    <svg className="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              ))
            ) : (
              <div className="no-results">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>No countries found</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernCountrySelector;
