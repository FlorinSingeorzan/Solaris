sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller,History) {    //tine cont de ordinea de sus
	"use strict";

	return Controller.extend("sap.ui.solaris.controller.NotFound", {
		onInit: function() {  
		},
		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				sap.ui.core.UIComponent.getRouterFor(this).navTo("asignariProiecte", {}, true);
			} 
		}
	});
});  