import { useState } from "react";
import { useNavigate } from "react-router-dom";

const services = [
  { id: 1, name: "Sunday Mass", basePrice: 0, description: "Regular Sunday service", category: "Regular" },
  { id: 2, name: "Wedding Ceremony", basePrice: 500, description: "Wedding service with all rituals", category: "Special" },
  { id: 3, name: "Baptism", basePrice: 150, description: "Baptism ceremony for children and adults", category: "Sacrament" },
  { id: 4, name: "Funeral Service", basePrice: 300, description: "Complete funeral service", category: "Special" },
  { id: 5, name: "House Blessing", basePrice: 200, description: "Home blessing ceremony", category: "Blessing" },
  { id: 6, name: "Prayer Meeting", basePrice: 50, description: "Special prayer sessions", category: "Regular" },
  { id: 7, name: "First Communion", basePrice: 200, description: "First Holy Communion ceremony", category: "Sacrament" },
  { id: 8, name: "Confirmation", basePrice: 180, description: "Confirmation ceremony", category: "Sacrament" },
  { id: 9, name: "Christmas Mass", basePrice: 100, description: "Special Christmas service", category: "Holiday" },
  { id: 10, name: "Easter Service", basePrice: 100, description: "Easter celebration service", category: "Holiday" },
];

const categories = ["All", "Regular", "Special", "Sacrament", "Blessing", "Holiday"];

function Services() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingService, setEditingService] = useState(null);
  const [servicesList, setServicesList] = useState(services);
  const [currentPage, setCurrentPage] = useState('services');
  const navigate = useNavigate();

  const filteredServices = selectedCategory === "All" 
    ? servicesList 
    : servicesList.filter(service => service.category === selectedCategory);

  const updateServicePrice = (id, newPrice) => {
    setServicesList(prev => prev.map(service => 
      service.id === id ? { ...service, basePrice: newPrice } : service
    ));
    setEditingService(null);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#1f1f1f',
      color: 'white',
      fontFamily: 'Segoe UI, Roboto, Arial, sans-serif'
    }}>
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
              background: currentPage === 'services' ? '#1a73e8' : 'transparent',
              color: currentPage === 'services' ? 'white' : '#9aa0a6',
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
              <div style={{ fontSize: '12px', color: '#9aa0a6' }}>Total Services</div>
              <div style={{ fontSize: '20px', color: '#4285f4', fontWeight: '500' }}>
                {servicesList.length}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#9aa0a6' }}>Base Revenue</div>
              <div style={{ fontSize: '16px', color: '#34a853', fontWeight: '500' }}>
                ₹{servicesList.reduce((sum, s) => sum + s.basePrice, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: '#2d2d2d',
          padding: '24px',
          borderBottom: '1px solid #3c4043'
        }}>
        </div>

        {/* Category Filter */}
        <div style={{
          background: '#2d2d2d',
          padding: '16px 24px',
          borderBottom: '1px solid #3c4043',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '8px 16px',
                background: selectedCategory === category ? '#1a73e8' : '#333333',
                color: selectedCategory === category ? 'white' : '#9aa0a6',
                border: 'none',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Content */}
        <div style={{
          flex: 1,
          padding: '24px',
          overflow: 'auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px'
          }}>
            {filteredServices.map(service => (
              <div
                key={service.id}
                style={{
                  background: '#2d2d2d',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #3c4043',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '500',
                      margin: '0 0 8px 0',
                      color: '#ffffff'
                    }}>
                      {service.name}
                    </h3>
                    <span style={{
                      background: service.category === 'Special' ? '#ea4335' : 
                                 service.category === 'Sacrament' ? '#34a853' :
                                 service.category === 'Holiday' ? '#fbbc04' :
                                 service.category === 'Blessing' ? '#9c27b0' : '#1a73e8',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {service.category}
                    </span>
                  </div>
                </div>

                <p style={{
                  fontSize: '14px',
                  color: '#9aa0a6',
                  margin: '0 0 16px 0',
                  lineHeight: '1.4'
                }}>
                  {service.description}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '14px',
                      color: '#9aa0a6'
                    }}>
                      Base Price:
                    </span>
                    {editingService === service.id ? (
                      <input
                        type="number"
                        defaultValue={service.basePrice}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            updateServicePrice(service.id, parseInt(e.target.value));
                          } else if (e.key === 'Escape') {
                            setEditingService(null);
                          }
                        }}
                        onBlur={(e) => updateServicePrice(service.id, parseInt(e.target.value))}
                        autoFocus
                        style={{
                          background: '#333333',
                          border: '1px solid #1a73e8',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          color: 'white',
                          fontSize: '18px',
                          fontWeight: '600',
                          width: '80px'
                        }}
                      />
                    ) : (
                      <span
                        onClick={() => setEditingService(service.id)}
                        style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: service.basePrice === 0 ? '#34a853' : '#ffffff',
                          cursor: 'pointer',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          background: 'rgba(255,255,255,0.05)'
                        }}
                      >
                        ₹{service.basePrice}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      style={{
                        padding: '6px 12px',
                        background: '#333333',
                        color: '#9aa0a6',
                        border: '1px solid #3c4043',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      📊 Stats
                    </button>
                    <button
                      onClick={() => setEditingService(service.id)}
                      style={{
                        padding: '6px 12px',
                        background: '#1a73e8',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      ✏️ Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
