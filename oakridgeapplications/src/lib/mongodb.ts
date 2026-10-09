import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/oakridge-portal';

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your environment');
}

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

global.mongooseCache ??= {
  conn: null,
  promise: null,
};

export async function connectToDatabase() {
  if (global.mongooseCache.conn) return global.mongooseCache.conn;

  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    global.mongooseCache.conn = await global.mongooseCache.promise;
  } catch (error) {
    global.mongooseCache.promise = null;
    throw error;
  }

  return global.mongooseCache.conn;
}
