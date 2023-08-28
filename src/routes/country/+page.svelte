<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import {
		Button,
		DataTable,
		Link,
		Form,
		TextInput,
		FluidForm,
		Search,
		Select,
		SelectItem,

		FormGroup

	} from 'carbon-components-svelte';
	import { Add, AddAlt, SearchAdvanced, TrashCan } from 'carbon-icons-svelte';
	import Message from '../components/Message.svelte';

	export let data: any;
	let value: string;
	let countries: any[] = [];
	let advancedSearch = false;
	let deleted = false;

	$: {
		countries = data.data;
	}

	function addCountry() {
		goto('/country/add');
	}

	function reset() {
		searchCountry();
	}

	function searchCountry() {
		fetch(`/country/search`, {
			method: 'POST',
			body: JSON.stringify({ searchText: value })
		})
			.then((r) => r.json())
			.then((r) => {
				console.log('r: ', r);
				countries = r;
			});
	}

	function handleEnter(evt: any) {
		if (evt.key === 'Enter') {
			searchCountry();
		}
	}

	function remove(countryId: string) {
		// value
		fetch(`/country/${countryId}`, {
			method: 'DELETE'
		})
			.then((r) => r.json())
			.then((r) => {
				console.log('r: ', r);
				//countries = r
				deleted = true;
				setTimeout(() => (deleted = false), 2500);
				searchCountry();
			});
	}

	let searchOptions: { [key: string]: any } = {};
	function showAdvancedSearch() {
		advancedSearch = !advancedSearch;
		if (advancedSearch) {
			searchOptions = {
				population: null,
				density: null,
				city: '',
				language: ''
			};
		}
	}

	function handleAdvancedSubmit() {
		fetch(`/country/advanced-search`, {
			method: 'POST',
			body: JSON.stringify(searchOptions)
		})
			.then((r) => r.json())
			.then((r) => {
				console.log('r: ', r);
				countries = r;
			});
  	}

	$: console.log('value: ', value);
</script>

<div style="display: flex; gap: 3em;">
	<div style="width: 100%; display: flex; align-items: center; gap: 5px">
		<Search
			bind:value
			placeholder="Enter country name..."
			on:keyup={handleEnter}
			on:clear={reset}
		/>
		<Link on:click={showAdvancedSearch} style="width: 200px; cursor: pointer;">
			Advanced Search</Link
		>
	</div>
	<!-- <TextInput labelText="Search Country" placeholder="Enter min 3 chars name..."/> -->
	<Button on:click={addCountry} icon={AddAlt}>Add</Button>
</div>
{#if advancedSearch}
	<div id="advanced-search">
		<h4>Advanced Search</h4>
		<Form>
			<div class="form-row">
				<TextInput
					type="number"
					labelText="Population" name="population"
					placeholder="enter min population"
					bind:value={searchOptions.population}
				/>
				<TextInput
					type="number"
					labelText="Population Density" name="density"
					placeholder="enter min density"
					bind:value={searchOptions.density}
				/>

				<TextInput
					labelText="City" name="city"
					placeholder="enter city name"
					bind:value={searchOptions.city}
				/>

				<Select labelText="Language" name="language" bind:selected={searchOptions.language}>
					<SelectItem value="" text="Select One"/>
					<SelectItem value="English" />
					<SelectItem value="Korean" />
					<SelectItem value="Hindi" />
					<SelectItem value="Dutch" />
					<SelectItem value="Spanish" />
				</Select>

				<Button on:click={handleAdvancedSubmit} icon={SearchAdvanced}>Search</Button>
			</div>
		</Form>
	</div>
{/if}

{#if deleted}
	<Message message={'Successfully deleted the country'} />
{/if}

<DataTable
	title="Countries"
	description="First 10 countries."
	zebra
	headers={[
		{
			key: 'Name',
			value: 'Name',
			display: (item) => {
				return item;
			}
		},
		{ key: 'Continent', value: 'Continent' },
		{ key: 'Population', value: 'Population' },
		{ key: 'SurfaceArea', value: 'SurfaceArea' },
		{ key: 'delete', value: 'Delete' }
	]}
	rows={countries}
>
	<svelte:fragment slot="cell" let:row let:cell>
		{#if cell.key === 'Name'}
			<Link href="/country/{row.id}">{cell.value}</Link>
		{:else if cell.key === 'delete'}
			<div>
				<Button
					kind="danger-tertiary"
					iconDescription="Delete"
					on:click={() => remove(row.id)}
					icon={TrashCan}
				/>
			</div>
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
</DataTable>

<style>

.form-row {
		display: flex;
		align-items: end;
		gap: 5px;
	}

</style>