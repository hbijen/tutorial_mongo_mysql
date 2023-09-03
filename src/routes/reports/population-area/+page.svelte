<script lang="ts">
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts-svelte/styles.css';
	import { BubbleChart, ScaleTypes, ScatterChart } from '@carbon/charts-svelte';
	import { Slider, Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	let selected = 0;
	let result: any[] = [];
	let maxPop = 1277559000;
	let maxArea = 17075500;

	function find() {
		console.log('selected...', selected);
		result = [];

		fetch(`/reports/population-area`, {
			method: 'POST',
			body: JSON.stringify({ maxPop, maxArea })
		})
			.then((r) => r.json())
			.then((r) => {
				console.log('r ', r);
				r.forEach((d: any) => {
					d.group = 'country';
				});

				result = r;
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}

	onMount(find);

	function insertLabel(data: any, defaultHTML: string): string {
		const item = `<li><div class="datapoint-tooltip"><div class="label"><p>Name</p></div><p class="value"/>${data[0].Name}</p></div></li>`;
		const i = defaultHTML.indexOf('multi-tooltip');
		const insertIndex = i + 'multi-tooltip">'.length;

		const updatedHtml =
			defaultHTML.substring(0, insertIndex) +
			item +
			defaultHTML.substring(insertIndex, defaultHTML.length);
		console.log(updatedHtml);
		return updatedHtml;
	}
</script>

<h4>Scatter Chart and Bubble Chart</h4>

<Tabs bind:selected autoWidth on:change={find}>
	<Tab label="2 Dimension Data" />
	<Tab label="3 Dimension Data" />
	<svelte:fragment slot="content">
		<TabContent>
			<ScatterChart
				data={result}
				options={{
					title: 'Population vs Surface Area',
					height: '400px',
					axes: {
						bottom: {
							title: 'Surface Area',
							mapsTo: 'SurfaceArea',
							scaleType: ScaleTypes.LINEAR
						},
						left: {
							title: 'Population',
							mapsTo: 'Population',
							scaleType: ScaleTypes.LINEAR
						}
					},
					tooltip: {
						customHTML: insertLabel
					}
				}}
			/>
		</TabContent>
		<TabContent>
			<BubbleChart
				data={result}
				options={{
					title: 'Population vs Surface Area with GDP',
					axes: {
						bottom: {
							title: 'Surface Area',
							mapsTo: 'SurfaceArea',
							includeZero: false
						},
						left: {
							title: 'Population',
							mapsTo: 'Population',
							includeZero: false
						}
					},
					bubble: {
						radiusMapsTo: 'GNP',
						radiusLabel: 'GDP'
					},
					legend: {
						additionalItems: [
							{
								type: 'radius',
								name: 'GDP'
							}
						]
					},
					height: '400px',
					tooltip: {
						customHTML: insertLabel
					}
				}}
			/>
		</TabContent>
	</svelte:fragment>
</Tabs>
<Slider
	labelText="Max Population"
	bind:value={maxPop}
	max={1277559000}
	fullWidth
	step={2000000}
	on:change={find}
/>
<Slider
	labelText="Max SurfaceArea"
	bind:value={maxArea}
	max={17075500}
	fullWidth
	step={2000000}
	on:change={find}
/>
