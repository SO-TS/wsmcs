#!/usr/bin/env node

/**
 * @file resize-image-png.js
 * @description 將指定圖片的分辨率減半，並優化PNG壓縮
 * @usage node scripts/resize-image-png.js <input-image> <output-image>
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function resizeImage(inputPath, outputPath) {
  try {
    // 檢查輸入文件是否存在
    if (!fs.existsSync(inputPath)) {
      console.error(`❌ 輸入文件不存在: ${inputPath}`);
      process.exit(1);
    }

    // 獲取原始圖片信息
    const metadata = await sharp(inputPath).metadata();
    console.log(`📁 原始圖片尺寸: ${metadata.width} x ${metadata.height}`);
    
    // 計算新的尺寸（減半）
    const newWidth = Math.floor(metadata.width / 2);
    const newHeight = Math.floor(metadata.height / 2);
    
    console.log(`📏 新尺寸: ${newWidth} x ${newHeight}`);

    // 獲取原圖大小
    const originalStats = fs.statSync(inputPath);
    const originalSize = (originalStats.size / (1024 * 1024)).toFixed(2);
    console.log(`📊 原圖大小: ${originalSize} MB`);

    // 調整圖片尺寸並保存，使用優化的PNG設置
    await sharp(inputPath)
      .resize(newWidth, newHeight, {
        fit: 'inside', // 保持原始長寬比
        withoutEnlargement: true // 不放大圖片
      })
      .png({
        quality: 90,           // PNG壓縮質量 (0-100)
        compressionLevel: 6,   // 壓縮等級 (0-9, 9為最大壓縮)
        adaptiveFiltering: true // 自適應過濾
      })
      .toFile(outputPath);

    // 獲取新圖大小
    const newStats = fs.statSync(outputPath);
    const newSize = (newStats.size / (1024 * 1024)).toFixed(2);
    console.log(`📊 新圖大小: ${newSize} MB`);

    const compression = ((1 - (newStats.size / originalStats.size)) * 100).toFixed(1);
    console.log(`📈 壓縮率: ${compression}%`);

    console.log(`✅ 圖片已成功調整尺寸: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`❌ 錯誤: ${error.message}`);
    process.exit(1);
  }
}

// 獲取命令行參數
const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath || !outputPath) {
  console.error('❌ 請提供輸入和輸出圖片路徑');
  console.log('📝 用法: node scripts/resize-image-png.js <input-image> <output-image>');
  process.exit(1);
}

resizeImage(inputPath, outputPath);