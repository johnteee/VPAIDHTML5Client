require 'rack/rewrite'

use Rack::Rewrite do
  rewrite %r{^/surly.js(\?.*)?},  '/surly/surly.js$1'
  rewrite %r{geo/ba.js(\?.*)?}, '/mobile/mobile.js'
  rewrite %r{ftp/staging/mobile.min.js}, '/mobile/mobile.js'
  rewrite %r{/mobile.js(\?.*)?}, '/mobile/mobile.js'
  rewrite %r{/mobile-64.js(\?.*)?}, '/mobile/mobile.js?r=123'
  rewrite %r{/geo/adPrivacy.js(\?.*)?}, '/js/adPrivacy.js'
end

run Rack::Directory.new(".")
