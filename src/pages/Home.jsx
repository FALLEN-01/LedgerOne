function Home({ bookings, setBookings, selectedDate, setSelectedDate }) {
  const addSampleBooking = () => {
    const sampleBooking = {
      date: new Date().toISOString().split('T')[0],
      service: 'Normal mass',
      amount: 100
    };
    setBookings([...bookings, sampleBooking]);
  };

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 80px)',
      backgroundColor: '#121212'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '300px',
        backgroundColor: '#1e1e1e',
        padding: '20px',
        borderRight: '1px solid #444'
      }}>
        <button
          onClick={addSampleBooking}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          ➕ Add Sample Booking
        </button>

        <div style={{
          backgroundColor: '#2c2c2c',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1e88e5' }}>📅 Mini Calendar</h3>
          <p style={{ margin: '5px 0', color: '#ccc' }}>Total Bookings: {bookings.length}</p>
          <p style={{ margin: '5px 0', color: '#ccc' }}>Selected: {selectedDate.toDateString()}</p>
        </div>

        <div style={{
          backgroundColor: '#2c2c2c',
          padding: '15px',
          borderRadius: '8px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#ff9800' }}>💰 Quick Stats</h4>
          <p style={{ margin: '5px 0', color: '#4caf50' }}>
            Total Revenue: ${bookings.reduce((sum, b) => sum + b.amount, 0)}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#1e1e1e',
          borderRadius: '8px'
        }}>
          <button style={{
            padding: '8px 15px',
            backgroundColor: '#1e88e5',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>Today</button>
          <button style={{
            padding: '8px 15px',
            backgroundColor: '#1e88e5',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>←</button>
          <button style={{
            padding: '8px 15px',
            backgroundColor: '#1e88e5',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>→</button>
          <span style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1e88e5'
          }}>
            📅 {selectedDate.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>

        <div style={{
          backgroundColor: '#1e1e1e',
          padding: '20px',
          borderRadius: '8px',
          height: 'calc(100vh - 200px)',
          overflowY: 'auto'
        }}>
          <h2 style={{ margin: '0 0 20px 0', color: '#4caf50' }}>📊 Church Billing Dashboard</h2>

          {bookings.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#ccc'
            }}>
              <h3>🏛️ Welcome to Church Billing Software</h3>
              <p>No bookings yet. Click "Add Sample Booking" to get started!</p>
              <p style={{ fontSize: '14px', marginTop: '20px' }}>
                This app helps manage church services and track revenue.
              </p>
            </div>
          ) : (
            <div>
              <h3 style={{ color: '#1e88e5', marginBottom: '15px' }}>📋 Recent Bookings</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                {bookings.map((booking, index) => (
                  <div key={index} style={{
                    backgroundColor: '#2c2c2c',
                    padding: '15px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #4caf50'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: '0 0 5px 0', color: '#4caf50' }}>
                          {booking.service}
                        </h4>
                        <p style={{ margin: '0', color: '#ccc', fontSize: '14px' }}>
                          📅 {booking.date}
                        </p>
                      </div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#4caf50'
                      }}>
                        ${booking.amount}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
