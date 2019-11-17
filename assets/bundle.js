/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cdn.js":
/*!********************!*\
  !*** ./src/cdn.js ***!
  \********************/
/*! exports provided: setConf, isDirectHost, proxyDirect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setConf", function() { return setConf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDirectHost", function() { return isDirectHost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proxyDirect", function() { return proxyDirect; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.js");


/** @type {Set<string>} */
let mDirectHostSet = new Set()

async function loadDirectList(conf) {
  const url = conf.assets_cdn + conf.direct_host_list
  const res = await fetch(url)
  let txt = await res.text()

    //需要替换, 否则split后每个值最后为\r
    txt = txt.replace(/\r/g,"");

  for (const host of txt.split('\n')) {
    if (host && host[0] !== '#') {
      mDirectHostSet.add(host)
    }
  }
}

function setConf(conf) {
  return Promise.all([
    loadDirectList(conf),
  ])
}

/**
 * @param {string} host 
 */
function isDirectHost(host) {
  return mDirectHostSet.has(host)
}


/**
 * @param {string} url 
 */
async function proxyDirect(url) {
  try {
    const res = await fetch(url, {
      referrerPolicy: 'no-referrer',
    })
    const {status} = res
    if (status === 200 || status === 206) {
      return res
    }
    console.warn('direct status:', status, url)
  } catch (err) {
    console.warn('direct fail:', url)
  }
}

/***/ }),

/***/ "./src/cookie.js":
/*!***********************!*\
  !*** ./src/cookie.js ***!
  \***********************/
/*! exports provided: getNonHttpOnlyItems, parse, set, query, setDB, save */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNonHttpOnlyItems", function() { return getNonHttpOnlyItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query", function() { return query; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDB", function() { return setDB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "save", function() { return save; });
/* harmony import */ var _database_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./database.js */ "./src/database.js");


/** @type {Set<Cookie>} */
let mDirtySet = new Set()


function Cookie() {
  this.id = ''
  this.name = ''
  this.value = ''
  this.domain = ''
  this.hostOnly = false
  this.path = ''
  this.expires = NaN
  this.isExpired = false
  this.secure = false
  this.httpOnly = false
  this.sameSite = ''
}

/**
 * @param {Cookie} src 
 * @param {Cookie} dst 
 */
function copy(dst, src) {
  dst.id = src.id
  dst.name = src.name
  dst.value = src.value
  dst.domain = src.domain
  dst.hostOnly = src.hostOnly
  dst.path = src.path
  dst.expires = src.expires
  dst.isExpired = src.isExpired
  dst.secure = src.secure
  dst.httpOnly = src.httpOnly
  dst.sameSite = src.sameSite
}


/**
 * @param {string} cookiePath 
 * @param {string} urlPath 
 */
function isSubPath(cookiePath, urlPath) {
  if (urlPath === cookiePath) {
    return true
  }
  if (!cookiePath.endsWith('/')) {
    cookiePath += '/'
  }
  return urlPath.startsWith(cookiePath)
}


/**
 * @param {string} cookieDomain 
 * @param {string} urlDomain 
 */
function isSubDomain(cookieDomain, urlDomain) {
  return urlDomain === cookieDomain ||
    urlDomain.endsWith('.' + cookieDomain)
}


/**
 * @param {Cookie} item 
 * @param {number} now
 */
function isExpire(item, now) {
  const v = item.expires
  return !isNaN(v) && v < now
}


class CookieDomainNode {
  constructor() {
    /** @type {Cookie[]} */
    this.items = null

    /** @type {Object<string, CookieDomainNode>} */
    this.children = {}
  }

  /**
   * @param {string} name 
   */
  nextChild(name) {
    return this.children[name] || (
      this.children[name] = new CookieDomainNode
    )
  }

  /**
   * @param {string} name 
   */
  getChild(name) {
    return this.children[name]
  }

  /**
   * @param {Cookie} cookie 
   */
  addCookie(cookie) {
    if (this.items) {
      this.items.push(cookie)
    } else {
      this.items = [cookie]
    }
  }
}

/** @type {Map<string, Cookie>} */
const mIdCookieMap = new Map()

const mCookieNodeRoot = new CookieDomainNode()



function getNonHttpOnlyItems() {
  const ret = []
  for (const item of mIdCookieMap.values()) {
    if (!item.httpOnly) {
      ret.push(item)
    }
  }
  return ret
}


/**
 * @param {string} str 
 * @param {URL} urlObj 
 * @param {number} now 
 */
function parse(str, urlObj, now) {
  const item = new Cookie()
  const arr = str.split(';')

  for (let i = 0; i < arr.length; i++) {
    let key, val
    const s = arr[i].trim()
    const p = s.indexOf('=')

    if (p !== -1) {
      key = s.substr(0, p)
      val = s.substr(p + 1)
    } else {
      //
      // cookie = 's; secure; httponly'
      //  0: { key: '', val: 's' }
      //  1: { key: 'secure', val: '' }
      //  2: { key: 'httponly', val: '' }
      //
      key = (i === 0) ? '' : s
      val = (i === 0) ? s : ''
    }

    if (i === 0) {
      item.name = key
      item.value = val
      continue
    }

    switch (key.toLocaleLowerCase()) {
    case 'expires':
      if (isNaN(item.expires)) {
        item.expires = Date.parse(val)
      }
      break
    case 'domain':
      if (val[0] === '.') {
        val = val.substr(1)
      }
      item.domain = val
      break
    case 'path':
      item.path = val
      break
    case 'httponly':
      item.httpOnly = true
      break
    case 'secure':
      item.secure = true
      break
    case 'max-age':
      item.expires = now + (+val) * 1000
      break
    case 'samesite':
      item.sameSite = val
      break
    }
  }

  if (isExpire(item, now)) {
    item.isExpired = true
  }

  // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie
  if (item.name.startsWith('__Secure-')) {
    if (!(
      urlObj.protocol === 'https:' &&
      item.secure
    )) {
      return
    }
  }
  if (item.name.startsWith('__Host-')) {
    if (!(
      urlObj.protocol === 'https:' &&
      item.secure &&
      item.domain === '' &&
      item.path === '/'
    )) {
      return
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#Compatibility_notes
  if (item.secure && urlObj.protocol === 'http:') {
    return
  }

  // check hostname
  const domain = urlObj.hostname

  // if (item.domain) {
  //   //???github中出现过invalid cookie domain! `github.com` ⊄ `octocaptcha.com`, 对这种情况如何处理? 暂允许跨域cookie
  //   //<iframe src="https://octocaptcha.com?...."
  //   if (!isSubDomain(item.domain, domain)) {
  //     console.warn('[lbview] invalid cookie domain! `%s` ⊄ `%s`',
  //       item.domain, domain)
  //     return
  //   }
  // } else {
    item.domain = domain
    item.hostOnly = true
  // }

  // check pathname
  const path = urlObj.pathname

  // if (item.path) {
  //   //???github中出现过跨域cookie, 所以路径应可不同
  //   if (!isSubPath(item.path, path)) {
  //     console.warn('[lbview] invalid cookie path! `%s` ⊄ `%s`',
  //       item.path, path)
  //     return
  //   }
  // } else {
    item.path = path
  // }

  item.id = (item.secure ? ';' : '') +
    item.name + ';' +
    item.domain +
    item.path

  return item
}


/**
 * @param {Cookie} item
 */
function set(item) {
  // console.log('set:', item)
  const id = item.id
  const matched = mIdCookieMap.get(id)

  if (matched) {
    if (item.isExpired) {
      // delete
      mIdCookieMap.delete(id)
      matched.isExpired = true
      // TODO: remove node
    } else {
      // update
      copy(matched, item)
    }
    mDirtySet.add(matched)
  } else {
    // create
    const labels = item.domain.split('.')
    let labelPos = labels.length
    let node = mCookieNodeRoot
    do {
      node = node.nextChild(labels[--labelPos])
    } while (labelPos !== 0)
  
    node.addCookie(item)
    mIdCookieMap.set(id, item)

    mDirtySet.add(item)
  }
}


/**
 * @param {URL} urlObj 
 */
function query(urlObj) {
  const ret = []
  const now = Date.now()
  const domain = urlObj.hostname
  const path = urlObj.pathname
  const isHttps = (urlObj.protocol === 'https:')

  const labels = domain.split('.')
  let labelPos = labels.length
  let node = mCookieNodeRoot

  do {
    node = node.getChild(labels[--labelPos])
    if (!node) {
      break
    }
    const items = node.items
    if (!items) {
      continue
    }
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      // https url | secure flag | carry
      //   ✔       |   ✔         |   ✔
      //   ✔       |   ✘         |   ✔
      //   ✘       |   ✘         |   ✔
      //   ✘       |   ✔         |   ✘
      if (!isHttps && item.secure) {
        continue
      }
      // HostOnly Cookie 需匹配完整域名
      if (item.hostOnly && labelPos !== 0) {
        continue
      }
      if (!isSubPath(item.path, path)) {
        continue
      }
      if (item.isExpired) {
        continue
      }
      if (isExpire(item, now)) {
        item.isExpired = true
        continue
      }
      // TODO: same site

      let str = item.value
      if (item.name) {
        str = item.name + '=' + str
      }
      ret.push(str)
    }
  } while (labelPos !== 0)

  return ret.join('; ')
}


/** @type {Database} */
let mDB

async function setDB(db) {
  mDB = db

  const now = Date.now()
  await mDB.enum('cookie', v => {
    if (isExpire(v, now)) {
      mDB.delete('cookie', v.id)
    } else {
      set(v)
    }
    return true
  })

  setInterval(save, 1000 * 3)
}


async function save() {
  if (mDirtySet.size === 0) {
    return
  }

  const tmp = mDirtySet
  mDirtySet = new Set()

  for (const item of tmp) {
    if (item.isExpired) {
      await mDB.delete('cookie', item.id)
    } else if (!isNaN(item.expires)) {
      // 不保存 session cookie
      await mDB.put('cookie', item)
    }
  }
}


/***/ }),

/***/ "./src/database.js":
/*!*************************!*\
  !*** ./src/database.js ***!
  \*************************/
/*! exports provided: Database */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Database", function() { return Database; });
/* harmony import */ var _signal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signal.js */ "./src/signal.js");



class Database {
  /**
   * @param {string} name 
   */
  constructor(name) {
    this._name = name

    /** @type {IDBDatabase} */
    this._db = null
  }

  /**
   * @param {string} table 
   * @param {IDBTransactionMode} mode 
   */
  _getStore(table, mode) {
    return this._db
      .transaction(table, mode)
      .objectStore(table)
  }

  /**
   * @param {Object<string, IDBObjectStoreParameters>} opts 
   */
  open(opts) {
    const s = new _signal_js__WEBPACK_IMPORTED_MODULE_0__["Signal"]()
    const req = indexedDB.open(this._name)

    req.onsuccess = (e) => {
      const idb = req.result
      this._db = idb

      idb.onclose = (e) => {
        console.warn('[lbview] indexedDB disconnected, reopen...')
        this.open(opts)
      }
      s.notify()
    }
    req.onerror = (e) => {
      console.warn('req.onerror:', e)
      s.abort(req.error)
    }
    req.onupgradeneeded = (e) => {
      const idb = req.result
      for (const [k, v] of Object.entries(opts)) {
        idb.createObjectStore(k, v)
      }
    }
    return s.wait()
  }


  close() {
    this._db.close()
  }

  /**
   * @param {string} table 
   * @param {any} key 
   */
  get(table, key) {
    const s = new _signal_js__WEBPACK_IMPORTED_MODULE_0__["Signal"]()
    const obj = this._getStore(table, 'readonly')
    const req = obj.get(key)

    req.onsuccess = (e) => {
      s.notify(req.result)
    }
    req.onerror = (e) => {
      s.abort(req.error)
    }
    return s.wait()
  }

  /**
   * @param {string} table 
   * @param {any} record 
   */
  put(table, record) {
    const s = new _signal_js__WEBPACK_IMPORTED_MODULE_0__["Signal"]()
    const obj = this._getStore(table, 'readwrite')
    const req = obj.put(record)

    req.onsuccess = (e) => {
      s.notify()
    }
    req.onerror = (e) => {
      s.abort(req.error)
    }
    return s.wait()
  }

  /**
   * @param {string} table 
   * @param {any} key 
   */
  delete(table, key) {
    const s = new _signal_js__WEBPACK_IMPORTED_MODULE_0__["Signal"]()
    const obj = this._getStore(table, 'readwrite')
    const req = obj.delete(key)

    req.onsuccess = (e) => {
      s.notify()
    }
    req.onerror = (e) => {
      s.abort(req.error)
    }
    return s.wait()
  }

  /**
   * @param {string} table 
   * @param {(any) => boolean} callback 
   */
  enum(table, callback, ...args) {
    const s = new _signal_js__WEBPACK_IMPORTED_MODULE_0__["Signal"]()
    const obj = this._getStore(table, 'readonly')
    const req = obj.openCursor(...args)

    req.onsuccess = (e) => {
      const {result} = req
      if (result) {
        if (callback(result.value) !== false) {
          result.continue()
        }
      } else {
        s.notify()
      }
    }
    req.onerror = (e) => {
      s.abort(req.error)
    }
    return s.wait()
  }
}


/***/ }),

/***/ "./src/env.js":
/*!********************!*\
  !*** ./src/env.js ***!
  \********************/
/*! exports provided: isPageEnv, isSwEnv, isWorkerEnv, setInfo, getInfo, global, init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPageEnv", function() { return isPageEnv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSwEnv", function() { return isSwEnv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWorkerEnv", function() { return isWorkerEnv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInfo", function() { return setInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInfo", function() { return getInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "global", function() { return global; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
const ENV_PAGE = 1
const ENV_WORKER = 2
const ENV_SW = 3

let mEnvType = 0

function isPageEnv() {
  return mEnvType === ENV_PAGE
}

function isSwEnv() {
  return mEnvType === ENV_SW
}

function isWorkerEnv() {
  return mEnvType === ENV_WORKER
}

/**
 * @type {WeakMap<Object, {loc: Location, doc: Document, ori: URL, domHook: object}>}
 */
//const objInfoMap = new WeakMap()
//目前只有一个全局信息, 所以步需要Map;
//不要设置为{}
let _info;


//目前仅在Page的环境下使用, 里面只有一个值, key为window.Function, 值为{loc: Location, doc: Document, ori: URL, domHook: object}
//WeakMap必须以对象为键, 当key在其它处引用为0时, 对象会被回收, WeakMap中的key做为引用不一定消失,
//但外部已经没有了该对象的引用, 所以已经无法从WeakMap中用该key获取值了, 而且WeakMap也是不可遍历的,
//所以当对象被回收后, WeakMap中的项可能还在, key是对象的引用, 但对象已被回收, 所以该引用只是类似于野指针/无效指针的意思, 但如果项未消失, 但值中确有强引用?
//经测试, 当key所指的对象被回收后, WeakMap中的项会消失, 在Chrome的console中要clear脚本后后再在proformance中collect garbage, 否则可能不会立刻回收
//用WeakMap保存window对象的全局信息意义不大, 直接放到window/self的成员里就可以了
function setInfo(info) {
  //这里win可以传self, ServiceWorkerGlobalScope中也有Function
  //objInfoMap.set(win.Function, info)
  _info = info;
}

//获取页面相关的信息

//???目前Worker中也可能会调用此函数(WebSocket), 但上面的add只在page中调用, 所以在worker中此函数返回的是null, 这对worker中的WebSocket是有问题的
function getInfo() {
  //const Function = obj.constructor.constructor
  //return objInfoMap.get(Function)
  return _info;
}

let global = self;

function init() {
    console.log("env.init, global constructor: " + global.constructor.name + " href:" + global.location.href)

    if ('onclick' in global) {
        //Window
        mEnvType = ENV_PAGE;
    } else if ('onfetch' in global) {
        //ServiceWorkerGlobalScope
        mEnvType = ENV_SW;
    } else {
        //DedicatedWorkerGlobalScope/SharedWorkerGlobalScope
        mEnvType = ENV_WORKER;
    }
}

/***/ }),

/***/ "./src/fakeloc.js":
/*!************************!*\
  !*** ./src/fakeloc.js ***!
  \************************/
/*! exports provided: createFakeLoc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFakeLoc", function() { return createFakeLoc; });
/* harmony import */ var _urlx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./urlx */ "./src/urlx.js");


const {
  defineProperty,
  setPrototypeOf,
} = Object


function setup(obj, fakeLoc) {
  defineProperty(obj, '__location', {
    get() {
      return fakeLoc
    },
    set(val) {
      console.log('[lbview] %s set location: %s', obj, val)
      fakeLoc.href = val
    }
  })
}


/**
 * @param {Window} global  WindowOrWorkerGlobalScope
 */
