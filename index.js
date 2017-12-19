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

function setLocationFromHeaders(req, res){
  if(mustNotSetLocation(req)){
    return null;
  }
  try{
    setUrl(req, res);
  }
  catch(e){
  }
}

function mustNotSetLocation(req){
  return req.url.substr(0, 7) === '/_next/';
}

function setUrl(req, res){
  const href = req.protocol + '://' + req.get('host') + req.originalUrl
  return exports.default = global.Location = req.Location = {
    href: href,
    protocol: getProtocol(href),
    host: getHost(href),
    hostname: getHostName(href),
    port: getPort(href),
    pathname: getPathname(href),
    search: getSearch(href),
    origin: getProtocol(href) + '//' + getHost(href),
    replace: replace(res),
  };
}

function replace(res){
  return function(uri){
    if(res && typeof(res.redirect) === 'function') {
      try{
        return res.redirect(302, uri)
      }
      catch(e){
        console.log('Trying to redirect before write on body!')
        return undefined
      }
    }
    if(typeof(location) !== 'undefined' && typeof(location.replace) === 'function'){
      location.replace(url)
    }
  }
}

function getSearch(href){
  var searchArr = href.split('?')
  if(searchArr.length <= 1){
    return ''
  }
  searchArr.shift()
  return '?' + searchArr.join('?')
}

function getProtocol(href){
  return href.split('//').shift();
}

function getHost(href){
  var partial = href.split('://')
  partial.shift()
  return partial.join('://').split('?').shift().split('/').shift()
}

function getHostName(href){
  return getHost(href).split(':').shift()
}

function getPort(href){
  var hrefArr = getHost(href).split(':')
  return hrefArr[1] || ''
}

function getPathname(href){
  var host = getHost(href)
  var a = href.split('?').shift().split(host)
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
    origin: '',
    replace: function(){},
  }
}

function middleware(){
  return function(req, res, next){
    setLocationFromHeaders(req, res)
    next();
  }
}

exports.middleware = middleware;
exports.setUrl = setUrl;
exports.default = global.Location;
