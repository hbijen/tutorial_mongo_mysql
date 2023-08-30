<script lang="ts">
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts-svelte/styles.css';
	import { BarChartGrouped, ScaleTypes } from '@carbon/charts-svelte';
	import { Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	let result: any[] = [];

	const groupedBarData = [
	{ group: 'Dataset 1', key: 'Qty', value: 65000 },
	{ group: 'Dataset 1', key: 'More', value: -29123 },
	{ group: 'Dataset 1', key: 'Sold', value: -35213 },
	{ group: 'Dataset 1', key: 'Restocking', value: 51213 },
	{ group: 'Dataset 1', key: 'Misc', value: 16932 },
	{ group: 'Dataset 2', key: 'Qty', value: 32432 },
	{ group: 'Dataset 2', key: 'More', value: -21312 },
	{ group: 'Dataset 2', key: 'Sold', value: -56456 },
	{ group: 'Dataset 2', key: 'Restocking', value: -21312 },
	{ group: 'Dataset 2', key: 'Misc', value: 34234 },
	{ group: 'Dataset 3', key: 'Qty', value: -12312 },
	{ group: 'Dataset 3', key: 'More', value: 23232 },
	{ group: 'Dataset 3', key: 'Sold', value: 34232 },
	{ group: 'Dataset 3', key: 'Restocking', value: -12312 },
	{ group: 'Dataset 3', key: 'Misc', value: -34234 },
	{ group: 'Dataset 4', key: 'Qty', value: -32423 },
	{ group: 'Dataset 4', key: 'More', value: 21313 },
	{ group: 'Dataset 4', key: 'Sold', value: 64353 },
	{ group: 'Dataset 4', key: 'Restocking', value: 24134 },
	{ group: 'Dataset 4', key: 'Misc', value: 24134 }
]

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

<h4>A simple grouped bar chart</h4>
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
