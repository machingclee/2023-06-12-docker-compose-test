import express, { Request, Response } from "express";
import mongoose, { InferSchemaType, Schema } from "mongoose";

const mongoDbContainerName = "mongodb-test";


(async () => {
  try {
    console.log("Start mongo connection ...")
    await mongoose.connect(
      `mongodb://admin:123@${mongoDbContainerName}:27017`,
      {
        connectTimeoutMS: 30000,
        serverSelectionTimeoutMS: 30000
      });
    console.log('Connected!')
  }
  catch (e) {
    console.log("Connection Failed");
    console.log(JSON.stringify(e));
  }

  const app = express()

  const studentSchema = new Schema({
    name: { type: String, default: 'hahaha' },
    age: { type: Number, min: 18, index: true },
  });
  type Student = InferSchemaType<typeof studentSchema>;

  const StudentModel = mongoose.model<Student>('Student', studentSchema);

  app.get('/add-student', async (req: Request<{}, {}, {}, { age: number, name: string }>, res: Response) => {
    const { age, name } = req.query;
    await StudentModel.create({ age, name });
    res.json({ success: true, msg: `${name} of age ${age} is created.` });
  })
  app.listen(3000)
})()
