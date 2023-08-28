<script>

	import { CheckmarkFilled } from "carbon-icons-svelte";
    export let message = ""

</script>

<div class="bx--inline-notification bx--toast-notification--success">

	<div class="bx--inline-notification" style="min-height: auto;">
		<CheckmarkFilled size={16} />
		<div class="bx--inline-notification__title">Success</div> 
		<span class="bx--inline-notification__subtitle">{message}.</span> 
	</div>
</div>