function createFakeLoc(global) {
  const location = global.location
  let ancestorOrigins

  /**
   * @param {Location | URL} loc 
   */
  function getPageUrlObj(loc) {
    return new URL(_urlx__WEBPACK_IMPORTED_MODULE_0__["decUrlObj"](loc))
  }


  // 不缓存 location 属性，因为 beforeunload 事件会影响赋值
  const locObj = {
    get href() {
      // console.log('[lbview] get location.href')
      return getPageUrlObj(location).href
    },

    // TODO: 精简合并
    get protocol() {
      return getPageUrlObj(location).protocol
    },

    get host() {
      return getPageUrlObj(location).host
    },

    get hostname() {
      return getPageUrlObj(location).hostname
    },

    get port() {
      return getPageUrlObj(location).port
    },

    get pathname() {
      return getPageUrlObj(location).pathname
    },

    get search() {
      return getPageUrlObj(location).search
    },

    get hash() {
      return getPageUrlObj(location).hash
    },

    get origin() {
      return getPageUrlObj(location).origin
    },

    toString() {
      return this.href
    },

    toLocaleString() {
      return this.href
    },

    // TODO: Worker 中没有以下属性
    get ancestorOrigins() {
      if (!ancestorOrigins) {
        // TODO: DOMStringList[]
        ancestorOrigins = []

        let p = global
        //若对parent进行了Proxy, 则真实parent在__Target中
        while ((p = ((p.parent && p.parent.__Target) ? p.parent.__Target : p.parent)) !== top) {
          const u = getPageUrlObj(p.location)
          ancestorOrigins.unshift(u.origin)
        }
      }
      return ancestorOrigins
    },

    set href(val) {
      console.log('[lbview] set location.href:', val)
      location.href = _urlx__WEBPACK_IMPORTED_MODULE_0__["encUrlStrRel"](val, this)
    },

    set protocol(val) {
      console.log('[lbview] set location.protocol:', val)
      const urlObj = getPageUrlObj(location)
      urlObj.href = val
      location.href = _urlx__WEBPACK_IMPORTED_MODULE_0__["encUrlObj"](urlObj)
    },

    set host(val) {
      console.log('[lbview] set location.host:', val)
      const urlObj = getPageUrlObj(location)
      urlObj.host = val
      location.href = _urlx__WEBPACK_IMPORTED_MODULE_0__["encUrlObj"](urlObj)
    },

    set hostname(val) {
      console.log('[lbview] set location.hostname:', val)
      const urlObj = getPageUrlObj(location)
      urlObj.hostname = val
      location.href = _urlx__WEBPACK_IMPORTED_MODULE_0__["encUrlObj"](urlObj)
    },

    set port(val) {
      console.log('[lbview] set location.port:', val)
      const urlObj = getPageUrlObj(location)
      urlObj.port = val
      location.href = _urlx__WEBPACK_IMPORTED_MODULE_0__["encUrlObj"](urlObj)
    },

    set pathname(val) {
      console.log('[lbview] set location.pathname:', val)
      const urlObj = getPageUrlObj(location)
      urlObj.pathname = val
      location.href = _urlx__WEBPACK_IMPORTED_MODULE_0__["encUrlObj"](urlObj)
    },

    set search(val) {
      location.search = val
    },

    set hash(val) {
      location.hash = val
    },

    reload() {
      console.warn('[lbview] location.reload')
      // @ts-ignore
      return location.reload(...arguments)
    },

    replace(val) {
      if (val) {
        console.warn('[lbview] location.replace:', val)
        arguments[0] = _urlx__WEBPACK_IMPORTED_MODULE_0__["encUrlStrRel"](val, this)
      }
      // @ts-ignore
      return location.replace(...arguments)
    },

    assign(val) {
      if (val) {
        console.warn('[lbview] location.assign:', val)
        arguments[0] = _urlx__WEBPACK_IMPORTED_MODULE_0__["encUrlStrRel"](val, this)
      }
      // @ts-ignore
      return location.assign(...arguments)
    },
  }

  const locProto = location.constructor.prototype
  const fakeLoc = setPrototypeOf(locObj, locProto)
  setup(global, fakeLoc)

  global.__locationF = function (b) {
    return b === global.location ? global.__location : b;
  };

  // 非 Worker 环境
  const Document = global['Document']
  if (Document) {
    // TODO: document.hasOwnProperty('location') 原本是 true
    setup(Document.prototype, fakeLoc)
  }

  return fakeLoc
}


/***/ }),

/***/ "./src/hook.js":
/*!*********************!*\
  !*** ./src/hook.js ***!
  \*********************/
/*! exports provided: DROP, REMOVE, func, prop, createDomHook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DROP", function() { return DROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE", function() { return REMOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "func", function() { return func; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prop", function() { return prop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDomHook", function() { return createDomHook; });
const {
  getOwnPropertyDescriptor,
  defineProperty,
  apply,
} = Reflect


const DROP = {}
const REMOVE = {}

/**
 * hook function
 * 
 * @param {object} obj 
 * @param {string} key 
 * @param {(oldFn: Function) => Function} factory
 */
function func(obj, key, factory) {
  /** @type {Function} */
  const oldFn = obj[key]
  if (!oldFn) {
    return false
  }

  const newFn = factory(oldFn)

  Object.keys(oldFn).forEach(k => {
    newFn[k] = oldFn[k]
  })

  const proto = oldFn.prototype
  if (proto) {
    newFn.prototype = proto
  }

  obj[key] = newFn
  return true
}

/**
 * hook property
 * 
 * @param {object} obj 
 * @param {string} key 
 * @param {(oldFn: () => any) => Function=} g 
 * @param {(oldFn: () => void) => Function=} s 
 */
function prop(obj, key, g, s) {
  const desc = getOwnPropertyDescriptor(obj, key)
  if (!desc) {
    return false
  }
  if (g) {
    func(desc, 'get', g)
  }
  if (s) {
    func(desc, 'set', s)
  }
  defineProperty(obj, key, desc)
  return true
}


/**
 * @param {Window} win WindowOrWorkerGlobalScope
 */
function createDomHook(win) {
  /**
   * @param {object} proto 
   * @param {string} name 
   * @param {Function} onget 
   * @param {Function} onset 
   */
  function hookElemProp(proto, name, onget, onset) {
    prop(proto, name,
      getter => function() {
        const val = getter.call(this)
        return onget.call(this, val)
      },
      setter => function(val) {
        val = onset.call(this, val)
        if (val === DROP) {
          return
        }
        setter.call(this, val)
      }
    )
  }

  const elemProto = win['Element'].prototype
  const rawGetAttr = elemProto.getAttribute
  const rawSetAttr = elemProto.setAttribute

  const tagAttrHandlersMap = {}
  const tagTextHandlerMap = {}
  const tagKeySetMap = {}
  const tagKeyGetMap = {}

  /**
   * @param {string} tag 
   * @param {object} proto 
   * @param  {...any} handlers 
   */
  function attr(tag, proto, ...handlers) {
    /** @type {boolean} */
    let hasBind

    /** @type {boolean} */
    let hasAttr
    
    let keySetMap
    let keyGetMap

    // TODO: 未考虑上下文
  
    handlers.forEach(v => {
      // 带划线的 attr 属性名，转换成驼峰形式的 prop 属性名。
      // 例如 `http-equiv` -> `httpEquiv`
      const prop = v.name.replace(/-(\w)/g,
        (_, char) => char.toUpperCase()
      )
      hookElemProp(proto, prop, v.onget, v.onset)

      // #text
      if (prop === 'innerText') {
        tagTextHandlerMap[tag] = v
        return
      }

      // attribute
      if (tagAttrHandlersMap[tag]) {
        tagAttrHandlersMap[tag].push(v)
        hasBind = true
      } else {
        tagAttrHandlersMap[tag] = [v]
        tagKeySetMap[tag] = {}
        tagKeyGetMap[tag] = {}
      }

      if (!keySetMap) {
        keySetMap = tagKeySetMap[tag]
        keyGetMap = tagKeyGetMap[tag]
      }
      const key = v.name.toLocaleLowerCase()
      keySetMap[key] = v.onset
      keyGetMap[key] = v.onget
      hasAttr = true
    })

    if (hasBind || !hasAttr) {
      return
    }

    // 如果之前调用过 setAttribute，直接返回上次设置的值；
    // 如果没有调用过，则返回 onget 的回调值。
    func(proto, 'getAttribute', oldFn => function(name) {
      const key = (name + '').toLocaleLowerCase()

      const onget = keyGetMap[key]
      if (!onget) {
        return apply(oldFn, this, arguments)
      }

      const lastVal = this['_k' + key]
      if (lastVal !== undefined) {
        return lastVal
      }
      const val = apply(oldFn, this, arguments)
      return onget.call(this, val)
    })

    func(proto, 'setAttribute', oldFn => function(name, val) {
      const key = (name + '').toLocaleLowerCase()
      const onset = keySetMap[key]
      if (onset) {
        this['_k' + key] = val

        const ret = onset.call(this, val)
        if (ret === DROP) {
          return
        }
        arguments[1] = ret
      }
      return apply(oldFn, this, arguments)
    })

    func(proto, 'setAttributeNode', oldFn => function(node) {
      console.warn('setAttributeNode:', node, this)
      // TODO:
      return apply(oldFn, this, arguments)
    })

    // ...
  }

  /**
   * @param {Node} node
   * @param {object} handler
   * @param {Element} elem 
   */
  function parseNewTextNode(node, handler, elem) {
// console.log('parseTextNode')
    const val = node.nodeValue
    const ret = handler.onset.call(elem, val, true)
    if (ret === DROP) {
      return
    }
    node.nodeValue = ret
  }

  /**
   * @param {Element} elem 
   * @param {object} handler
   */
  function parseNewElemNode(elem, handler) {
    const name = handler.name
    if (!elem.hasAttribute(name)) {
      return
    }
    const val = rawGetAttr.call(elem, name)
    const ret = handler.onset.call(elem, val, true)

    if (ret === REMOVE) {
      elem.removeAttribute(name)
      return
    }

    if (ret === DROP) {
      return
    }
    rawSetAttr.call(elem, name, ret)
  }

  
  /**
   * @param {Node} node 
   */
  function addNode(node) {
    const type = node.nodeType
    if (type === 1) {
      /** @type {Element} */
      // @ts-ignore
      const elem = node
      const handlers = tagAttrHandlersMap[elem.tagName]
      handlers && handlers.forEach(v => {
        parseNewElemNode(elem, v)
      })
    }
    else if (type === 3) {
      // TEXT_NODE
      const parent = node.parentElement
      if (parent) {
        const handler = tagTextHandlerMap[parent.tagName]
        if (handler) {
          parseNewTextNode(node, handler, parent)
        }
      }
    }
  }

  /**
   * @param {Node} node 
   */
  function delNode(node) {
    // TODO: 增加节点删除后的回调
  }

  return {
    attr,
    addNode,
    delNode,
  }
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env.js */ "./src/env.js");
/* harmony import */ var _page_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page.js */ "./src/page.js");
/* harmony import */ var _sw_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sw.js */ "./src/sw.js");
/* harmony import */ var _worker_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./worker.js */ "./src/worker.js");





function main() {
    _env_js__WEBPACK_IMPORTED_MODULE_0__["init"]();

    if (_env_js__WEBPACK_IMPORTED_MODULE_0__["isPageEnv"]()) {
        _page_js__WEBPACK_IMPORTED_MODULE_1__["init"]();
    } else if (_env_js__WEBPACK_IMPORTED_MODULE_0__["isSwEnv"]()) {
        _sw_js__WEBPACK_IMPORTED_MODULE_2__["init"]();
    } else if (_env_js__WEBPACK_IMPORTED_MODULE_0__["isWorkerEnv"]()){
        _worker_js__WEBPACK_IMPORTED_MODULE_3__["init"]();
    }
}

main();

/***/ }),

/***/ "./src/inject.js":
/*!***********************!*\
  !*** ./src/inject.js ***!
  \***********************/
/*! exports provided: setConf, getHtmlCode, parseStr, processJs, processHtml */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setConf", function() { return setConf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHtmlCode", function() { return getHtmlCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseStr", function() { return parseStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processJs", function() { return processJs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processHtml", function() { return processHtml; });
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./path.js */ "./src/path.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");



let mConf


//const WORKER_INJECT = util.strToBytes(`\
//if (typeof importScripts === 'function' && !self.window && !self.__PATH__) {
//  self.__PATH__ = '${path.ROOT}';
//  importScripts('${path.HELPER}');
//}
//`)
//

//export function getWorkerCode() {
//  return WORKER_INJECT
//}


function setConf(conf) {
  mConf = conf
}


const PADDING = ' '.repeat(500)

// const CSP = `\
// 'self' \
// 'unsafe-inline' \
// file: \
// data: \
// blob: \
// mediastream: \
// filesystem: \
// chrome-extension-resource: \
// `

//注意: preload也会被service worker截获, preload会等待service启动: https://love2dev.com/pwa/service-worker-preload/
//    <link rel="preload" as="script" crossorigin="anonymous" href="https://abs.twimg.com/responsive-web/web/polyfills.b548f144.js" nonce="MjYxMGQ5N2ItNWI1ZC00N2ZjLTkwZmQtODI0OTZlYmE3ZmYz" />

/**
 * @param {URL} urlObj 
 * @param {number} pageId 
 */
function getHtmlCode(urlObj, pageId) {
  const icoUrl = _path_js__WEBPACK_IMPORTED_MODULE_0__["PREFIX"] + urlObj.origin + '/favicon.ico'
  const custom = mConf.inject_html || ''

//   return util.strToBytes(`\
// <!-- JS PROXY HELPER -->
// <!doctype html>
// <link rel="icon" href="${icoUrl}" type="image/x-icon">
// <meta http-equiv="content-security-policy" content="frame-src ${CSP}; object-src ${CSP}">
// <base href="${urlObj.href}">
// <script data-id="${pageId}" src="${path.HELPER}"></script>
// ${custom}
// <!-- PADDING ${PADDING} -->

// `)

return `\
<!-- JS PROXY HELPER -->
<!doctype html>
<base href="${urlObj.href}">
<link rel="icon" href="${icoUrl}" type="image/x-icon">
<script data-id="${pageId}" src="${_path_js__WEBPACK_IMPORTED_MODULE_0__["HELPER"]}"></script>
${custom}
<!-- PADDING ${PADDING} -->

`
}


/**
 * @param {string} code 
 */
function parseStr(code) {
  // TODO: parse js ast
  //let match = false

  //?还是有问题, 将很多成员名为location的替换掉了, https://m.twitch.tv/
  //code = code.replace(/(\b)location(\b)/g, (_, $1, $2) => {
  //  match = true
  //  return $1 + '__location' + $2
  //})

  //替换后twitter虽然未出错但显示不了用户?
  //这里对location进行了函数检测, 只有确认是window.location才进行替换, 参考样本如下
/*
fa win.dow.window.location. location.  dfafdasf  dfsa   window.location. location. location window.location
location. undefinedlocation    
location.
location window.location;
window.location.href

var e=location.search window.location
 server on " + u + " at location " + location), 
 s = window.location,
E&&E.location&&
location:fdafda; location = fdafda
*/
  //??.和(操作符的前后都可以有不限的空白, 暂未考虑, 结尾不能包括:, 因为这可能是属性名, 也不能包括=(但可以包括==), 因这是左操作符.
  //([A-Za-z0-9_\.]+\.|\b)location($|\s+|\.|\)|,|;|&)  ([\w\.]+\.|\b)location\s*($|\.|\)|,|;|&)
  code = code.replace(/([A-Za-z0-9_\.]+\.|\b)location($|\s+|\.|\)|,|;|&)/g, (_, $1, $2) => {
      //match = true
      return '__locationF(' + ($1 ? $1 : '') + 'location)' + ($2 ? $2 : '')
  });

  //???该代码还是有问题, github上出现有对象的成员函数名起名为postMessage, 这些对象的调用不应被替换
  //但调用也没有太大的副作用
  //不能解决将postMessage赋值给另一个变量后调用的问题, 此时调用名已不叫postMessage, ??应改变通讯机制
  //??.和(操作符的前后都可以有不限的空白, 暂未考虑
  //code = code.replace(/\.postMessage\s*\(/g, s => {
  //  //match = true
  //  return s + `...(env.global.__set_srcWin?__set_srcWin():[]), `
  //})

  //if (match) {
  //  return code
  //}

  return code;
}

/**
 * @param {Uint8Array} buf
 * @param {string} charset
 */
//export function parseBin(buf, charset) {
//  const str = util.bytesToStr(buf, charset)
//  const ret = parseStr(str)
//  if (ret !== null) {
//    return util.strToBytes(ret)
//  }
//  if (charset && !util.isUtf8(charset)) {
//    return util.strToBytes(str)
//  }
//  return null
//}

function processJs(str) {
  return `\
if (typeof importScripts === 'function' && !self.window && !self.__PATH__) {
  self.__PATH__ = '${_path_js__WEBPACK_IMPORTED_MODULE_0__["ROOT"]}';
  importScripts('${_path_js__WEBPACK_IMPORTED_MODULE_0__["HELPER"]}');
}
` + parseStr(str);
}

function parseHtmlStr(code) {
    //link和script都会有, github: <link crossorigin="anonymous" media="all" integrity="sha512-/YEVWs7BzxfKyUd6zVxjEQcXRWsLbcEjv045Rq8DSoipySmQblhVKxlXLva2GtNd5DhwCxHwW1RM0N9I7S2Vew==" rel="stylesheet" href="https://github.githubassets.com/assets/frameworks-481a47a96965f6706fb41bae0d14b09a.css" />
    code = code.replace(/\s+(integrity\s*\=\s*["'].*?["'])\s+/g, (_, $1) => {
        return " ";
    });

    code = code.replace(/<meta\s+http-equiv\s*=\s*["']content-type["'].*?>/gi, (_, $1) => {
        return ` <meta http-equiv="content-type" content="text/html; charset=utf-8"> `;
    });

    return code;
}

function processHtml(str, urlObj, pageId) {
    // 注入页面顶部的代码
    return getHtmlCode(urlObj, pageId) + parseHtmlStr(str);
}

/***/ }),

/***/ "./src/msg.js":
/*!********************!*\
  !*** ./src/msg.js ***!
  \********************/
/*! exports provided: PAGE_INFO_PULL, SW_INFO_PUSH, PAGE_COOKIE_PUSH, SW_COOKIE_PUSH, PAGE_INIT_BEG, PAGE_INIT_END, PAGE_CONF_SET, PAGE_CONF_GET, PAGE_RELOAD_CONF, SW_CONF_RETURN, SW_CONF_CHANGE, PAGE_READY_CHECK, SW_READY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGE_INFO_PULL", function() { return PAGE_INFO_PULL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SW_INFO_PUSH", function() { return SW_INFO_PUSH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGE_COOKIE_PUSH", function() { return PAGE_COOKIE_PUSH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SW_COOKIE_PUSH", function() { return SW_COOKIE_PUSH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGE_INIT_BEG", function() { return PAGE_INIT_BEG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGE_INIT_END", function() { return PAGE_INIT_END; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGE_CONF_SET", function() { return PAGE_CONF_SET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGE_CONF_GET", function() { return PAGE_CONF_GET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGE_RELOAD_CONF", function() { return PAGE_RELOAD_CONF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SW_CONF_RETURN", function() { return SW_CONF_RETURN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SW_CONF_CHANGE", function() { return SW_CONF_CHANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGE_READY_CHECK", function() { return PAGE_READY_CHECK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SW_READY", function() { return SW_READY; });
const PAGE_INFO_PULL = 1
const SW_INFO_PUSH = 2

const PAGE_COOKIE_PUSH = 3
const SW_COOKIE_PUSH = 4

const PAGE_INIT_BEG = 5
const PAGE_INIT_END = 6

const PAGE_CONF_SET = 110
const PAGE_CONF_GET = 111
//未用到
const PAGE_RELOAD_CONF = 112

const SW_CONF_RETURN = 112
const SW_CONF_CHANGE = 113

const PAGE_READY_CHECK = 200
const SW_READY = 201

/***/ }),

