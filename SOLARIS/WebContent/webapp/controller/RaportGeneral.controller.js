sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function(Controller, MessageBox, Utilities, History) {
	"use strict";

	return Controller.extend("sap.ui.solaris.controller.RaportGeneral", {
		
		applyFiltersAndSorters: function(sControlId, sAggregationName) {
			var oBindingInfo = this.getView().byId(sControlId).getBindingInfo(sAggregationName);
			var oBindingOptions = this.updateBindingOptions(sControlId);
			this.getView().byId(sControlId).bindAggregation(sAggregationName, {
				model: oBindingInfo.model,
				path: oBindingInfo.path,
				parameters: oBindingInfo.parameters,
				template: oBindingInfo.template,
				templateShareable: true,
				sorter: oBindingOptions.sorters,
				filters: oBindingOptions.filters
			});

		},
		updateBindingOptions: function(sCollectionId, oBindingData, sSourceId) {
			this.mBindingOptions = this.mBindingOptions || {};
			this.mBindingOptions[sCollectionId] = this.mBindingOptions[sCollectionId] || {};

			var aSorters = this.mBindingOptions[sCollectionId].sorters;
			var oGroupby = this.mBindingOptions[sCollectionId].groupby;

			// If there is no oBindingData parameter, we just need the processed filters and sorters from this function
			if (oBindingData) {
				if (oBindingData.sorters) {
					aSorters = oBindingData.sorters;
				}
				if (oBindingData.groupby) {
					oGroupby = oBindingData.groupby;
				}
				// 1) Update the filters map for the given collection and source
				this.mBindingOptions[sCollectionId].sorters = aSorters;
				this.mBindingOptions[sCollectionId].groupby = oGroupby;
				this.mBindingOptions[sCollectionId].filters = this.mBindingOptions[sCollectionId].filters || {};
				this.mBindingOptions[sCollectionId].filters[sSourceId] = oBindingData.filters || [];
			}

			// 2) Reapply all the filters and sorters
			var aFilters = [];
			for (var key in this.mBindingOptions[sCollectionId].filters) {
				aFilters = aFilters.concat(this.mBindingOptions[sCollectionId].filters[key]);
			}

			// Add the groupby first in the sorters array
			if (oGroupby) {
				aSorters = aSorters ? [oGroupby].concat(aSorters) : [oGroupby];
			}

			var aFinalFilters = aFilters.length > 0 ? [new sap.ui.model.Filter(aFilters, true)] : undefined;
			return {
				filters: aFinalFilters,
				sorters: aSorters
			};

		},
		onInit: function() {
			
			var oView = this.getView();
			var oModel = new sap.ui.model.json.JSONModel();
			oView.setModel(oModel, "staticDataModel");

			function dateDimensionFormatter(oDimensionValue, sTextValue) {
				var oValueToFormat = sTextValue !== undefined ? sTextValue : oDimensionValue;
				if (oValueToFormat instanceof Date) {
					var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
						style: "short"
					});
					return oFormat.format(oValueToFormat);
				}
				return oValueToFormat;
			}

			this.oBindingParameters = {};

			var oData = [{
				"dim0": "Ianuarie",
				"mea0": "12",
				"__id": 0
			}, {
				"dim0": "Februarie",
				"mea0": "7",
				"__id": 1
			}, {
				"dim0": "Martie",
				"mea0": "10",
				"__id": 2
			}, {
				"dim0": "Aprilie",
				"mea0": "15",
				"__id": 3
			}, {
				"dim0": "Mai",
				"mea0": "21",
				"__id": 4
			}, {
				"dim0": "Iunie",
				"mea0": "20",
				"__id": 5
			}, {
				"undefined": null,
				"dim0": "Iulie",
				"mea0": "25",
				"__id": 6
			}, {
				"undefined": null,
				"dim0": "August",
				"mea0": "30",
				"__id": 7
			}, {
				"undefined": null,
				"dim0": "Septembrie",
				"mea0": "24",
				"__id": 8
			}, {
				"undefined": null,
				"dim0": "Octombrie",
				"mea0": "17",
				"__id": 9
			}, {
				"undefined": null,
				"dim0": "Noiembrie",
				"mea0": "11",
				"__id": 10
			}, {
				"undefined": null,
				"dim0": "Decembrie",
				"mea0": "20",
				"__id": 11
			}];
			oView.getModel("staticDataModel").setData({
				"sap_m_Page_0-content-sap_m_IconTabBar-1500987821584-items-sap_m_IconTabFilter-1-content-sap_chart_ColumnChart-1501063052593": oData
			}, true);
			this.oBindingParameters[
				'sap_m_Page_0-content-sap_m_IconTabBar-1500987821584-items-sap_m_IconTabFilter-1-content-sap_chart_ColumnChart-1501063052593'] = {
				"path": "/sap_m_Page_0-content-sap_m_IconTabBar-1500987821584-items-sap_m_IconTabFilter-1-content-sap_chart_ColumnChart-1501063052593",
				"parameters": {},
				"model": "staticDataModel"
			};
			var aDimensions = oView.byId(
				"sap_m_Page_0-content-sap_m_IconTabBar-1500987821584-items-sap_m_IconTabFilter-1-content-sap_chart_ColumnChart-1501063052593").getDimensions();
			aDimensions.forEach(function(oDimension) {
				oDimension.setTextFormatter(dateDimensionFormatter);
			});

		},
		onAfterRendering: function() {

			var oChart,
				self = this,
				oBindingParameters = this.oBindingParameters,
				oView = this.getView();

			oChart = oView.byId(
				"sap_m_Page_0-content-sap_m_IconTabBar-1500987821584-items-sap_m_IconTabFilter-1-content-sap_chart_ColumnChart-1501063052593");
			oChart.bindData(oBindingParameters[
				'sap_m_Page_0-content-sap_m_IconTabBar-1500987821584-items-sap_m_IconTabFilter-1-content-sap_chart_ColumnChart-1501063052593']);

		}
	});
}, /* bExport= */ true);