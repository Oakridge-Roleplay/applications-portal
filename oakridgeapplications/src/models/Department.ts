import mongoose, { Schema, Document } from 'mongoose';

export interface IDepartment extends Document {
  id: string;
  name: string;
  abbreviation: string;
  icon: string;
  color: string;
  description: string;
  enabled: boolean;
  reviewers: string[];
  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    abbreviation: { type: String, required: true },
    icon: { type: String, default: '🧾' },
    color: { type: String, default: '#1d4ed8' },
    description: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    reviewers: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Department || mongoose.model<IDepartment>('Department', DepartmentSchema);
