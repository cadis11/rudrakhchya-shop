import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

export default defineConfig({
  name: 'rudrakhchya-cms',
  title: 'Rudrakhchya CMS',
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || 'production',
  plugins: [deskTool()],
  schema: {
    types: [
      {
        name: 'product',
        title: 'Product',
        type: 'document',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'slug', type: 'slug', options: { source: 'title' } },
          { name: 'mukhi', type: 'number' },
          { name: 'size_mm', type: 'number' },
          { name: 'weight_g', type: 'number' },
          { name: 'origin', type: 'string' },
          { name: 'grade', type: 'string' },
          { name: 'description', type: 'text' },
          { name: 'images', type: 'array', of: [{ type: 'image' }] },
          { name: 'priceNPR', type: 'number' },
          { name: 'priceUSD', type: 'number' },
          { name: 'xray_pdf_url', type: 'url' },
          { name: 'in_stock', type: 'number' },
          { name: 'badges', type: 'array', of: [{ type: 'string' }] },
          { name: 'seo', type: 'object', fields: [{ name: 'description', type: 'text' }] }
        ]
      },
      {
        name: 'article',
        title: 'Article',
        type: 'document',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'slug', type: 'slug', options: { source: 'title' } },
          { name: 'category', type: 'string' },
          { name: 'mukhi', type: 'number' },
          { name: 'coverImage', type: 'image' },
          { name: 'body', type: 'array', of: [{ type: 'block' }] }
        ]
      },
      {
        name: 'siteSettings',
        title: 'Site Settings',
        type: 'document',
        fields: [
          { name: 'contactEmail', type: 'string' },
          { name: 'phone', type: 'string' },
          { name: 'whatsapp', type: 'string' },
          { name: 'viber', type: 'string' },
          { name: 'seoDefaults', type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'description', type: 'text' }] }
        ]
      }
    ]
  }
})
