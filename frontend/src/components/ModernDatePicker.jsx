import React, { useState, useRef, useEffect } from 'react';
import './ModernDatePicker.css';

const ModernDatePicker = ({ 
  value, 
  onChange, 
  placeholder = "Select date", 
  className = "",
  minDate = null,
  maxDate = null,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const datePickerRef = useRef(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date);
      onChange(date.toISOString().split('T')[0]);
      setIsOpen(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const navigateYear = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setFullYear(prev.getFullYear() + direction);
      return newDate;
    });
  };

  const selectYear = (year) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setFullYear(year);
      return newDate;
    });
    setShowYearSelector(false);
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 100; year <= currentYear + 10; year++) {
      years.push(year);
    }
    return years;
  };

  const handleToday = () => {
    const today = new Date();
    setSelectedDate(today);
    onChange(today.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const formatDisplayDate = (date) => {
    if (!date) return placeholder;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isDateDisabled = (date) => {
    if (!date) return false;
    
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    
    return false;
  };

  const isDateSelected = (date) => {
    if (!selectedDate || !date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const daysInMonth = getDaysInMonth(currentMonth);

  return (
    <div className={`modern-date-picker ${className}`} ref={datePickerRef}>
      <div 
        className={`date-picker-trigger ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="selected-date">
          <svg className="calendar-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 2V4M14 2V4M5 4H15C16.1046 4 17 4.89543 17 6V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 8H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="date-text">{formatDisplayDate(selectedDate)}</span>
        </div>
        <div className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="date-picker-dropdown">
          <div className="calendar-header">
            <button 
              className="nav-button prev" 
              onClick={handlePrevMonth}
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="month-year">
              <span className="month">{months[currentMonth.getMonth()]}</span>
              <span 
                className="year" 
                onClick={() => setShowYearSelector(!showYearSelector)}
                title="Click to change year"
              >
                {currentMonth.getFullYear()}
              </span>
            </div>
            
            <button 
              className="nav-button next" 
              onClick={handleNextMonth}
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {showYearSelector && (
            <div className="year-selector">
              <div className="year-selector-header">
                <button 
                  className="nav-button" 
                  onClick={() => navigateYear(-10)}
                  type="button"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 12L2 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <span className="year-range">
                  {currentMonth.getFullYear() - 5} - {currentMonth.getFullYear() + 5}
                </span>
                <button 
                  className="nav-button" 
                  onClick={() => navigateYear(10)}
                  type="button"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 4L14 8L10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="year-grid">
                {Array.from({ length: 11 }, (_, i) => {
                  const year = currentMonth.getFullYear() - 5 + i;
                  return (
                    <button
                      key={year}
                      className={`year-option ${year === currentMonth.getFullYear() ? 'selected' : ''}`}
                      onClick={() => selectYear(year)}
                      type="button"
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className="calendar-weekdays">
            {days.map(day => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>

          <div className="calendar-days">
            {daysInMonth.map((date, index) => (
              <button
                key={index}
                className={`calendar-day ${!date ? 'empty' : ''} ${isDateSelected(date) ? 'selected' : ''} ${isToday(date) ? 'today' : ''} ${isDateDisabled(date) ? 'disabled' : ''}`}
                onClick={() => !isDateDisabled(date) && handleDateSelect(date)}
                disabled={isDateDisabled(date)}
                type="button"
              >
                {date ? date.getDate() : ''}
              </button>
            ))}
          </div>

          <div className="calendar-footer">
            <button 
              className="today-button" 
              onClick={handleToday}
              type="button"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernDatePicker;
