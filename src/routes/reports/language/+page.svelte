<script lang="ts">
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts-svelte/styles.css';
	import { PieChart, type PieChartOptions } from '@carbon/charts-svelte';
	import {
		Dropdown,
	} from 'carbon-components-svelte';

	export let data: any;
	let value: string;
	let languages: { [key: string]: any }[] = [];
	let options: PieChartOptions = {
		height: '400px'
	};

	let countries = (data.data || []).map((d: any) => {
		return { id: d._id, text: d.Name };
	});

	function selected(evt: any) {
		console.log("evt.detail", evt.detail)
		let name = evt.detail.selectedItem.text

		fetch(`/reports/language`, {
			method: "POST",
			body: JSON.stringify({countryName: name})
		})
				.then((r) => r.json())
				.then((r) => {
					languages = r
                    console.log('languages ', languages)
                })
				.catch((error) => {
					console.error('Error fetching data:', error);
				});		
	}
</script>

<h4>A simple language pie chart</h4>
{#if countries.length > 0}
	<Dropdown titleText="Select a Country" selectedId="0" items={countries} on:select={selected}/>
{/if}

<PieChart data={languages} {options} />
