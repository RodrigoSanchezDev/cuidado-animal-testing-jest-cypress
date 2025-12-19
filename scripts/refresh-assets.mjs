#!/usr/bin/env node

/**
 * Script para descargar imágenes ADICIONALES de mascotas y veterinarios
 * Expande el set existente con fotos curadas de Unsplash
 * 
 * Ejecutar: npm run assets:refresh
 * 
 * IMPORTANTE: URLs fijas y curadas para reproducibilidad
 */

import { createWriteStream, mkdirSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public', 'images')

// ============================================
// NUEVAS IMÁGENES DE MASCOTAS (pet-13 a pet-20)
// Curadas: fondos neutros, sin colores chillones
// ============================================
const additionalPetImages = [
  // Husky - fondo neutro
  { name: 'pet-13.jpg', url: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop' },
  // Gato naranja - tono suave
  { name: 'pet-14.jpg', url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop' },
  // Corgi - fondo limpio
  { name: 'pet-15.jpg', url: 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=400&h=400&fit=crop' },
  // Gato gris - elegante
  { name: 'pet-16.jpg', url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=400&fit=crop' },
  // Poodle blanco - limpio
  { name: 'pet-17.jpg', url: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?w=400&h=400&fit=crop' },
  // Gato blanco y negro
  { name: 'pet-18.jpg', url: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&h=400&fit=crop' },
  // Shiba Inu
  { name: 'pet-19.jpg', url: 'https://images.unsplash.com/photo-1546238232-20216dec9f72?w=400&h=400&fit=crop' },
  // Gatito pequeño
  { name: 'pet-20.jpg', url: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=400&h=400&fit=crop' },
]

// ============================================
// NUEVAS IMÁGENES DE VETERINARIOS (vet-05 a vet-08)
// Profesionales médicos con fondos neutros
// ============================================
const additionalVetImages = [
  // Doctora con estetoscopio
  { name: 'vet-05.jpg', url: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop' },
  // Doctor con bata
  { name: 'vet-06.jpg', url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop' },
  // Doctora sonriendo
  { name: 'vet-07.jpg', url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop' },
  // Doctor profesional
  { name: 'vet-08.jpg', url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&q=80' },
]

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      // Manejar redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject)
        return
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`))
        return
      }

      const file = createWriteStream(filepath)
      response.pipe(file)
      
      file.on('finish', () => {
        file.close()
        resolve()
      })
      
      file.on('error', (err) => {
        reject(err)
      })
    })
    
    request.on('error', (err) => {
      reject(err)
    })

    request.setTimeout(30000, () => {
      request.destroy()
      reject(new Error('Request timeout'))
    })
  })
}

async function downloadImages(images, subDir, label) {
  const dir = join(publicDir, subDir)
  
  // Crear directorio si no existe
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  
  console.log(`\n📥 Descargando ${images.length} ${label}...`)
  
  const results = { success: 0, failed: 0, skipped: 0 }
  
  for (const img of images) {
    const filepath = join(dir, img.name)
    
    // Si ya existe, saltar
    if (existsSync(filepath)) {
      console.log(`  ⏭️  ${img.name} (ya existe)`)
      results.skipped++
      continue
    }
    
    try {
      await downloadImage(img.url, filepath)
      console.log(`  ✅ ${img.name}`)
      results.success++
    } catch (err) {
      console.log(`  ❌ ${img.name}: ${err.message}`)
      results.failed++
    }
  }
  
  return results
}

async function main() {
  console.log('🔄 Asset Refresh - Cuidado Animal')
  console.log('=' .repeat(40))
  
  const petResults = await downloadImages(additionalPetImages, 'pets', 'imágenes de mascotas')
  const vetResults = await downloadImages(additionalVetImages, 'vets', 'imágenes de veterinarios')
  
  console.log('\n' + '='.repeat(40))
  console.log('📊 RESUMEN')
  console.log('='.repeat(40))
  console.log(`\n🐾 Mascotas:`)
  console.log(`   ✅ Descargadas: ${petResults.success}`)
  console.log(`   ⏭️  Existentes:  ${petResults.skipped}`)
  console.log(`   ❌ Fallidas:    ${petResults.failed}`)
  
  console.log(`\n👨‍⚕️ Veterinarios:`)
  console.log(`   ✅ Descargadas: ${vetResults.success}`)
  console.log(`   ⏭️  Existentes:  ${vetResults.skipped}`)
  console.log(`   ❌ Fallidas:    ${vetResults.failed}`)
  
  const totalSuccess = petResults.success + vetResults.success
  const totalFailed = petResults.failed + vetResults.failed
  
  console.log('\n' + '='.repeat(40))
  if (totalFailed === 0) {
    console.log('🎉 ¡Asset refresh completado exitosamente!')
  } else {
    console.log(`⚠️  Completado con ${totalFailed} error(es)`)
  }
  console.log('='.repeat(40))
}

main().catch(console.error)
