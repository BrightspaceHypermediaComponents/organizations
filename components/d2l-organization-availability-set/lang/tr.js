/* eslint quotes: 0 */

export default {
	"addOrgUnits": "Organizasyon Birimi Ekle", // Add Org Units button
	"currentOrgUnitItemDescription": "Mevcut Organizasyon Birimi: {name}", // Label for a current orgunit availability
	"explicitItemDescription": "{type}: {name}", // Label for an explicit orgunit availability with org unit type and name
	"inheritItemDescription": "{type} altındaki tüm Organizasyon Birimleri: {name}", // Label for an inherit (all descendants) orgunit availability
	"inheritItemWithDescendantTypeDescription": "{type} altındaki tüm {descendantType} öğeleri: {name}", // Label for an inherit with specific {descendantType} orgunit availability
	"removeAvailabilityFor": "{itemDescription} için kullanılabilirliği kaldır", // Alt text for remove availability 'X' button
	"availabilityRemoved": "{itemDescription} için kullanılabilirlik kaldırıldı", // Aria announcement when an availability is removed
	"notAvailableToCurrentOrgUnit": "Mevcut Organizasyon Birimi tarafından kullanılamaz: {name}", // Aria announcement. {name} is current org unit name.
	"availableToCurrentOrgUnit": "Mevcut Organizasyon Birimi tarafından kullanılabilir: {name}", // Aria announcement. {name} is current org unit name.
};
