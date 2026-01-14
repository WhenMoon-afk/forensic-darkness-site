import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMAGES_DIR = 'public/images';
const JPEG_QUALITY = 80;
const PNG_COMPRESSION = 9;

async function* walkDir(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDir(path);
    } else {
      yield path;
    }
  }
}

async function optimizeImages() {
  let totalOriginal = 0;
  let totalOptimized = 0;
  let processed = 0;

  console.log('Compressing images in-place...\n');

  for await (const filePath of walkDir(IMAGES_DIR)) {
    const ext = extname(filePath).toLowerCase();

    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      continue;
    }

    try {
      const originalStats = await stat(filePath);
      totalOriginal += originalStats.size;

      const tempPath = filePath + '.tmp';

      if (['.jpg', '.jpeg'].includes(ext)) {
        await sharp(filePath)
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
          .toFile(tempPath);
      } else if (ext === '.png') {
        await sharp(filePath)
          .png({ compressionLevel: PNG_COMPRESSION, palette: true })
          .toFile(tempPath);
      }

      const newStats = await stat(tempPath);

      // Only replace if smaller
      if (newStats.size < originalStats.size) {
        await unlink(filePath);
        await rename(tempPath, filePath);
        totalOptimized += newStats.size;
        const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(0);
        console.log(`✓ ${basename(filePath)}: ${(originalStats.size / 1024).toFixed(0)}KB → ${(newStats.size / 1024).toFixed(0)}KB (-${savings}%)`);
      } else {
        await unlink(tempPath);
        totalOptimized += originalStats.size;
        console.log(`→ ${basename(filePath)}: already optimized`);
      }
      processed++;
    } catch (err: any) {
      console.error(`✗ ${basename(filePath)}: ${err.message}`);
    }
  }

  console.log('\n--- Summary ---');
  console.log(`Processed: ${processed} files`);
  console.log(`Original: ${(totalOriginal / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Optimized: ${(totalOptimized / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Savings: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(0)}%`);
}

optimizeImages().catch(console.error);
