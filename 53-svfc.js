module.exports = function(RED) {
  'use strict';
  var poster = require('poster');
  var JSRSA = require('jsrsasign');
  var request = require('request');
  var poster = require('./lib/poster');

  function SVFCConfigNode(n) {
    RED.nodes.createNode(this,n);
    this.clientid = n.clientid;
    this.secret = n.secret;
    this.key = n.key;
  }
  RED.nodes.registerType("svfc-config",SVFCConfigNode);

  function SVFCNode(n) {
    RED.nodes.createNode(this, n);
    this.printtype = n.printtype;
    this.printerid = n.printerid;
    var printerid = n.printerid;
    var printtype = n.printtype;
    var xmlfile = n.xml;
    var csvfile = n.csv;
    var password = n.password;
    var pdfPermPass = n.pdfPermPass;
    var pdfTitle = ((n.pdfTitle)? n.pdfTitle: 'sample');
    var _this = this;
    var token = '';
    var type = '';
    this.on('input', function(msg) {

      if (printtype == 'DP' && !printerid) {
        _this.error('printer id is required if you set direct print.');
        return;
      } else if (printtype == 'DP'){
        type = printerid;
      } else {
        type = printtype;
      }
    
      // retrieve the config node
      this.credential = n.credential;
      this.credential = RED.nodes.getNode(this.credential);
//    var node = this;

      // get token from svf cloud
      function getToken(jws,c) {
        var basicData = c.clientid + ':' + c.secret;
        var authorization = "Basic " +  JSRSA.utf8tob64(basicData);

        // request options set here
        var options = {
          uri: "https://api.svfcloud.com/oauth2/token",
    	  headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
	    'Authorization': authorization
	  },
	  form: {
	    grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',
	    assertion:jws
          }
        };

        // execute request
        request.post(options, function(error,response, body){
          if (!error) {
	    token = body;
	  } else {
	    _this.error(error);
	  }
	  afterFunc(); //print phase
        });
      }

      // jws signature
      function _doSign(c) {
        var sClaim = JSON.stringify(_getClaim(c));
        var alg = "RS256";
        var pHeader = {'alg': alg};
        var sHeader = JSON.stringify(pHeader);
        var key = c.key;
        var sJWS = '';
        sJWS = JSRSA.jws.JWS.sign(null, sHeader, sClaim, key);
        getToken(sJWS, c);
      } 

      // create claim set
      function _getClaim(c) {
        var r = {};
        r.iss = c.clientid;
        r.sub = "foobar@example.com";
        r.exp = JSRSA.KJUR.jws.IntDate.get("now + 1month");
        r.userName = "Taro Wing";
        return r;
      }

      // print phase
      var afterFunc = function(){
	var body_p = JSON.parse(token);
        var token_s = body_p["token"];

        // reqeust print to svf cloud
        var options = {
          uploadUrl: 'https://api.svfcloud.com/v1/artifacts',
          method: 'POST',
          fileId: 'data/' + pdfTitle,
	  fileContentType: 'application/csv',
          fields: {
            'printer': type,
	    'source': 'CSV',
	    'defaultForm': xmlfile,
            'password': password,
            'pdfPermPass': pdfPermPass
          },
          uploadHeaders:{
	    'Authorization': 'Bearer ' + token_s
          }
        };

        // execute print
        var filename = ((msg.filename)? msg.filename: csvfile);
        poster.post(filename, options, function(err, data) {
	  if (printtype == 'DP' && err) {
            _this.error = 'Print Failed: ' + 'status: ' + response.statusCode;
          } else if (printtype == 'DP') {
            msg.payload = 'Print Request Success';
            _this.send(msg);
          } else {
	    var headers_s = JSON.stringify(data.headers);
	    var headers_p = JSON.parse(headers_s);
            var location_s = headers_p["location"];

            // if location header is not set goto error. (manual redirect)
            if (location_s) {
	      var options = {
                uri: location_s,
	        headers: {
	          'Accept': 'application/octet-stream',
	  	  'Authorization': token_s
                },
                encoding: null // make response body to Buffer.
              };

              // get artifact (manual redirect)
              request.get(options, function(error,response, body){
                if (!error) {
	          if (response.statusCode != 200) {
		    msg.payload = 'Print Failed: ' + 'status: ' + response.statusCode + ': ' + body;
		  } else {
	            msg.payload = body;
		  }
		  _this.send(msg);
	        } else {
	          _this.error(error);
	        }
              });
            } else { // location header is not set.
              _this.error(err);
            }
          }
        });
      };
    
      // dosign before print
      _doSign(this.credential, afterFunc);
    });
  }
  RED.nodes.registerType('svf cloud', SVFCNode);
};
