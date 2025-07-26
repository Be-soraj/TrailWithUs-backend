import 'dotenv/config';
import app from './src/app.js';
import connectDB from "./src/config/MongoDB.js"

connectDB();
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});