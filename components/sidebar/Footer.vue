<template>
	<div class="mt-6 hidden xl:(block)">
		<SidebarFooterList :items="footerList1" class="!mt-0" />
		<SidebarFooterList :items="footerList2" />
		<SidebarFooterList :items="footerList3" />
		<p class="mt-5 text-sm text-gray-400">2022 Prostoleo Tiktik</p>
	</div>
</template>

<script setup lang="ts">
	import { footerList1, footerList2, footerList3 } from '~~/utils/constants';
</script>

<style scoped></style>