/***/ "./src/network.js":
/*!************************!*\
  !*** ./src/network.js ***!
  \************************/
/*! exports provided: setConf, setDB, launch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setConf", function() { return setConf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDB", function() { return setDB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "launch", function() { return launch; });
/* harmony import */ var _route_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./route.js */ "./src/route.js");
/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cookie.js */ "./src/cookie.js");
/* harmony import */ var _urlx_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./urlx.js */ "./src/urlx.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _cdn_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cdn.js */ "./src/cdn.js");
/* harmony import */ var _database_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./database.js */ "./src/database.js");




//import * as tld from './tld.js'




//const REFER_ORIGIN = location.origin + '/'
//在跨域直连的情况下urlObj和cliUrlObj不在同一域, 这个值表示是否允许保存跨域的cookie
//通过服务端访问都应转换为同域, 所以应始终允许保存coookie
//const ENABLE_3RD_COOKIE = true

/** @type {Database} */
let mDB


// 部分浏览器不支持 access-control-expose-headers: *
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
//
// 如果返回所有字段名，长度会很大。
// 因此请求头中设置 --aceh 标记，告知服务器是否要返回所有字段名。

//所谓的跨域, 是由于支持动态切换服务器端, 导致访问两个代理服务器端, 部分直接访问都是通过GET方法访问目标资源站点, 不在下列跨域访问考虑的范围内.
//为true时表示浏览器端不支持Access-Control-Expose-Headers:*, 需要服务器将允许浏览器访问的头都列到Access-Control-Expose-Headers中
//这个值由浏览器端请求时设置, 对于非跨域访问时浏览器段应不用设置本值,
//这个值初始时为true进行检测, 当浏览器支持*时, 后续会被设置为false
//与Access-Control-Allow-Headers的区别: https://stackoverflow.com/questions/28107459/in-the-http-cors-spec-whats-the-difference-between-allow-headers-and-expose-he
//let mIsAcehOld = true

// TODO:
let mConf


function setConf(conf) {
  mConf = conf
  _cdn_js__WEBPACK_IMPORTED_MODULE_4__["setConf"](conf)
}


async function setDB(db) {
  mDB = db
  // clear expires
}


/**
 * @param {string} url 
 */
function getUrlCache(url) {
  if(!mDB)
  {
      //当在Chrome中Service Works设置Update on reload时, 在新worker安装完毕等待激活时mDB有时为null
      console.log("error");
      debugger;
  }
  return mDB.get('url-cache', url)
}


// async function setUrlCache(url, host, info, expires) {
//   await mDB.put('url-cache', {url, host, info, expires})
// }
/**
 * @param {string} url 
 * @param {string} host 
 * @param {number} expires 
 */
//仅缓存Url与优选服务端的关系, 意义不大
async function setUrlCache(url, host, expires) {
  await mDB.put('url-cache', {url, host, expires})
 }
 

/**
 * @param {string} url 
 */
async function delUrlCache(url) {
  await mDB.delete('url-cache', url)
}


/**
 * @param {URL} targetUrlObj 
 * @param {URL} clientUrlObj 
 * @param {Request} req 
 */
// function getReqCookie(targetUrlObj, clientUrlObj, req) {
//   const cred = req.credentials
//   if (cred === 'omit') {
//     return ''
//   }
//   if (cred === 'same-origin') {
//     // TODO:
//     const targetTld = tld.getTld(targetUrlObj.hostname)
//     const clientTld = tld.getTld(clientUrlObj.hostname)
//     if (targetTld !== clientTld) {
//       return ''
//     }
//   }
//   return cookie.query(targetUrlObj)
// }

/**
 * @param {Headers} header 
 */
function parseResCache(header) {
  const cacheStr = header.get('cache-control')
  if (cacheStr) {
    if (/no-cache/i.test(cacheStr)) {
      return -1
    }
    const m = cacheStr.match(/(?:^|,\s*)max-age=["]?(\d+)/i)
    if (m) {
      const sec = +m[1]
      if (sec > 0) {
        return sec
      }
    }
  }
  const expires = header.get('expires')
  if (expires) {
    const ts = Date.parse(expires)
    if (ts > 0) {
      return (ts - Date.now()) / 1000 | 0
    }
  }
  return 0
}


/**
 * @param {string[]} cookieStrArr 
 * @param {URL} urlObj 
 * @param {URL} cliUrlObj
 */
//function procResCookie(cookieStrArr, urlObj, cliUrlObj) {
 function procResCookie(cookieStrArr, urlObj) {
  //在跨域直连的情况下urlObj和cliUrlObj不在同一域
  //通过服务端访问始终为同域, 与在浏览器上访问不同
  // if (!ENABLE_3RD_COOKIE) {
  //   const urlTld = tld.getTld(urlObj.hostname)
  //   const cliTld = tld.getTld(cliUrlObj.hostname)
  //   if (cliTld !== urlTld) {
  //     return
  //   }
  // }

  const ret = []
  const now = Date.now()

  for (const str of cookieStrArr) {
    const item = _cookie_js__WEBPACK_IMPORTED_MODULE_1__["parse"](str, urlObj, now)
    if (!item) {
      continue
    }
    _cookie_js__WEBPACK_IMPORTED_MODULE_1__["set"](item)
    if (!item.httpOnly) {
      ret.push(item)
    }
  }
  return ret
}


/**
 * @param {Response} res 
 */
function getResInfo(res) {
  const rawHeaders = res.headers
  let status = res.status

  /** @type {string[]} */
  const cookieStrArr = []
  const headers = new Headers()

  rawHeaders.forEach((val, key) => {
    if (key === 'access-control-allow-origin' ||
        key === 'access-control-expose-headers' ||
        key === 'x-frame-options' ||
        key === 'content-security-policy' ||
        key === 'content-security-policy-report-only' ||
        key === 'clear-site-data'
        ) {
      return
    }
    if (key === '--s') {
      status = +val
      return
    }
    //if (key === '--t') {
    //  return
    //}
    // 还原重名字段
    //  0-key: v1
    //  1-key: v2
    // =>
    //  key: v1, v2
    //
    // 对于 set-cookie 单独存储，因为合并会破坏 cookie 格式：
    //  var h = new Headers()
    //  h.append('set-cookie', 'hello')
    //  h.append('set-cookie', 'world')
    //  h.get('set-cookie')  // "hello, world"
    //
    const m = key.match(/^\d+-(.+)/)
    if (m) {
      key = m[1]
      if (key === 'set-cookie') {
        cookieStrArr.push(val)
      } else {
        headers.append(key, val)
      }
      return
    }

    // 还原转义字段（`--key` => `key`）
    if (key.startsWith('--')) {
      key = key.substr(2)
    }

    // 单个 set-cookie 返回头
    if (key === 'set-cookie') {
      cookieStrArr.push(val)
      return
    }

    headers.set(key, val)
  })

  return {status, headers, cookieStrArr}
}


// https://fetch.spec.whatwg.org/#cors-unsafe-request-header-byte
// 这里更明确: https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header
// const R_UNSAFE_REQ_HDR_CHAR =
//   // eslint-disable-next-line no-control-regex
//   /[\x00-\x08\x0a-\x1f\x22\x28\x29\x3a\x3c\x3e\x3f\x40\x5b\x5c\x5d\x7b\x7d\x7f]/

// /**
//  * @param {string} key
//  * @param {string} val
//  */
// function isSimpleReqHdr(key, val) {
//   if (key === 'content-type') {
//     return (
//       val === 'application/x-www-form-urlencoded' ||
//       val === 'multipart/form-data' ||
//       val === 'text/plain'
//     )
//   }
//   if (key === 'accept' ||
//       key === 'accept-language' ||
//       key === 'content-language'
//   ) {
//     // 标准是总和小于 1024，这里保守一些
//     return val.length < 256 &&
//       !R_UNSAFE_REQ_HDR_CHAR.test(val)
//   }
// }


/**
 * @param {Request} req 
 * @param {URL} urlObj 
 * @param {URL} cliUrlObj 
 */
//function initReqHdr(req, urlObj, cliUrlObj) {
function initReqHdr(req, urlObj) {
  //const reqHdr = new Headers()
  const reqMap = {
    //--开头的仅服务器使用, 不传递给源站
    //???下面三个参数在服务器端仅做日志使用, 无其它用途, 应可以删掉
    // '--ver': mConf.ver,
    // '--mode': req.mode,
    // '--type': req.destination || '',
    //该字段经服务器传递给源站, 在后面直接设置
    //删除该头, 否则可能会源站当作跨域访问
    //'origin': '',
  }

  //if (mIsAcehOld) {
  //  reqMap['--aceh'] = '1'
  //}

  //请求头已全部传递给服务器, 由服务器决定修改或传递那些请求头到源站
  // req.headers.forEach((val, key) => {
  //    //该值会自动补上
  //    /*
  //   if (key === 'user-agent') {
  //     return
  //   }*/

  //   //这里并无办法区分请求头是针对服务器还是针对源站
  //   //服务器端会把所有头都转发给源站
  //   //?是否在这里把所有头都发送给服务器, 由服务器决定删除那些头? 而不是使用reqMap
  //   if (isSimpleReqHdr(key, val)) {
  //     //reqHdr.set(key, val)
  //   } else {
  //     //对于cf-worker, 除了简单头,还有其特殊头, 如果不设置, 有时会不正常, 如何挑选对于针对服务器的头? 目前只有cf-worker这类边缘服务器才需特殊头
  //     //如果不加此句, twitter的移动版无法正常运行: https://mobile.twitter.com/google
  //     //reqHdr.set(key, val);

  //     reqMap[key] = val
  //   }
  // })

  //if (reqMap['origin']) {
  // if (req.headers.has('origin')) {
  //   reqMap['origin'] = cliUrlObj.origin
  // }

  //这只是在服务器端清空了origin, 是否设置正确的值urlObj.origin,
  //该首部用于 CORS 请求或者 POST 请求。除了不包含路径信息，该字段与 Referer 首部字段相似。
  //跨域预检访问时会用到该字段, https://www.ruanyifeng.com/blog/2016/04/cors.html, 既然服务端访问源为非跨域访问,暂不设置该字段
  //origin,referer和host区别: https://www.jianshu.com/p/1f9c71850299
  //这个参数一般只存在于CORS跨域请求中，可以看到response有对应的header：Access-Control-Allow-Origin
  //所以服务端只要不传递这个值应不认为是跨域请求?
  //设置这个值是为了清除浏览器可能发送给服务端的该头,
  //这里无需处理, 就算要处理也是删除该头,直接在服务器端发送到源站前删除
  //reqMap['origin'] = ""

  //通过服务端访问都转换为同域
  //这两个是请求控制信息, 非请求头部信息, 传递到服务器端会被设置到头部, 无意义, 服务器段的fetch会自动生成一个新请求, 目前只会使用这里传递过去的头部信息
  //reqMap['mode'] = "same-origin";
  //reqMap['credentials'] = "same-origin"

  const referer = req.referrer
  if (referer) {
    // TODO: CSS 引用图片的 referer 不是页面 URL，而是 CSS URL
    //转换到源站点
    // if (referer === REFER_ORIGIN) {
    //   // Referrer Policy: origin
    //   reqMap['referer'] = cliUrlObj.origin + '/'
    // } else {
    //   reqMap['referer'] = urlx.decUrlStrAbs(referer)
    // }
    // 转换到目标源站点, 就像非跨域访问一样
    reqMap['referer'] = urlObj.origin + '/'
  }

  //跨域访问是否发送cookie到服务端不太重要, 但应从服务端发送到源站
  //reqMap['cookie'] = getReqCookie(urlObj, cliUrlObj, req)
  reqMap['cookie'] = _cookie_js__WEBPACK_IMPORTED_MODULE_1__["query"](urlObj)

  //return {reqHdr, reqMap}
  return {reqMap}
}

/**
 * @param {RequestInit} reqOpt 
 * @param {Object<string, string>} info 
 */
 /*
function updateReqHeaders(reqOpt, info) {
  reqOpt.referrer = '/?' + new URLSearchParams(info)
}*/

//解决Android Chrome上出错: TypeError: Failed to construct 'Request': Cannot construct a Request with a Request whose mode is 'navigate' and a non-empty RequestInit.
//https://github.com/GoogleChrome/workbox/issues/1796
//https://stackoverflow.com/questions/34640286/how-do-i-copy-a-request-object-with-a-different-url
//这里生成一个与服务端交流的Request, 只要能与服务端进行正常交流并把Header部分(reqMap)和Body的值传到服务器端即可
async function newReqOpt(req, reqMap) {
  /** @type {RequestInit} */

  let method = req.method;

  //参数值参考: https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request
  //对复制的Request, 其默认值不符合跨域请求, 需要修改
  //https://aotu.io/notes/2017/04/10/fetch-API/index.html
  //reqOpt中的值即对服务器端有效(?服务器不需要该设置), 又会从服务器端传递到源端(?可能不行, 只有头部才会传递过去), 也会直接从客户端传递到源端
  //要想由服务端传递到源端, 需要设置reqMap
  //这里的设置与服务端无关, 服务端是允许所有请求选项与头部的
  //目前有三种访问方式: 1. 浏览器跨过服务端直接访问资源, 2. 浏览器通过不同服务端访问资源, 例如大资源文件通过加速服务端, 3. 通过当前服务端访问资源
  //2，3两种方式都是通过服务直接连接资源, 在服务端都应设置同域访问,
  //1,2 对于当前浏览器来说都是跨域访问
  //reqOpt仅是针对当前浏览器发送到不同服务器端的, 如果不动态切换服务器段, 下面都可以设置为同域
  //reqOpt是Request控制值, 非头部值只对浏览器中的Request有影响,
  //服务器端会重新生成一个有默认控制值的Request， 与这里无关,
  //只要能与服务端进行正常交流并把Header部分(reqMap)和Body的值传到服务器端即可, 服务器端会使用reqMap来设置Header
  const reqOpt = {
    method: method,
    //当前直接跨域访问目标资源时才有意义? urlObj.origin === cliUrlObj.origin ? 'same-origin' : cors,
    //这里其实允许除navigate外的任何设置, 与跨域与否无关, 只是由于有些Android浏览器在该值为navigate时无法创建新的Request
    //由于服务器端对下面的请求项的不同值不会处理, 所以理论上各种值都可以
    mode: 'cors',
    //cache: ""default"，
    //let browser handle redirects
    //redirect: 'manual',
    credentials: "same-origin",
    //上面的值仅涉及与服务器间的交流, 设置的值需保证在任何情况下都能将下面的值及body传递给服务器, 由服务器发送给源站即可

    //下面的项涉及到源站, 比较重要
    headers: new Headers(req.headers),
    //https://imququ.com/post/referrer-policy.html
    //https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referrer-Policy
    //该值必须设置为空(即缺省值no-referrer-when-downgrade)或unsafe-url, 否则referrer可能不会被发送
    referrerPolicy: "unsafe-url",
    //该值少量控制信息由浏览器与服务器交流使用, 其它由服务器传递给源站
    referrer: '/?' + new URLSearchParams(reqMap)
  }

  //let url = req.url;

  //只需要Header, 对服务器与源站的交流很重要, 其它设置只是浏览器自身的设置, 与源站无关
  //Object.keys(Request.prototype).forEach(function (value) {
  //  let iv = req[value];
  //  if (iv !== undefined && typeof iv !== "function" && reqOpt[value] === undefined) {
  //    //不使用Request的cache值, 'only-if-cached' can be set only with 'same-origin' mode,
  //    if (value !== "cache") {
  //      reqOpt[value] = req[value]
  //    }
  //  }
  //});

  method = method.toUpperCase();
  if (method !== 'HEAD' && method !== 'GET') {
    //const blob = await req.blob()
    //if (blob.size > 0) {
    //  reqOpt.body = blob
    //}

    //arrayBuffer比blob更通用
    //text也能在cf-worker和客户端使用
    //https://community.cloudflare.com/t/convert-request-body-to-base64-encoded-string-solved/99341/4
    const buf = await req.arrayBuffer()
    if (buf.byteLength > 0) {
      reqOpt.body = buf
    }
  }

  //跨域请求就是由origin头发起的, 删除该头避免跨域限制
  reqOpt.headers.delete("origin");

  //注意: 绝对不要返回Request, 因为Request中没有body或者其body不能用来在参数中初始化另一个Request对象, 只能在非Request对象中存放body
  //return new Request(url, reqOpt)
  return reqOpt;
}

const MAX_RETRY = 5

/**
 * @param {req} 最初的未经修改的req
 * @param {urlObj} 目标资源源端, 在跨域访问的情况下与当前源端是不同的, href: https://github.githubassets.com/assets/github-5362384f9e2512870c388a187eaf4868.css
 * @param {cliUrlObj} 当前客户端打开的源端, href: https://github.com/
 */
//export async function launch(req, urlObj, cliUrlObj) {
 async function launch(req, urlObj) {

  //https://www.twitch.tv/站点加载了: chrome-extension://pkedcjkdefgpdelpbcmbmeomcjbeemfm/cast_sender.js
  if (!_urlx_js__WEBPACK_IMPORTED_MODULE_2__["isHttpProto"](urlObj.protocol)) {
      console.log("is not Http Proto! " + urlObj.href)

    // 非 HTTP 协议的资源，直接访问
    // 例如 youtube 引用了 chrome-extension: 协议的脚本
    const res = await fetch(req)
    return {res}
  }

  const {method} = req

    //?bodyUsed表示body是否被读过, 除非源站脚本里读过?
    //参考: https://stackoverflow.com/questions/40497859/reread-a-response-body-from-javascripts-fetch
    /*
    if(req.bodyUsed) {
        console.log("req.bodyUsed is true!")
        debugger;
    }*/

    //该处理是有必要的, 在访问twitter时就能发现此现象,
    //?可能的原因, header's mode was set to no-cors, 所以到这里读取不到body,
    //参考: https://stackoverflow.com/questions/57583086/service-worker-not-getting-body-from-request
    //https://stackoverflow.com/questions/54016068/empty-body-in-fetch-post-request/54016415#54016415
    //后面直接复制Request, 所以不再做如下判断
    /*
    if (method === 'POST') {
      if(req.body) {
        reqOpt.body = req.body
      }
      else {
          const buf = await req.arrayBuffer()
          if (buf.byteLength > 0) {
            reqOpt.body = buf
          }
      }
    }*/

  //后面直接复制Request, 所以不再做如下判断
  /*
  if (method === 'POST' && !req.bodyUsed) {
    if (req.body) {
      reqOpt.body = req.body
    } else {
      const buf = await req.arrayBuffer()
      if (buf.byteLength > 0) {
        reqOpt.body = buf
      }
    }
  }
  */

  //?标准里没有该字段
  /*
  if (req.signal) {
    reqOpt.signal = req.signal
  }*/


  const url = urlObj.href
  const urlHash = _util__WEBPACK_IMPORTED_MODULE_3__["strHash"](url)
  let host = ''
  // let rawInfo = ''

  //const {reqHdr, reqMap} = initReqHdr(req, urlObj, cliUrlObj)
  //reqMap中的信息都是通过referrer字段传递给服务器端使用的, 一部分是控制信息, 一部分是发送到源站的头部信息
  //const {reqMap} = initReqHdr(req, urlObj, cliUrlObj)
  const {reqMap} = initReqHdr(req, urlObj)
  //reqOpt.headers = reqHdr

  while (method === 'GET') {
    // 该资源是否加载过？
    const r = await getUrlCache(url)
    if (r && r.host) {
      const now = _util__WEBPACK_IMPORTED_MODULE_3__["getTimeSeconds"]()
      if (now < r.expires) {
        // 使用之前的节点，提高缓存命中率
        host = r.host
        // rawInfo = r.info
        break
      }
    }

    // 支持 CORS 的站点，可直连
    if (_cdn_js__WEBPACK_IMPORTED_MODULE_4__["isDirectHost"](urlObj.host)) {
      console.log('direct hit:', url)
      const res = await _cdn_js__WEBPACK_IMPORTED_MODULE_4__["proxyDirect"](url)
      if (res) {
        setUrlCache(url, '', '', 0)
        return {res}
      }
    }

    break
  }

  // TODO: 此处逻辑需要优化
  let level = 1

  // 如果缓存未命中(应是命中?)产生请求，服务器不做节点切换
  if (host) {
    level = 0
  }

  /** @type {Response} */
  let res

  /** @type {Headers} */
  let resHdr


  for (let i = 0; i < MAX_RETRY; i++) {
    if (i === 0 && host) {
      // 使用缓存的主机
    } else {
      host = _route_js__WEBPACK_IMPORTED_MODULE_0__["getHost"](urlHash, level)
    }
    
    const rawUrl = _urlx_js__WEBPACK_IMPORTED_MODULE_2__["delHash"](urlObj.href)
    let proxyUrl = _route_js__WEBPACK_IMPORTED_MODULE_0__["genUrl"](host, 'http') + '/' + rawUrl

    // 即使未命中(应是命中?)缓存，在请求“加速节点”时也能带上文件信息
    //该值非空表示服务器端不处理该大文件请求, 要求切换到cf-worker中处理
    // if (rawInfo) {
    //   //这个头部仅在服务器端切换大文件到加速节点时设置, 目前是切换到cf-worker, 然后在cf-worker中比较两次请求的文件长度来返回是否出错, 未看出此举有何意义 
    //   reqMap['--raw-info'] = rawInfo
    // } else {
    //   delete reqMap['--raw-info']
    // }

    res = null
    try {
      reqMap['--level'] = level
      //updateReqHeaders(reqOpt, reqMap)

      //res = await fetch(proxyUrl, reqOpt)

      //Request的头部是不可修改的, 复制后便可修改
      //Request的构造过程: https://fetch.spec.whatwg.org/#dom-request
      //https://stackoverflow.com/questions/39109789/what-limitations-apply-to-opaque-responses
      //https://developers.cloudflare.com/workers/templates/snippets/alter_headers/
      //https://stackoverflow.com/questions/35420980/how-to-alter-the-headers-of-a-request/35421644
      //https://stackoverflow.com/questions/49503836/serviceworker-is-it-possible-to-add-headers-to-url-request
      //使用复制Request的方式可以更好的传递Request的信息, 由于url只能在Request的第一个参数传递, 所以需要两次生成Request,
      //由于fetch的参数和Request的一样, 所以可以直接将第二个Request的参数传递给fetch, fetch内部也是重新生成一个Request
      //let reqNew = new Request(proxyUrl, new Request(req, reqOpt))
      //res = await fetch(reqNew)
      //下面的用法在Android Chrome上出错: TypeError: Failed to construct 'Request': Cannot construct a Request with a Request whose mode is 'navigate' and a non-empty RequestInit.
      //res = await fetch(proxyUrl, new Request(req, reqOpt));
      let reqNew = new Request(proxyUrl, await newReqOpt(req, reqMap));
      res = await fetch(reqNew);
    } catch (err) {
      console.warn('fetch fail:' + err +", " + proxyUrl)
      break
      // TODO: 重试其他线路
      // route.setFailHost(host)
    }
    resHdr = res.headers

    // 检测浏览器是否支持 aceh: *
    //这是一个测试字段, 如果能访问不在access-control-expose-headers中的头, 则表示浏览器支持*, 下次就不用返回全部头了,
    //其实也可利用现有的其它头部字段如--s, 但--s仅在status不等于200时才设置(现始终设置)
    //if (mIsAcehOld && resHdr.has('--t')) {
    //  mIsAcehOld = false
    //  delete reqMap['--aceh']
    //}

    // 是否切换节点
    if (resHdr.has('--switched')) {
      //这个头部仅在服务器端切换大文件到加速节点时设置, 目前是切换到cf-worker, 然后在cf-worker中比较两次请求的文件长度来返回是否出错, 未看出此举有何意义 
      // rawInfo = resHdr.get('--raw-info')
      level++
      continue
    }

    // 目前只有加速节点会返回该信息
    const resErr = resHdr.get('--error')
    if (resErr) {
      console.warn('[lbview] cfworker fail:', resErr)
      // rawInfo = ''
      level = 0
      continue
    }

    break
  }

  if (!res) {
    return
  }

  const {
    status, headers, cookieStrArr
  } = getResInfo(res)


  if (method === 'GET' && status === 200) {
    const cacheSec = parseResCache(headers)
    if (cacheSec >= 0) {
      const expires = _util__WEBPACK_IMPORTED_MODULE_3__["getTimeSeconds"]() + cacheSec + 1000
      //setUrlCache(url, host, rawInfo, expires)
      setUrlCache(url, host, expires)
    }
  }

  // 处理 HTTP 返回头的 refresh 字段
  // http://www.otsukare.info/2015/03/26/refresh-http-header
  const refresh = headers.get('refresh')
  if (refresh) {
    const newVal = _urlx_js__WEBPACK_IMPORTED_MODULE_2__["replaceHttpRefresh"](refresh, url)
    if (newVal !== refresh) {
      console.log('[lbview] http refresh:', refresh)
      headers.set('refresh', newVal)
    }
  }

  let cookies
  if (cookieStrArr.length) {
    //const items = procResCookie(cookieStrArr, urlObj, cliUrlObj)
    const items = procResCookie(cookieStrArr, urlObj)
    if (items.length) {
      cookies = items
    }
  }

  return {res, status, headers, cookies}
}


/***/ }),

