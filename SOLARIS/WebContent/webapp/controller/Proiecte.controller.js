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

	return Controller.extend("sap.ui.solaris.webapp.controller.Proiecte", {
		
		onInit: function() {
			var oModel =  sap.ui.getCore().getModel();//get the model
			var oView = this.getView();
			
			//this.initTabelAngajatiActivi(oModel);
			//this.initTabelAngajatiInactivi(oModel);

		}
	});
}, /* bExport= */ true);