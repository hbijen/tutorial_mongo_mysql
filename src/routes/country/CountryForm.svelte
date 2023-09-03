<script lang="ts">
	import {
		FluidForm,
		TextInput,
		Button,
		RadioButtonGroup,
		RadioButton
	} from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import { Add, CheckmarkFilled, CloseFilled, Save } from 'carbon-icons-svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let countryId: string | null;
	let successful = false;

	type City = {
		Name: string;
		District: string;
		[key: string]: any;
	};
	type Language = {
		Language: string;
		IsOfficial: string;
		[key: string]: any;
	};
	type Country = {
		Code: string;
		Name: string;
		Continent: string;
		Population: number;
		SurfaceArea: number;
		cities: City[];
		languages: Language[];
		[key: string]: any;
	};

	function initCountryField() {
		return {
			Code: '',
			Name: '',
			Continent: '',
			Population: null,
			SurfaceArea: null,
			cities: [] as City[],
			languages: [] as Language[]
		};
	}

	let country = initCountryField()

	onMount(() => {
		console.log('countryId: ', countryId, ', $page.params.id: ', $page.params.id);
		if (countryId) {
			fetch(`/country/${countryId}`)
				.then((r) => r.json())
				.then((r) => {
					const { Code, Name, Continent, Population, SurfaceArea, cities, languages } = r;
					country = { Code, Name, Continent, Population, SurfaceArea, cities, languages };
					if (!country.cities) country.cities = []
					if (!country.languages) country.languages = []
					console.log('rcountry ', country);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
		}
	});

	let city: City = {
		Name: '',
		District: ''
	};

	function addCity() {
		if (city.Name && city.District) {
			//countryCode is not required for mongo (since its a single document) but is required mysql
			country.cities = [...country.cities, Object.assign({countryCode: country.Code}, city)];
			city.Name = '';
			city.District = '';
			console.log('city ', country);
		}
	}

	let language: Language = {
		Language: '',
		IsOfficial: 'F'
	};
	function addLanguage() {
		if (language.Language && language.IsOfficial) {
			//countryCode is not required for mongo (since its a single document) but is required mysql
			country.languages = [...country.languages, Object.assign({countryCode: country.Code}, language)];
			language.Language = '';
			language.IsOfficial = 'F';
		}

		console.log('aaa ', country);
	}

	function save() {
		const result = countryId
			? fetch(`/country/${$page.params.id}`, {
					method: 'POST',
					body: JSON.stringify(country)
			  })
			: fetch(`/country/add`, {
					method: 'PUT',
					body: JSON.stringify(country)
			  });

		result
			.then((r) => r.json())
			.then((r) => {
				console.log('r ', r);
				if (r.acknowledged && (r.modifiedCount == 1 || r.insertedId)) {
					successful = true;
					setTimeout(() => (successful = false), 2500);

					if (r.insertedId) {
						country = initCountryField()
					}
				}
			});
	}

	async function cancel() {
		await goto('/country', { replaceState: true });
	}
</script>

<FluidForm>
	<div class="form-row">
		<TextInput labelText="Country Code" placeholder="Enter Country Code" bind:value={country.Code} />
		<TextInput labelText="Name" placeholder="Enter Country Name" bind:value={country.Name} />
		<TextInput labelText="Continent" placeholder="Enter Continent" bind:value={country.Continent} />
		<Button
			iconDescription="Spacer"
			icon={Add}
			kind="ghost"
			style="visibility: hidden;"
			size="small"
		/>
	</div>
	<div class="form-row">
		<TextInput
			labelText="Population"
			placeholder="Enter Population"
			bind:value={country.Population}
			type="number"
		/>
		<TextInput
			labelText="Surface Area"
			placeholder="Enter Surface Area"
			bind:value={country.SurfaceArea}
			type="number"
		/>
		<Button
			iconDescription="Spacer"
			icon={Add}
			kind="ghost"
			style="visibility: hidden;"
			size="small"
		/>
	</div>

	<!-- Add/Edit City-->
	<div class="spacer-vert" />
	<div>
		<div class="form-row">
			<TextInput labelText="City Name" placeholder="Enter Name of City" bind:value={city.Name} />
			<TextInput
				labelText="District"
				placeholder="Enter District of City"
				bind:value={city.District}
			/>
			<Button iconDescription="Add City" on:click={addCity} icon={Add} size="small" />
		</div>

		<div class="form-row">
			<div class="col header">City Name</div>
			<div class="col header">District</div>
			<Button icon={Add} style="visibility: hidden;" size="small" />
		</div>
		{#each country.cities as city, i (i)}
			<div class="form-row">
				<div class="col">{city.Name}</div>
				<div class="col">{city.District}</div>
				<Button icon={Add} style="visibility: hidden;" size="small" />
			</div>
		{/each}
	</div>
	<!-- Add/Edit Language-->
	<div class="spacer-vert" />
	<div>
		<div class="form-row">
			<TextInput
				labelText="Language Name"
				placeholder="Enter Language Name"
				bind:value={language.Language}
			/>
			<RadioButtonGroup bind:selected={language.IsOfficial}>
				<div slot="legendText" style="margin-top: -32px;">Official Language</div>
				<RadioButton id="radio-1" value="T" labelText="TRUE" />
				<RadioButton id="radio-2" value="F" labelText="FALSE" />
			</RadioButtonGroup>
			<Button iconDescription="Add Language" on:click={addLanguage} icon={Add} size="small" />
		</div>
		<div class="form-row">
			<div class="col header">Language</div>
			<div class="col header">IsOfficial</div>
			<Button icon={Add} style="visibility: hidden;" size="small" />
		</div>
		{#each country.languages as lang, i (i)}
			<div class="form-row">
				<div class="col">{lang.Language}</div>
				<div class="col">{lang.IsOfficial}</div>
				<Button icon={Add} style="visibility: hidden;" size="small" />
			</div>
		{/each}
	</div>
	<div class="spacer-vert" />
	{#if successful}
		<div class="bx--inline-notification bx--toast-notification--success">
			<div class="bx--inline-notification" style="min-height: auto;">
				<CheckmarkFilled size={16} />
				<div class="bx--inline-notification__title">Success</div>
				<span class="bx--inline-notification__subtitle"
					>Country Successfully {countryId ? 'updated' : 'added'}.</span
				>
			</div>
		</div>
	{/if}
	<div style="display: flex; justify-content: center; gap: 10px;">
		<Button icon={Save} on:click={save}>Save</Button>
		<Button icon={CloseFilled} on:click={cancel}>Cancel</Button>
	</div>
</FluidForm>

<style>
	.form-row {
		display: flex;
		align-items: center;
		gap: 5px;
	}
	.spacer-vert {
		padding-top: 10px;
	}
	.form-row .header {
		font-size: 18px;
		margin-top: 5px;
	}
	.form-row .col {
		width: 100%;
		font-size: 16px;
		padding: 10px 0 10px;
		border-top: solid 1px #dedede;
	}
	.min-size {
		min-height: 0px;
		padding-top: 0;
		padding-bottom: 0;
		visibility: hidden;
	}
</style>