/***/ "./src/page.js":
/*!*********************!*\
  !*** ./src/page.js ***!
  \*********************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env.js */ "./src/env.js");
/* harmony import */ var _msg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./msg.js */ "./src/msg.js");
/* harmony import */ var _route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./route.js */ "./src/route.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util.js */ "./src/util.js");
/* harmony import */ var _urlx_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./urlx.js */ "./src/urlx.js");
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hook.js */ "./src/hook.js");
/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cookie.js */ "./src/cookie.js");
/* harmony import */ var _inject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./inject.js */ "./src/inject.js");
/* harmony import */ var _worker_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./worker.js */ "./src/worker.js");










const global = _env_js__WEBPACK_IMPORTED_MODULE_0__["global"];

const {
  apply,
} = Reflect


function initDoc(domHook) {
  console.log("page.initDoc, begin: href: " + global.location.href + ", docment.domain:" + global.document.domain + ", origin: " + global.location.origin);

  const document = global.document

  const headElem = document.head
  const baseElemList = document.getElementsByTagName('base')
  //这个是注入的base
  const baseElem = baseElemList[0]
  
  document.__baseElem = baseElem

  //
  // 监控元素创建和删除
  //
  const nodeSet = new WeakSet()

  function onNodeAdd(node) {
    if (nodeSet.has(node)) {
      return
    }
    nodeSet.add(node)
    
    const nodes = node.childNodes
    for (let i = 0, n = nodes.length; i < n; i++) {
      onNodeAdd(nodes[i])
    }
    domHook.addNode(node)
  }


  function onNodeDel(node) {
    nodeSet.delete(node)

    const nodes = node.childNodes
    for (let i = 0, n = nodes.length; i < n; i++) {
      onNodeDel(nodes[i])
    }
    domHook.delNode(node)

    // TODO: 逻辑优化
    if (node === baseElem) {
      // 默认的 <base> 元素可能会被删除，需要及时补上
      headElem.insertBefore(baseElem, headElem.firstChild)
      console.warn('[lbview] base elem restored')
    }
  }

  /**
   * @param {MutationRecord[]} mutations 
   */
  function parseMutations(mutations) {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(onNodeAdd)
      mutation.removedNodes.forEach(onNodeDel)
    })
  }

  const observer = new global.MutationObserver(parseMutations)
  observer.observe(document, {
    childList: true,
    subtree: true,
  })

  console.log("page.initDoc, end: href: " + global.location.href + ", docment.domain:" + global.document.domain + ", origin: " + global.location.origin);
}

