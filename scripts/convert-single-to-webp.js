#!/usr/bin/env node

/**
 * @file convert-single-to-webp.js
 * @description 將單個圖片轉換為 WebP 格式
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUALITY = 80; // WebP 質量 (0-100)

async function convertSingleToWebP(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const basename = path.basename(inputPath, ext);
  const dir = path.dirname(inputPath);
  const webpPath = path.join(dir, `${basename}.webp`);

  try {
    // 檢查 WebP 文件是否已存在
    if (fs.existsSync(webpPath)) {
      console.log(`⏭️  WebP 文件已存在: ${path.basename(webpPath)}`);
      return;
    }

    // 獲取原圖大小
    const originalStats = fs.statSync(inputPath);
    const originalSize = (originalStats.size / 1024).toFixed(2);
    
    // 轉換為 WebP
    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const webpStats = fs.statSync(webpPath);
    const webpSize = (webpStats.size / 1024).toFixed(2);
    const compression = ((1 - (webpStats.size / originalStats.size)) * 100).toFixed(1);

    console.log(`✅ 轉換: ${path.basename(inputPath)} -> ${path.basename(webpPath)}`);
    console.log(`   原圖: ${originalSize} KB | WebP: ${webpSize} KB | 壓縮: ${compression}%`);
  } catch (error) {
    console.error(`❌ 錯誤: ${path.basename(inputPath)} - ${error.message}`);
  }
}

// 獲取命令行參數
const imagePath = process.argv[2];

if (!imagePath) {
  console.error('❌ 請提供圖片路徑');
  process.exit(1);
}

convertSingleToWebP(imagePath);