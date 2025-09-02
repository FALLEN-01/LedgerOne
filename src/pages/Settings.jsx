import { useState } from "react";
import { useNavigate } from "react-router-dom";

const settingsData = {
  general: {
    churchName: "St. Mary's Catholic Church",
    address: "123 Church Street, City, State 12345",
    phoneNumber: "(555) 123-4567",
    email: "contact@stmarychurch.org",
    website: "https://www.stmarychurch.org",
    timezone: "America/New_York"
  },
  billing: {
    currency: "INR",
    taxRate: 8.5,
    autoReminders: true,
    reminderDays: 7,
    lateFeesEnabled: true,
    lateFeeAmount: 25,
    paymentMethods: ["Cash", "Check", "Credit Card", "Online"]
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    reminderEmails: true,
    weeklyReports: true,
    monthlyReports: true
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 120,
    passwordRequirements: "strong",
    auditLogging: true
  }
};

const categories = ["General", "Billing", "Notifications", "Security"];

function Settings() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [settings, setSettings] = useState(settingsData);
  const [editingField, setEditingField] = useState(null);
  const [currentPage, setCurrentPage] = useState('settings');
  const navigate = useNavigate();

  const updateSetting = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
    setEditingField(null);
  };

  const toggleBoolean = (category, field) => {
    updateSetting(category, field, !settings[category][field]);
  };

  const renderField = (category, field, value) => {
    const isEditing = editingField === `${category}.${field}`;
    const fieldType = typeof value;

    if (fieldType === 'boolean') {
      return (
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <div style={{
            width: '44px',
            height: '24px',
            background: value ? '#1a73e8' : '#666666',
            borderRadius: '12px',
            position: 'relative',
            transition: 'background-color 0.2s'
          }}
          onClick={() => toggleBoolean(category, field)}>
            <div style={{
              width: '20px',
              height: '20px',
              background: 'white',
              borderRadius: '50%',
              position: 'absolute',
              top: '2px',
              left: value ? '22px' : '2px',
              transition: 'left 0.2s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }} />
          </div>
          <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500' }}>
            {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </span>
        </label>
      );
    }

    if (fieldType === 'number') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ color: '#9aa0a6', fontSize: '14px', fontWeight: '500' }}>
            {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </label>
          {isEditing ? (
            <input
              type="number"
              defaultValue={value}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateSetting(category, field, parseFloat(e.target.value));
                } else if (e.key === 'Escape') {
                  setEditingField(null);
                }
              }}
              onBlur={(e) => updateSetting(category, field, parseFloat(e.target.value))}
              autoFocus
              style={{
                background: '#333333',
                border: '1px solid #1a73e8',
                borderRadius: '6px',
                padding: '12px',
                color: 'white',
                fontSize: '14px'
              }}
            />
          ) : (
            <div
              onClick={() => setEditingField(`${category}.${field}`)}
              style={{
                background: '#333333',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #3c4043',
                color: '#ffffff',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              {field === 'taxRate' ? `${value}%` : 
               field === 'lateFeeAmount' ? `₹${value}` :
               field === 'sessionTimeout' ? `${value} minutes` : value}
            </div>
          )}
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ color: '#9aa0a6', fontSize: '14px', fontWeight: '500' }}>
          {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
        </label>
        {isEditing ? (
          <input
            type="text"
            defaultValue={value}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateSetting(category, field, e.target.value);
              } else if (e.key === 'Escape') {
                setEditingField(null);
              }
            }}
            onBlur={(e) => updateSetting(category, field, e.target.value)}
            autoFocus
            style={{
              background: '#333333',
              border: '1px solid #1a73e8',
              borderRadius: '6px',
              padding: '12px',
              color: 'white',
              fontSize: '14px'
            }}
          />
        ) : (
          <div
            onClick={() => setEditingField(`${category}.${field}`)}
            style={{
              background: '#333333',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #3c4043',
              color: '#ffffff',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            {Array.isArray(value) ? value.join(', ') : value.toString()}
          </div>
        )}
      </div>
    );
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
              background: currentPage === 'settings' ? '#1a73e8' : 'transparent',
              color: currentPage === 'settings' ? 'white' : '#9aa0a6',
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
            Quick Actions
          </h4>
          <div style={{
            background: '#333333',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #3c4043'
          }}>
            <button style={{
              width: '100%',
              background: '#1a73e8',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '10px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              marginBottom: '8px'
            }}>
              💾 Save All
            </button>
            <button style={{
              width: '100%',
              background: '#333333',
              color: '#9aa0a6',
              border: '1px solid #3c4043',
              borderRadius: '6px',
              padding: '10px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              marginBottom: '8px'
            }}>
              🔄 Reset
            </button>
            <button style={{
              width: '100%',
              background: '#333333',
              color: '#9aa0a6',
              border: '1px solid #3c4043',
              borderRadius: '6px',
              padding: '10px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              📤 Export
            </button>
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

        {/* Category Tabs */}
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
              onClick={() => setActiveCategory(category)}
              style={{
                padding: '10px 20px',
                background: activeCategory === category ? '#1a73e8' : '#333333',
                color: activeCategory === category ? 'white' : '#9aa0a6',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {category === 'General' ? '🏛️' :
               category === 'Billing' ? '💰' :
               category === 'Notifications' ? '🔔' : '🔒'} {category}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div style={{
          flex: 1,
          padding: '24px',
          overflow: 'auto'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{
              background: '#2d2d2d',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #3c4043',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '500',
                margin: '0 0 24px 0',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                {activeCategory === 'General' ? '🏛️' :
                 activeCategory === 'Billing' ? '💰' :
                 activeCategory === 'Notifications' ? '🔔' : '🔒'} {activeCategory} Settings
              </h2>

              <div style={{
                display: 'grid',
                gap: '20px',
                gridTemplateColumns: activeCategory === 'General' ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))'
              }}>
                {Object.entries(settings[activeCategory.toLowerCase()]).map(([field, value]) => (
                  <div key={field}>
                    {renderField(activeCategory.toLowerCase(), field, value)}
                  </div>
                ))}
              </div>

              {activeCategory === 'Security' && (
                <div style={{
                  marginTop: '24px',
                  padding: '20px',
                  background: '#333333',
                  borderRadius: '8px',
                  border: '1px solid #ea4335'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    margin: '0 0 12px 0',
                    color: '#ea4335',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    ⚠️ Security Notice
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#9aa0a6',
                    margin: '0 0 16px 0',
                    lineHeight: '1.4'
                  }}>
                    These security settings affect all users. Changes will take effect immediately and may require users to re-authenticate.
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{
                      padding: '8px 16px',
                      background: '#ea4335',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}>
                      🔒 Force Re-auth
                    </button>
                    <button style={{
                      padding: '8px 16px',
                      background: '#333333',
                      color: '#9aa0a6',
                      border: '1px solid #3c4043',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}>
                      📋 View Audit Log
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
