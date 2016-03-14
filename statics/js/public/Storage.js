'use strict'

import Storage from 'react-native-storage'

global.storage = new Storage({
  size: 10,
  defaultExpire: 1000 * 3600 * 24,
  enableCache: true,
  sync: {}
})


