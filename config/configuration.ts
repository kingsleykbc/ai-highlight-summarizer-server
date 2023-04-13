export default () => ({
  JWT_SECRET: process.env.JWT_SECRET || 'secretr',
  OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
});
