const express = require('express')
const app = express()
const webpush = require('web-push')
const cors = require('cors')

const port = 3000

const apiKeys = {
  publicKey:
    '',
  privateKey: '',
}

webpush.setVapidDetails(
  'mailto:nik.vakula@bk.ru',
  apiKeys.publicKey,
  apiKeys.privateKey
)

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

// типа БД, в которой хранятся подписки юзеров
const subDatabse = []

app.post('/save-subscription', (req, res) => {
  subDatabse.push(req.body)
  res.json({ status: 'Success', message: 'Subscription saved!' })
})

app.get('/send-notification', (req, res) => {
  webpush.sendNotification(subDatabse[0], 'Hello world')
  res.json({ statue: 'Success', message: 'Message sent to push service' })
})

app.listen(port, () => {
  console.log('Server running on port 3000!')
})
