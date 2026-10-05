<template>
    <v-checkbox v-model="checked" :rules="[() => !!checked || '']" required>
        <template v-slot:label>
            <slot></slot><span class="red--text">*</span>
        </template>
    </v-checkbox>
</template>

<script>
export default {
  data: () => ({ checked: false }),
}
</script>
