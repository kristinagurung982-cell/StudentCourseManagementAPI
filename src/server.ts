import { createApp } from './app';

const app = createApp();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Student API: http://localhost:${PORT}/api/students`);
  console.log(`Course API: http://localhost:${PORT}/api/courses`);
  console.log(`Enrollment API: http://localhost:${PORT}/api/enrollments`);
});