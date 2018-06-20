sap.ui.define([
	"sap/ui/core/UIComponent",
	  "sap/ui/Device",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/odata/ODataMetadata",
], function (UIComponent,Device, ODataModel,ODataMetadata) {
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
	    
	        /*var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");*/
	        // var sServiceUrl = this.getMetadata().getManifestEntry("sap.app").dataSources["default"].uri;
	         
	         var serviceUrl = "proxy/http/evolhebhdb.evosoft.com:8010/sap/opu/odata/SAP/ZKD_SOLARIS_D_SRV/";
		     var oModel =new sap.ui.model.odata.v2.ODataModel(serviceUrl, true);
		     
		     if (oModel.isBindingModeSupported(sap.ui.model.BindingMode.OneWay)) { // true
		        oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
		     }
		     this.setModel(oModel);

		      //this._createMetadataPromise(oModel);
	     },
	 	createContent: function() {
			// create root view
			return sap.ui.view("AppView", {
				viewName: "sap.ui.solaris.view.App",
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
