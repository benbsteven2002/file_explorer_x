const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(cors());

app.get('/api/data/*', (req, res) => {
  const directoryPath = req.params[0];
  let targetDirectory;
  
  if (directoryPath === 'root') {
    targetDirectory = '/';
  } else {
    targetDirectory = path.join('/', directoryPath);
  }
  targetDirectory = '/host/host_mnt' + targetDirectory;
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
        itemInfo.type = item.isDirectory() ? 'directory' : path.extname(itemInfo.name);
        itemInfo.created = itemStats.birthtime.toISOString().slice(0, 10);
        itemInfo.permissions = convertPermissionCode(parseInt(itemStats.mode.toString(8).slice(-3), 8));
        
        itemInfo.path = itemInfo.path.substring(14);
        
        console.log(itemInfo.path);
        
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

function convertPermissionCode(code) {
  const binary = code.toString(2).padStart(9, '0');

  const permissionSymbols = ['---', '--x', '-w-', '-wx', 'r--', 'r-x', 'rw-', 'rwx'];

  const userPermissions = permissionSymbols[parseInt(binary.slice(0, 3), 2)];
  const groupPermissions = permissionSymbols[parseInt(binary.slice(3, 6), 2)];
  const otherPermissions = permissionSymbols[parseInt(binary.slice(6), 2)];

  return userPermissions + groupPermissions + otherPermissions;
}