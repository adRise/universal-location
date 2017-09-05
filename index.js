'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

if(typeof(window) !== 'undefined' && typeof(window.location) !== 'undefined'){
  global.Location = window.location;
}

function setLocationFromHeaders(req){
  if(mustSetLocation(req)){
    return null;
  }
  const { headers } = req
  try{
    const href = headers.referer;
    const [protocol, url] = href.split('//');
    const urlArr = url.split('/');
    const host = urlArr.shift();
    const uri = '/'+urlArr.join('/');
    const [pathname, search] = uri.split('?');
    const [hostname, port] = host.split(':');
    exports.default = global.Location = {
      href: href,
      protocol: protocol,
      host: host,
      hostname: hostname,
      port: port || '',
      pathname: pathname,
      search: search ? '?' + search : '',
      origin: `${protocol}//${host}`
    };
  }
  catch(e){}
}

function mustSetLocation(req){
  if(!req.headers || req.url.substr(0, 7) === '/_next/'){
    return false;
  }
  return !!req.headers.referer;
}

exports.middleware = () => (req, res, next) => {
  setLocationFromHeaders(req)
  next();
};

exports.default = global.Location
