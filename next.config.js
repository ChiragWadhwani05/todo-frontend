/** @type {import('next').NextConfig} */
const nextConfig = {
  headers,
};

async function headers() {
  return [
    {
      source: "/:path*",
      headers: [
        // controls DNS prefetching, allowing browsers to proactively perform domain name resolution on external links, images, CSS, JavaScript, and more
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        // This can prevent against clickjacking attacks.
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        // prevents the browser from attempting to guess the type of content if the Content-Type header is not explicitly set.
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
      ],
    },
  ];
}

export default nextConfig;
