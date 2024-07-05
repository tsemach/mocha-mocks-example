import express from 'express'

export interface ERequest<T = any> extends express.Request {
  body: T
}