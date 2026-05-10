import { TodoUseCase } from '@src/application/use-cases/TodoUseCase';
import { TodoDomainService } from '@src/domain/services/TodoDomainService';
import { TodoMapStore } from '@src/infrastructure/repositories/TodoMapStore';
import { TodoWebAPI } from '@src/presentation/TodoWebAPI';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());

const repo = new TodoMapStore();
const domainService = new TodoDomainService(repo);
const useCase = new TodoUseCase(repo, domainService);
const todoPresentation = new TodoWebAPI(useCase);

app.use('/todos', todoPresentation.router);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`DDD backend running on http://localhost:${port}`));
