import { TodoPresentation } from '@src/interface-adapters/controllers-and-presenters/TodoWebAPI';
import { TodoMapStore } from '@src/interface-adapters/gateways/TodoMapStore';
import { TodoUseCase } from '@src/use-cases/TodoUseCase';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());

const gateway = new TodoMapStore();
const useCase = new TodoUseCase(gateway);
const todoPresentation = new TodoPresentation(useCase);

app.use('/todos', todoPresentation.router);

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Clean Architecture backend running on http://localhost:${port}`));
