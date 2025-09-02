const services = [
  { name: "Normal mass", price: 100 },
  { name: "Special mass", price: 200 },
  { name: "House blessing", price: 150 },
  { name: "Rogy labanam", price: 120 },
  { name: "Mass for job", price: 180 },
  { name: "Mass for health", price: 160 },
];

function Services() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service.name} style={{ margin: '10px 0', padding: '10px', backgroundColor: '#1e1e1e', borderRadius: '5px' }}>
            {service.name} - ${service.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Services;
