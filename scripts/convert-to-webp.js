#!/usr/bin/env node

/**
 * @file convert-to-webp.js
 * @description 將圖片轉換為 WebP 格式
 * @usage node scripts/convert-to-webp.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images');
const QUALITY = 90; // WebP 質量 (0-100)

console.log('🖼️  將圖片轉換為 WebP 格式\n');

/**
 * 檢查文件是否支持轉換為 WebP
 */
function isSupportedFormat(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ['.png', '.jpg', '.jpeg'].includes(ext);
}

/**
 * 獲取文件大小（MB）
 */
function getFileSizeMB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2);
}

/**
 * 轉換圖片為 WebP 格式
 */
async function convertToWebP(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  const basename = path.basename(imagePath, ext);
  const webpPath = path.join(
    path.dirname(imagePath),
    `${basename}.webp`
  );

  try {
    // 檢查 WebP 文件是否已存在
    if (fs.existsSync(webpPath)) {
      console.log(`⏭️  WebP 文件已存在: ${path.basename(webpPath)}`);
      return false;
    }

    // 獲取原圖大小
    const originalSize = getFileSizeMB(imagePath);
    
    // 轉換為 WebP
    await sharp(imagePath)
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const webpSize = getFileSizeMB(webpPath);
    const compression = ((1 - (webpSize / originalSize)) * 100).toFixed(1);

    console.log(`✅ 轉換: ${path.basename(imagePath)} -> ${path.basename(webpPath)}`);
    console.log(`   原圖: ${originalSize} MB | WebP: ${webpSize} MB | 壓縮: ${compression}%`);
    return true;
  } catch (error) {
    console.error(`❌ 錯誤: ${path.basename(imagePath)} - ${error.message}`);
    return false;
  }
}

/**
 * 主函數
 */
async function main() {
  try {
    // 檢查目錄是否存在
    if (!fs.existsSync(IMAGES_DIR)) {
      console.error(`❌ 目錄不存在: ${IMAGES_DIR}`);
      process.exit(1);
    }

    // 獲取所有圖片文件
    const files = fs.readdirSync(IMAGES_DIR);
    const imageFiles = files.filter(file => isSupportedFormat(file));

    if (imageFiles.length === 0) {
      console.log('📁 未找到任何支持的圖片文件');
      process.exit(0);
    }

    console.log(`📁 找到 ${imageFiles.length} 個支持轉換的圖片文件\n`);

    let convertedCount = 0;
    let skippedCount = 0;

    // 轉換所有圖片為 WebP
    for (const file of imageFiles) {
      const imagePath = path.join(IMAGES_DIR, file);
      const result = await convertToWebP(imagePath);
      if (result) {
        convertedCount++;
      } else {
        skippedCount++;
      }
    }

    console.log(`\n✨ 完成！`);
    console.log(`   轉換: ${convertedCount} 個圖片為 WebP`);
    console.log(`   跳過: ${skippedCount} 個已存在的 WebP 或錯誤`);
    console.log(`\n📁 WebP 圖片位置: ${IMAGES_DIR}`);
  } catch (error) {
    console.error('❌ 發生錯誤:', error);
    process.exit(1);
  }
}

main();