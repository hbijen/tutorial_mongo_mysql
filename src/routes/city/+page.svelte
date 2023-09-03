<script lang="ts">
	import { addIdField } from "$lib/utilities";
	import { DataTable, Pagination } from "carbon-components-svelte";

	export let data: any;

	var result = data.data;

	function handlePagination(event: any) {
		console.log(event.detail)
		let offset = (event.detail.page-1)*event.detail.pageSize
		fetch(`/city/${event.detail.pageSize}/${offset}`)
		.then(r => r.json())
		.then(r => result = addIdField(r))
	}
</script>

<DataTable
	title="Cities"
	zebra
  	headers={[
		{ key: "Name", value: "Name" },
		{ key: "Country", value: "Country" },
		{ key: "District", value: "District" },
		{ key: "Population", value: "Population" },
	]}
  	rows={result} >
</DataTable>

<Pagination totalItems={data.total_count} pageSizes={[10, 15 ]} on:update={handlePagination}/>