function init() {
  console.log("page.init, begin: href: " + global.location.href + ", docment.domain:" + global.document.domain + ", origin: " + global.location.origin);

  //现无跨域直接调用
  //if (!global) {
  //  console.warn("page.init, global is null: " + global.location.href + ", docment.domain:" + global.document.domain + ", origin: " + global.location.origin);
  //  return
  //}
  //try {
  //  //是否属于跨域参考:
  //  //https://github.com/chromium/chromium/blob/master/third_party/blink/renderer/platform/weborigin/security_origin.cc
  //  //协议相同的情况下, 先比较document.domain, 如果不同再比较主机和端口.
  //  global['x']
  //} catch (err) {
  //  // TODO: 不应该出现
  //  console.warn('not same origin')
  //  return
  //}

  const document = global.document

  // 该 window 之前已初始化过，现在只需更新 document。
  // 例如 iframe 加载完成之前，读取 contentWindow 得到的是空白页，
  // 加载完成后，document 对象会变化，但 window 上的属性仍保留。
  //现每个window都只会初始化一次, 应不会到这里来
  //const info = env.getInfo()
  //if (info) {
  //  const {doc, domHook} = info
  //  //if (doc !== document || document.readyState !== "complete") {
  //  //应该无需等待complete, 因为会监测dom树的变化
  //  if (doc !== document) {
  //    // 加载完成后，初始化实际页面的 document
  //    initDoc(domHook)
  //    info.doc = document
  //  }
  //  return
  //}

  //页面和Worker中都有location和navigator
  const {
    location,
    navigator,
  } = global


  // 源路径（空白页继承上级页面）
  //在worker中没有document
  //该值是源站url
  const oriUrlObj = new URL(document.baseURI)

  const domHook = _hook_js__WEBPACK_IMPORTED_MODULE_5__["createDomHook"](global)

  // 关联当前页面上下文信息
  _env_js__WEBPACK_IMPORTED_MODULE_0__["setInfo"]({
    loc: location,
    doc: document,
    ori: oriUrlObj, //源站url
    domHook,
  })

  // hook 页面和 Worker 相同的 API
  _worker_js__WEBPACK_IMPORTED_MODULE_8__["init"]()

  // 首次安装 document
  // 如果访问加载中的页面，返回 about:blank 空白页
  initDoc(domHook)

  const sw = navigator.serviceWorker
  const swCtl = sw.controller

  if(!swCtl) {
    console.log("page.init, sw.controller is null!, href: " + global.location.href + ", docment.domain:" + global.document.domain + ", origin: " + global.location.origin);
  }

  function sendMsgToSw(cmd, val) {
    swCtl && swCtl.postMessage([cmd, val])
  }

  // TODO: 这部分逻辑需要优化
  let readyCallback

  function pageAsyncInit() {
    const curScript = document.currentScript
    if (!curScript) {
      return
    }
    // curScript.remove()

    //注入的脚本中的data-id="${pageId}"
    const pageId = +curScript.dataset['id']
    // console.log('PAGE wait id:', pageId)

    if (!pageId) {
      console.warn('[lbview] missing page id')
      return
    }

    readyCallback = function() {
      sendMsgToSw(_msg_js__WEBPACK_IMPORTED_MODULE_1__["PAGE_INIT_END"], pageId)
    }

    sendMsgToSw(_msg_js__WEBPACK_IMPORTED_MODULE_1__["PAGE_INIT_BEG"], pageId)

    // do async init
    // if (global === top) {
      sendMsgToSw(_msg_js__WEBPACK_IMPORTED_MODULE_1__["PAGE_INFO_PULL"])
    // } else {
    //   readyCallback()
    // }
  }
  pageAsyncInit()

  sw.addEventListener('message', e => {
    const [cmd, val] = e.data
    switch (cmd) {
    case _msg_js__WEBPACK_IMPORTED_MODULE_1__["SW_COOKIE_PUSH"]:
      // console.log('PAGE MSG.SW_COOKIE_PUSH:', val)
      val.forEach(_cookie_js__WEBPACK_IMPORTED_MODULE_6__["set"])
      break

    case _msg_js__WEBPACK_IMPORTED_MODULE_1__["SW_INFO_PUSH"]:
      // console.log('PAGE MSG.SW_INFO_PUSH:', val)
      val.cookies.forEach(_cookie_js__WEBPACK_IMPORTED_MODULE_6__["set"])
      _route_js__WEBPACK_IMPORTED_MODULE_2__["setConf"](val.conf)
      readyCallback()
      break

    case _msg_js__WEBPACK_IMPORTED_MODULE_1__["SW_CONF_CHANGE"]:
      _route_js__WEBPACK_IMPORTED_MODULE_2__["setConf"](val)
      break
    }
    e.stopImmediatePropagation()
  }, true)

  sw.startMessages && sw.startMessages()

  //
  // hook ServiceWorker
  //
  const swProto = global['ServiceWorkerContainer'].prototype
  if (swProto) {
    _hook_js__WEBPACK_IMPORTED_MODULE_5__["func"](swProto, 'register', oldFn => function(url) {
      console.warn('access serviceWorker.register blocked')
      return new Promise(function() {})

      //if (url) {
      //    arguments[0] = urlx.encUrlStrRel(url, this)
      //}
      //return apply(oldFn, this, arguments)
    })
    _hook_js__WEBPACK_IMPORTED_MODULE_5__["func"](swProto, 'getRegistration', oldFn => function(url) {
      console.warn('access serviceWorker.getRegistration blocked')
      return new Promise(function() {})

      //if (url) {
      //  arguments[0] = urlx.encUrlStrRel(url, this)
      //}
      //return apply(oldFn, this, arguments)
    })
    _hook_js__WEBPACK_IMPORTED_MODULE_5__["func"](swProto, 'getRegistrations', oldFn => function() {
      console.warn('access serviceWorker.getRegistrations blocked')
      return new Promise(function() {})
      //return apply(oldFn, this, arguments)
    })
  }

  /**
   * History API
   * @param {string} name 
   */
  function hookHistory(name) {
    const proto = global['History'].prototype

    _hook_js__WEBPACK_IMPORTED_MODULE_5__["func"](proto, name, oldFn =>
    /**
     * @param {*} data 
     * @param {string} title 
     * @param {string} url 相对或绝对路径
     */
    function(data, title, url) {
      console.log('[lbview] history.%s: %s', name, url)

      const {loc, doc} = _env_js__WEBPACK_IMPORTED_MODULE_0__["getInfo"]()
      if (doc && url) {
        const dstUrlObj = _urlx_js__WEBPACK_IMPORTED_MODULE_4__["newUrl"](url, doc.baseURI)
        if (dstUrlObj) {
          // 当前页面 URL
          const srcUrlStr = _urlx_js__WEBPACK_IMPORTED_MODULE_4__["decUrlObj"](loc)
          const srcUrlObj = new URL(srcUrlStr)

          if (srcUrlObj.origin !== dstUrlObj.origin) {
            throw Error(`\
Failed to execute '${name}' on 'History': \
A history state object with URL '${url}' \
cannot be created in a document with \
origin '${srcUrlObj.origin}' and URL '${srcUrlStr}'.`
            )
          }
          arguments[2] = _urlx_js__WEBPACK_IMPORTED_MODULE_4__["encUrlObj"](dstUrlObj)
        }
      }
      return apply(oldFn, this, arguments)
    })
  }
  hookHistory('pushState')
  hookHistory('replaceState')

  //
  // hook window.open()
  //
  _hook_js__WEBPACK_IMPORTED_MODULE_5__["func"](global, 'open', oldFn => function(url) {
    if (url) {
      arguments[0] = _urlx_js__WEBPACK_IMPORTED_MODULE_4__["encUrlStrRel"](url, url)
    }
    return apply(oldFn, this, arguments)
  })

  //
  // hook window.frames[...]
  //
  //现各页面独立初始化, 而不是通过主页面
  //const frames = global.frames
  //
  //// @ts-ignore
  //global.frames = new Proxy(frames, {
  //  get(_, key) {
  //    if (typeof key === 'number') {
  //      console.log('get frames index:', key)
  //      const global = frames[key]
  //      init()
  //      return global
  //    } else {
  //      return frames[key]
  //    }
  //  }
  //})

  //暂未用到
  //hook.func(navigator, 'registerProtocolHandler', oldFn => function(_0, url, _1) {
  //  console.log('registerProtocolHandler:', arguments)
  //  return apply(oldFn, this, arguments)
  //})


  //
  // hook document.domain
  //
  const docProto = global['Document'].prototype
  let domain = oriUrlObj.hostname

  _hook_js__WEBPACK_IMPORTED_MODULE_5__["prop"](docProto, 'domain',
    getter => function() {
      return domain
    },
    setter => function(val) {
      console.log('[lbview] set document.domain:', val)
      domain = val
      // TODO:
      setter.call(this, location.hostname)
    }
  )

  //
  // hook document.cookie
  //
  _hook_js__WEBPACK_IMPORTED_MODULE_5__["prop"](docProto, 'cookie',
    getter => function() {
      // console.log('[lbview] get document.cookie')
      const {ori} = _env_js__WEBPACK_IMPORTED_MODULE_0__["getInfo"]()
      return _cookie_js__WEBPACK_IMPORTED_MODULE_6__["query"](ori)
    },
    setter => function(val) {
      // console.log('[lbview] set document.cookie:', val)
      const {ori} = _env_js__WEBPACK_IMPORTED_MODULE_0__["getInfo"]()
      const item = _cookie_js__WEBPACK_IMPORTED_MODULE_6__["parse"](val, ori, Date.now())
      if (item) {
        _cookie_js__WEBPACK_IMPORTED_MODULE_6__["set"](item)
        sendMsgToSw(_msg_js__WEBPACK_IMPORTED_MODULE_1__["PAGE_COOKIE_PUSH"], item)
      }
    }
  )

  // hook uri api
  function getUriHook(getter) {
    return function() {
      const val = getter.call(this)
      return val && _urlx_js__WEBPACK_IMPORTED_MODULE_4__["decUrlStrAbs"](val)
    }
  }

  _hook_js__WEBPACK_IMPORTED_MODULE_5__["prop"](docProto, 'referrer', getUriHook)
  _hook_js__WEBPACK_IMPORTED_MODULE_5__["prop"](docProto, 'URL', getUriHook)
  _hook_js__WEBPACK_IMPORTED_MODULE_5__["prop"](docProto, 'documentURI', getUriHook)

  const nodeProto = global['Node'].prototype
  _hook_js__WEBPACK_IMPORTED_MODULE_5__["prop"](nodeProto, 'baseURI', getUriHook)


  // hook Message API
  const msgEventProto = global['MessageEvent'].prototype
  _hook_js__WEBPACK_IMPORTED_MODULE_5__["prop"](msgEventProto, 'origin',
    getter => function() {
      const {ori} = _env_js__WEBPACK_IMPORTED_MODULE_0__["getInfo"]()
      return ori.origin
    }
  )

  //该函数意义不大, 因为该修改无法传递到跨域窗体,
  //是否有可能用本窗体postMessage发送的origin与本域不一致导致的错误? 如果出现该状况, 下面的函数还是有用的，
  //???经测试, 在https://www.twitch.tv/站, hook后会减少跨域错误, 可能下面的代码对iframe中的window还是有效的?似乎并未减少错误
  //对代码 v.gIframe.contentWindow.postMessage(xxx, ,v.gIframe.src)无效
  //hook.func(global, 'postMessage', oldFn => function(msg, origin) {
  //  //const srcWin = top['__get_srcWin']() || this
  //  // console.log(srcWin)
  //  if (origin && origin !== '*') {
  //    arguments[1] = '*'
  //  }
  //  let srcWin = this;
  //  return apply(oldFn, srcWin, arguments)
  //})

  //
  // hook <meta>
  //
  const metaProto = global['HTMLMetaElement'].prototype

  domHook.attr('META', metaProto,
  {
    name: 'http-equiv',
    onget(val) {
      // TODO: 
      return val
    },
    onset(val) {
      let newVal

      switch (val.toLowerCase()) {
      case 'refresh':
        newVal = _urlx_js__WEBPACK_IMPORTED_MODULE_4__["replaceHttpRefresh"](this.content, this)
        if (newVal !== val) {
          console.warn('[lbview] meta redir')
          this.content = newVal
        }
        break
      case 'content-security-policy':
        console.warn('[lbview] meta csp removed')
        this.remove()
        break
      case 'content-type':
        this.remove()
        break
      }
      return val
    }
  },
  {
    name: 'charset',
    onget(val) {
      return val
    },
    onset(val) {
      return 'utf-8'
    }
  }
  )

  //
  // hook 元素的 URL 属性，JS 读取时伪装成原始值
  //
  function hookAttr(tag, proto, name) {
    domHook.attr(tag, proto, {
      name,
      onget(val) {
        if (val === null) {
          return ''
        }
        return _urlx_js__WEBPACK_IMPORTED_MODULE_4__["decUrlStrRel"](val, this)
      },
      onset(val) {
        if (val === '') {
          return val
        }
        return _urlx_js__WEBPACK_IMPORTED_MODULE_4__["encUrlStrRel"](val, this)
      }
    })
  }

  const anchorProto = global['HTMLAnchorElement'].prototype
  hookAttr('A', anchorProto, 'href')

  const areaProto = global['HTMLAreaElement'].prototype
  hookAttr('AREA', areaProto, 'href')

  const formProto = global['HTMLFormElement'].prototype
  hookAttr('FORM', formProto, 'action')

  const scriptProto = global['HTMLScriptElement'].prototype
  const linkProto = global['HTMLLinkElement'].prototype

  // 防止混合内容
  if (oriUrlObj.protocol === 'http:') {
    hookAttr('SCRIPT', scriptProto, 'src')
    hookAttr('LINK', linkProto, 'href')
  }

  //解决twitter的提示:   A preload for '<URL>' is found, but is not used because the request credentials mode does not match. Consider taking a look at crossorigin attribute.
  //下面代码无效
  //?对于preload的脚本, 这里的设置是在node已经已经添加到dom树上以后才能设置的, 无法在添加前设置, 所以无法解决警告问题, 现已在返回的html中直接替换处理
  // domHook.attr('LINK', linkProto,
  // {
  //   name: 'nonce',
  //   onget(val) {
  //     return undefined;
  //   },
  //   onset(val) {
  //     return hook.REMOVE;
  //   }
  // },
  //访问https://jp.mlb.workers.dev/-----https://mobile.twitter.com/时发现有
  //<link rel="preload" as="script" crossorigin="anonymous" href="https://abs.twimg.com/responsive-web/web/polyfills.b548f144.js" nonce="ZDI4NmVkYmMtNzI5Yi00MTk0LThkMjktZTYyOGRlZWVlMDRm">
  //和
  //<script type="text/javascript" charset="utf-8" nonce="ZDI4NmVkYmMtNzI5Yi00MTk0LThkMjktZTYyOGRlZWVlMDRm" crossorigin="anonymous" src="https://abs.twimg.com/responsive-web/web/polyfills.b548f144.js"></script>
  //如果上述两个的crossorigin设置不一致会提示preload警告: Access to fetch at 'https://ssl.google-analytics.com/ga.js' from origin 'https://jp.mlb.workers.dev' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
  //而且script和link同时移除crossorigin无法消除警告, 只能保持同时存在
  //参考:
  // https://chromium.googlesource.com/chromium/src/+/544a2f36c0c6def26898c395e018aaf668e6af19%5E%21/
  // https://github.com/chromium/chromium/search?q=kRequestCredentialsModeDoesNotMatch&unscoped_q=kRequestCredentialsModeDoesNotMatch
  // https://github.com/chromium/chromium/search?q=but+is+not+used+because+the+request+credentials+mode+does+not+match.+Consider+taking+a+look+at+crossorigin+attribute&unscoped_q=but+is+not+used+because+the+request+credentials+mode+does+not+match.+Consider+taking+a+look+at+crossorigin+attribute
  // https://github.com/chromium/chromium/commit/9f76987f9f8ee5c7b0647270db7db4dde49746e7
  // https://github.com/chromium/chromium/search?q=request-credentials-mode-expected&type=Commits
  // https://github.com/chromium/chromium/commit/0a778a5336f80ad11cf019352e664d2e8d06d737
  // 事例: https://github.com/chromium/chromium/blob/77578ccb4082ae20a9326d9e673225f1189ebb63/third_party/blink/web_tests/http/tests/preload/warning/request-credentials-mode.html
  // {
  //   name: 'crossorigin',
  //   onget(val) {
  //     return undefined;
  //   },
  //   onset(val) {
  //     //this.removeAttribute("crossorigin")
  //     return hook.REMOVE;
  //   }
  // })

  // const imgProto = global.HTMLImageElement.prototype
  // hookAttr('IMG', imgProto, 'src')

  const embedProto = global['HTMLEmbedElement'].prototype
  hookAttr('EMBED', embedProto, 'src')

  const objectProto = global['HTMLObjectElement'].prototype
  hookAttr('OBJECT', objectProto, 'data')

  const iframeProto = global['HTMLIFrameElement'].prototype
  hookAttr('IFRAME', iframeProto, 'src')

  const frameProto = global['HTMLFrameElement'].prototype
  hookAttr('FRAME', frameProto, 'src')


  // 更新默认的 baseURI
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base#Usage_notes
  const baseProto = global['HTMLBaseElement'].prototype
  domHook.attr('BASE', baseProto,
  {
    name: 'href',
    onget(val) {
      return this.__href || val
    },
    onset(val) {
      // TODO: 逻辑优化
      const baseElem = this.ownerDocument.__baseElem
      if (!baseElem || baseElem === this) {
        return val
      }
      console.log('[lbview] baseURI updated:', val)
      const urlObj = _urlx_js__WEBPACK_IMPORTED_MODULE_4__["newUrl"](val, baseElem.href)
      baseElem.href = urlObj.href
      this.__href = val
      return ''
    }
  })

  //跨域交互postMessage的第二个参数的处理
  function initCrossOrigin() {
      //https://www.twitch.tv/的嵌入iframe src="https://jp.mlb.workers.dev/-----https://cdn-gl.imrworldwide.com/novms/html/ls.html" 曾出现过如下错误: 
      //Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('<URL>') does not match the recipient window's origin ('<URL>').
      //是由如下语句引起的, 最后传递了window.document.referrer, 而非*:
      //window.parent.postMessage({ nolSentFromLs: true, key: evt.key, type: 'lsbroadcast', newValue: evt.newValue, oldValue: evt.oldValue }, (window.document.referrer ? window.document.referrer : '*'));
      //有三种方式解决, 1. 如下面的那样, hook postMessage, 在第二个参数传递*, 但问题在于只对window自身有效, 对子iframe来说, 通过window.parent来调用仍然是原始函数, 在非窗口的修改并不能传递到iframe,
      // 2. hook parent的postMessage, 但这会出错, 因为无法修改跨域的对象.
      // 3. 如下这样prop referrer, 返回 "", 但这只对上述特殊代码有效
      // 4. 用正则表达式替换脚本.

      //该修改通用性差
      //function getReferrer(getter) {
      //    return function() {
      //      return "";
      //    }
      //}
      //hook.prop(docProto, 'referrer', getUriHook)

      //??parent和所有新加的iframe也要处理
      //该修改未完全替换, 用下面的代理实现
      //__parent = global.parent;
      //global.parent = {
      //    postMessage: function (message, origin) {
      //    if (origin && origin !== "*") {
      //        arguments[1] = "*"
      //    }
      //
      //    let par = __parent;
      //    return apply(par.postMessage, par, arguments)
      //}}

      //https://github.com/tvcutsem/harmony-reflect/issues/39
      //https://exploringjs.com/es6/ch_proxies.html
      let postMessageHandler = {
          get: function (target, name, receiver) {
              if (name === "postMessage") {
                return function(message, origin) {
                   if (origin && origin !== "*") {
                      arguments[1] = "*";
                  }

                  //或target.postMessage.apply(target, arguments)
                  return Reflect.apply(target.postMessage, target, arguments)
                };
              }
              else if (name === "__Target") {
                  return target;
              }
              else {
                  return Reflect.get(target, name, receiver);
              }
          }
      };

      //这个判断是为了避免循环调用, 如果放在page.js中需要该判断, 这里步需要
      //?下面的修改能解决问题, 但导致 while ((p = p.parent) !== top) 死循环
      //if(__parent === undefined) {
      //if(global.parent) {
          global.parent = new Proxy(global.parent, postMessageHandler);
      //}

      //下面两种方式都不能在跨域下使用
      //let des = Object.getOwnPropertyDescriptor(global.parent, "postMessage");
      //let oldFn = des.value;
      //des.value = function(message, origin) {
      //  if (origin && origin !== "*") {
      //      arguments[1] = "*";
      //  }
      //
      //  return Reflect.apply(oldFn, this, arguments)
      //};
      //Object.defineProperty(global.parent, "postMessage", des);

      //hook.func(global.parent, "postMessage", oldFn => function(message, origin) {
      //  if (origin && origin !== "*") {
      //      arguments[1] = "*";
      //  }
      //
      //  return Reflect.apply(oldFn, this, arguments)
      //})

      let contentWindowProxy = new Proxy(iframeProto.contentWindow, postMessageHandler);
      _hook_js__WEBPACK_IMPORTED_MODULE_5__["prop"](iframeProto, 'contentWindow',
        getter => function() {
          //if(!contentWindowProxy)
          //{
          //  const conWin = getter.call(this)
          //  contentWindowProxy = new Proxy(conWin, postMessageHandler);
          //}

          //主页面与iframe中的初始化无关, 各自独立初始化
          //init()
          return contentWindowProxy;
        }
      )
  }

  initCrossOrigin();

  //hook.prop(iframeProto, 'contentDocument',
  //  getter => function() {
  //      let global = env.global;
  //      console.log("contentDocument, begin: href: " + global.location.href + ", docment.domain:" + global.document.domain + ", origin: " + global.location.origin);
  //
  //    // TODO: origin check
  //    //let doc = getter.call(this)
  //    //if (doc) {
  //      init();
  //    //}
  //    return global.document;
  //  }
  //)

  //
  // hook 超链接的 host、pathname 等属性
  // 这类属性只有 property 没有 attribute
  //
  function hookAnchorUrlProp(proto) {
    /**
     * @param {string} key 
     */
    function setupProp(key) {
      _hook_js__WEBPACK_IMPORTED_MODULE_5__["prop"](proto, key,
        getter => function() {
          // 读取 href 时会经过 hook 处理，得到的已是原始 URL
          const urlObj = new URL(this.href)
          return urlObj[key]
        },
        setter => function(val) {
          // console.log('[lbview] set link %s: %s', key, val)
          const urlObj = new URL(this.href)
          urlObj[key] = val
          this.href = urlObj.href
        }
      )
    }
    setupProp('protocol')
    setupProp('hostname')
    setupProp('host')
    setupProp('port')
    setupProp('pathname')
    setupProp('origin')
  }
  hookAnchorUrlProp(anchorProto)
  hookAnchorUrlProp(areaProto)


  // 该 form 可能没有经过 MutationObserver 处理
  _hook_js__WEBPACK_IMPORTED_MODULE_5__["func"](formProto, 'submit', oldFn => function() {
    this.action = this.action
    return apply(oldFn, this, arguments)
  })
  

  //
  // 监控 离屏元素.click() 方式打开页面
  // 例如：
  //  var s = document.createElement('div')
  //  s.innerHTML = '<a href="https://google.com"><img></a>'
  //  s.getElementsByTagName('img')[0].click()
  //
  const htmlProto = global['HTMLElement'].prototype

  _hook_js__WEBPACK_IMPORTED_MODULE_5__["func"](htmlProto, 'click', oldFn => function() {
    /** @type {HTMLAnchorElement} */
    let el = this

    // 添加到文档时已经过 MutationObserver 处理
    // 无需调整 href 属性
    if (el.isConnected) {
      return
    }
    while (el) {
      const tag = el.tagName
      if (tag === 'A' || tag === 'AREA') {
        // eslint-disable-next-line no-self-assign
        el.href = el.href
        break
      }
      // @ts-ignore
      el = el.parentNode
    }
    return apply(oldFn, this, arguments)
  })


  //
  // 脚本元素处理
  //
  /** @type {WeakMap<HTMLElement, string>} */
  const integrityMap = new WeakMap()

  /** @type {WeakMap<HTMLElement, string>} */
  const charsetMap = new WeakMap()


  domHook.attr('SCRIPT', scriptProto,
  // 统一使用 UTF-8 编码
  // JS 未提供 UTF-8 转非 UTF-8 的 API，导致编码转换比较麻烦，
  // 因此 SW 将所有 JS 资源都转换成 UTF-8 编码。
  {
    name: 'charset',
    onget(val) {
      return charsetMap.get(this) || val
    },
    onset(val) {
      if (!_util_js__WEBPACK_IMPORTED_MODULE_3__["isUtf8"](val)) {
        val = 'utf-8'
      }
      charsetMap.set(this, val)
      return val
    }
  },
  //?对于proload的脚本, 这里的设置是在node已经已经添加到dom树上以后才能设置的, 无法在添加前设置, 所以无法解决警告问题, 现已在返回的html中直接替换处理
  //// 禁止设置内容校验
  ////（调整静态 HTML 时控制台会有告警，但不会阻止运行）
  //{
  //  name: 'integrity',
  //  onget(val) {
  //    //return integrityMap.get(this) || ''
  //    return undefined;
  //  },
  //  onset(val) {
  //    //integrityMap.set(this, val)
  //    //return ''
  //    //访问github.com出现错误: Failed to find a valid digest in the 'integrity' attribute for resource 'https://github.githubassets.com/assets/frameworks-49fd8ee7.js' with computed SHA-256 integrity '1hcbFTqNT7B4Vau6u1h94cEuYKRrFYQwZhjS72385pg='. The resource has been blocked.
  //    //由于有此脚本: <script crossorigin="anonymous" integrity="sha512-s59gBYnm4FRZuWZnrcPKNRly9V/wicxI3O2kjbjWcXOOHodDZLmGiNQ66tm1yUhVwqzvM6eUU37/F1pVx0O7Xg==" type="application/javascript" src="https://github.githubassets.com/assets/frameworks-32e6daa2.js"></script>
  //    //只有同时去掉integrity和crossorigin才能去掉控制台错误
  //    //???但为了避免link的preload警告, crossorigin不能移除
  //    //this.removeAttribute("integrity")
  //    //this.removeAttribute("crossorigin")
  //    return hook.REMOVE;
  //  }
  //},
  //见上面link中的说明, script和link同时移除crossorigin无法消除警告, 只能保持同时存在
  //{
  //  name: 'crossorigin',
  //  onget(val) {
  //    return undefined;
  //  },
  //  onset(val) {
  //    //this.removeAttribute("crossorigin")
  //    return hook.REMOVE;
  //  }
  //},
  // 监控动态创建的脚本
  //（设置 innerHTML 时同样会触发）
  {
    name: 'innerText',
    onget(val) {
      return val
    },
    onset(val, isInit) {
      const ret = updateScriptText(this, val)
      if (ret === null) {
        return isInit ? _hook_js__WEBPACK_IMPORTED_MODULE_5__["DROP"] : val
      }
      return ret
    }
  })

  // text 属性只有 prop 没有 attr
  _hook_js__WEBPACK_IMPORTED_MODULE_5__["prop"](scriptProto, 'text',
    getter => function() {
      return getter.call(this)
    },
    setter => function(val) {
      const ret = updateScriptText(this, val)
      if (ret === null) {
        setter.call(this, val)
      } else {
        setter.call(this, ret)
      }
    }
  )

  
  /** @type {WeakSet<HTMLScriptElement>} */
  const parsedSet = new WeakSet()

  /**
   * @param {HTMLScriptElement} elem 
   */
  function updateScriptText(elem, code) {
    // 有些脚本仅用于存储数据（例如模块字符串），无需处理
    const type = elem.type
    if (type && !_util_js__WEBPACK_IMPORTED_MODULE_3__["isJsMime"](type)) {
      return null
    }
    if (parsedSet.has(elem)) {
      return null
    }
    parsedSet.add(elem)

    return _inject_js__WEBPACK_IMPORTED_MODULE_7__["parseStr"](code)
  }

  
  /**
   * 处理 <tag onevent=""> 形式的脚本
   * @param {string} eventName 
   */
  function hookEvent(eventName) {
    const scanedSet = new WeakSet()

    function scanElement(el) {
      if (scanedSet.has(el)) {
        return
      }
      scanedSet.add(el)

      // 非元素节点
      if (el.nodeType != 1 /*Node.ELEMENT_NODE*/) {
        return
      }
      // 扫描内联代码
      if (el[eventName]) {
        const code = el.getAttribute(eventName)
        if (code) {
          const ret = _inject_js__WEBPACK_IMPORTED_MODULE_7__["parseStr"](code)
          if (ret) {
            el[eventName] = ret
            console.log('[lbview] hookEvent onevent:', eventName)
          }
        }
      }
      // 扫描上级元素
      scanElement(el.parentNode)
    }

    document.addEventListener(eventName.substr(2), e => {
      scanElement(e.target)
    }, true)
  }

  //???应该在这些属性值发生改变时进行修改, 而不是事件发生时
  hookEvent('onerror')
  hookEvent('onload')
  hookEvent('onclick')
  // Object.keys(htmlProto).forEach(v => {
  //   if (v.startsWith('on')) {
  //     hookEvent(v)
  //   }
  // })

  console.log("page.init, end: href: " + global.location.href + ", docment.domain:" + global.document.domain + ", origin: " + global.location.origin);
}


