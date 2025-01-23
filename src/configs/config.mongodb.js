import process from 'process'

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 5000
  },
  db: {
    host: process.env.DEV_DB_HOST || '0.0.0.0',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || `shopClothingDEV`,
    user: process.env.DEV_DB_USER || 'admin',
    pass: process.env.DEV_DB_PASS || 'admin123',
  }
}
const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 5000
  },
  db: {
    host: process.env.PRO_DB_HOST || '0.0.0.0',
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || `shopPRO`,
    user: process.env.DEV_DB_USER || 'admin',
    pass: process.env.DEV_DB_PASS || 'admin123',
  }
}

const config = { dev, pro };
const env = process.env.NODE_env || 'dev'

export default config[env]