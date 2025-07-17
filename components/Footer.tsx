export default function Footer() {
  const COSMIC_BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG || 'jazz-chronicle'
  
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Jazz Chronicle</h3>
            <p className="text-gray-300 mb-4">
              Your premier destination for jazz music coverage, featuring expert articles, 
              artist spotlights, album reviews, and live performance coverage.
            </p>
            <p className="text-gray-400 text-sm">
              Celebrating the rich history and vibrant future of jazz music.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/categories/jazz-history" className="text-gray-300 hover:text-white transition-colors">
                  Jazz History
                </a>
              </li>
              <li>
                <a href="/categories/artist-spotlights" className="text-gray-300 hover:text-white transition-colors">
                  Artist Spotlights
                </a>
              </li>
              <li>
                <a href="/categories/album-reviews" className="text-gray-300 hover:text-white transition-colors">
                  Album Reviews
                </a>
              </li>
              <li>
                <a href="/categories/live-performances" className="text-gray-300 hover:text-white transition-colors">
                  Live Performances
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Jazz Chronicle. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a
              href={`https://www.cosmicjs.com?utm_source=bucket_${COSMIC_BUCKET_SLUG}&utm_medium=referral&utm_campaign=app_footer&utm_content=built_with_cosmic`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#29ABE2',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#01669e'}
              onMouseOut={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#29ABE2'}
            >
              Built with Cosmic
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}