/***/ }),

/***/ "./src/path.js":
/*!*********************!*\
  !*** ./src/path.js ***!
  \*********************/
/*! exports provided: ROOT, HOME, CONF, ICON, HELPER, ASSETS, PREFIX */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROOT", function() { return ROOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOME", function() { return HOME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONF", function() { return CONF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ICON", function() { return ICON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HELPER", function() { return HELPER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ASSETS", function() { return ASSETS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PREFIX", function() { return PREFIX; });
/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env.js */ "./src/env.js");


const ROOT = getRootPath() 
const HOME = ROOT + 'index.html'
const CONF = ROOT + 'conf.js'
const ICON = ROOT + 'favicon.ico'
const HELPER = ROOT + '__sys__/helper.js'
const ASSETS = ROOT + '__sys__/assets/'
const PREFIX = ROOT + '-----'


function getRootPath() {
  //
  // 如果运行在代理页面，当前路径：
  //   https://example.com/path/to/-----url
  // 如果运行在 SW，当前路径：
  //   https://example.com/path/to/sw.js
  // 如果运行在 Worker，当前路径：
  //   __PATH__
  // 返回：
  //   https://example.com/path/to/
  //
  /** @type {string} */
  const envPath = _env_js__WEBPACK_IMPORTED_MODULE_0__["global"]['__PATH__']
  if (envPath) {
    return envPath
  }
  let url = location.href
  const pos = url.indexOf('/-----http')
  if (pos === -1) {
    // sw
    url = url.replace(/[^/]+$/, '')
  } else {
    // page
    url = url.substr(0, pos)
  }
  return url.replace(/\/*$/, '/')
}

/***/ }),

/***/ "./src/route.js":
/*!**********************!*\
  !*** ./src/route.js ***!
  \**********************/
/*! exports provided: genUrl, getHost, genWsUrl, setConf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genUrl", function() { return genUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHost", function() { return getHost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genWsUrl", function() { return genWsUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setConf", function() { return setConf; });
/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env.js */ "./src/env.js");
/* harmony import */ var _urlx_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./urlx.js */ "./src/urlx.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util.js");





let mConf
let mNodeLinesMap

/**
 * @param {number} urlHash 
 * @param {string} id 
 * @returns {string}
 */
function getHostByNodeId(urlHash, id) {
  let a = 0
  for (const {weight, host} of mNodeLinesMap[id]) {
    if ((a += weight) > urlHash) {
      return host
    }
  }
}


/**
 * @param {string} host 
 */
function isLocalhost(host) {
  return /^(localhost|127\.\d+\.\d+\.\d+)([:/]|$)/.test(host)
}


/**
 * @param {string} host 
 * @param {string} scheme 
 */
function genUrl(host, scheme) {
  let s = "s";

  //???下面的判断未优化, genWsUrl中未调试
  if (isLocalhost(host)) {
      s = "";

      //允许https://localhost
      let url = new URL(_env_js__WEBPACK_IMPORTED_MODULE_0__["global"].location.href);
      //仅对https://localhost进行判断, 对直接访问转localhost的进行处理
      if(url.host === host) {
          if(url.protocol === "https:") {
              s = "s";
          }
      }
  }

  return `${scheme}${s}://${host}/${scheme}`
}


/**
 * @param {number} urlHash 
 * @param {number} level 
 */
function getHost(urlHash, level) {
  let node = mConf.node_default

  // 实验中...
  if (level === 2) {
    node = mConf.node_acc
  }

  return getHostByNodeId(urlHash, node)
}


// export function setFailHost(host) {

// }


/**
 * @param {URL} urlObj 
 * @param {Object<string, string>} args 
 */
function genWsUrl(urlObj, args) {
  let scheme = 'https'

  switch (urlObj.protocol) {
  case 'wss:':
    break
  case 'ws:':
    scheme = 'http'
    break
  default:
    return null
  }

  const t = _urlx_js__WEBPACK_IMPORTED_MODULE_1__["delScheme"](_urlx_js__WEBPACK_IMPORTED_MODULE_1__["delHash"](urlObj.href))

  //注意 这里与http不同, http是前--, 这里是后__, 是否应统一, 否则cf-worker会出错, 但目前cf-worker不支持ws???
  args['url__'] = scheme + '://' + t
  args['ver__'] = mConf.ver

  const urlHash = _util__WEBPACK_IMPORTED_MODULE_2__["strHash"](urlObj.href)
  const host = getHostByNodeId(urlHash, mConf.node_default)
  return genUrl(host, 'ws') + '?' + new URLSearchParams(args)
}


/**
 * @param {object} conf 
 */
function setConf(conf) {
  mConf = conf
  mNodeLinesMap = {}

  for (const [id, info] of Object.entries(conf.node_map)) {
    const lines = []
    let weightSum = 0

    for (const [host, weight] of Object.entries(info.lines)) { 
      weightSum += weight
      lines.push({host, weight})
    }

    // 权重值按比例转换成 0 ~ 2^32 之间的整数，方便后续计算
    for (const v of lines) {
      //>>>是不带符号的右移, -1>>>0就是把最左的负号位去掉, = Math.pow(2,31) - 1 = 2147483647
      //下面的>>>其实是把小数变为整数, https://stackoverflow.com/questions/596467/how-do-i-convert-a-float-number-to-a-whole-number-in-javascript, Bit shift by 0 which is equivalent to division by 1
      //浮点数的32位表示方式: https://en.wikipedia.org/wiki/Single-precision_floating-point_format
      //位移操作会将浮点数各位当作整数操作, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
      v.weight = (v.weight / weightSum * 0xFFFFFFFF) >>> 0
    }
    lines.sort((a, b) => b.weight - a.weight)

    mNodeLinesMap[id] = lines
  }
}

/***/ }),

/***/ "./src/signal.js":
/*!***********************!*\
  !*** ./src/signal.js ***!
  \***********************/
/*! exports provided: Signal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Signal", function() { return Signal; });
/**
 * Promise 简单封装
 * 
 * 封装前
 * ```
 * function get(...) {
 *   return new Promise(function(resolve, reject) {
 *     ...
 *     function callback(err, result) {
 *       if (err) {
 *         reject(err)
 *       } else {
 *         resolve(result)
 *       }
 *     }
 *     ...
 *   }
 * }
 * ...
 * await get(...)
 * ```
 * 
 * 
 * 封装后
 * ```
 * function get(...) {
 *   ...
 *   const s = new Signal()
 *   function callback(err, result) {
 *     if (err) {
 *       s.abort(err)
 *     } else {
 *       s.notify(result)
 *     }
 *   }
 *   ...
 *   return s.wait()
 * }
 * ...
 * await get(...)
 * ```
 */
class Signal {
  constructor() {
    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }

  wait() {
    return this._promise
  }

  notify(arg) {
    this._resolve(arg)
  }

  abort(arg) {
    this._reject(arg)
  }
}


/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/*! exports provided: createStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStorage", function() { return createStorage; });
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hook.js */ "./src/hook.js");
/* harmony import */ var _urlx_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./urlx.js */ "./src/urlx.js");




const {
  apply,
  defineProperty,
  ownKeys,
  getOwnPropertyDescriptor,
} = Reflect

const undefined = void 0


/**
 * @param {WindowOrWorkerGlobalScope} win 
 * @param {string} name 
 * @param {string} prefix 
 */
function setup(win, name, prefix) {
  /** @type {Storage} */
  const raw = win[name]
  if (!raw) {
    return
  }
  const prefixLen = prefix.length

  const nativeMap = {
    getItem,
    setItem,
    removeItem,
    clear,
    key,
    constructor: raw.constructor,
    toString: () => raw.toString(),
    [Symbol.toStringTag]: 'Storage',
    get length() {
      return getAllKeys().length
    },
  }
  
  /**
   * @param {*} key 
   */
  function getItem(key) {
    return raw.getItem(prefix + key)
  }

  /**
   * @param {*} key 
   * @param {string} val 
   */
  function setItem(key, val) {
    // TODO: 同步到 indexedDB
    raw.setItem(prefix + key, val)
  }

  /**
   * @param {*} key 
   */
  function removeItem(key) {
    return raw.removeItem(prefix + key)
  }

  function clear() {
    getAllKeys().forEach(removeItem)
  }

  /**
   * @param {*} val
   */
  function key(val) {
    // TODO: 无需遍历所有
    const arr = getAllKeys()
    const ret = arr[val | 0]
    if (ret === undefined) {
      return null
    }
    return ret
  }


  /**
   * @returns {string[]}
   */
  function getAllKeys() {
    const ret = []
    const keys = ownKeys(raw)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (typeof key !== 'string') {
        continue
      }
      if (!key.startsWith(prefix)) {
        continue
      }
      ret.push(key.substr(prefixLen))
    }
    return ret
  }

  const storage = new Proxy(raw, {
    get(obj, key) {
      const val = nativeMap[key]
      if (val !== undefined) {
        return val
      }
      console.log('[lbview] %s get: %s', name, key)
      const ret = getItem(key)
      if (ret === null) {
        return undefined
      }
      return ret
    },
    set(obj, key, val) {
      if (key in nativeMap) {
        nativeMap[key] = val
        return
      }
      console.log('[lbview] %s set: %s = %s', name, key, val)
      setItem(key, val)
      return true
    },
    deleteProperty(obj, key) {
      console.log('[lbview] %s del: %s', name, key)
      removeItem(key)
      return true
    },
    has(obj, key) {
      console.log('[lbview] %s has: %s', name, key)
      if (typeof key === 'string') {
        return (prefix + key) in obj
      }
      return false
    },
    // enumerate(obj) {
    //   console.log('[lbview] %s enumerate: %s', name)
    //   // TODO:
    // },
    ownKeys(obj) {
      // console.log('[lbview] %s ownKeys', name)
      return getAllKeys()
    },
    // defineProperty(obj, key, desc) {
    //   // console.log('[lbview] %s defineProperty: %s', name, key)
    //   // TODO:
    // },
    getOwnPropertyDescriptor(obj, key) {
      // console.log('[lbview] %s getOwnPropertyDescriptor: %s', name, key)
      if (typeof key === 'string') {
        return getOwnPropertyDescriptor(raw, prefix + key)
      }
    }
  })

  defineProperty(win, name, {value: storage})
}


/**
 * @param {WindowOrWorkerGlobalScope} global 
 * @param {string} origin 
 */
function createStorage(global, origin) {
  const prefixStr = origin + '$'
  const prefixLen = prefixStr.length


  function delPrefix(str) {
    return str.substr(prefixLen)
  }

  function delPrefixGetter(oldFn) {
    return function() {
      const val = oldFn.call(this)
      return val && delPrefix(val)
    }
  }

  //
  // Web Storage
  //
  setup(global, 'localStorage', prefixStr)
  setup(global, 'sessionStorage', prefixStr)

  //目前Worker中并不支持localStorage/sessionStorage及其StorageEvent
  if (global.StorageEvent){
      const StorageEventProto = global['StorageEvent'].prototype

      _hook_js__WEBPACK_IMPORTED_MODULE_0__["prop"](StorageEventProto, 'key', delPrefixGetter)
      _hook_js__WEBPACK_IMPORTED_MODULE_0__["prop"](StorageEventProto, 'url',
        getter => function() {
          const val = getter.call(this)
          return _urlx_js__WEBPACK_IMPORTED_MODULE_1__["decUrlStrAbs"](val)
        }
      )
      // TODO: StorageEventProto.storageArea
  }

  //
  // Storage API
  //
  function addPrefixHook(oldFn) {
    return function(name) {
      if (arguments.length > 0) {
        arguments[0] = prefixStr + name
      }
      return apply(oldFn, this, arguments)
    }
  }

  // indexedDB
  const IDBFactoryProto = global['IDBFactory'].prototype
  _hook_js__WEBPACK_IMPORTED_MODULE_0__["func"](IDBFactoryProto, 'open', addPrefixHook)

  _hook_js__WEBPACK_IMPORTED_MODULE_0__["func"](IDBFactoryProto, 'databases', oldFn => async function() {
    /** @type { {name: string, version: number}[] } */
    const arr = await apply(oldFn, this, arguments)
    const ret = []
    for (const v of arr) {
      if (v.name[0] !== '.') {
        v.name = delPrefix(v.name)
        ret.push(v)
      }
    }
    return ret
  })

  // delete
  _hook_js__WEBPACK_IMPORTED_MODULE_0__["func"](IDBFactoryProto, 'deleteDatabase', addPrefixHook)

  const IDBDatabaseProto = global['IDBDatabase'].prototype
  _hook_js__WEBPACK_IMPORTED_MODULE_0__["prop"](IDBDatabaseProto, 'name', delPrefixGetter)


  // Cache Storage
  const cacheStorageProto = global['CacheStorage'].prototype
  _hook_js__WEBPACK_IMPORTED_MODULE_0__["func"](cacheStorageProto, 'open', addPrefixHook)

  _hook_js__WEBPACK_IMPORTED_MODULE_0__["func"](cacheStorageProto, 'keys', oldFn => async function() {
    /** @type {string[]} */
    const arr = await apply(oldFn, this, arguments)
    const ret = []
    for (const v of arr) {
      if (v[0] !== '.') {
        ret.push(delPrefix(v))
      }
    }
    return ret
  })

  _hook_js__WEBPACK_IMPORTED_MODULE_0__["func"](cacheStorageProto, 'delete', addPrefixHook)

  // WebSQL
  _hook_js__WEBPACK_IMPORTED_MODULE_0__["func"](global, 'openDatabase', addPrefixHook)
}

/***/ }),

/***/ "./src/sw.js":
/*!*******************!*\
  !*** ./src/sw.js ***!
  \*******************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env.js */ "./src/env.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path.js */ "./src/path.js");
