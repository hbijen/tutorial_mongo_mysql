<script>
	import { Modal } from 'carbon-components-svelte';
	import neilitLogo from '$lib/images/NIELIT_Logo.png';

	let open = false;

	export function openModal() {
		open = true;
	}

	function closeModal() {
		open = false;
	}
</script>

<Modal
	passiveModal
	bind:open
	modalHeading="About"
	on:click:button--primary={() => (open = false)}
	on:open
	on:close
>
	<p>
		This tutorial app aims to help students practise writing MongoDB and MySQL queries. It also
		introduces where and how these queries integrate with the final web application.
	</p>
	<p />
	<p />

	<p>
        Credit, 
		<a href="https://nielit.gov.in/imphal/index.php" target="_blank">
			Neilit Imphal <img src={neilitLogo} alt="Neilit" />
		</a>
	</p>
	<p>
		Prepared by <a href="https://lamzing.com/" target="_blank">Lamzing Technologies Pvt. Ltd.</a>
	</p>

</Modal>

<style>
    p {
        margin-top: 10px;
    }
</style>