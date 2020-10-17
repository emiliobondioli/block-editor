<template>
  <div class="block column">
    <header>
      <context-menu ref="ctx">
        <template v-slot:icon>
          <i class="ri-layout-2-line" title="Column"></i>
        </template>
        <template v-slot:title>
          <p class="block-info">{{ block.type }} {{ block.id }}</p>
        </template>
        <ul>
          <li title="Add block">
            <context-menu ref="ctx-child" dropdown keep-visible>
              <template v-slot:icon>
                <i class="ri-add-box-line"></i>
              </template>
              <template v-slot:title>
                <p class="block-info">Block type</p>
              </template>
              <add-child-menu @select="addChild" />
            </context-menu>
          </li>
          <li v-if="!root" @click="confirmDelete" title="Delete block">
            <i class="ri-delete-bin-5-line"></i>
          </li>
        </ul>
      </context-menu>
    </header>
    <draggable
      v-model="edit.children"
      class="group-content"
      :class="{ empty }"
      tag="div"
      :group="{ name: 'editor' }"
      @click.native="addChildIfEmpty('text')"
    >
      <div v-for="child in edit.children" :key="child.id">
        <ColumnsBlock
          v-if="child.type === 'columns'"
          :block="child"
          @update="updateChild"
          @delete="deleteChild"
          ref="blocks"
        />
        <GroupBlock
          v-else-if="child.type === 'group'"
          :block="child"
          @update="updateChild"
          @delete="deleteChild"
          ref="blocks"
        />
        <ContentBlock
          v-else
          :block="child"
          @new="addChild('text')"
          @update="updateChild"
          @delete="deleteChild"
          @backspace="checkCollapseChild"
          ref="blocks"
        />
      </div>
    </draggable>
  </div>
</template>

<script>
import ContextMenu from '../ContextMenu';
import AddChildMenu from '../AddChildMenu';
import draggable from 'vuedraggable';
import ColumnsBlock from './ColumnsBlock';
import ContentBlock from './ContentBlock';
import useEditBlock from './composables/use-edit-block';
import useContextMenu from './composables/use-context-menu';
import useBlockChildren from './composables/use-block-children';
import useTextBlock from './composables/use-text-block';

export default {
  name: 'ColumnBlock',
  components: {
    ContextMenu,
    AddChildMenu,
    draggable,
    ColumnsBlock,
    ContentBlock,
    GroupBlock: () => import('./GroupBlock')
  },
  props: {
    block: {
      type: Object,
      required: true
    },
    root: Boolean
  },
  setup(props, { emit, root }) {
    const { $store, $set } = root;
    const context = { emit, $store, $set };
    const { edit, update, confirmDelete, select } = useEditBlock(props, context);
    const { ctx } = useContextMenu();
    const {
      empty,
      addChild,
      addChildIfEmpty,
      updateChild,
      deleteChild,
      getPreviousChild,
      selectPreviousChild
    } = useBlockChildren({ edit, update }, context);
    const { checkCollapseChild } = useTextBlock(
      { getPreviousChild, updateChild, deleteChild },
      context
    );
    return {
      ctx,
      edit,
      select,
      update,
      confirmDelete,
      empty,
      addChild,
      addChildIfEmpty,
      updateChild,
      deleteChild,
      getPreviousChild,
      selectPreviousChild,
      checkCollapseChild
    };
  }
};
</script>

<style lang="scss" scoped>
.group {
  display: flex;
  flex-direction: column;
  .group-content {
    &.empty {
      cursor: pointer;
    }
    flex: 1;
  }
}
</style>
