<script lang="ts">
	import { page } from "$app/stores"
	import CountryForm from '../CountryForm.svelte';

	console.log("edit country with id ", $page.params.id)
</script>

<div>
	<h2>Edit Country</h2>
	
	<CountryForm countryId={$page.params.id}></CountryForm>
</div>

