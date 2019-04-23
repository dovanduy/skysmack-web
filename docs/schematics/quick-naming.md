# Quick naming files

## Steps
1. Copy example of code to scaffold to files in the schematics folder.
2. Open a powershell window in the files folder.
3. Run the below command in the powershell window
    Get-ChildItem -recurse -name | ForEach-Object { Move-Item $_ $_.replace("person", "package") }
4. Open the files folder in VS code. 
5. If you have turned "editor.formatOnSave": true in vs code settings, turn this to false while replacing (only needed if you use <%= %> or other symbols).
6. ctrl + shift + h
7. Turn on 'MATCH CASE' - Turn off 'MATCH WHOLE WORD'
8. Search and replace (Remember to replace entity name before replacing Capital name)

## Words to replace (standard crud)
|Word|Replacement|
|-|-|
|lodgingType|`productType`|
|LodgingType|`ProductType`|
|lodging-type|`product-type`|
|LODGING_TYPE|`PRODUCT_TYPE`|

Remember to change DocumentRecord to Record if necessary.

## Words to replace (schematics)
|Word|Replacement|
|-|-|
|/product-type|`/<%= dasherize(name) %>`|
|ss-product-type|`ss-<%= dasherize(name) %>`|
|products.types|`<%= translationString %>`|
|productType|`<%= camelize(name) %>`|
|ProductTypeViewModel|`<%= classify(entity) %>`|
|ProductType|`<%= classify(name) %>`|
|PRODUCT_TYPE|`<%= upperCaseName %>`|
|Areaname e.g "/product" or "/hotelManagement"|`/<%= dasherize(areaName) %>`|
|Areaname e.g "product" or "hotelManagement"|`<%= camelize(areaName) %>`|
|Areaname e.g "PRODUCT" or "HOTEL_MANAGEMENT"|`<%= upperCaseAreaName %>`|