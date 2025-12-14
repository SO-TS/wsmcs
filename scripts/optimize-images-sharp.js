#!/usr/bin/env node

/**
 * @file optimize-images-sharp.js
 * @description 使用 Sharp 库生成缩略图的脚本
 * @usage node scripts/optimize-images-sharp.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images');
const QUALITY = 10;
const RESIZE_PERCENT = 50;

console.log('🖼️  使用 Sharp 库生成缩略图\n');

/**
 * 获取文件大小（KB）
 */
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

/**
 * 生成缩略图
 */
async function generateThumbnail(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  const basename = path.basename(imagePath, ext);
  
  // 跳过已存在的缩略图
  if (basename.includes('-thumb')) {
    return false;
  }

  const thumbnailPath = path.join(
    path.dirname(imagePath),
    `${basename}-thumb${ext}`
  );

  // 检查缩略图是否已存在
  if (fs.existsSync(thumbnailPath)) {
    const size = getFileSize(thumbnailPath);
    console.log(`⏭️  已存在: ${path.basename(thumbnailPath)} (${size} KB)`);
    return false;
  }

  try {
    // 获取原图大小
    const metadata = await sharp(imagePath).metadata();
    const originalSize = getFileSize(imagePath);
    
    // 计算缩放尺寸
    const newWidth = Math.round(metadata.width * RESIZE_PERCENT / 100);
    const newHeight = Math.round(metadata.height * RESIZE_PERCENT / 100);

    // 使用 Sharp 生成缩略图 - 用更激进的压缩
    await sharp(imagePath)
      .resize(newWidth, newHeight, {
        fit: 'cover',
        position: 'center'
      })
      .toFormat(ext.slice(1), { 
        quality: QUALITY,
        progressive: true,
        mozjpeg: false
      })
      .withMetadata()
      .toFile(thumbnailPath);

    const thumbnailSize = getFileSize(thumbnailPath);
    const compression = ((1 - (thumbnailSize / originalSize)) * 100).toFixed(1);

    console.log(`✅ 生成: ${path.basename(thumbnailPath)}`);
    console.log(`   原图: ${originalSize} KB | 缩略图: ${thumbnailSize} KB | 压缩: ${compression}%`);
    return true;
  } catch (error) {
    console.error(`❌ 错误: ${path.basename(imagePath)} - ${error.message}`);
    return false;
  }
}

/**
 * 主函数
 */
async function main() {
  try {
    // 检查目录是否存在
    if (!fs.existsSync(IMAGES_DIR)) {
      console.error(`❌ 目录不存在: ${IMAGES_DIR}`);
      process.exit(1);
    }

    // 获取所有图片文件
    const files = fs.readdirSync(IMAGES_DIR);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.webp'].includes(ext);
    });

    if (imageFiles.length === 0) {
      console.log('📁 未找到任何图片文件');
      process.exit(0);
    }

    console.log(`📁 找到 ${imageFiles.length} 个图片文件\n`);

    let processedCount = 0;
    let skippedCount = 0;

    // 生成所有缩略图
    for (const file of imageFiles) {
      const imagePath = path.join(IMAGES_DIR, file);
      const result = await generateThumbnail(imagePath);
      if (result) {
        processedCount++;
      } else if (!file.includes('-thumb')) {
        skippedCount++;
      }
    }

    console.log(`\n✨ 完成！`);
    console.log(`   生成: ${processedCount} 个缩略图`);
    console.log(`   跳过: ${skippedCount} 个已存在的缩略图`);
    console.log(`\n📁 缩略图位置: ${IMAGES_DIR}`);
    console.log(`\n💡 使用说明:`);
    console.log(`   在 src/config/images.js 中配置缩略图路径`);
    console.log(`   在组件中使用 ProgressiveImage 组件`);
    
  } catch (error) {
    console.error('❌ 发生错误:', error);
    process.exit(1);
  }
}

main();
