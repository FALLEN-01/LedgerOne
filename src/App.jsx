import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Services from "./pages/Services";
import Settings from "./pages/Settings";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentPage, setCurrentPage] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    const storedBookings = localStorage.getItem("bookings");
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const addSampleBooking = () => {
    const randomDate = new Date();
    randomDate.setDate(Math.floor(Math.random() * 28) + 1);
    const services = ['Sunday Mass', 'Wedding Ceremony', 'Baptism', 'Funeral Service', 'Prayer Meeting'];
    const amounts = [50, 100, 150, 200, 250];
    
    const sampleBooking = {
      date: randomDate.toISOString().split('T')[0],
      service: services[Math.floor(Math.random() * services.length)],
      amount: amounts[Math.floor(Math.random() * amounts.length)]
    };
    setBookings([...bookings, sampleBooking]);
  };

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
      const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Add empty cells to complete the grid (42 cells total for 6 weeks)
    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const getBookingsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter(booking => booking.date === dateStr);
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#1f1f1f',
      color: 'white',
      fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
      margin: 0,
      padding: 0,
      width: '100vw',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      {/* Header */}
      <div style={{
        background: '#2d2d2d',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #3c4043',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <h1 style={{ 
            fontSize: '22px', 
            fontWeight: '400', 
            margin: 0, 
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            📊 LedgerOne
          </h1>
          
          <button
            onClick={addSampleBooking}
            style={{
              padding: '8px 16px',
              background: '#1a73e8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            + Add Booking
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            background: '#333333',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            color: '#e8eaed'
          }}>
            Total Revenue: ₹{bookings.reduce((sum, b) => sum + b.amount, 0)}
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Sidebar */}
            <div style={{
              width: '256px',
              background: '#2d2d2d',
              borderRight: '1px solid #3c4043',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px 16px'
            }}>
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '400',
                    color: '#e8eaed',
                    margin: 0
                  }}>
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={() => navigateMonth(-1)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#9aa0a6',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        fontSize: '18px'
                      }}
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => navigateMonth(1)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#9aa0a6',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        fontSize: '18px'
                      }}
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ 
                  fontSize: '14px', 
                  color: '#9aa0a6', 
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Navigation
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    background: currentPage === 'home' ? '#1a73e8' : 'transparent',
                    color: currentPage === 'home' ? 'white' : '#9aa0a6',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onClick={() => {
                    setCurrentPage('home');
                    navigate('/');
                  }}>
                    📅 Calendar
                  </div>
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    color: currentPage === 'services' ? '#1a73e8' : '#9aa0a6',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onClick={() => {
                    setCurrentPage('services');
                    navigate('/services');
                  }}>
                    📋 Services
                  </div>
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    color: currentPage === 'settings' ? '#1a73e8' : '#9aa0a6',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onClick={() => {
                    setCurrentPage('settings');
                    navigate('/settings');
                  }}>
                    ⚙️ Settings
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ 
                  fontSize: '14px', 
                  color: '#9aa0a6', 
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Quick Stats
                </h4>
                <div style={{
                  background: '#333333',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #3c4043'
                }}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#9aa0a6' }}>Total Bookings</div>
                    <div style={{ fontSize: '20px', color: '#4285f4', fontWeight: '500' }}>
                      {bookings.length}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#9aa0a6' }}>This Month</div>
                    <div style={{ fontSize: '16px', color: '#34a853', fontWeight: '500' }}>
                      {bookings.filter(b => {
                        const bookingDate = new Date(b.date);
                        return bookingDate.getMonth() === currentMonth.getMonth() && 
                               bookingDate.getFullYear() === currentMonth.getFullYear();
                      }).length} events
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Calendar Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                background: '#2d2d2d',
                borderBottom: '1px solid #3c4043'
              }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} style={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#9aa0a6',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridTemplateRows: 'repeat(6, 1fr)',
                background: '#1f1f1f'
              }}>
                {getDaysInMonth(currentMonth).map((dayObj, index) => {
                  const dayBookings = getBookingsForDate(dayObj.date);
                  const isToday = dayObj.date.toDateString() === new Date().toDateString();
                  
                  return (
                    <div
                      key={index}
                      style={{
                        border: '1px solid #3c4043',
                        padding: '8px 4px',
                        minHeight: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        background: dayObj.isCurrentMonth ? '#1f1f1f' : '#292929',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                      onClick={() => setSelectedDate(dayObj.date)}
                    >
                      <div style={{
                        fontSize: '13px',
                        fontWeight: isToday ? '600' : '400',
                        color: dayObj.isCurrentMonth ? 
                          (isToday ? '#1a73e8' : '#e8eaed') : 
                          '#9aa0a6',
                        marginBottom: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isToday ? 'center' : 'flex-start'
                      }}>
                        <span style={{
                          padding: isToday ? '4px 8px' : '0',
                          borderRadius: isToday ? '12px' : '0',
                          background: isToday ? '#1a73e8' : 'transparent',
                          color: isToday ? 'white' : 'inherit',
                          minWidth: isToday ? '24px' : 'auto',
                          textAlign: 'center'
                        }}>
                          {dayObj.date.getDate()}
                        </span>
                      </div>
                      
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {dayBookings.slice(0, 3).map((booking, i) => (
                          <div
                            key={i}
                            style={{
                              background: i === 0 ? '#1a73e8' : i === 1 ? '#137333' : '#b06000',
                              color: 'white',
                              padding: '2px 6px',
                              borderRadius: '3px',
                              fontSize: '11px',
                              fontWeight: '500',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {booking.service} - ₹{booking.amount}
                          </div>
                        ))}
                        {dayBookings.length > 3 && (
                          <div style={{
                            fontSize: '10px',
                            color: '#9aa0a6',
                            padding: '2px 6px'
                          }}>
                            +{dayBookings.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        } />
        <Route path="/services" element={<Services />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
