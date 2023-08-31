<script lang="ts">
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts-svelte/styles.css';
	import { onMount } from 'svelte';
	import { ExperimentalChoroplethChart, type ChoroplethChartOptions } from '@carbon/charts-svelte';

	let result: any;

	const options:ChoroplethChartOptions = {
		choropleth: {

		},
		thematic: {
			// @ts-ignore
			projection: "geoEquirectangular"
		}
	}

	function find() {

		fetch(`/reports/district-population`)
			.then((r) => r.json())
			.then((r) => {
				console.log('countries ', r);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}

	onMount(find)
</script>

<h4>India Map (Topojson)</h4>
<ExperimentalChoroplethChart data={result} options={options} style="padding:2rem;" />

