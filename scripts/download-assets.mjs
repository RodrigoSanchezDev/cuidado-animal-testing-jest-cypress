#!/usr/bin/env node

/**
 * Script para descargar imágenes de mascotas y veterinarios
 * Usa imágenes de Unsplash (URLs directas, sin API key)
 * 
 * Ejecutar: npm run assets:download
 */

import { createWriteStream, mkdirSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public', 'images')

// Imágenes de mascotas desde Unsplash (URLs directas de imágenes pequeñas)
const petImages = [
  // Golden Retriever
  { name: 'pet-01.jpg', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop' },
  // Gato Siamés
  { name: 'pet-02.jpg', url: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=400&fit=crop' },
  // Bulldog Francés
  { name: 'pet-03.jpg', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop' },
  // Gato Persa
  { name: 'pet-04.jpg', url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop' },
  // Maine Coon
  { name: 'pet-05.jpg', url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&h=400&fit=crop' },
  // Beagle
  { name: 'pet-06.jpg', url: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=400&fit=crop' },
  // Cacatúa (ave)
  { name: 'pet-07.jpg', url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=400&fit=crop' },
  // Pastor Alemán
  { name: 'pet-08.jpg', url: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop' },
  // Labrador
  { name: 'pet-09.jpg', url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop' },
  // Gato común
  { name: 'pet-10.jpg', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop' },
  // Rottweiler
  { name: 'pet-11.jpg', url: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=400&h=400&fit=crop' },
  // Conejo
  { name: 'pet-12.jpg', url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop' },
]

// Imágenes de veterinarios (profesionales médicos)
const vetImages = [
  { name: 'vet-01.jpg', url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop' },
  { name: 'vet-02.jpg', url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop' },
  { name: 'vet-03.jpg', url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop' },
  { name: 'vet-04.jpg', url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop' },
]

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    
    const request = protocol.get(url, (response) => {
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

async function main() {
  console.log('📥 Descargando imágenes para Cuidado Animal...\n')

  // Crear directorios si no existen
  const petsDir = join(publicDir, 'pets')
  const vetsDir = join(publicDir, 'vets')

  if (!existsSync(petsDir)) {
    mkdirSync(petsDir, { recursive: true })
    console.log('📁 Creado directorio:', petsDir)
  }

  if (!existsSync(vetsDir)) {
    mkdirSync(vetsDir, { recursive: true })
    console.log('📁 Creado directorio:', vetsDir)
  }

  console.log('\n🐾 Descargando imágenes de mascotas...')
  for (const img of petImages) {
    const filepath = join(petsDir, img.name)
    if (existsSync(filepath)) {
      console.log(`  ⏭️  ${img.name} (ya existe)`)
      continue
    }
    try {
      await downloadImage(img.url, filepath)
      console.log(`  ✅ ${img.name}`)
    } catch (error) {
      console.log(`  ❌ ${img.name}: ${error.message}`)
    }
  }

  console.log('\n👨‍⚕️ Descargando imágenes de veterinarios...')
  for (const img of vetImages) {
    const filepath = join(vetsDir, img.name)
    if (existsSync(filepath)) {
      console.log(`  ⏭️  ${img.name} (ya existe)`)
      continue
    }
    try {
      await downloadImage(img.url, filepath)
      console.log(`  ✅ ${img.name}`)
    } catch (error) {
      console.log(`  ❌ ${img.name}: ${error.message}`)
    }
  }

  console.log('\n✨ ¡Descarga completada!')
  console.log('   Las imágenes están en: public/images/')
}

main().catch(console.error)
