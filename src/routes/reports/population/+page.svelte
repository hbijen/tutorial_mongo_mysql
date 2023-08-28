<script lang="ts">
	import '@carbon/styles/css/styles.css'
	import '@carbon/charts-svelte/styles.css'
	import { BarChartSimple, ScaleTypes } from '@carbon/charts-svelte'

	export let data: any;

	let result = data.data.map((d: { [x: string]: any }) => { 
		d["group"] = d.Name
		return d
	})
	console.log("result ", result.length)
</script>

<h4>A simple population bar chart</h4>
<BarChartSimple
	data={result}
	options={{
		//theme: 'g90',
		title: 'Top 20 Most Populous Countries',
		height: '400px',
		axes: {
			left: { mapsTo: 'Population' },
			bottom: { mapsTo: 'Name', scaleType: ScaleTypes.LABELS }
		}
	}} />