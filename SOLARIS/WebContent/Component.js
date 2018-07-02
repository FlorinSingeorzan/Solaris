sap.ui.define([
	"sap/ui/core/UIComponent",
	//"sap/ui/model/odata/v2/ODataModel",
	//"sap/ui/model/odata/ODataMetadata",
], function (UIComponent) {
	"use strict";

	return UIComponent.extend("sap.ui.solaris.Component", {

		metadata : {
			manifest: "json"
		},

		init : function () {
			// call the base component's init function
	        UIComponent.prototype.init.apply(this, arguments);
	       
	        // create the views based on the url/hash
	        this.getRouter().initialize();
	    
	       
	        //  var serviceUrl = "proxy/http/evolhebhdb.evosoft.com:8010/sap/opu/odata/SAP/ZKD_SOLARIS_D_SRV/";	       
	         
	        var sServiceUrl = this.getMetadata().getManifestEntry("sap.app").dataSources["Test"].uri;
	      
	        var oModel =new sap.ui.model.odata.v2.ODataModel(sServiceUrl);
	        sap.ui.getCore().setModel(oModel);
		    /*oModel.attachMetadataLoaded(null, function(){
				   var oMetadata = oModel.getServiceMetadata();
				   console.log(oMetadata);
		     	},null); */
		     this.setModel(oModel);
		    
		    
		  //   if (oModel.isBindingModeSupported(sap.ui.model.BindingMode.TwoWay)) { // true
		  //      oModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
		  //   }
		   

		      //this._createMetadataPromise(oModel);
	     },
	 	createContent: function() {
			// create root view
			return sap.ui.view("AppView", {
				viewName: "sap.ui.solaris.webapp.view.App",
				type: "XML"
			});
		}
	     /*_createMetadataPromise: function(oModel) {
		      this.oWhenMetadataIsLoaded = new Promise(function(fnResolve, fnReject) {
		        oModel.attachEventOnce("metadataLoaded", fnResolve);
		        oModel.attachEventOnce("metadataFailed", fnReject);
		      });
		    },
		    getUrl: function(sUrl){
				if (sUrl == '')
					return sUrl;
				if (window.location.hostname == 'localhost'){
					return "proxy/" + sUrl;
				 }else {
					return sUrl;
				};
			}*/

	});

	
			
		 
});
