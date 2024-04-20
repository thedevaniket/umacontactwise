// components/TenantList.js

import { useState, useEffect } from 'react';

const TenantList = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    fetch('/api/tenants')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTenants(data.data);
        } else {
          console.error('Failed to fetch tenants:', data.error);
        }
      })
      .catch((error) => {
        console.error('Error fetching tenants:', error);
      });
  }, []);

  return (
    <div>
      <h2>Tenants</h2>
      <ul>
        {tenants.map((tenant) => (
          <li key={tenant._id}>{tenant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TenantList;
