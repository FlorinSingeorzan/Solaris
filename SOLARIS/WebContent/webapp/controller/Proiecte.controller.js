sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/OperationMode", "sap/m/MessageBox",
	"sap/m/Dialog", "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, MessageToast, ODataModel, JSONModel,
		OperationMode, MessageBox, Dialog, Filter,
		FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.solaris.controller.Proiecte", {
		
		onInit: function() {
		var oModel = new sap.ui.model.odata.v2.ODataModel("proxy/http/evolhebhdb.evosoft.com:8010/sap/opu/odata/SAP/ZKD_SOLARIS_D_SRV/");
		sap.ui.getCore().setModel(oModel);
	    var oView = this.getView();
		}
	});
}, /* bExport= */ true);