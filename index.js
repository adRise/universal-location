'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

if(typeof(window) !== 'undefined' && typeof(window.location) !== 'undefined'){
  global.Location = window.location;
}
else{
  global.Location = defaultLocation()
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
  return exports.default = global.Location = {
    href: href,
    protocol: getProtocol(href),
    host: getHost(href),
    hostname: getHostName(href),
    port: getPort(href),
    pathname: getPathname(href),
    search: getSearch(href),
    origin: getProtocol(href) + '//' + getHost(href)
  };
}

exports.middleware = function(){
  return function(req, res, next){
    setLocationFromHeaders(req)
    next();
  }
};

exports.setUrl = setUrl;

exports.default = global.Location;

function getSearch(href){
  const searchArr = href.split('?')
  if(searchArr.length <= 1){
    return ''
  }
  searchArr.shift()
  return searchArr.join('?')
}

function getProtocol(href){
  return href.split('//').shift();
}

function getHost(href){
  let partial = href.split('://')
  partial.shift()
  return partial.join('://').split('?').shift().split('/').shift()
}

function getHostName(href){
  return getHost(href).split(':').shift()
}

function getPort(href){
  const [host, port] = getHost(href).split(':')
  return port | ''
}

function getPathname(href){
  const host = getHost(href)
  let a = href.split('?').shift().split(host)
  a.shift()
  return a.join(host).split('?').shift() || '/'
}

function defaultLocation(){
  return {
    href: '',
    protocol: '',
    host: '',
    hostname: '',
    port: '',
    pathname: '',
    search: '',
    origin: ''
  }
}
