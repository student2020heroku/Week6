import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import crypto from 'crypto';

import appSrc from './app.js';

const app = appSrc(express, bodyParser, fs, crypto, http);
app.listen(process.env.PORT || 4321);
