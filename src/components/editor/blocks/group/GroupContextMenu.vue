<template>
  <context-menu ref="ctx">
    <template v-slot:icon>
      <i class="ri-layout-2-line" title="Group"></i>
    </template>
    <template v-slot:title>
      <p class="block-info">{{ block.type }} {{ block.id }}</p>
    </template>
    <template v-slot:default="{ close }">
      <ul>
        <li title="Add block">
          <group-add-child-menu
            @select="
              $emit('add-child', $event);
              close();
            "
          />
        </li>
        <li v-if="canDelete" @click="$emit('delete')" title="Delete block">
          <i class="ri-delete-bin-5-line"></i>
        </li>
      </ul>
    </template>
  </context-menu>
</template>

<script>
import ContextMenu from '@/components/editor/ContextMenu';
import GroupAddChildMenu from './GroupAddChildMenu';

export default {
  name: 'GroupContextMenu',
  props: {
    block: {
      type: Object,
      required: true
    },
    canDelete: {
      type: Boolean,
      default: true
    }
  },
  components: { ContextMenu, GroupAddChildMenu }
};
</script>

<style></style>
