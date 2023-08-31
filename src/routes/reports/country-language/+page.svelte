<script lang="ts">
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts-svelte/styles.css';
	import { BarChartSimple, ScaleTypes } from '@carbon/charts-svelte';
	import { Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	let selected = 0;
	let result1: any[] = [];
	let result2: any[] = [];

	function find() {
		console.log('selected...', selected);
		result1 = [];
		result2 = [];
		fetch(`/reports/country-language/${selected}`)
			.then((r) => r.json())
			.then((r) => {
				console.log('r ', r);
				if (selected == 0) {
					result1 = r.map((d: { [x: string]: any }) => {
						d['group'] = d.Name;
						return d;
					});
				} else if (selected == 1) {
					result2 = r.map((d: { [x: string]: any }) => {
						d['group'] = d._id;
						return d;
					});
				}
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}

	onMount(find);
</script>
<h4>Ordered Data with Horizontal Bar Chart</h4>
<Tabs bind:selected autoWidth on:change={find}>
	<Tab label="Countries" />
	<Tab label="Languages" />
	<svelte:fragment slot="content">
		<TabContent>
			<BarChartSimple
				data={result1}
				options={{
					title: 'Ordered by languages',
					height: '600px',
					axes: {
						left: { mapsTo: 'Name', scaleType: ScaleTypes.LABELS },
						bottom: { mapsTo: 'value' }
					},
					legend: { enabled: false }
				}}
			/>
		</TabContent>
		<TabContent>
			<BarChartSimple
				data={result2}
				options={{
					title: 'Ordered by countries',
					height: '600px',
					axes: {
						left: { mapsTo: '_id', scaleType: ScaleTypes.LABELS },
						bottom: { mapsTo: 'value' }
					},
					legend: { enabled: false }
				}}
			/>
		</TabContent>
	</svelte:fragment>
</Tabs>
