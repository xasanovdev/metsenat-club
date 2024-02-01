import { computed } from 'vue'
import { filterStudent, filterData } from './FilterModal.vue'

export const studentDataType = computed(() => {
  if (filterStudent.value.type == '') {
    return 'Barchasi'
  } else {
    return filterStudent.value.type
  }
  if (filterData.value.type == 'Bakalavr') {
    return '1'
  } else {
    return '2'
  }
})
