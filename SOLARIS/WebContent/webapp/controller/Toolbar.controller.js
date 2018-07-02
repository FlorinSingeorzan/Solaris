sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/NumberFormat"
], function(Controller, MessageToast, JSONModel, NumberFormat) {    //tine cont de ordinea de sus
	"use strict";

sap.ui.controller("sap.ui.solaris.webapp.controller.Toolbar", {

	navHome: function(){
		this.getOwnerComponent().getRouter().navTo("home");
	},
	
	toggleShell : function (){
		MessageToast.show(this.getView());
	}
});
});  
