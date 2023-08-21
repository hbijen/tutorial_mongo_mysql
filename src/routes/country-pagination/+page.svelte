<script lang="ts">
	import { DataTable, Pagination } from "carbon-components-svelte";

	export let data: any;
	let page = 1;
	let pageSize = 15;
	let sortKey = "";
	let sortDirection = "";

	var result = data.data;

	function handlePagination() {
		let offset = (page-1)*pageSize
		fetch(`/country-pagination/${pageSize}/${offset}`,
			{method: "POST", body: JSON.stringify({
				sortKey: sortKey,
				sortDirection: sortDirection
			})})
		.then(r => r.json())
		.then(r => {
			console.log('r', r)
			result = r
		})
	}

	function handleSorting(event: any) {
		sortDirection = event.detail.sortDirection
		sortKey = event.detail.header.key
		page = 1
		console.log("sortDirection: ",sortDirection,", sortKey",sortKey)
		handlePagination()
	}

	$: console.log("page", page);
	$: console.log("pageSize", pageSize);
</script>

<DataTable
	title="Countries"
	zebra
	sortable on:click:header={handleSorting}
  	headers={[
		{ key: "Name", value: "Name" , sort: (a,b) => 0 },
		{ key: "Continent", value: "Continent", sort: (a,b) => 0 },
		{ key: "Population", value: "Population", sort: (a,b) => 0 },
		{ key: "SurfaceArea", value: "SurfaceArea", sort: (a,b) => 0 },
	]}
  	rows={result} >
</DataTable>

<Pagination bind:page={page} bind:pageSize={pageSize} totalItems={data.total_count} pageSizes={[10, 15 ]} on:update={handlePagination}/>
