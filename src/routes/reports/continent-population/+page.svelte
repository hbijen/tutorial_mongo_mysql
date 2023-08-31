<script lang="ts">
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts-svelte/styles.css';
	import { BarChartGrouped, ScaleTypes } from '@carbon/charts-svelte';
	import { onMount } from 'svelte';

	let result: any[] = [];

	function find() {
		fetch(`/reports/continent-population`)
			.then((r) => r.json())
			.then((r) => {
				console.log('r ', r);
				const res = r.map((d: { [x: string]: any }) => {
					return [
						{ group: d._id, key: 'Avg Population', value: d['AveragePopulation'] || 0 },
						{ group: d._id, key: 'TotalSurfaceArea', value: d['TotalSurfaceArea'] || 0}
					];
				});
				result = res.reduce((prev: any[], curr: any,i: number,[]) => [].concat(...prev,...curr))
				console.log(result)
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}

	onMount(find);
</script>

<h4>Continent Comparison Grouped Bar Chart</h4>
<BarChartGrouped
	data={result}
	options={{
		title: 'Continent Summary',
		height: '400px',
		axes: {
			left: {
				mapsTo: 'value'
			},
			bottom: {
				scaleType: ScaleTypes.LABELS,
				mapsTo: 'key',
			}
		}
	}}
/>
