/* eslint quotes: 0 */

export default {
	"addOrgUnits": "組織単位の追加", // Add Org Units button
	"currentOrgUnitItemDescription": "現在の組織単位: {name}", // Label for a current orgunit availability
	"explicitItemDescription": "{type}: {name}", // Label for an explicit orgunit availability with org unit type and name
	"inheritItemDescription": "{type}: {name} の下のすべての組織単位", // Label for an inherit (all descendants) orgunit availability
	"inheritItemWithDescendantTypeDescription": "{type}: {name} の下のすべての {descendantType}", // Label for an inherit with specific {descendantType} orgunit availability
	"removeAvailabilityFor": "{itemDescription} に対する使用可能期間の削除", // Alt text for remove availability 'X' button
	"availabilityRemoved": "{itemDescription} の使用可能期間が削除されました", // Aria announcement when an availability is removed
	"notAvailableToCurrentOrgUnit": "現在の組織単位に使用不可: {name}", // Aria announcement. {name} is current org unit name.
	"availableToCurrentOrgUnit": "現在の組織単位に使用可能: {name}", // Aria announcement. {name} is current org unit name.
};
