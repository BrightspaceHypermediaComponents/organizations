/* eslint quotes: 0 */

export default {
	"addOrgUnits": "添加组织单位", // Add Org Units button
	"currentOrgUnitItemDescription": "当前组织单位：{name}", // Label for a current orgunit availability
	"explicitItemDescription": "{type}: {name}", // Label for an explicit orgunit availability with org unit type and name
	"inheritItemDescription": "{type}: {name} 下的每个组织单位", // Label for an inherit (all descendants) orgunit availability
	"inheritItemWithDescendantTypeDescription": "{type}: {name} 下的每个 {descendantType}", // Label for an inherit with specific {descendantType} orgunit availability
	"removeAvailabilityFor": "删除 {itemDescription} 的可用性", // Alt text for remove availability 'X' button
	"availabilityRemoved": "已为 {itemDescription} 删除可用性", // Aria announcement when an availability is removed
	"notAvailableToCurrentOrgUnit": "不可用于当前组织单位：{name}", // Aria announcement. {name} is current org unit name.
	"availableToCurrentOrgUnit": "可用于当前组织单位：{name}", // Aria announcement. {name} is current org unit name.
};
