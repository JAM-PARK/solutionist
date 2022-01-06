import express from 'express';
import { search, add, solve } from '../controllers/sets/index';
import asyncfy from 'express-asyncify';
import { saveUserInfo } from '../middleware/checkauth';

const setsRouter = asyncfy(express.Router());

setsRouter.get('/sets', search); // 세트 검색
setsRouter.post('/choices', saveUserInfo, add); // 세트 제작
setsRouter.post('/usersProblems', saveUserInfo, solve); // 문제 풀기

export default setsRouter;
