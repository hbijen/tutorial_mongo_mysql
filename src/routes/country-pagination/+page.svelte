<script lang="ts">
	import { DataTable, Pagination } from "carbon-components-svelte";

	export let data: any;

	var result = data.data;

	function handlePagination(event: any) {
		console.log(event.detail)
		let offset = (event.detail.page-1)*event.detail.pageSize
		fetch(`/country-pagination/${event.detail.pageSize}/${offset}`)
		.then(r => r.json())
		.then(r => {
			console.log('r', r)
			result = r
		})
	
	}
</script>

<DataTable
	title="Countries"
	zebra
  	headers={[
		{ key: "Name", value: "Name" },
		{ key: "Continent", value: "Continent" },
		{ key: "Population", value: "Population" },
		{ key: "SurfaceArea", value: "SurfaceArea" },
	]}
  	rows={result} >
</DataTable>

<Pagination totalItems={data.total_count} pageSizes={[10, 15 ]} on:update={handlePagination}/>
