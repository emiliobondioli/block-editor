<template>
  <context-menu ref="ctx">
    <template v-slot:icon>
      <i class="ri-layout-2-line" title="Group"></i>
    </template>
    <template v-slot:title>
      <p class="block-info">{{ block.type }} {{ block.id }}</p>
    </template>
    <template v-slot:default="parent">
      <ul>
        <li title="Add block">
          <context-menu ref="ctx-child" dropdown keep-visible>
            <template v-slot:icon>
              <i class="ri-add-box-line"></i>
            </template>
            <template v-slot:title>
              <p class="block-info">Block type</p>
            </template>
            <template v-slot:default="{ close }">
              <group-add-child-menu
                @select="
                  $emit('add-child', $event);
                  close();
                  parent.close()
                "
              />
            </template>
          </context-menu>
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
