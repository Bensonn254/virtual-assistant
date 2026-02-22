const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dirPath = path.join(__dirname, 'images');

async function processDirectory(directory) {
  try {
    const files = await fs.promises.readdir(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fs.promises.stat(filePath);

      if (stat.isDirectory()) {
        await processDirectory(filePath);
      } else if (file.match(/\.(png|jpg|jpeg)$/i)) {
        const ext = path.extname(file);
        const webpPath = filePath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
        
        console.log(`Converting ${filePath} to WebP...`);
        try {
          await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(webpPath);
          console.log(`Converted: ${webpPath}`);
          // optionally remove the original file
          // await fs.promises.unlink(filePath);
        } catch (err) {
          console.error(`Error converting ${filePath}:`, err);
        }
      }
    }
  } catch (err) {
    console.error(`Error processing directory ${directory}:`, err);
  }
}

processDirectory(dirPath).then(() => {
  console.log('Image compression complete.');
});
