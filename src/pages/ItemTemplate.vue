<template>
  <div style="display: block!important;position: absolute!important;">
    <b>#{{ item.id }}</b>
    <span>{{ item.extra_name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
    searchText: { required: true }
  }
};
</script>
