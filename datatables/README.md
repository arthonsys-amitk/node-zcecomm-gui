The JSON files for datatables defnition are supposed to be an array of objects, where each object contains configuration for one column. Each object can have following properties, the data types as well as definition
<table border="1">
<tr><th>Property</th><th>Data type</th><th>Required?</th><th>Default</th><th>Definition</th></tr>
<tr><td>field</td><td>String</td><td>Yes</td><td></td><td>Name of the property in model. Which populates this column.</td></tr>
<tr><td>title</td><td>String</td><td>No</td><td></td><td>Title of Column (column header)</td></tr>
<tr><td>explain</td><td>String</td><td>No</td><td></td><td>Tooltip for the header</td></tr>
<tr><td>sortable</td><td>Boolean</td><td>No</td><td>false</td><td>Is this field sortable</td></tr>
<tr><td>visible</td><td>Boolean</td><td>No</td><td>true</td><td>Is this field visible</td></tr>
<tr><td>fixed</td><td>Boolean</td><td>No</td><td>false</td><td>Is the position of this column fixed.</td></tr>
<tr><td>group</td><td>String</td><td>No</td><td></td><td>Group of the field.</td></tr>
<tr><td>colClass</td><td>String/Object</td><td>No</td><td></td><td>Classes for the whole column</td></tr>
<tr><td>colStyle</td><td>Object</td><td>No</td><td></td><td>Inline styles for the whole column</td></tr>
<tr><td>thClass</td><td>String</td><td>No</td><td></td><td>Class for table header.</td></tr>
<tr><td>thStyle</td><td>Object</td><td>No</td><td></td><td>Inline styles for</td></tr>
<tr><td>thComp</td><td>String/Object</td><td>No</td><td></td><td>Dynamic component for table header. (We use this for filteration)</td></tr>
<tr><td>tdClass</td><td>String</td><td>No</td><td></td><td>Class for table cells. (td)</td></tr>
<tr><td>tdStyle</td><td>Object</td><td>No</td><td></td><td>Inline styles for table cells. (td)</td></tr>
<tr><td>tdComp</td><td>String/Object</td><td>No</td><td></td><td>Custom Component for table cells.</td></tr>
</table>
