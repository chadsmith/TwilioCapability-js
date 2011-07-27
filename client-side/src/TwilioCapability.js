(function() {

	var TwilioCapability = function(accountSid, authToken) {
		this.accountSid = accountSid;
		this.authToken = authToken;
		this.scopes = [];
		this.clientName = false;	
	};

	var ScopeURI = function(service, privilege, params) {
		this.service = service;
		this.privilege = privilege;
		this.params = params || {};
	};
	
	var buildQuery = function(params) {
		var query = [], key;
		for(key in params)
			if(params[key])
				query.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
		return query.join('&').replace(/%20/g, '+');
	};

	TwilioCapability.prototype = {
		allowClientIncoming: function(clientName) {
			if(/\W/.test(clientName))
				throw new Error('Only alphanumeric characters allowed in client name.');
			if(!('' + clientName).length)
				throw new Error('Client name must not be a zero length string.');
			this.clientName = clientName;
			this.allow('client', 'incoming', { clientName: clientName });
			return this;
		},
		allowClientOutgoing: function(appSid, appParams) {
			appParams = appParams || {};
			this.allow('client', 'outgoing', { appSid: appSid, appParams: buildQuery(appParams) });
			return this;
		},
		allowEventStream: function(filters) {
			filters = filters || {};
			this.allow('stream', 'subscribe', { path: '/2010-04-01/Events', params: buildQuery(filters) });
			return this;
		},
		generateToken: function(ttl) {
			ttl = ttl || 3600;
			var payload = {
				scope: [],
				iss: this.accountSid,
				exp: ttl + new Date / 1000 + .5 | 0
			};
			var scopeStrings = [];
			for(var x = 0, len = this.scopes.length; x < len; x++) {
				if(this.scopes[x].privilege == 'outgoing' && this.clientName)
					this.scopes[x].clientName = this.clientName;
				scopeStrings.push(this.scopes[x].toString());
			}
			payload.scope = scopeStrings.join(' ');
			var token = new jwt.WebToken(JSON.stringify(payload), JSON.stringify({typ: 'JWT', alg: 'HS256'}));
			return token.serialize(this.authToken);
		},
		allow: function(service, privilege, params) {
			this.scopes.push(new ScopeURI(service, privilege, params));
		}
	};

	ScopeURI.prototype = {
		toString: function() {
			var uri = ['scope', this.service, this.privilege].join(':'), queryString = buildQuery(this.params);
			if(queryString)
				uri += '?' + queryString;
			return uri;
		}
	};
	
	window.TwilioCapability = TwilioCapability;

})();
