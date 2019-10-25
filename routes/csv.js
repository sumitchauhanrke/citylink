const router = require('express').Router()
const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path')
const csvWriter = createCsvWriter({
  path: 'sample.csv',
  header: [
    { id: 'first', title: 'First' },
    { id: 'last', title: 'Last' },
    { id: 'month', title: 'Month' },
    { id: 'day', title: 'Day' }
  ]
})

router.post('/', upload.single('file'), (req, res) => {
  const data = []
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      if (Object.keys(row).length !== 0 && row.constructor !== 0) { data.push(row) }
    })
    .on('end', () => {
      data.forEach(element => {
        delete element[' Unused']
      })
      csvWriter
        .writeRecords(data)
        .then(() => {
          console.log('The CSV file was written successfully')
          var parentDirectory = path.join(__dirname, '/../')
          var filepath = path.join(parentDirectory, 'sample.csv')
          //   var stat = fs.statSync(filepath)
          //   res.writeHead(200, { 'Content-Type': 'text/csv', 'Content-Length': stat.size })
          var readStream = fs.createReadStream(filepath)
          readStream.pipe(res)
        })
        .catch(err => res.json(err))
    })
  return res.json({ message: 'in the route' })
})

module.exports = router
