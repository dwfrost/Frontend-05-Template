<template>
  <div class="helloWorld-wrap">hello world</div>
</template>

<script>
export default {
  name: 'helloWorld',
  data() {
    return {}
  },
  created() {
    console.log('created')
  },
}
</script>

<style scoped>
.helloWorld-wrap {
  color: hotpink;
}
</style>
