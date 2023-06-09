const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.get('/api/data/:directoryPath', (req, res) => {
  let targetDirectory;

  if (req.params.directoryPath === 'current') {
    targetDirectory = process.cwd();
  } else {
    targetDirectory = path.join(process.cwd(), req.params.directoryPath);
  }
  const directoryListing = getDirectoryListing(targetDirectory);
  console.log(directoryListing);
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

      const itemStats = fs.statSync(itemInfo.path);

      itemInfo.size = itemStats.size;
      itemInfo.type = path.extname(itemInfo.name);
      itemInfo.created = itemStats.birthtime;
      itemInfo.permissions = itemStats.mode.toString(8).slice(-3);

      directoryListing.push(itemInfo);
    });

    return directoryListing;
  } catch (error) {
    console.error('Error retrieving directory listing:', error);
    return []; // return an error directory ?
  }
};
