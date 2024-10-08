'use strict'

const asyncHandle = fn => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next)
  }
}

export {
  asyncHandle
}