<script>
	//import { fns, AppShell, Navbar, Header, Title, Divider } from '@svelteuidev/core';
	import 'carbon-components-svelte/css/white.css';
	import logo from '$lib/images/svelte-logo.svg';
	import lamzingLogo from '$lib/images/logo-with-name.svg';
	import mongoLogo from '$lib/images/MongoDB_SpringGreen.png';
	import mysqlLogo from '$lib/images/includes-mysql-125x64.png';

	import About from './about.svelte';

	let isDark = false;
	let opened = false;

	function toggleTheme() {
		isDark = !isDark;
	}
	function toggleOpened() {
		opened = !opened;
	}

	import {
		Header,
		SideNav,
		SideNavItems,
		SideNavMenu,
		SideNavMenuItem,
		SideNavLink,
		SideNavDivider,
		Content,
		Grid,
		Row,
		Column
	} from 'carbon-components-svelte';

	let isSideNavOpen = false;
	/**
	 * @type {About}
	 */
	let aboutRef
</script>

<svelte:head>
	<title>Tutorial</title>
</svelte:head>

<Header bind:isSideNavOpen >
	<div class="header">
		<div>
			<a href="/">
				<img src={lamzingLogo} alt="Lamzing" />
			</a>
		</div>
	
		<h2 class="center" style="color: white;">Mongo MySQL Tutorial</h2>
	
		<div>
			<a href="https://kit.svelte.dev" style="height: 100px;">
				<img src={logo} alt="SvelteKit" />
			</a>
	
			<a href="https://www.mongodb.com/">
				<img src={mongoLogo} alt="MongoDB" />
			</a>

			<a href="https://www.mysql.com/">
				<img src={mysqlLogo} alt="MySQL" />
			</a>

		</div>
	</div>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<SideNavMenu text="Country">
			<SideNavMenuItem href="/country" text="List" />
			<SideNavMenuItem href="/country-pagination" text="Paginated" />
		</SideNavMenu>
		<SideNavMenu text="City">
			<SideNavMenuItem href="/city" text="Paginated" />
		</SideNavMenu>
		<SideNavMenu text="Language">
			<SideNavMenuItem href="/language" text="List" />
		</SideNavMenu>
		<SideNavMenu text="Reports">
			<SideNavMenuItem href="/reports/population" text="Population Bar" />
			<SideNavMenuItem href="/reports/language" text="Language Pie" />
			<SideNavMenuItem href="/reports/country-language" text="Top Country Language" />
			<SideNavMenuItem href="/reports/continent-population" text="Continent Population" />
			<SideNavMenuItem href="/reports/continent-summary" text="Continent Summary" />
			<SideNavMenuItem href="/reports/population-area" text="Population By Area" />
			<SideNavMenuItem href="/reports/district-population" text="State Population" />
		</SideNavMenu>		
		<SideNavDivider />
		<SideNavLink text="About" on:click={() => aboutRef.openModal()} />
	</SideNavItems>
</SideNav>

<Content>
	<Grid>
		<Row>
			<Column>
				<slot></slot>
			</Column>
		</Row>
	</Grid>
</Content>

<About bind:this={aboutRef}/>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	a img {
		height: 40px;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	div a {
		padding-right: 10px;
	}
</style>