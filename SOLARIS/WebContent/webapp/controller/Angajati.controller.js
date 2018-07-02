sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/OperationMode", 
	"sap/m/MessageBox",
	"sap/m/Dialog", "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], 
function (Controller, MessageToast, ODataModel, JSONModel,
		OperationMode, MessageBox, Dialog, Filter,
		FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.solaris.webapp.controller.Angajati", {

		onInit : function() {
			var oModel =  sap.ui.getCore().getModel();//get the model
			
			var oView = this.getView();
			
			this.initTabelAngajatiActivi(oModel);
			this.initTabelAngajatiInactivi(oModel);

		},

		initTabelAngajatiActivi : function(oModel) {
			var table = this.byId("tabelAngajatiActivi");

			// var filterArray = new Array();
			// var Filter = new
			// sap.ui.model.Filter("Status",
			// sap.ui.model.FilterOperator.EQ,
			// '1');
			// filterArray.push(Filter);

			var oTemplate = new sap.m.ColumnListItem(
					{
						cells : [
								new sap.m.Input(
										{
											value : "{Nume}"
										}),
								new sap.m.Input(
										{
											value : "{Prenume}"
										}),
								new sap.m.Input(
										{
											value : "{DataAngajarii}"
										}),
								new sap.m.Input(
										{
											value : "{Locatie}"
										}),
								new sap.m.Input(
										{
											value : "{Email}"
										}),
								new sap.m.Input(
										{
											value : "{NumeManager}"
										}) ]
					});
			
			table.setModel(oModel);
			table.bindAggregation(
							"items",
							{
								path : "/AngajatiSet",
								template : oTemplate,
								filters : new Array(
										new sap.ui.model.Filter(
												"Status",
												sap.ui.model.FilterOperator.EQ,
												'1'))
							});
			table.attachBrowserEvent(
							"dblclick",
							this.onDblClick);
		},

		initTabelAngajatiInactivi : function(
				oModel) {

			var table = this
					.byId("tableAngajatiInactivi");

			// var filterArray = new Array();
			// var Filter = new
			// sap.ui.model.Filter("Status",
			// sap.ui.model.FilterOperator.EQ,
			// '1');
			// filterArray.push(Filter);

			var oTemplate = new sap.m.ColumnListItem(
					{
						cells : [
								new sap.m.Input(
										{
											value : "{Nume}"
										}),
								new sap.m.Input(
										{
											value : "{Prenume}"
										}),
								new sap.m.Input(
										{
											value : "{DataAngajarii}"
										}),
								new sap.m.Input(
										{
											value : "{NrTelefon}"
										}) ]
					});
			table.setModel(oModel);
			table.bindAggregation(
							"items",
							{
								path : "/AngajatiSet",
								template : oTemplate,
								filters : new Array(
										new sap.ui.model.Filter(
												"Status",
												sap.ui.model.FilterOperator.EQ,
												'2'),
										new sap.ui.model.Filter(
												"Status",
												sap.ui.model.FilterOperator.EQ,
												'3'))
							});
			table.attachBrowserEvent(
							"dblclick",
							this.onDblClick);
		},
		onDblClick : function() {
			var table = sap.ui.getCore().byId(
					'tableAngajatiInactivi');
			// table.setSelectedIndex(window.selectedIndex);
			console.log("ok");
		},
		getTable : function() {
			return this
					.byId("tabelAngajatiActivi");
		},

		onDelete : function(oEvent) {
			// Delete
			var oTable = oEvent.getSource()
					.getParent().getParent();
			var oSelectedItem = oTable
					.getSelectedItem();
			if (oSelectedItem === null) {
				MessageBox
						.alert(
								"Please select an Item to Delete",
								{
									icon : sap.m.MessageBox.Icon.ERROR,
									title : "Error"
								});
			} else {
				var that = this;
				// console.log(oSelectedItem.oParent._aSelectedPaths[0]);
				MessageBox
						.confirm(
								"Are you sure you want to delete selected item?",
								{
									icon : sap.m.MessageBox.Icon.WARNING,
									title : "Delete",
									actions : [
											sap.m.MessageBox.Action.YES,
											sap.m.MessageBox.Action.NO ],
									onClose : function(
											oEvent) {
										that
												.fnCallbackConfirm(
														oEvent,
														oTable,
														oSelectedItem);
									}
								});
			}
		},

		fnCallbackConfirm : function(oEvent,
				oTable, oItem) {
			if (oEvent == "YES") {
				// var oIndex =
				// oTable.indexOfItem(oItem);
				var oModel = sap.ui.getCore()
						.getModel();
				var mParams = {
					context : null,
					success : function(oData,
							response) {
						alert("Delete successful");
					},
					error : function(oError) {
						alert("Delete failed");
					},
					async : false
				};
				var sPath = oItem.oParent._aSelectedPaths[0];
				console.log(sPath);
				oModel.remove(sPath, mParams);

			}
		},

		// Update
		onEdit : function(oEvent) {
			var oTable = oEvent.getSource()
					.getParent().getParent();
			var oSelectedItem = oTable
					.getSelectedItem();
			if (oSelectedItem === null) {
				MessageBox
						.alert(
								"Please select an Item to Update",
								{
									icon : sap.m.MessageBox.Icon.ERROR,
									title : "Error"
								});
			} else {
				var oCells = oSelectedItem
						.getCells();
				console.log(oCells);
				for (var j = 0; j < oCells.length; j++) {
					var cell = oCells[j];
					oCells[j].setEditable(true);
				}
			}
			oTable.removeSelections(true);
		},

		// Save
		onSave : function(oEvent) {
			var oTable = oEvent.getSource()
					.getParent().getParent();
			var oSelectedItem = oTable
					.getSelectedItem();
			if (oSelectedItem === null) {
				MessageBox
						.alert(
								"Please select an Item to Save",
								{
									icon : sap.m.MessageBox.Icon.ERROR,
									title : "Error"
								});
			} else {

				var oModel = sap.ui.getCore()
						.getModel();
				var oCells = oSelectedItem
						.getCells();
				var mParams = {
					context : null,
					success : function(oData,
							response) {
						alert("Change successful");
					},
					error : function() {
						alert("Change failed!");
					},
					async : false
				};
				var sPath = oSelectedItem.oParent._aSelectedPaths[0];
				var updatedA = {};
				updatedA.Nume = oSelectedItem.mAggregations.cells[0].mProperties.value;
				updatedA.Prenume = oSelectedItem.mAggregations.cells[1].mProperties.value;
				// updatedA.DataAngajarii =
				// oSelectedItem.mAggregations.cells[2].mProperties.value;
				updatedA.Locatie = oSelectedItem.mAggregations.cells[3].mProperties.value;
				updatedA.Email = oSelectedItem.mAggregations.cells[4].mProperties.value;
				oModel.update(sPath, updatedA,
						mParams);

				for (var j = 0; j < oCells.length; j++) {
					oCells[j]
							.setEditable(false);
				}
			}
			oTable.removeSelections(true);
		},

		// Add new line
		addLine : function(oEvent) {
			var count = this.getView().byId(
					"tabelAngajatiActivi")
					.getItems().length;

			var oModel = sap.ui.getCore()
					.getModel();
			var newA = {};
			newA.OidAngajat = "0";
			newA.Status=1;
			var mParams = {
				context : null,
				success : function(oData,
						response) {
					console.log(response);
					alert("Create successful");
				},
				error : function(oError) {
					alert("Create failed!");
				},
				async : false
			};

			// ///////////////////////////////////////////////////////////////////////////////////////////
			oModel.create("/AngajatiSet", newA,
					mParams);
		},
		editLine : function(oEvent) {			
			var oTable = oEvent.getSource().getParent().getParent();
			var oSelectedItems = oTable.getItems();
			var oCells = oSelectedItems[0].getCells();

			for (var j = 0; j < oCells.length; j++) {
				oCells[j].setEditable(true);
			}
		},
		onAdd : function(oEvent) {
			this.addLine(oEvent);
			this.editLine(oEvent);

		},
	});

});
