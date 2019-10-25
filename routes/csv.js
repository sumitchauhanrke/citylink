const router = require('express').Router()
const csv = require('csv-parser')
const fs = require('fs')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const stringify = require('csv-stringify')

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
      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'download-' + Date.now() + '.csv\"')
      res.setHeader('Cache-Control', 'no-cache')
      res.setHeader('Pragma', 'no-cache')
      stringify(data, { header: true })
        .pipe(res)
    })
})

module.exports = router
