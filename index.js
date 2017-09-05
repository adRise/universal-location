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
  const headers = req.headers
  try{
    setUrl(headers.referer);
  }
  catch(e){
  }
}

function mustSetLocation(req){
  if(!req.headers || req.url.substr(0, 7) === '/_next/'){
    return false;
  }
  return !!req.headers.referer;
}

function setUrl(href){
  const hrefArr = href.split('//');
  const protocol = hrefArr[0];
  const url = hrefArr[1]
  const urlArr = url.split('/');
  const host = urlArr.shift();
  const uri = '/' + urlArr.join('/');
  const uriArr = uri.split('?');
  const pathname = uriArr[0];
  const search = uriArr[1];
  const hostArr = host.split(':');
  const hostname = hostArr[0];
  const port = hostArr[1];
  exports.default = global.Location = {
    href: href,
    protocol: protocol,
    host: host,
    hostname: hostname,
    port: port || '',
    pathname: pathname,
    search: search ? '?' + search : '',
    origin: protocol + '//' + host
  };
}

exports.middleware = function(){
  return function(req, res, next){
    setLocationFromHeaders(req)
    next();
  }
};

exports.setUrl = setUrl;

exports.default = {}
