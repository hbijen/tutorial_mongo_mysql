<script lang="ts">
	import { addIdField } from '$lib/utilities';
	import {
		DataTable,
	} from 'carbon-components-svelte';


	export let data: any;
	let countries: any[] = [];
	console.log("data..", data)
	$: {
		countries = addIdField(data.data);
	}
</script>

<DataTable
	title="Official Language of each country"
	zebra
	headers={[
		{ key: 'Continent', value: 'Continent' },
		{ key: 'Name',	value: 'Name'},
		{ key: 'Language', value: 'Language' },
		{ key: 'IsOfficial', value: 'IsOfficial' }
	]}
	rows={countries}
>

</DataTable>
