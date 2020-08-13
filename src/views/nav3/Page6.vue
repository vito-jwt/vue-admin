<template>
	<section>
		<h1 @click="getUser">
			helll
		</h1>
	</section>
</template>
<script>
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				loading: false,
				users: [
				]
			}
		},
		methods: {
			getUser: function () {
				this.$router.push({ path: '/table' });
			}
		}
	};

</script>
