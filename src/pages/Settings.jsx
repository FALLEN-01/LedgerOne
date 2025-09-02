function Settings() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Settings</h1>
      <p>Settings page</p>
      <div style={{ marginTop: '20px' }}>
        <h3>Application Settings</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '10px 0', padding: '10px', backgroundColor: '#1e1e1e', borderRadius: '5px' }}>
            Theme: Dark Mode
          </li>
          <li style={{ margin: '10px 0', padding: '10px', backgroundColor: '#1e1e1e', borderRadius: '5px' }}>
            Language: English
          </li>
          <li style={{ margin: '10px 0', padding: '10px', backgroundColor: '#1e1e1e', borderRadius: '5px' }}>
            Notifications: Enabled
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Settings;
