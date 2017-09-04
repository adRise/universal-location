const getEmptyLocation = () => ({
  href: undefined,
  protocol: undefined,
  host: undefined,
  hostname: undefined,
  port: undefined,
  pathname: undefined,
  search: undefined,
  origin: undefined
});

function getLocationFromHeaders(headers){
  try{
    if(headers.referer){
      const href = headers.referer;
      const [protocol, url] = href.split('//');
      const urlArr = url.split('/');
      const host = urlArr.shift();
      const uri = '/'+urlArr.join('/');
      const [pathname, search] = uri.split('?');
      const [hostname, port] = host.split(':');
      return {
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
  }
  catch(e){}
  return getEmptyLocation()
}

function setGlobalWindow(){
  if(typeof(window) === 'undefined'){
    global.window = {}
  }
}

module.exports = () => (req, res, next) => {
  global.location = getLocationFromHeaders(req.headers)
  setGlobalWindow()
  global.window.location = global.location
  next();
};

