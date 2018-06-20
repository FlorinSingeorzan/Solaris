sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/NumberFormat",
	"sap/m/library"
], function(jQuery, Controller, JSONModel, NumberFormat, MobileLibrary) {
	"use strict";

	return Controller.extend("sap.ui.solaris.controller.Startpage", {
		onInit: function() {
		//	var sDataPath = jQuery.sap.getModulePath("sap.suite.ui.commons.PrjTest.model.data", "/News.json");
		//	var oModel = new JSONModel(sDataPath);
		//	this.getView().setModel(oModel, "news");
		},
		navHome: function(){
			this.getOwnerComponent().getRouter().navTo("home");
		},

		getProgress: function(aNodes) {
			if (!aNodes || aNodes.length === 0) {
				return 0;
			}
			var iSum = 0;
			for (var i = 0; i < aNodes.length; i++) {
				iSum += aNodes[i].state === "Positive";
			}
			var fPercent = (iSum / aNodes.length) * 100;
			return fPercent.toFixed(0);
		},

		getEntityCount: function(entities) {
			return entities && entities.length || 0;
		},

		formatNumber: function(value) {
			var oFloatFormatter = NumberFormat.getFloatInstance({
				style: "short",
				decimals: 1
			});
			return oFloatFormatter.format(value);
		},

		formatJSONDate: function(date) {
			var oDate = new Date(Date.parse(date));
			return oDate.toLocaleDateString();
		},

				
		onNavToRapoarteIndividuale: function (event) {
			this.getRouter().navTo("rapoarteIndividuale");
		
		},
		
		onNavToAsignareProiecte: function (event) {
			this.getRouter().navTo("asignariProiecte");
		
		},
		onNavToRaportGeneral: function (event) {
				this.getRouter().navTo("raportGeneral");			
		},
		
		onNavToNewsFeed: function (event) {
			if (event.getSource().getState() === MobileLibrary.LoadState.Loaded) {
				this.getRouter().navTo("newsFeed");
			}
		},	
		
		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},	
		
		onNavToAngajati : function(){
			this.getRouter().navTo("angajati");
		},
		
		onNavToProiecte : function(){
			this.getRouter().navTo("proiecte");
		},
		
		externalLinkAboutSiemens: function() {
			window.open("https://www.siemens.com","_blank");
		}
	});
});