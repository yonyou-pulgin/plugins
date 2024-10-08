import { ref } from 'vue'

const confrimInfo = ref(null)
const setConfrimInfo = (info) => {
  confrimInfo.value = info
}
const getConfrimInfo = () => {
  return confrimInfo.value
}

const useConfirmInfo = () => {
  return {
    confrimInfo,
    setConfrimInfo,
    getConfrimInfo
  }
}
export default useConfirmInfo