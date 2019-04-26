var copyOnlyMids = [
	/^dgrid1?\/Gruntfile$/,
	/^dgrid1?\/package$/
];
var miniExcludeMids = [
	/^dgrid1?\/CHANGES.md$/,
	/^dgrid1?\/LICENSE$/,
	/^dgrid1?\/README.md$/,
	/^dgrid1?\/Gruntfile$/,
	/^dgrid1?\/package$/
];

// jshint unused: false
var profile = {
	resourceTags: {
		copyOnly: function (filename, mid) {
			return copyOnlyMids.some(function (midRE) {
				return midRE.test(mid);
			});
		},

		test: function (filename) {
			return /\/test\//.test(filename);
		},

		miniExclude: function (filename, mid) {
			return (/\/(?:test|demos)\//).test(filename) ||
				(/\.styl$/).test(filename) ||
				miniExcludeMids.some(function (midRE) {
					return midRE.test(mid);
				});
		},

		amd: function (filename) {
			return (/\.js$/).test(filename);
		}
	}
};
