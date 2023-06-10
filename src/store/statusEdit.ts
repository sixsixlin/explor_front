import { defineStore } from 'pinia';
interface editStatus {
  statusEdit: boolean
  numberEdit:number
}
export const articleStatusEditStore = defineStore('status-edit',{
  state: (): editStatus => {
    return {
      statusEdit: false,
      numberEdit:-1
    }
  },
  actions: {
    // 变为true
    exEditStatusTrue() {
      this.statusEdit=true
      this.numberEdit = 1
    },
    // 变为false
    exEditStatusFalse() {
      this.statusEdit=false
      this.numberEdit = 2
    }
  }
})
