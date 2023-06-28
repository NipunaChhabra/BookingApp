const seatModel = require('./models/seatModel');

async function uploadDefaultData() {
  await seatModel.createSeatTable();
  await seatModel.insertSeatDataFromCSV();
}

uploadDefaultData()
  .then(() => {
    console.log('Default data uploaded successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error uploading default data:', error);
    process.exit(1);
  });