/* eslint quotes: 0 */

export default {
	"addOrgUnits": "新增組織單位", // Add Org Units button
	"currentOrgUnitItemDescription": "目前的組織單位：{name}", // Label for a current orgunit availability
	"explicitItemDescription": "{type}：{name}", // Label for an explicit orgunit availability with org unit type and name
	"inheritItemDescription": "{type}：{name} 之下的每個組織單位", // Label for an inherit (all descendants) orgunit availability
	"inheritItemWithDescendantTypeDescription": "{type}：{name} 之下的每個 {descendantType}", // Label for an inherit with specific {descendantType} orgunit availability
	"removeAvailabilityFor": "移除 {itemDescription} 的可用情況", // Alt text for remove availability 'X' button
	"availabilityRemoved": "已移除 {itemDescription} 的可用情況", // Aria announcement when an availability is removed
	"notAvailableToCurrentOrgUnit": "無法供目前的組織單位使用：{name}", // Aria announcement. {name} is current org unit name.
	"availableToCurrentOrgUnit": "可供目前的組織單位使用：{name}", // Aria announcement. {name} is current org unit name.
};
