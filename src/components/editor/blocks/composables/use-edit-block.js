import { clone } from '@/utils';
import { ref, watch } from '@vue/composition-api';

export default function(props, { emit, $store }) {
  const edit = ref(clone(props.block));
  watch(
    () => props.block,
    () => {
      edit.value = clone(props.block);
    }
  );
  const editing = ref(true);
  const update = () => {
    emit('update', edit.value);
  };

  const select = () => {};

  const confirmDelete = () => {
    if ($store.state.confirmDelete) {
      const confirmDelete = confirm('Are you sure you want to delete?');
      if (!confirmDelete) return;
    }
    emit('delete', edit.value);
  };

  return {
    edit,
    editing,
    select,
    update,
    confirmDelete
  };
}
