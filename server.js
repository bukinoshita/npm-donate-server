'use strict'

const express = require('express')
const stripe = require('stripe')
const bodyParser = require('body-parser')
const logger = require('morgan')

const app = express()
const stripeKey = process.env.STRIPE_KEY

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'))

app.post('/donation', (req, res) => {
  const { amount, currency, card, description } = req.body

  return stripe(stripeKey).charges
    .create({
      amount,
      currency,
      source: card,
      description
    })
    .then(donation => res.status(200).send(donation))
    .catch(err => res.status(400).send(err))
})

app.listen(3000, () => console.log('running...'))
