
<svelte:head>
	<title>city</title>
</svelte:head>

<script lang="ts">
	import { DataTable } from "carbon-components-svelte";

	export let data: any;
</script>

<DataTable
	title="Countries"
  	description="First 10 countries."
	zebra
  	headers={[
		{ key: "Name", value: "Name" },
		{ key: "Continent", value: "Continent" },
		{ key: "Population", value: "Population" },
		{ key: "SurfaceArea", value: "SurfaceArea" },
	]}
  	rows={data.data} >
</DataTable>
