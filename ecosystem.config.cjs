module.exports = {
  apps: [
    {
      name: 'independence-sentinel',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/home/serveravatar/applications/independencesentinel.com',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
