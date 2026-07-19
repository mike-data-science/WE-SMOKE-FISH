import { PrismaClient, Region } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding the database...')

  // Safely copy bere.png if it exists
  try {
    const src = path.join(process.cwd(), 'bere.png');
    const dest = path.join(process.cwd(), 'public', 'images', 'bere.png');
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log('Copied bere.png to public/images');
    }
  } catch(e) {
    console.log('Could not copy bere.png', e);
  }

  // Clear existing products to prevent duplicates/old ones if we want a clean slate
  await prisma.product.deleteMany({});

  // Create Categories
  const catRolls = await prisma.category.upsert({
    where: { slug: 'signature-rolls' },
    update: {},
    create: { name: 'Signature Seafood Rolls', slug: 'signature-rolls' }
  })
  
  const catSmoked = await prisma.category.upsert({
    where: { slug: 'smoked-dried-fish' },
    update: {},
    create: { name: 'Smoked & Dried Fish', slug: 'smoked-dried-fish' }
  })
  
  const catMeals = await prisma.category.upsert({
    where: { slug: 'trucker-meal-prep' },
    update: {},
    create: { name: 'Trucker Meal Prep', slug: 'trucker-meal-prep' }
  })
  
  const catPlatters = await prisma.category.upsert({
    where: { slug: 'party-platters' },
    update: { name: 'Party Platters' },
    create: { name: 'Party Platters', slug: 'party-platters' }
  })

  const catBeer = await prisma.category.upsert({
    where: { slug: 'beer' },
    update: {},
    create: { name: 'Craft Beer', slug: 'beer' }
  })

  const catCombos = await prisma.category.upsert({
    where: { slug: 'combos' },
    update: {},
    create: { name: 'Combos', slug: 'combos' }
  })

  // Create Products matching the images
  const products = [
    {
      name: "Cold-Smoked Salmon Strips (Yucola)",
      description: "Authentic air-dried and cold-smoked salmon strips.",
      slug: "cold-smoked-salmon-strips",
      priceUsd: 25.0,
      priceMdl: 450.0,
      region: Region.BOTH,
      categoryId: catSmoked.id,
      imageUrl: "/images/468087010_122199830114080814_1289471718805037066_n.jpg"
    },
    {
      name: "Smoked Salmon Candy Cubes",
      description: "Bite-sized cubes of premium smoked salmon.",
      slug: "smoked-salmon-candy-cubes",
      priceUsd: 30.0,
      priceMdl: 500.0,
      region: Region.BOTH,
      categoryId: catSmoked.id,
      imageUrl: "/images/468107128_122199836516080814_3620335908023508348_n.jpg"
    },
    {
      name: "Signature Chess Roll",
      description: "Beautiful checkerboard roll made of premium smoked salmon and tuna.",
      slug: "signature-chess-roll",
      priceUsd: 45.0,
      priceMdl: 800.0,
      region: Region.BOTH,
      categoryId: catRolls.id,
      imageUrl: "/images/469054720_122201614250080814_3590540201462952492_n.jpg"
    },
    {
      name: "Mediterranean Octopus Roll",
      description: "A stunning roll crafted from tender octopus tentacles and spices.",
      slug: "mediterranean-octopus-roll",
      priceUsd: 55.0,
      priceMdl: 1000.0,
      region: Region.BOTH,
      categoryId: catRolls.id,
      imageUrl: "/images/469120101_122201614928080814_8037220044809123911_n.jpg"
    },
    {
      name: "Scored Smoked Salmon Block",
      description: "A thick, juicy block of scored cold-smoked salmon.",
      slug: "scored-smoked-salmon-block",
      priceUsd: 40.0,
      priceMdl: 700.0,
      region: Region.BOTH,
      categoryId: catSmoked.id,
      imageUrl: "/images/469165267_122201614952080814_277418126812541061_n.jpg"
    },
    {
      name: "Gourmet Seafood Platter",
      description: "A perfect selection of sliced tuna, salmon, and mackerel with greens.",
      slug: "gourmet-seafood-platter",
      priceUsd: 85.0,
      priceMdl: 1500.0,
      region: Region.BOTH,
      categoryId: catPlatters.id,
      imageUrl: "/images/489039141_17915148165088469_1067132952425018844_n.jpg"
    },
    {
      name: "Two-Tone Salmon Block",
      description: "Premium double-layered smoked salmon block.",
      slug: "two-tone-salmon-block",
      priceUsd: 42.0,
      priceMdl: 750.0,
      region: Region.BOTH,
      categoryId: catRolls.id,
      imageUrl: "/images/images (2).jpg"
    },
    {
      name: "Assorted Whole Smoked Fish",
      description: "A collection of our finest whole smoked fish, including mackerel.",
      slug: "assorted-whole-smoked-fish",
      priceUsd: 35.0,
      priceMdl: 600.0,
      region: Region.BOTH,
      categoryId: catSmoked.id,
      imageUrl: "/images/491444068_17916575247088469_4180080632717754722_n.jpg"
    },
    {
      name: "The Ultimate Banquet Platter",
      description: "The crown jewel: smoked salmon block, sliced fish, caviar, and potatoes.",
      slug: "the-ultimate-banquet-platter",
      priceUsd: 150.0,
      priceMdl: 2800.0,
      region: Region.BOTH,
      categoryId: catPlatters.id,
      imageUrl: "/images/496003573_122226829958080814_2109119389845584729_n.jpg"
    },
    {
      name: "Large Fish Platter with Capers",
      description: "Abundant slices of smoked salmon and mackerel with fresh capers.",
      slug: "large-fish-platter-with-capers",
      priceUsd: 95.0,
      priceMdl: 1700.0,
      region: Region.BOTH,
      categoryId: catPlatters.id,
      imageUrl: "/images/503235593_122229623468080814_8946734234472778600_n.jpg"
    },
    {
      name: "Owl Face Party Platter",
      description: "A fun and delicious party platter arranged as an owl face!",
      slug: "owl-face-party-platter",
      priceUsd: 110.0,
      priceMdl: 2000.0,
      region: Region.BOTH,
      categoryId: catPlatters.id,
      imageUrl: "/images/503863779_122229907268080814_7431079651214387422_n.jpg"
    }
  ]

  const comboProducts = [
    {
      name: "The Weekend Combo",
      description: "Smoked Salmon Candy Cubes + Premium Craft Beer.",
      slug: "weekend-combo-beer",
      priceUsd: 45.0,
      priceMdl: 800.0,
      unit: "per combo",
      region: Region.BOTH,
      categoryId: catCombos.id,
      imageUrl: "/images/468107128_122199836516080814_3620335908023508348_n.jpg,/images/bere.png"
    },
    {
      name: "Cold Pilsner Pack",
      description: "Refreshing local pilsner.",
      slug: "cold-pilsner-pack",
      priceUsd: 20.0,
      priceMdl: 350.0,
      unit: "1x 500ml",
      region: Region.BOTH,
      categoryId: catBeer.id,
      imageUrl: "/images/bere.png"
    }
  ]

  const allProducts = [...products.map(p => ({ ...p, unit: "100g" })), ...comboProducts];

  for (const product of allProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    })
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
