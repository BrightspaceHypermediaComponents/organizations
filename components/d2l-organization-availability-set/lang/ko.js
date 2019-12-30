/* eslint quotes: 0 */

export default {
	"addOrgUnits": "구성 단위 추가", // Add Org Units button
	"currentOrgUnitItemDescription": "현재 구성 단위: {name}", // Label for a current orgunit availability
	"explicitItemDescription": "{type}:{name}", // Label for an explicit orgunit availability with org unit type and name
	"inheritItemDescription": "{type}:{name}의 모든 구성 단위", // Label for an inherit (all descendants) orgunit availability
	"inheritItemWithDescendantTypeDescription": "{type}:{name}의 모든 {descendentType}", // Label for an inherit with specific {descendantType} orgunit availability
	"removeAvailabilityFor": "{itemDescription}에 대한 가용성 제거", // Alt text for remove availability 'X' button
	"availabilityRemoved": "{itemDescription}에 대한 가용성이 제거됨", // Aria announcement when an availability is removed
	"notAvailableToCurrentOrgUnit": "현재 구성 단위 {name}에 사용할 수 없음", // Aria announcement. {name} is current org unit name.
	"availableToCurrentOrgUnit": "현재 구성 단위에 사용 가능: {name}", // Aria announcement. {name} is current org unit name.
};
