<script lang="ts">
	import dataset from '$lib/geojson/India.json';
	import { onMount } from 'svelte';
	import { geoPath, geoMercator } from 'd3-geo';
	import * as d3 from 'd3';

	const projection = geoMercator().scale(1000).translate([-1100, 700]);
	const path = geoPath().projection(projection);

	let states: any[] = [];
	let selected: any;

	onMount(async () => {
		const statePopulation: any[] = await fetch(`district-population`).then((d) => d.json());
		console.log('india dataset ', statePopulation);
		statePopulation.forEach(d => {
			if (!d._id) {
				d._id = d.District
			}
		})
		let states = dataset.features;
		drawMap(states, statePopulation);
	});

	function drawMap(states: any[], dataset: any[]) {

		const populationData: number[] = dataset.map(d => d.total_population);
		const colorScale = d3.scaleLinear()
							.domain([d3.min(populationData), d3.max(populationData)]) // Set the data range
							.range(["blue", "red"]);

		var svg = d3.select('#choropleth').append('svg:svg').attr('width', 800).attr('height', 650);
		//.call(initialize);
		var map = svg.append('svg:g');
		var india = map
			.append('svg:g')
			.attr('id', 'india')
			.style('stroke', '#000')
			.style('stroke-width', '0.5');
		india.selectAll('path')
			.data(states)
			.enter()
			.append('path')
			.attr('d', path)
			.style('fill', function (d) {
				const st = dataset.find(data => d.properties.NAME_1 == data._id)
				 if (!st) {
					console.log(`Not found for -${d.properties.NAME_1}-`)
				 }
				return st? colorScale(st.total_population): '#fefefe';
			})
			.append('title')
			.text(function (d) {
				const st = dataset.find(data => data._id == d.properties.NAME_1)
				return `State : ${d.properties.NAME_1} \n Population : ${st?.total_population}`;
			});
	}

	function stateInfo(state: any) {
		selected = state;
	}
	function color(state: any) {
		console.log(state);
		return '#cdcdcd';
	}
</script>

<h4>State Level Population Choropleth Map</h4>

<div id="choropleth" />

<style>
	.state:hover {
		fill: hsl(0 0% 50% / 20%);
	}

	.selectedName {
		text-align: justify;
		color: blue;
	}
</style>
