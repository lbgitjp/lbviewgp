lbview_config = x => {
	__CONF__ = x;
	importScripts(__FILE__ = x.assets_cdn + 'bundle.js')
};
importScripts('conf.js')
