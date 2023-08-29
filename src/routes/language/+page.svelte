<script lang="ts">
	import {
		DataTable,
	} from 'carbon-components-svelte';


	export let data: any;
	let countries: any[] = [];
	console.log("data..", data)
	$: {
		countries = data.data;
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
