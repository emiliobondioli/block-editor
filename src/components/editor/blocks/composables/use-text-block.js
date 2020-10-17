import { ref } from '@vue/composition-api';

export default function({ update, edit, editing }, { emit, $nextTick }) {
  const inputRef = ref(null);

  const setType = type => {
    edit.value.tag = type;
    update();
  };

  const backspace = e => {
    if (e.target.value === '') {
      emit('delete', edit.value);
      e.preventDefault();
    } else if (e.target.selectionStart === 0) {
      emit('backspace', edit.value);
      e.preventDefault();
    }
  };

  const startEditing = () => {
    if (editing.value) return;
    editing.value = true;
    $nextTick(() => {
      inputRef.value.focus();
    });
  };

  const stopEditing = () => {
    if (!editing.value) return;
    editing.value = false;
    if (!edit.value.content) emit('delete', edit.value);
  };

  const checkCreateNewBlock = e => {
    if (!edit.value.content || e.shiftKey) return;
    stopEditing();
    emit('new');
    e.preventDefault();
  };

  return {
    inputRef,
    setType,
    backspace,
    startEditing,
    stopEditing,
    checkCreateNewBlock
  };
}
