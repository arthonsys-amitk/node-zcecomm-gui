The JSON files for forms defnition are supposed to be an array of objects, where each object contains configuration for one field. Each object can have following properties, the data types as well as definition
<table border="1">
<tr><th>Property</th><th>Data type</th><th>Required?</th><th>Default</th><th>Definition</th></tr>
<tr><td>key</td><td>String</td><td>Yes</td><td></td><td>The key that relates to the model. This will link the field value to the model</td></tr>
<tr><td>type</td><td>String</td><td>Yes</td><td></td><td>This should be a formly-field type added. Currently these types are supported. input, select,list (checkbox/radio), textarea</td></tr>
<tr><td>options</td><td>array</td><td>No</td><td></td><td>Array of options for Select/Radio/Checkbox. It can either be an array of strings, or array of objects with "label" and "value" properties.</td></tr>
<tr><td>required</td><td>boolean</td><td>No</td><td>false</td><td>Is the field required.</td></tr>
<tr><td>display</td><td>Function</td><td>No</td><td>true</td><td>Function which takes to parameters, field and model. This can be used to specify a condition whether to display this field or not. Shall return boolean.</td></tr>
<tr><td>validators</td><td>object</td><td>No</td><td></td><td>Used to set validation rules for a particular field. Should be an object of key - value pairs. The value can either be an expression to evaluate or a function to run. Each should return a boolean value, returning true when the field is valid. </td></tr>
<tr><td>templateOptions</td><td>object</td><td>No</td><td></td><td>Allows additional configuration. These parameters will be passed to input templates.</td></tr>
</table>

Applicable properties for templateOptions

<table border="1">
<tr><th>Property</th><th>Data type</th><th>Required?</th><th>Default</th><th>Definition</th></tr>
<tr><td>label</td><td>String</td><td>No</td><td></td><td>A string containing the field label</td></tr>
<tr><td>onBlur</td><td>Function</td><td>No</td><td></td><td>A function to run on @blur event</td></tr>
<tr><td>onFocus</td><td>Function</td><td>No</td><td></td><td>A function to run on @focus event</td></tr>
<tr><td>onClick</td><td>Function</td><td>No</td><td></td><td>A function to run on @click event</td></tr>
<tr><td>onChange</td><td>Function</td><td>No</td><td></td><td>A function to run on @change event</td></tr>
<tr><td>onKeyup</td><td>Function</td><td>No</td><td></td><td>A function to run on @keyup event</td></tr>
<tr><td>onKeydown</td><td>Function</td><td>No</td><td></td><td>A function to run on @keydown event</td></tr>
<tr><td>atts</td><td>Object</td><td>No</td><td></td><td>Custom attributes to be added.</td></tr>
<tr><td>id</td><td>String</td><td>No</td><td></td><td>ID for the field.</td></tr>
</table>
