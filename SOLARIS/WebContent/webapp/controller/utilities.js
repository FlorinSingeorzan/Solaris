sap.ui.define([
	"./utilities"
], function() {
	"use strict";
	
	// class providing static utility methods to retrieve entity default values.
	var oModel = new sap.ui.model.odata.v2.ODataModel("proxy/http/evolhebhdb.evosoft.com:8010/sap/opu/odata/SAP/ZKD_SOLARIS_D_SRV/");
	
	sap.ui.getCore().setModel(oModel);
	return {

	};
});