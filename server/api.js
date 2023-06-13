const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(cors());

app.get('/api/data/*', (req, res) => {
  const directoryPath = req.params[0];
  let targetDirectory;
  
  console.log(req.params);
  console.log(directoryPath);
  
  if (directoryPath === 'root') {
    targetDirectory = '/';
  } else {
    targetDirectory = path.join('/', directoryPath);
    console.log(targetDirectory);
  }
  const directoryListing = getDirectoryListing(targetDirectory);
  res.json(directoryListing);
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const getDirectoryListing = (directoryPath) => {
  try {
    const directoryContents = fs.readdirSync(directoryPath, { withFileTypes: true });

    const directoryListing = [];

    directoryContents.forEach((item) => {
      const itemInfo = {
        name: item.name,
        path: path.join(directoryPath, item.name),
        size: null,
        type: null,
        created: null,
        permissions: null,
        isDirectory: item.isDirectory(),
      };

      try {
        const itemStats = fs.statSync(itemInfo.path);

        itemInfo.size = itemStats.size;
        itemInfo.type = path.extname(itemInfo.name);
        itemInfo.created = itemStats.birthtime;
        itemInfo.permissions = itemStats.mode.toString(8).slice(-3);

        directoryListing.push(itemInfo);
      } catch (error) {
        console.error(`Error retrieving item info for ${itemInfo.path}:`, error);
      }
    });

    return directoryListing;
  } catch (error) {
    console.error('Error retrieving directory listing:', error);
    return [];
  }
};
