#!/usr/bin/env node

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

console.log('Environment Variables Test');
console.log('==========================');
console.log('N8N_BASE_URL:', process.env.N8N_BASE_URL || 'Not set');
console.log('N8N_API_KEY:', process.env.N8N_API_KEY ? '***SET***' : 'Not set');
console.log('N8N_USERNAME:', process.env.N8N_USERNAME || 'Not set');
console.log('N8N_PASSWORD:', process.env.N8N_PASSWORD ? '***SET***' : 'Not set');
console.log('DEBUG:', process.env.DEBUG || 'Not set');
console.log('LOG_LEVEL:', process.env.LOG_LEVEL || 'Not set');
console.log('=========================='); 