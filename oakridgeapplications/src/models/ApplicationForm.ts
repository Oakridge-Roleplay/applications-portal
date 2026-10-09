import mongoose, { Schema, Document } from 'mongoose';

export interface IApplicationQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox';
  required: boolean;
  options?: string[];
}

export interface IApplicationForm extends Document {
  departmentId: string;
  questions: IApplicationQuestion[];
}

const QuestionSchema = new Schema<IApplicationQuestion>(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    type: {
      type: String,
      enum: ['text', 'textarea', 'select', 'checkbox'],
      required: true,
    },
    required: { type: Boolean, default: true },
    options: { type: [String], default: [] },
  },
  { _id: false }
);

const ApplicationFormSchema = new Schema<IApplicationForm>(
  {
    departmentId: { type: String, required: true, unique: true, index: true },
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

export default mongoose.models.ApplicationForm || mongoose.model<IApplicationForm>('ApplicationForm', ApplicationFormSchema);
