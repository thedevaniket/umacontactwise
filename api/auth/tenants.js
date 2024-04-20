// api/tenants.js

import dbConnect from '../../utils/dbConnect';
import Tenant from '../../models/Tenant';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const tenants = await Tenant.find({});
        res.status(200).json({ success: true, data: tenants });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const tenant = await Tenant.create(req.body);
        res.status(201).json({ success: true, data: tenant });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    // Implement PUT and DELETE routes for editing and deleting tenants
  }
}