/* harmony import */ var _route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./route.js */ "./src/route.js");
/* harmony import */ var _urlx_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./urlx.js */ "./src/urlx.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util.js */ "./src/util.js");
/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cookie.js */ "./src/cookie.js");
/* harmony import */ var _network_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./network.js */ "./src/network.js");
/* harmony import */ var _msg_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./msg.js */ "./src/msg.js");
/* harmony import */ var _inject_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./inject.js */ "./src/inject.js");
/* harmony import */ var _signal_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./signal.js */ "./src/signal.js");
/* harmony import */ var _database_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./database.js */ "./src/database.js");












/** @type {ServiceWorkerGlobalScope} */
// @ts-ignore
const global = _env_js__WEBPACK_IMPORTED_MODULE_0__["global"];
const clients = global.clients

const CONF_UPDATE_TIMER = 1000 * 60 * 5

let mConf
const MAX_REDIR = 5

let mUrlHandler


/**
 * @param {*} target 
 * @param {number} cmd 
 * @param {*=} val 
 */
function sendMsg(target, cmd, val) {
  if (target) {
    target.postMessage([cmd, val])
  } else {
    console.warn('invalid target', cmd, val)
  }
}


// 也可以用 clientId 关联，但兼容性不高
let pageCounter = 0

/** @type {Map<number, [Signal, number]>} */
const pageWaitMap = new Map()

function genPageId() {
  return ++pageCounter
}

/**
 * @param {number} pageId 
 */
function pageWait(pageId) {
  const s = new _signal_js__WEBPACK_IMPORTED_MODULE_9__["Signal"]()
  // 设置最大等待时间
  // 有些页面不会执行 JS（例如查看源文件），导致永久等待
  const timer = setTimeout(_ => {
    pageWaitMap.delete(pageId)
    s.notify(false)
  }, 2000)

  pageWaitMap.set(pageId, [s, timer])
  return s.wait()
}

/**
 * @param {number} id 
 * @param {boolean} isDone 
 */
function pageNotify(id, isDone) {
  const arr = pageWaitMap.get(id)
  if (!arr) {
    console.warn('[lbview] unknown page id:', id)
    return
  }
  const [s, timer] = arr
  if (isDone) {
    pageWaitMap.delete(id)
    s.notify(true)
  } else {
    // 页面已开始初始化，关闭定时器
    clearTimeout(timer)
  }
}


function makeHtmlRes(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
    }
  })
}


/**
 * @param {*} cmd 
 * @param {*} msg 
 * @param {string=} srcId
 */
async function sendMsgToPages(cmd, msg, srcId) {
  // 通知页面更新 Cookie
  const pages = await clients.matchAll({type: 'window'})

  for (const page of pages) {
    //???是否只发送到主页不考虑子frame?
    if (page.frameType !== 'top-level') {
      continue
    }
    if (srcId && page.id === srcId) {
      continue
    }
    sendMsg(page, cmd, msg)
  }
}


/** @type Map<string, string> */
const mIdUrlMap = new Map()

/**
 * @param {string} id 
 */
async function getUrlByClientId(id) {
  const client = await clients.get(id)
  if (!client) {
    return
  }
  const urlStr = _urlx_js__WEBPACK_IMPORTED_MODULE_3__["decUrlStrAbs"](client.url)
  mIdUrlMap.set(id, urlStr)
  return urlStr
}


/**
 * @param {string} jsonStr 
 * @param {number} status 
 * @param {URL} urlObj 
 */
function parseGatewayError(jsonStr, status, urlObj) {
  let ret = ''
  const {
    msg, addr, url
  } = JSON.parse(jsonStr)

  switch (status) {
  case 204:
    switch (msg) {
    case 'ORIGIN_NOT_ALLOWED':
      ret = '当前域名不在服务器外链白名单'
      break
    case 'CIRCULAR_DEPENDENCY':
      ret = '当前请求出现循环代理'
      break
    case 'SITE_MOVE':
      ret = `当前站点移动到: <a href="${url}">${url}</a>`
      break
    }
    break
  case 500:
    ret = '代理服务器内部错误'
    break
  case 502:
    if (addr) {
      ret = `代理服务器无法连接网站 ${urlObj.origin} (${addr})`
    } else {
      ret = `代理服务器无法解析域名 ${urlObj.host}`
    }
    break
  case 504:
    ret = `代理服务器连接网站超时 ${urlObj.origin}`
    if (addr) {
      ret += ` (${addr})`
    }
    break
  }
  return makeHtmlRes(ret)
}


/**
 * @param {Request} req 
 * @param {urlObj} 目标资源源端, 在跨域访问的情况下与服务端是不同的, href: https://github.githubassets.com/assets/github-5362384f9e2512870c388a187eaf4868.css
 * @param {cliUrlObj} 当前客户端打开的源端, href: https://github.com/
 * @param {number} redirNum
 * @returns {Promise<Response>}
 */
