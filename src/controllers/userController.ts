import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db';
import { Request, Response } from 'express';