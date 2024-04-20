// models/Tenant.js

const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  // Other fields as needed
});

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
