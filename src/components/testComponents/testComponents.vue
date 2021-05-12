<template>
	<view>
		<span>
			<slot v-bind:user="user">{{ user.lastName }}</slot>
		</span>
	</view>
</template>

<script>
export default {
	name: 'testComponents',
	data() {
		return {
			user: {
				firstName: 'fn',
				lastName: 'ln'
			}
		};
	}
};
</script>

<style></style>