async function forward(req, urlObj, cliUrlObj, redirNum) {
  //const r = await network.launch(req, urlObj, cliUrlObj)
  const r = await _network_js__WEBPACK_IMPORTED_MODULE_6__["launch"](req, urlObj)
  if (!r) {
    return makeHtmlRes('load fail')
  }

  //这里的headers是已经还原的源站主机头, 无--
  let {
    res, status, headers, cookies
  } = r

  if (cookies) {
    sendMsgToPages(_msg_js__WEBPACK_IMPORTED_MODULE_7__["SW_COOKIE_PUSH"], cookies)
  }

  if (!status) {
    status = res.status || 200
  }

  let headersMutable = true
  if (!headers) {
    headers = res.headers
    headersMutable = false
  }

  /**
   * @param {string} k 
   * @param {string} v 
   */
  const setHeader = (k, v) => {
    if (!headersMutable) {
      headers = new Headers(headers)
      headersMutable = true
    }
    headers.set(k, v)
  }

  // 网关错误
  const gwErr = headers.get('gateway-err--')
  if (gwErr) {
    return parseGatewayError(gwErr, status, urlObj)
  }

  /** @type {ResponseInit} */
  const resOpt = {status, headers}

  // 空响应
  // https://fetch.spec.whatwg.org/#statuses
  if (status === 101 ||
      status === 204 ||
      status === 205 ||
      status === 304
  ) {
    return new Response(null, resOpt)
  }

  // 处理重定向
  if (status === 301 ||
      status === 302 ||
      status === 303 ||
      status === 307 ||
      status === 308
  ) {
    const locStr = headers.get('location')
    const locObj = locStr && _urlx_js__WEBPACK_IMPORTED_MODULE_3__["newUrl"](locStr, urlObj)
    if (locObj) {
      // 跟随模式，返回最终数据
      if (req.redirect === 'follow') {
        if (++redirNum === MAX_REDIR) {
          return makeHtmlRes('重定向过多', 500)
        }
        return forward(req, locObj, cliUrlObj, redirNum)
      }
      // 不跟随模式（例如页面跳转），返回 30X 状态
      setHeader('location', _urlx_js__WEBPACK_IMPORTED_MODULE_3__["encUrlObj"](locObj))
    }

    // firefox, safari 保留内容会提示页面损坏
    return new Response(null, resOpt)
  }

  //
  // 提取 mime 和 charset（不存在则为 undefined）
  // 可能存在多个段，并且值可能包含引号。例如：
  // content-type: text/html; ...; charset="gbk"
  //
  const ctVal = headers.get('content-type') || ''
  const [, mime, charset] = ctVal
    .toLocaleLowerCase()
    .match(/([^;]*)(?:.*?charset=['"]?([^'"]+))?/)


  const type = req.destination
  if (type === 'script' ||
      type === 'worker' ||
      type === 'sharedworker'
  ) {
    //?理论上应是将各种字符集转换成utf8
    let str = await res.text()
    let ret = _inject_js__WEBPACK_IMPORTED_MODULE_8__["processJs"](str)

    setHeader('content-type', 'text/javascript')
    return new Response(ret, resOpt)
  }

  if (req.mode === 'navigate' && mime === 'text/html') {
    //?理论上应是将各种字符集转换成utf8
    let str = await res.text()
    let ret = _inject_js__WEBPACK_IMPORTED_MODULE_8__["processHtml"](str, urlObj, genPageId())

    setHeader('content-type', 'text/html; charset=utf-8')
    return new Response(ret, resOpt)
  }

  return new Response(res.body, resOpt)
}


async function proxy(e, urlObj) {
  // 使用 e.resultingClientId 有问题
  const id = e.clientId

  let cliUrlStr
  //如果页面已经打开, 则获取其浏览器地址, 即html的地址
  if (id) {
    cliUrlStr = mIdUrlMap.get(id) || await getUrlByClientId(id)
  }

  //页面未打开, 则当前地址即为页面将要显示的地址,
  if (!cliUrlStr) {
    cliUrlStr = urlObj.href
  }

  //cliUrlObj指向的是浏览器当前打开的源端, 是当前域, urlObj是将要访问的资源源端, 在跨域访问时与当前域是不同的
  const cliUrlObj = new URL(cliUrlStr)

  try {
    return await forward(e.request, urlObj, cliUrlObj, 0)
  } catch (err) {
    console.error(err)
    return makeHtmlRes('前端脚本错误<br><pre>' + err.stack + '</pre>', 500)
  }
}

/** @type {Database} */
let mDB

async function initDB() {
  mDB = new _database_js__WEBPACK_IMPORTED_MODULE_10__["Database"]('.sys')
  await mDB.open({
    'url-cache': {
      keyPath: 'url'
    },
    'cookie': {
      keyPath: 'id'
    }
  })

  await _network_js__WEBPACK_IMPORTED_MODULE_6__["setDB"](mDB)
  await _cookie_js__WEBPACK_IMPORTED_MODULE_5__["setDB"](mDB)
}


/**
 * @param {FetchEvent} e 
 */
async function onFetch(e) {
  if (!mConf) {
    await initConf()
  }
  // TODO: 逻辑优化
  if (!mDB) {
    await initDB()
  }
  const req = e.request
  const urlStr = _urlx_js__WEBPACK_IMPORTED_MODULE_3__["delHash"](req.url)

  // 首页（例如 https://zjcqoo.github.io/）
  if (urlStr === _path_js__WEBPACK_IMPORTED_MODULE_1__["ROOT"] || urlStr === _path_js__WEBPACK_IMPORTED_MODULE_1__["HOME"]) {
    let indexPath = mConf.assets_cdn + mConf.index_path
    if (!mConf.index_path) {
      // 临时代码。防止配置文件未更新的情况下首页无法加载
      indexPath = mConf.assets_cdn + 'index_v3.html'
    }
    const res = await fetch(indexPath)
    return makeHtmlRes(res.body)
  }

  // 图标、配置（例如 https://zjcqoo.github.io/conf.js）
  if (urlStr === _path_js__WEBPACK_IMPORTED_MODULE_1__["CONF"] || urlStr === _path_js__WEBPACK_IMPORTED_MODULE_1__["ICON"]) {
    return fetch(urlStr)
  }

  // 注入页面的脚本（例如 https://zjcqoo.github.io/__sys__/helper.js）
  if (urlStr === _path_js__WEBPACK_IMPORTED_MODULE_1__["HELPER"]) {
    return fetch(global['__FILE__'])
  }

  // 静态资源（例如 https://zjcqoo.github.io/__sys__/assets/ico/google.png）
  if (urlStr.startsWith(_path_js__WEBPACK_IMPORTED_MODULE_1__["ASSETS"])) {
    const filePath = urlStr.substr(_path_js__WEBPACK_IMPORTED_MODULE_1__["ASSETS"].length)
    return fetch(mConf.assets_cdn + filePath)
  }

  //允许直接访问本地资源, 注意: 如果资源不存在会进入404.html, 而404.html会不停的刷新
  if (urlStr.startsWith(_path_js__WEBPACK_IMPORTED_MODULE_1__["ROOT"]) && urlStr.indexOf(_path_js__WEBPACK_IMPORTED_MODULE_1__["PREFIX"]) === -1) {
    return fetch(urlStr);
  }

  if (req.mode === 'navigate') {
    const newUrl = _urlx_js__WEBPACK_IMPORTED_MODULE_3__["adjustNav"](urlStr)
    if (newUrl) {
      return Response.redirect(newUrl, 301)
    }
  }

  //去掉-----前缀, 转换为真实的源站地址
  let targetUrlStr = _urlx_js__WEBPACK_IMPORTED_MODULE_3__["decUrlStrAbs"](urlStr)
  
  const handler = mUrlHandler[targetUrlStr]
  if (handler) {
    const {
      redir,
      content,
      replace,
    } = handler

    if (redir) {
      return Response.redirect('/-----' + redir)
    }
    if (content) {
      return makeHtmlRes(content)
    }
    if (replace) {
      targetUrlStr = replace
    }
  }

  const targetUrlObj = _urlx_js__WEBPACK_IMPORTED_MODULE_3__["newUrl"](targetUrlStr)

  if (targetUrlObj) {
    return proxy(e, targetUrlObj)
  }
  return makeHtmlRes('invalid url: ' + targetUrlStr, 500)
}


function parseUrlHandler(handler) {
  const map = {}
  if (!handler) {
    return map
  }
  for (const [match, rule] of Object.entries(handler)) {
    // TODO: 支持通配符和正则
    map[match] = rule
  }
  return map
}

// TODO: 逻辑优化
function updateConf(conf, force) {
  if (!force && mConf) {
    if (conf.ver <= mConf.ver) {
      return
    }
    if (conf.node_map[mConf.node_default]) {
      conf.node_default = mConf.node_default
    } else {
      console.warn('default node %s -> %s',
        mConf.node_default, conf.node_default)
    }
    sendMsgToPages(_msg_js__WEBPACK_IMPORTED_MODULE_7__["SW_CONF_CHANGE"], mConf)
  }
  _inject_js__WEBPACK_IMPORTED_MODULE_8__["setConf"](conf)
  _route_js__WEBPACK_IMPORTED_MODULE_2__["setConf"](conf)
  _network_js__WEBPACK_IMPORTED_MODULE_6__["setConf"](conf)

  mUrlHandler = parseUrlHandler(conf.url_handler)
  /*await*/ saveConf(conf)

  mConf = conf
}


async function readConf() {
  const cache = await caches.open('.sys')
  const req = new Request('/conf.json')
  const res = await cache.match(req)
  if (res) {
    return res.json()
  }
}

async function saveConf(conf) {
  const json = JSON.stringify(conf)
  const cache = await caches.open('.sys')
  const req = new Request('/conf.json')
  const res = new Response(json);
  return cache.put(req, res)
}

async function loadConf() {
  const res = await fetch('conf.js')
  const txt = await res.text()
  global['lbview_config'] = updateConf
  Function(txt)()
}


/** @type {Signal[]} */
let mConfInitQueue

async function initConf() {
  if (mConfInitQueue) {
    const s = new _signal_js__WEBPACK_IMPORTED_MODULE_9__["Signal"]()
    mConfInitQueue.push(s)
    return s.wait()
  }
  mConfInitQueue = []

  let conf
  try {
    conf = await readConf()
  } catch (err) {
    console.warn('load conf fail:', err)
  }
  if (!conf) {
    conf = global['__CONF__']
  }
  if (conf) {
    updateConf(conf)
  } else {
    conf = await loadConf()
  }

  // 定期更新配置
  setInterval(loadConf, CONF_UPDATE_TIMER)

  mConfInitQueue.forEach(s => s.notify())
  mConfInitQueue = null
}

function init() {
    console.log('sw.init begin. url: ' + global.location.href);

    global.addEventListener('fetch', e => {
      e.respondWith(onFetch(e))
    })


    global.addEventListener('message', e => {
      // console.log('sw msg:', e.data)
      const [cmd, val] = e.data
      const src = e.source

      switch (cmd) {
      case _msg_js__WEBPACK_IMPORTED_MODULE_7__["PAGE_COOKIE_PUSH"]:
        _cookie_js__WEBPACK_IMPORTED_MODULE_5__["set"](val)
        // @ts-ignore
        sendMsgToPages(_msg_js__WEBPACK_IMPORTED_MODULE_7__["SW_COOKIE_PUSH"], [val], src.id)
        break

      case _msg_js__WEBPACK_IMPORTED_MODULE_7__["PAGE_INFO_PULL"]:
        // console.log('SW MSG.COOKIE_PULL:', src.id)
        sendMsg(src, _msg_js__WEBPACK_IMPORTED_MODULE_7__["SW_INFO_PUSH"], {
          cookies: _cookie_js__WEBPACK_IMPORTED_MODULE_5__["getNonHttpOnlyItems"](),
          conf: mConf,
        })
        break

      case _msg_js__WEBPACK_IMPORTED_MODULE_7__["PAGE_INIT_BEG"]:
        // console.log('SW MSG.PAGE_INIT_BEG:', val)
        pageNotify(val, false)
        break

      case _msg_js__WEBPACK_IMPORTED_MODULE_7__["PAGE_INIT_END"]:
        // console.log('SW MSG.PAGE_INIT_END:', val)
        pageNotify(val, true)
        break

      case _msg_js__WEBPACK_IMPORTED_MODULE_7__["PAGE_CONF_GET"]:
        if (mConf) {
          sendMsg(src, _msg_js__WEBPACK_IMPORTED_MODULE_7__["SW_CONF_RETURN"], mConf)
        } else {
          initConf().then(_ => {
            sendMsg(src, _msg_js__WEBPACK_IMPORTED_MODULE_7__["SW_CONF_RETURN"], mConf)
          })
        }
        break

      case _msg_js__WEBPACK_IMPORTED_MODULE_7__["PAGE_CONF_SET"]:
        updateConf(val, true)
        sendMsgToPages(_msg_js__WEBPACK_IMPORTED_MODULE_7__["SW_CONF_CHANGE"], mConf)
        break

      case _msg_js__WEBPACK_IMPORTED_MODULE_7__["PAGE_RELOAD_CONF"]:
        /*await*/ loadConf()
        break

      case _msg_js__WEBPACK_IMPORTED_MODULE_7__["PAGE_READY_CHECK"]:
        sendMsg(src, _msg_js__WEBPACK_IMPORTED_MODULE_7__["SW_READY"])
        /*await*/ loadConf()
        break
      }
    })


    global.addEventListener('install', e => {
      console.log('oninstall:', e)
      e.waitUntil(global.skipWaiting())
    })


    global.addEventListener('activate', e => {
      console.log('onactivate:', e)
      //这句话没有用, 因为此时主页还未显示, 没有接收端,
      //但当选中"Update on reload"时, 如果刷新, 此时页面还未更新, 新注册的worker会向旧页面发送一条该消息,
      //状态栏会显示下列信息, 然后页面更新, 下面的信息只会一闪而过,
      //如果打开一个新Tab, 会更明显, 因为新Tab会刷新并注册worker， 会向旧Tab发送消息
      sendMsgToPages(_msg_js__WEBPACK_IMPORTED_MODULE_7__["SW_READY"], 1)

      //这句话可能会有问题, 因为它会导致接管其它页面,
      //如果有多个页面, 且选中"Update on reload", 然后刷新当前页面, 则新注册的worker会接管其它页面,
      //新注册的worker状态为emoty, 导致与其它页面worker状态不一致, 接管时会出错
      e.waitUntil(clients.claim())
    })


    console.log('sw.init end. url: ' + global.location.href);
}


/***/ }),

/***/ "./src/urlx.js":
/*!*********************!*\
  !*** ./src/urlx.js ***!
  \*********************/
/*! exports provided: isHttpProto, newUrl, encUrlObj, encUrlStrRel, encUrlStrAbs, decUrlObj, decUrlStrRel, decUrlStrAbs, delHash, delScheme, replaceHttpRefresh, adjustNav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHttpProto", function() { return isHttpProto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newUrl", function() { return newUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encUrlObj", function() { return encUrlObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encUrlStrRel", function() { return encUrlStrRel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encUrlStrAbs", function() { return encUrlStrAbs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decUrlObj", function() { return decUrlObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decUrlStrRel", function() { return decUrlStrRel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decUrlStrAbs", function() { return decUrlStrAbs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delHash", function() { return delHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delScheme", function() { return delScheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceHttpRefresh", function() { return replaceHttpRefresh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjustNav", function() { return adjustNav; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./src/util.js");
/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./env.js */ "./src/env.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./path.js */ "./src/path.js");



//import * as tld from './tld.js'


const PREFIX = _path_js__WEBPACK_IMPORTED_MODULE_2__["PREFIX"]
const PREFIX_LEN = PREFIX.length
const ROOT_LEN = _path_js__WEBPACK_IMPORTED_MODULE_2__["ROOT"].length

/**
 * @param {string} url 
 */
function isHttpProto(url) {
  return /^https?:/.test(url)
}


/**
 * @param {string} url 
 */
function isInternalUrl(url) {
  return !isHttpProto(url) || url.startsWith(PREFIX)
}


/**
 * @param {string} url 
 * @param {string | URL=} baseUrl 
 */
function newUrl(url, baseUrl) {
  try {
    // [safari] baseUrl 不能为空
    return baseUrl
      ? new URL(url, baseUrl)
      : new URL(url)
  } catch (err) {
  }
}


/**
 * @param {URL | Location} urlObj 
 */
function encUrlObj(urlObj) {
  const fullUrl = urlObj.href
  if (isInternalUrl(fullUrl)) {
    return fullUrl
  }
  return PREFIX + fullUrl
}

const IS_SW = _env_js__WEBPACK_IMPORTED_MODULE_1__["isSwEnv"]()
const IS_WORKER = _env_js__WEBPACK_IMPORTED_MODULE_1__["isWorkerEnv"]()
const WORKER_URL = IS_WORKER && decUrlStrAbs(location.href)

/**
 * @param {string} url 
 * @param {*} relObj 
 */
//目前将#start-of-content这样的相对URL加密为http://localhost:8080/-----https://github.com/#start-of-content, 是否有必要?
//由于document.baseURI是只读的, 并未被修改, 仍是https://github.com/, 所以有必要修改相对url为绝对url, 否则相对的是baseURI
//<a>元素无论是左键点击还是用右键打开SW不能拦截, 所以才需要修改url
//目前主要是<a>元素会逃脱SW拦截, 所以对<a>需要手工修改src
function encUrlStrRel(url, relObj) {
  let baseUrl

  if (IS_SW) {
    baseUrl = relObj
  } else if (IS_WORKER) {
    baseUrl = WORKER_URL
  } else {

    //???使用env没有意义
    let inf = _env_js__WEBPACK_IMPORTED_MODULE_1__["getInfo"]();
    if(inf) {
        let doc = inf.doc;
        baseUrl = doc.baseURI
    }
    else {
        //??在非页面中doc是为空的
        console.log("env.getInfo is null, constructor: " + _env_js__WEBPACK_IMPORTED_MODULE_1__["global"].constructor.name + " href:" + _env_js__WEBPACK_IMPORTED_MODULE_1__["global"].location.href);
    }
  }

  const urlObj = newUrl(url, baseUrl)
  if (!urlObj) {
    return url
  }
  return encUrlObj(urlObj)
}


/**
 * @param {string} url 
 */
function encUrlStrAbs(url) {
  const urlObj = newUrl(url)
  if (!urlObj) {
    return url
  }
  return encUrlObj(urlObj)
}


/**
 * @param {URL | Location} urlObj 
 */
function decUrlObj(urlObj) {
  const fullUrl = urlObj.href
  if (!fullUrl.startsWith(PREFIX)) {
    return fullUrl
  }
  return fullUrl.substr(PREFIX_LEN)
}


/**
 * @param {string} url 
 * @param {*} relObj 
 */
function decUrlStrRel(url, relObj) {
  let baseUrl

  if (IS_WORKER) {
    baseUrl = WORKER_URL
  } else {

    //???使用env没有意义
    let inf = _env_js__WEBPACK_IMPORTED_MODULE_1__["getInfo"]();
    if(inf) {
        let doc = inf.doc;
        baseUrl = doc.baseURI
    }
    else {
        //??在非页面中doc是为空的
        console.log("env.getInfo is null, constructor: " + _env_js__WEBPACK_IMPORTED_MODULE_1__["global"].constructor.name + " href:" + _env_js__WEBPACK_IMPORTED_MODULE_1__["global"].location.href);
    }
  }

  const urlObj = newUrl(url, baseUrl)
  if (!urlObj) {
    return url
  }
  return decUrlObj(urlObj)
}


/**
 * @param {string} url 
 */
function decUrlStrAbs(url) {
  const urlObj = newUrl(url)
  if (!urlObj) {
    return url
  }
  return decUrlObj(urlObj)
}



/**
 * @param {string} url 
 */
function delHash(url) {
  const p = url.indexOf('#')
  return (p === -1) ? url : url.substr(0, p)
}


/**
 * @param {string} url 
 */
function delScheme(url) {
  const p = url.indexOf('://')
  return (p === -1) ? url : url.substr(p + 3)
}


/**
 * @param {string} val 
 */
function replaceHttpRefresh(val, relObj) {
  return val.replace(/(;\s*url=)(.+)/i, (_, $1, url) => {
    return $1 + encUrlStrRel(url, relObj)
  })
}


/**
 * URL 导航调整
 * 
 * 标准
 *  https://example.com/-----https://www.google.com/
 * 
 * 无路径
 *  https://example.com/-----https://www.google.com
 * 
 * 无协议
 *  https://example.com/-----www.google.com
 * 
 * 任意数量的分隔符
 *  https://example.com/---https://www.google.com
 *  https://example.com/---------https://www.google.com
 *  https://example.com/https://www.google.com
 * 
 * 重复
 *  https://example.com/-----https://example.com/-----https://www.google.com
 * 
 * 别名
 *  https://example.com/google
 * 
 * 
 * 搜索
 *  https://example.com/-----xxx
 *  ->
 *  https://www.google.com/search?q=xxx
 */
const DEFAULT_ALIAS = {
  'www.google.com': ['google', 'gg', 'g'],
  'www.youtube.com': ['youtube', 'yt', 'y'],
  'www.wikipedia.org': ['wikipedia', 'wiki', 'wk', 'w'],
  'www.facebook.com': ['facebook', 'fb', 'f'],
  'twitter.com': ['twitter', 'tw', 't'],
}

const DEFAULT_SEARCH = 'https://www.google.com/search?q=%s'

/** @type {Map<string, string>} */
let aliasDomainMap

/**
 * @param {string} alias 
 */
function getAliasUrl(alias) {
  if (!aliasDomainMap) {
    aliasDomainMap = new Map()
    for (const [domain, aliasArr] of Object.entries(DEFAULT_ALIAS)) {
      for (const v of aliasArr) {
        aliasDomainMap.set(v, domain)
      }
    }
  }
  
  const domain = aliasDomainMap.get(alias)
  if (domain) {
    return 'https://' + domain + '/'
  }
}


/**
 * @param {string} part 
 */
function padUrl(part) {
  // TODO: HSTS
  const urlStr = isHttpProto(part) ? part : `http://${part}`
  const urlObj = newUrl(urlStr)
  if (!urlObj) {
    return
  }
  const {hostname} = urlObj

  // http://localhost
  if (!hostname.includes('.')) {
    return
  }

  // http://a.b
  //关于有效域的判断参考:
  //https://github.com/miguelmota/is-valid-domain
  //http://rossscrivener.co.uk/blog/javascript-get-domain-exclude-subdomain
  //http://www.primaryobjects.com/2012/11/19/parsing-hostname-and-domain-from-a-url-with-javascript/
  //?暂不判断主机名是否是有效tld, 减少文件大小, 若javascript有api则可以使用
  //if (!tld.getTld(hostname)) {
  //  return
  //}

  // 数字会被当做 IP 地址:
  // new URL('http://1024').href == 'http://0.0.4.0'
  // 这种情况应该搜索，而不是访问
  // 只有出现完整的 IP 才访问
  if (_util_js__WEBPACK_IMPORTED_MODULE_0__["isIPv4"](hostname) && !urlStr.includes(hostname)) {
    return
  }

  return urlObj.href
}


/**
 * @param {string} urlStr
 */
function adjustNav(urlStr) {
  // 分隔符 `-----` 之后的部分
  const rawUrlStr = urlStr.substr(PREFIX_LEN)
  const rawUrlObj = newUrl(rawUrlStr)

  if (rawUrlObj) {
    // 循环引用
    const m = rawUrlStr.match(/\/-----(https?:\/\/.+)$/)
    if (m) {
      return PREFIX + m[1]
    }
    // 标准格式（大概率）
    if (isHttpProto(rawUrlObj.protocol) &&
        PREFIX + rawUrlObj.href === urlStr
    ) {
      return
    }
  }

  // 任意数量 `-` 之后的部分
  const part = urlStr.substr(ROOT_LEN).replace(/^-*/, '')

  const ret = getAliasUrl(part) || padUrl(part)
  if (ret) {
    return PREFIX + ret
  }

  const keyword = part.replace(/&/g, '%26')
  return PREFIX + DEFAULT_SEARCH.replace('%s', keyword)
}


/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: strToBytes, bytesToStr, isUtf8, isIPv4, isJsMime, concatBufs, strHash, numToHex, getTimeSeconds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strToBytes", function() { return strToBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytesToStr", function() { return bytesToStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUtf8", function() { return isUtf8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIPv4", function() { return isIPv4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isJsMime", function() { return isJsMime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "concatBufs", function() { return concatBufs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strHash", function() { return strHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numToHex", function() { return numToHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimeSeconds", function() { return getTimeSeconds; });
const ENC = new TextEncoder()

/**
 * @param {string} str 
 */
function strToBytes(str) {
  return ENC.encode(str)
}

/**
 * @param {BufferSource} bytes 
 * @param {string} charset 
 */
function bytesToStr(bytes, charset = 'utf-8') {
  return new TextDecoder(charset).decode(bytes)
}

/**
 * @param {string} label 
 */
function isUtf8(label) {
  return /^utf-?8$/i.test(label)
}


const R_IP = /^(?:\d+\.){0,3}\d+$/

/**
 * @param {string} str 
 */
function isIPv4(str) {
  return R_IP.test(str)
}


const JS_MIME_SET = new Set([
  'text/javascript',
  'application/javascript',
  'application/ecmascript',
  'application/x-ecmascript',
  'module',
])

/**
 * @param {string} mime 
 */
function isJsMime(mime) {
  return JS_MIME_SET.has(mime)
}


/**
 * 将多个 Uint8Array 拼接成一个
 * @param {Uint8Array[]} bufs 
 */
function concatBufs(bufs) {
  let size = 0
  bufs.forEach(v => {
    size += v.length
  })

  let ret = new Uint8Array(size)
  let pos = 0
  bufs.forEach(v => {
    ret.set(v, pos)
    pos += v.length
  })
  return ret
}


/**
 * @param {string} str 
 */
function strHash(str) {
  let sum = 0
  for (let i = 0, n = str.length; i < n; i++) {
    sum = (sum * 31 + str.charCodeAt(i)) >>> 0
  }
  return sum
}


/**
 * @param {number} num 
 * @param {number} len 
 */
function numToHex(num, len) {
  return ('00000000' + num.toString(16)).slice(-len)
}


/**
 * @param {number} ms 
 */
/*
export async function sleep(ms) {
  return new Promise(y => setTimeout(y, ms))
}*/


function getTimeSeconds() {
  return (Date.now() / 1000) | 0
}

/***/ }),

/***/ "./src/worker.js":
/*!***********************!*\
  !*** ./src/worker.js ***!
  \***********************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env.js */ "./src/env.js");
/* harmony import */ var _urlx_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./urlx.js */ "./src/urlx.js");
/* harmony import */ var _route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./route.js */ "./src/route.js");
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hook.js */ "./src/hook.js");
/* harmony import */ var _fakeloc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fakeloc.js */ "./src/fakeloc.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");







const global = _env_js__WEBPACK_IMPORTED_MODULE_0__["global"];

const {
  apply,
  construct,
} = Reflect


/**
 * Hook 页面和 Worker 相同的 API
 * 
 * @param {Window} global WindowOrWorkerGlobalScope
 * @param {string} origin 
 */
function init() {
    let origin = global.location.origin;

  // lockNative(win)

  // hook Storage API
  Object(_storage_js__WEBPACK_IMPORTED_MODULE_5__["createStorage"])(global, origin)

  // hook Location API
  const fakeLoc = Object(_fakeloc_js__WEBPACK_IMPORTED_MODULE_4__["createFakeLoc"])(global)

  // hook Performance API
  const perfProto = global['PerformanceEntry'].prototype
  _hook_js__WEBPACK_IMPORTED_MODULE_3__["prop"](perfProto, 'name',
    getter => function() {
      const val = getter.call(this)
      if (/^https?:/.test(val)) {
        return _urlx_js__WEBPACK_IMPORTED_MODULE_1__["decUrlStrAbs"](val)
      }
      return val
    }
  )

  // hook AJAX API
  //???是否有必要, 因为在sw中已经进行了处理
  //const xhrProto = global['XMLHttpRequest'].prototype
  //hook.func(xhrProto, 'open', oldFn => function(_0, url) {
  //  if (url) {
  //    arguments[1] = urlx.encUrlStrRel(url, this)
  //  }
  //  return apply(oldFn, this, arguments)
  //})
  //
  //hook.prop(xhrProto, 'responseURL',
  //  getter => function(oldFn) {
  //    const val = getter.call(this)
  //    return urlx.decUrlStrRel(val, this)
  //  }
  //)

  //???是否有必要替换
  //hook.func(global, 'fetch', oldFn => function(v) {
  //  if (v) {
  //    if (v.url) {
  //      // v is Request
  //      const newUrl = urlx.encUrlStrAbs(v.url)
  //      //???有问题, 并不能复制body
  //      arguments[0] = new Request(newUrl, v)
  //    } else {
  //      // v is string
  //      // TODO: 字符串不传引用，无法获取创建时的 constructor
  //      arguments[0] = urlx.encUrlStrRel(v, v)
  //    }
  //  }
  //  return apply(oldFn, this, arguments)
  //})

  //service worker并不能拦截WebSocket, EventSource? , 可以拦截XMLHttpRequest
  //https://stackoverflow.com/questions/37741185/is-it-possible-to-intercept-and-cache-websocket-messages-in-a-service-worker-lik
  //https://github.com/w3c/ServiceWorker/issues/885
  //https://community.cloudflare.com/t/websocket-support/13708
  //cf-worker支持websocket, 参考: https://community.cloudflare.com/t/websocket-pass-through-crashes-worker-script/78482/2
  //https://community.cloudflare.com/search?expanded=true&q=Websocket
  _hook_js__WEBPACK_IMPORTED_MODULE_3__["func"](global, 'WebSocket', oldFn => function(url) {
    const urlObj = _urlx_js__WEBPACK_IMPORTED_MODULE_1__["newUrl"](url)
    if (urlObj) {
      const {ori} = _env_js__WEBPACK_IMPORTED_MODULE_0__["getInfo"]()
      if (ori) {
        const args = {
          'origin': ori.origin,
        }
        arguments[0] = _route_js__WEBPACK_IMPORTED_MODULE_2__["genWsUrl"](urlObj, args)
      }
    }
    return construct(oldFn, arguments)
  })

  /**
   * @param {string} type 
   */
  function hookWorker(type) {
    _hook_js__WEBPACK_IMPORTED_MODULE_3__["func"](global, type, oldFn => function(url) {
      if (url) {
        console.log('[lbview] new %s: %s', type, url)
        arguments[0] = _urlx_js__WEBPACK_IMPORTED_MODULE_1__["encUrlStrRel"](url, this)
      }
      return construct(oldFn, arguments)
    })
  }
  
  hookWorker('Worker')
  hookWorker('SharedWorker')


  _hook_js__WEBPACK_IMPORTED_MODULE_3__["func"](global, 'importScripts', oldFn => function(...args) {
    const urls = args.map(_urlx_js__WEBPACK_IMPORTED_MODULE_1__["encUrlStrRel"])
    console.log('[lbview] importScripts:', urls)
    return apply(oldFn, this, urls)
  })
}

/***/ })

/******/ });