import _ from 'lodash'

const getInfoData = ({ filed, object }) => {
  return _.pick(object, filed)
}

export {
  getInfoData,
}