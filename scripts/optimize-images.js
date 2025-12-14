#!/usr/bin/env node

/**
 * @file optimize-images.js
 * @description 自动生成缩略图的脚本
 * @usage node scripts/optimize-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images');
const QUALITY = 10;
const RESIZE = '50%';
const SUPPORTED_FORMATS = ['.png', '.jpg', '.jpeg'];

/**
 * 检查是否安装了 ImageMagick
 */
function checkImageMagick() {
  try {
    execSync('convert --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * 生成缩略图
 */
function generateThumbnail(imagePath) {
  const ext = path.extname(imagePath);
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
    console.log(`⏭️  已存在: ${path.basename(thumbnailPath)}`);
    return false;
  }

  try {
    // 使用 ImageMagick 生成缩略图
    execSync(
      `convert "${imagePath}" -quality ${QUALITY} -resize ${RESIZE} -strip -interlace Plane "${thumbnailPath}"`,
      { stdio: 'pipe' }
    );

    // 获取文件大小
    const stats = fs.statSync(thumbnailPath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    const originalStats = fs.statSync(imagePath);
    const originalMB = (originalStats.size / (1024 * 1024)).toFixed(2);
    const reduction = (
      ((originalStats.size - stats.size) / originalStats.size) *
      100
    ).toFixed(1);

    console.log(
      `✅ 生成: ${path.basename(thumbnailPath)} (${sizeMB}MB, 减少 ${reduction}%)`
    );
    return true;
  } catch (error) {
    console.error(`❌ 失败: ${path.basename(imagePath)}`);
    console.error(`   错误: ${error.message}`);
    return false;
  }
}

/**
 * 主函数
 */
function main() {
  console.log('🖼️  图片缩略图生成工具\n');

  // 检查目录
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ 错误: 目录不存在 ${IMAGES_DIR}`);
    process.exit(1);
  }

  // 检查 ImageMagick
  if (!checkImageMagick()) {
    console.error(
      '❌ 错误: 未检测到 ImageMagick'
    );
    console.error('请安装: https://imagemagick.org/script/download.php');
    process.exit(1);
  }

  // 获取所有图片文件
  const files = fs.readdirSync(IMAGES_DIR).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return SUPPORTED_FORMATS.includes(ext);
  });

  if (files.length === 0) {
    console.warn(`⚠️  警告: 在 ${IMAGES_DIR} 找不到图片文件`);
    process.exit(0);
  }

  console.log(`📁 扫描目录: ${IMAGES_DIR}`);
  console.log(`🔍 找到 ${files.length} 个图片文件\n`);

  let generated = 0;
  let skipped = 0;

  // 处理每个图片
  files.forEach((file) => {
    const imagePath = path.join(IMAGES_DIR, file);
    if (generateThumbnail(imagePath)) {
      generated++;
    } else {
      skipped++;
    }
  });

  console.log(`\n✨ 完成!`);
  console.log(`   ✅ 生成: ${generated}`);
  console.log(`   ⏭️  已存在或跳过: ${skipped}`);
}

// 运行脚本
main();
