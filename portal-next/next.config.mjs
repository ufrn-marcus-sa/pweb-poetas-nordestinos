// Receita 21, exercício 2: a marca Image do Next só carrega imagens de
// domínios liberados aqui. As fotos dos verbetes vêm da Wikimedia.

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'thumb.wikimedia.org' }
    ]
  }
}

export default nextConfig
