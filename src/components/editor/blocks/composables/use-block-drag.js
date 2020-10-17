import { ref } from '@vue/composition-api';

export default function({ empty }) {
  const dragging = ref(false);
  const checkMove = () => {
    dragging.value = empty.value;
  };
  const stopDragging = () => {
    dragging.value = false;
  };
  return { dragging, checkMove, stopDragging };
}
