import Express from "express"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import multer from "multer";
import path from "path"
import cors from "cors"

const app = Express();
const port = 4000;

