// Vercel serverless function wrapper
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');

let app;

async function createApp() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.init();
  }
  return app;
}

module.exports = async (req, res) => {
  const app = await createApp();
  const handler = app.getHttpAdapter().getInstance();
  return handler(req, res);
};