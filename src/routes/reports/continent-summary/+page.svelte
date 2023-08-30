<script lang="ts">
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts-svelte/styles.css';
	import { BarChartGrouped, RadarChart, ScaleTypes } from '@carbon/charts-svelte';
	import { onMount } from 'svelte';

	let result: any[] = [];

	function findMinMax(sublist: any[], category: string)  {
		const min = sublist.reduce((prev: number, curr: number) => prev < curr? prev: curr, 0)
		const max = sublist.reduce((prev: number, curr: number) => prev > curr? prev: curr, 0)
		return {min: min, max: max}
	}

	function normalizeValue(list: any[], category: string) {
		const sublist = list.filter(d => d.category == category)
		const values: number[] = sublist.map(d => d.value)
		let min = Math.min(...values)
		let max = Math.max(...values)

		console.log(`category=${category} min, max `, min, max)
		sublist.forEach((d) => {
			d.value = (d.value - min) / (max - min) * 9 + 1;
		})
	}

	function find() {
		let a = fetch(`/reports/continent-summary`, {
			method: 'POST',
			body: JSON.stringify({ summary: 'basic' })
		}).then((r) => r.json())

		let b = fetch(`/reports/continent-summary`, {
			method: 'POST',
			body: JSON.stringify({ summary: 'advanced' })
		}).then((r) => r.json())

		Promise.all([a,b])
			.then((r:any[]) => {
				console.log(r[0])
				console.log(r[1])
				const res0 = r[0].map((d: { [x: string]: any }) => {
					return [
						{ group: d._id, category: 'country_count', value: d['country_count'] || 0 },
						{ group: d._id, category: 'city_count', value: d['city_count'] || 0},
						{ group: d._id, category: 'Population', value: d['Population'] || 0},
						{ group: d._id, category: 'SurfaceArea', value: d['SurfaceArea'] || 0},
					];
				});
				result = res0.reduce((prev: any[], curr: any,i: number,[]) => [].concat(...prev,...curr))

				const res1 = r[1].map((d: { [x: string]: any }) => {
					return { group: d._id, category: 'language_count', value: d['language_count'] || 0 }
				});
				result = [].concat(...result, res1)

				
				normalizeValue(result, "city_count")
				normalizeValue(result, "country_count")
				normalizeValue(result, "Population")
				normalizeValue(result, "SurfaceArea")
				normalizeValue(result, "language_count")
				console.log("result ", result)
				
			})
	}

	onMount(find);
</script>

<h4>A simple radar chart</h4>
<RadarChart data={result} options={{
	title: 'Continent Comparison',
	radar: {
	  axes: {
		angle: 'category',
		value: 'value'
	  }
	}, 
	data: {
    	groupMapsTo: 'group'
  	},
	height: '400px'
  }} />

